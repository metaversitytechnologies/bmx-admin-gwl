import { Button, Card, Empty, message, Row, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import {
  useGetMatchListLederQuery,
  useGetPostLederMutation,
  useGetRollBackMutation,
} from "../../../store/service/userlistService";

const CreateLedger = ({ forPostLedger }) => {
  const nav = useNavigate();

  // state for pagination
  const [pageIndex, setPageIndex] = useState(0); 
  const [pageSize, setPageSize] = useState(50); 

  const { data: sportDetail, refetch } = useGetMatchListLederQuery({
    noOfRecords: pageSize,
    index: pageIndex,
    forPostLedger,
  });

  const [getPostLedger] = useGetPostLederMutation();
  const [getRolllback] = useGetRollBackMutation();

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

  return (
    <Card
      className="sport_detail"
      title={`Create ${forPostLedger ? "Ledger" : "Rollback"}`}
      extra={<button onClick={() => nav(-1)}>Back</button>}>
      <Row className="date_picker" justify="center"></Row>

      <div className="table_section">
        <table className="ant-spin-nested-loading">
          <thead>
            <tr>
              <th>Match Name</th>
              <th>Status</th>
              <th>Ledger Posted?</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sportDetail?.data?.matchList?.length > 0 ? (
              sportDetail?.data?.matchList?.map((res, id) => (
                <tr key={res.matchId || id}>
                  <td>{res?.matchName}</td>
                  <td>In Active</td>
                  <td>{forPostLedger ? "No" : "Yes"}</td>
                  <td>
                    {moment(res.lederPostDate).format("DD-MM-YYYY HH:mm:ss")}
                  </td>
                  <td>
                    <Button
                      type="primary"
                      onClick={() => handleCreate(res)}
                      className="in_play_btn">
                      {forPostLedger ? "Create Ledger" : "Rollback"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {sportDetail?.data?.matchList?.length > 0 && (
        <Row justify="end" style={{ marginTop: 20 }}>
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
  );
};

export default CreateLedger;
