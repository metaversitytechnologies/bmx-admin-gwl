import { Button, Card, Empty, Input, message, Row, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { Lock, LockKeyhole, Search, UnlockKeyhole } from "lucide-react";
import {
  useGetEventActiveDeactiveMutation,
  useGetEventLockListQuery,
} from "../../../store/service/userlistService";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const EventControllor = () => {
  const nav = useNavigate();

  // ✅ Local states for PF-side pagination
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(50); // ✅ Default show 50
  const [searchTerm, setSearchTerm] = useState("");

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
  const handlePageChange = (page, size) => {
    setPageIndex(page - 1); // antd gives 1-based, convert to 0-based
    setPageSize(size);
  };

  // ✅ Slice data on PF side
  const data = sportDetail?.data || [];
  const filteredData = data.filter((event) =>
    (event?.eventName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="main_live_section list_supers admin-details-panel event-controllor-panel">
      <AppPageHeader
        icon={<Lock size={20} strokeWidth={1.8} />}
        title="Event Lock"
        subtitle="Lock or unlock betting activity for live events"
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
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setPageIndex(0);
          }}
        />
      </div>

      <div className="table_section rollback-table-viewport">
        <table className="ant-spin-nested-loading rollback-table event-lock-table">
          <thead>
            <tr>
              <th>SNo.</th>
              <th className="rollback-match-column">Event Name</th>
              <th>Event ID</th>
              <th>Start Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((res, id) => (
                <tr key={res.matchId || id}>
                  <td className="rollback-index-cell">
                    {id + 1 + pageIndex * pageSize}
                  </td>
                  <td className="rollback-match-column rollback-match-name">
                    <span title={res?.eventName}>{res?.eventName}</span>
                  </td>
                  <td className="rollback-id-cell">{res?.eventId}</td>
                  <td className="rollback-date-cell">
                    {moment(res.startDate).format("DD-MM-YYYY HH:mm:ss")}
                  </td>
                  <td>
                    <Button
                      type="ghost"
                      onClick={() => handleCreate(res)}
                      className={`in_play_btn event-lock-action-button ${
                        res?.active ? "is-lock" : "is-unlock"
                      }`}>
                      {res?.active ? (
                        <LockKeyhole size={15} strokeWidth={2.1} />
                      ) : (
                        <UnlockKeyhole size={15} strokeWidth={2.1} />
                      )}
                      {res?.active ? "Lock Event" : "UnLock Event"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No events available"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ PF-Side Pagination Section */}
      {filteredData.length > 0 && (
        <Row className="rollback-pagination" justify="end">
          <Pagination
            current={pageIndex + 1} // antd is 1-based
            pageSize={pageSize}
            total={filteredData.length}
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

export default EventControllor;
