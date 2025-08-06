import { Card, Table, Button, Empty, Spin } from "antd";
import { useGetAgentPlusMinusQuery } from "../../../../store/service/SportDetailServices";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const ClientReport = () => {
  const { id, name } = useParams();
  const userId = localStorage.getItem("userId");
  const [userName, setUserName] = useState(userId);
  const nav = useNavigate();
  const { data, isLoading } = useGetAgentPlusMinusQuery(
    {
      matchId: id,
      userId: userName,
    },
    { refetchOnMountOrArgChange: true }
  );

  const firstColumnTitle = (() => {
    const rows = data?.data || [];
    if (rows.some((r) => r.userId?.includes("AD"))) return "Admin";
    if (rows.some((r) => r.userId?.includes("SUB"))) return "Mini Admin";
    if (rows.some((r) => r.userId?.includes("M"))) return "Master";
    if (rows.some((r) => r.userId?.includes("SA"))) return "Super";
    if (rows.some((r) => r.userId?.includes("A"))) return "Agent";
    if (rows.some((r) => r.userId)) return "Client";
    return "User"; // fallback if no rows yet
  })();

  const columns = [
    {
      title: `${firstColumnTitle}`,
      dataIndex: "superagent",
      key: "superagent",
      render: (__, record) => <span>{record?.userId}</span>,
    },
    {
      title: "",
      dataIndex: "role",
      key: "role",
      render: (role, record) => (
        <span
          className="gx-px-2 gx-py-1 gx-pointer gx-text-white gx-bg-orange"
          onClick={() => {
            if (!record?.userId?.includes("C")) {
              setUserName(record?.userId);
            }
          }}>
          {record?.userId?.includes("AD")
            ? "Admin"
            : record?.userId?.includes("SUB")
            ? "Mini Admin"
            : record?.userId?.includes("M")
            ? "Master"
            : record?.userId?.includes("SA")
            ? "Super"
            : record?.userId?.includes("A")
            ? "Agent"
            : "Client"}
        </span>
      ),
    },
    {
      title: "Net Account",
      dataIndex: "pnl",
      key: "pnl",
      render: (amount) => (
        <span className={amount > 0 ? "gx-text-green-0" : "gx-text-red-0"}>
          {parseFloat(amount).toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <div className="match_slip client_report">
      <Card
        style={{ margin: "0px", width: "100%" }}
        className="sport_detail session_bet"
        title={
          <div>
            <h1>Client Report</h1>
            <p>{name}</p>
          </div>
        }
        extra={<button onClick={() => nav(-1)}>Back</button>}>
        <div className="table_section statement_tabs_data active_match_table">
          {isLoading ? (
            <Spin />
          ) : (
            <Table
              columns={columns}
              dataSource={data?.data || []} // Replace with data?.payload when integrating real data
              locale={{
                emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
              }}
              pagination={false}
              bordered
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default ClientReport;
