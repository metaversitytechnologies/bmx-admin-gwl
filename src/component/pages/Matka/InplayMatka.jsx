import { Card, Empty } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../common/LinkButton";
import TablePagination from "../../common/TablePagination";

const InplayMatka = () => {
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const matkaData = [
    { id: 1, name: "MAHARANI", eventId: "24-12-2025-maharani" },
    { id: 2, name: "FARIDABAD", eventId: "24-12-2025-faridabad" },
    { id: 3, name: "GHAZIABAD", eventId: "24-12-2025-ghaziabad" },
    { id: 4, name: "GALI", eventId: "24-12-2025-gali" },
    { id: 5, name: "DESAWAR", eventId: "24-12-2025-desawar" },
  ];

  const paginatedData = matkaData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="match_slip inplay_casino">
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail team_name"
        title="ACTIVE GAMES"
        extra={<button onClick={() => nav(-1)}>Back</button>}>
        <div className="table_section statement_tabs_data" style={{ padding: "20px" }}>
          <table className="live_table login_data_table">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>NAME</th>
                <th style={{ width: "60%" }}>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <div
                      className="gx-justify-content-start"
                      style={{ display: "flex", alignItems: "center" }}>
                      <LinkButton
                        to={`/matka/inplay/${item.eventId}/${item.name.toLowerCase()}`}
                        label="View"
                        icon={<EyeOutlined />}
                      />
                      <LinkButton
                        to={`/matka/all-bets/${item.eventId}`}
                        label="All Bets"
                        icon={<EyeOutlined />}
                        className="Display_Games"
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={2}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <TablePagination
          style={{ marginBottom: "12px" }}
          className="pagination_main ledger_pagination"
          total={matkaData.length}
          pageSize={pageSize}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </Card>
    </div>
  );
};

export default InplayMatka;
