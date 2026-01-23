import { Button, Card, Empty, message, Row } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import {
  useGetEventActiveDeactiveMutation,
  useGetEventLockListQuery,
} from "../../../store/service/userlistService";
import TablePagination from "../../common/TablePagination";

const EventControllor = () => {
  const nav = useNavigate();

  // ✅ Local states for PF-side pagination
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const pageSize = 50; // ✅ Default show 50

  const { data: sportDetail, refetch } = useGetEventLockListQuery({});
  const [getActiveDeactive] = useGetEventActiveDeactiveMutation();

  const handleCreate = async (item) => {
    const res = await getActiveDeactive({
      matchId: item?.eventId,
      avtiveStatus: !item?.active,
    }).unwrap();
    if (res?.status) {
      message.success(res?.message);
      refetch();
    } else {
      message.error(res?.message);
    }
  };

  // ✅ Handle page change
  const handlePageChange = (page) => {
    setPageIndex(page - 1); // antd gives 1-based, convert to 0-based
  };

  // ✅ Slice data on PF side
  const data = sportDetail?.data || [];
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <Card
      className="sport_detail"
      title="Event Lock"
      extra={<button onClick={() => nav(-1)}>Back</button>}
    >
      <Row className="date_picker" justify="center"></Row>

      <div className="table_section">
        <table className="ant-spin-nested-loading">
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Event Name</th>
              <th>Event ID</th>
              <th>Start Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((res, id) => (
                <tr key={res.matchId || id}>
                  <td>{id + 1 + pageIndex * pageSize}</td>
                  <td>{res?.eventName}</td>
                  <td>{res?.eventId}</td>
                  <td>{moment(res.startDate).format("DD-MM-YYYY HH:mm:ss")}</td>
                  <td>
                    <Button
                      type="ghost"
                      onClick={() => handleCreate(res)}
                      className="in_play_btn"
                      style={{
                        background: res?.active ? "green" : "red",
                        color: "#fff",
                      }}
                    >
                      {res?.active ? "Lock Event" : "UnLock Event"}
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

      {/* ✅ PF-Side Pagination Section */}
      {data.length > 0 && (
        <Row justify="end" style={{ marginTop: 20 }}>
          <TablePagination
            current={pageIndex + 1} // antd is 1-based
            pageSize={pageSize}
            total={data.length}
            onChange={handlePageChange}
          />
        </Row>
      )}
    </Card>
  );
};

export default EventControllor;
