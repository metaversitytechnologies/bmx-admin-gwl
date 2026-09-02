import { Button, Card, Empty, Input, message, Row, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { Check, Plus, RotateCcw, Search } from "lucide-react";
import PropTypes from "prop-types";
import {
  useGetMatchListLederQuery,
  useGetPostLederMutation,
  useGetRollBackMutation,
} from "../../../store/service/userlistService";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const CreateLedger = ({ forPostLedger }) => {
  const nav = useNavigate();

  // state for pagination
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: sportDetail, refetch } = useGetMatchListLederQuery(
    {
      noOfRecords: pageSize,
      index: pageIndex,
      forPostLedger,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [getPostLedger, { isLoading }] = useGetPostLederMutation();
  const [getRolllback, { isLoading: loading }] = useGetRollBackMutation();

  const handleCreate = async (item) => {
    if (forPostLedger) {
      const res = await getPostLedger({ matchId: item?.matchId }).unwrap();
      if (res?.status) {
        message.success(res?.message);
        refetch();
      } else {
        message.error(res?.message);
      }
    } else {
      const res = await getRolllback({ matchId: item?.matchId }).unwrap();
      if (res?.status) {
        message.success(res?.message);
        refetch();
      } else {
        message.error(res?.message);
      }
    }
  };

  const handlePageChange = (page, size) => {
    setPageIndex(page - 1); // antd starts from 1, API from 0
    setPageSize(size); // update dynamic page size
  };

  const getFormattedDate = (dateString) => {
    if (!dateString) return "--";

    const istFormat = moment(
      dateString,
      "ddd MMM DD HH:mm:ss [IST] YYYY",
      true
    );
    if (istFormat.isValid()) {
      return istFormat.format("DD-MM-YYYY hh:mm A");
    }

    // Then try standard YYYY-MM-DD HH:mm:ss
    const isoFormat = moment(dateString, "YYYY-MM-DD HH:mm:ss", true);
    if (isoFormat.isValid()) {
      return isoFormat.format("DD-MM-YYYY hh:mm A");
    }

    return "--";
  };

  const matchList = sportDetail?.data?.matchList || [];
  const filteredMatchList = matchList.filter((match) =>
    (match?.matchName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  const actionIcon = forPostLedger ? (
    <Plus size={15} strokeWidth={2.1} />
  ) : (
    <RotateCcw size={15} strokeWidth={2.1} />
  );

  return (
    <div className="main_live_section list_supers admin-details-panel create-ledger-panel">
      <AppPageHeader
        className="rollback-header-no-icon"
        icon={null}
        title={`Create ${forPostLedger ? "Ledger" : "Rollback"}`}
        subtitle={
          forPostLedger
            ? "Post ledger entries for completed matches"
            : "Roll back posted ledger entries for matches"
        }
        onBack={() => nav(-1)}
      />
    <Card className="sport_detail rollback-table-card">
      <div className="rollback-toolbar">
        <Input
          className="rollback-search"
          allowClear
          prefix={<Search size={17} strokeWidth={1.9} />}
          placeholder="Search match name..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="table_section rollback-table-viewport">
        <table className="ant-spin-nested-loading rollback-table">
          <thead>
            <tr>
              <th className="rollback-match-column">Match Name</th>
              <th>Status</th>
              <th>Ledger Posted</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatchList?.length > 0 ? (
              filteredMatchList?.map((res, id) => (
                <tr key={id}>
                  <td className="rollback-match-column rollback-match-name">
                    <span title={res?.matchName}>{res?.matchName}</span>
                  </td>
                  <td>
                    <span className="rollback-status-badge">
                      <span aria-hidden="true" />
                      In Active
                    </span>
                  </td>
                  <td>
                    <span
                      className={`rollback-ledger-badge ${
                        forPostLedger ? "is-no" : "is-yes"
                      }`}>
                      {!forPostLedger && <Check size={13} strokeWidth={2.2} />}
                      {forPostLedger ? "No" : "Yes"}
                    </span>
                  </td>
                  <td className="rollback-date-cell">
                    {getFormattedDate(res.lederPostDate)}
                  </td>
                  <td>
                    <Button
                      type="primary"
                      onClick={() => handleCreate(res)}
                      loading={isLoading || loading}
                      className="in_play_btn approved-primary-button rollback-action-button">
                      {actionIcon}
                      {forPostLedger ? "Create Ledger" : "Rollback"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      forPostLedger
                        ? "No matches available for ledger posting"
                        : "No matches available for rollback"
                    }
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {matchList?.length > 0 && (
        <Row className="rollback-pagination" justify="end">
          <Pagination
            current={pageIndex + 1} // antd current page (1-based)
            pageSize={pageSize}
            total={sportDetail?.data?.totalPages * pageSize}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={["20", "50", "100", "150", "200", "250"]}
          />
        </Row>
      )}
    </Card>
    </div>
  );
};

CreateLedger.propTypes = {
  forPostLedger: PropTypes.bool,
};

export default CreateLedger;
