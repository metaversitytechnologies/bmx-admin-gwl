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

  const columns = [
    {
      title: "Superagent",
      dataIndex: "superagent",
      key: "superagent",
      render: (__, record) => (
        <span className="gx-px-2 gx-py-1 gx-pointer gx-text-white gx-bg-orange">
          {record?.userId}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "role",
      key: "role",
      render: (role, record) => (
        <span
          className="gx-px-2 gx-py-1 gx-pointer gx-text-white gx-bg-orange"
          onClick={() => setUserName(record?.userId)}>
          {record?.userId} ({record?.username})
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
        extra={<Button onClick={() => nav(-1)}>Back</Button>}>
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
