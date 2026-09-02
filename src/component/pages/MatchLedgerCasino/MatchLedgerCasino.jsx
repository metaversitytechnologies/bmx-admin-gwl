import { Button, DatePicker, Modal, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import {
  useGetLedgerPostMutation,
  useGetLiveCasinoListQuery,
} from "../../../store/service/CasinoServices";
import moment from "moment";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Filter,
  Gamepad2,
  LayoutGrid,
  Receipt,
  Spade,
} from "lucide-react";

const { RangePicker } = DatePicker;

const MatchLedgerCasino = () => {
  const [open, setOpen] = useState(false);

  const { data, isFetching, isLoading } = useGetLiveCasinoListQuery();

  const [trigger, { isLoading: loading }] = useGetLedgerPostMutation();

  const handleLedgerPost = async () => {
    const res = await trigger({}).unwrap();
    if (res?.status) {
      console.log("Ledger Post Success:", res);
    } else {
      console.error("Ledger Post Failed:", res?.message);
    }
  };

  const renderTableRows = () =>
    data?.data?.map((items, index) => {
      const now = moment();
      return (
        <tr key={index}>
          <td>
            <span className="ml-code-badge">
              {String(index + 1).padStart(2, "0")}
            </span>
          </td>
          <td>
            <Link to={`/casino/${items?.tableId}`} className="ml-name-link">
              {items?.name}
            </Link>
          </td>
          <td>
            <div className="ml-date-cell">
              <span>{now.format("DD MMM YYYY")}</span>
              <span className="ml-date-time">{now.format("hh:mm:ss A")}</span>
            </div>
          </td>
          <td>
            <div className="ml-action-group">
              <Button type="primary" className="ml-view-btn">
                <Link to={`/casino/${items?.tableId}`}>
                  <Eye size={13} strokeWidth={2} />
                  View
                </Link>
              </Button>
              <Button type="default" className="ml-display-btn">
                <Link to={`/display-games/${items?.tableId}/${items?.name}`}>
                  <LayoutGrid size={13} strokeWidth={2} />
                  Display Games
                </Link>
              </Button>
            </div>
          </td>
        </tr>
      );
    });

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    handleLedgerPost();
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const matchCount = data?.data?.length ?? 0;

  return (
    <div className="match_slip match_ledger main_live_section list_supers admin-details-panel match-ledger-panel">
      <div className="admin-details-header">
        <div className="admin-details-title-wrap">
          <span className="admin-details-icon">
            <Spade size={20} strokeWidth={1.8} />
          </span>
          <div>
            <div className="team_name admin-details-title">Match Ledger</div>
            <p className="admin-details-subtitle">
              Review casino matches and manage ledger activity
            </p>
          </div>
        </div>
        <div className="show_btn">
          <button type="button" className="admin-details-back">
            <ArrowLeft size={15} strokeWidth={1.8} />
            <span className="ml-back-label">Back</span>
          </button>
        </div>
      </div>

      <div className="ml-body">
        <div className="ml-card ml-toolbar-card">
          <div className="ml-card-heading">
            <span className="ml-card-icon">
              <Filter size={16} strokeWidth={1.8} />
            </span>
            <h3 className="ml-card-title">Filter Matches</h3>
          </div>

          <div className="ml-toolbar-row">
            <div className="ml-date-field">
              <span className="ml-date-icon" aria-hidden="true">
                <Calendar size={14} strokeWidth={1.8} />
              </span>
              <RangePicker
                className="ml-range-picker"
                showSecond
                renderExtraFooter={() => (
                  <Space style={{ padding: 10 }} wrap>
                    <Tag color="blue">Today</Tag>
                    <Tag color="blue">Yesterday</Tag>
                    <Tag color="blue">This Week</Tag>
                    <Tag color="blue">Last Week</Tag>
                    <Tag color="blue">This Month</Tag>
                    <Tag color="blue">Last Month</Tag>
                  </Space>
                )}
              />
            </div>

            <Button type="primary" className="ml-apply-btn">
              Apply Filter
            </Button>

            <Button
              type="default"
              className="ml-post-btn"
              onClick={showModal}>
              <Receipt size={14} strokeWidth={2} />
              Post Casino Ledger
            </Button>
          </div>
        </div>

        <div className="ml-card ml-table-card">
          <div className="ml-card-heading ml-table-heading">
            <span className="ml-card-icon">
              <Gamepad2 size={16} strokeWidth={1.8} />
            </span>
            <div>
              <h3 className="ml-card-title">Casino Matches</h3>
              <p className="ml-card-subtitle">
                {matchCount} {matchCount === 1 ? "match" : "matches"} found
              </p>
            </div>
          </div>


          <div className="ml-table-scroll">
            {(isFetching || isLoading) && <CustomLoading />}
            <table className="ml-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Casino / Game</th>
                  <th>Date &amp; Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        title=""
        open={open}
        onOk={handleOk}
        confirmLoading={loading}
        okButtonProps={{
          disabled: loading,
        }}
        onCancel={handleCancel}
        className="ledger_post_modal ml-ledger-modal">
        <p className="ml-modal-text">
          Are you sure you want to post the casino ledger?
        </p>
      </Modal>
    </div>
  );
};

export default MatchLedgerCasino;
