import {
  Card,
  Empty,
  message,
  Row,
  Pagination,
  Dropdown,
  Space,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import {
  useGetDeletedMatchesQuery,
  useGetEventActiveDeactiveMutation,
} from "../../../store/service/userlistService";

const DeletedBets = () => {
  const nav = useNavigate();

  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(50); // default show 50

  const { data: sportDetail, refetch } = useGetDeletedMatchesQuery({});
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
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  const getActionMenuItems = (res) => [
    {
      label: (
        <div>
          <Link to={`/delete-session/${res?.matchId}`}>Session Bets</Link>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div>
          <Link to={`/delete-match/${res?.matchId}`}>Match Bets</Link>
        </div>
      ),
      key: "1",
    },
  ];

  return (
    <Card
      className="sport_detail"
      title="Delete Bets"
      extra={<button onClick={() => nav(-1)}>Back</button>}
    >
      <Row className="date_picker" justify="center"></Row>

      <div className="table_section">
        <table className="ant-spin-nested-loading">
          <thead>
            <tr>
              <th>SNo.</th>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Match ID</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((res, id) => (
                <tr key={res.matchId || id}>
                  <td>{id + 1 + pageIndex * pageSize}</td>
                  <td>
                    <Dropdown
                      className="droup_menu"
                      menu={{
                        items: getActionMenuItems(res),
                        className: "menu_data",
                      }}
                      trigger={["click", "contextMenu"]}
                    >
                      <div
                        className="droup_link"
                        style={{ cursor: "pointer" }}
                      >
                        <Space>
                          <CaretDownOutlined />
                        </Space>
                      </div>
                    </Dropdown>
                  </td>
                  <td>{res?.matchName}</td>
                  <td>{moment(res.openDate).format("DD-MM-YYYY HH:mm:ss")}</td>
                  <td>{res?.matchId}</td>
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
          <Pagination
            current={pageIndex + 1} // antd is 1-based
            pageSize={pageSize}
            total={data.length}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={["20", "50", "100", "150", "200", "250"]}
          />
        </Row>
      )}
    </Card>
  );
};

export default DeletedBets;
