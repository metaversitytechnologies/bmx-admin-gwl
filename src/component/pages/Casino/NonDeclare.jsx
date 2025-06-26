import { Card, Table } from "antd";
import React from "react";

const NonDeclare = () => {
  const columns = [
    {
      title: "Client",
      dataIndex: "Client",
      key: "Client",
    },
    {
      title: "RoundId",
      dataIndex: "RoundId",
      key: "RoundId",
    },
    {
      title: "Player",
      dataIndex: "Player",
      key: "Player",
    },
    {
      title: "Winner",
      dataIndex: "Winner",
      key: "Winner",
    },
    {
      title: "Stake",
      dataIndex: "Stake",
      key: "Stake",
    },
    {
      title: "Profit",
      dataIndex: "Profit",
      key: "Profit",
    },
    {
      title: "Loss",
      dataIndex: "Loss",
      key: "Loss",
      render: (text, record) =>
        record.pnl < 0 ? <span>{record.stake}</span> : <span>0</span>,
    },
  ];
  return (
    <div className="match_slip NonDeclare">
      <Card
        className="sport_detail team_name"
        title="NonDeclare Bets - [ 0 ]"
        style={{
          margin: 0,
          width: "100%",
          boxShadow: "0 0 5px 5px rgba(0, 0, 0, .03)",
        }}>
        <Table bordered columns={columns}></Table>
      </Card>
    </div>
  );
};

export default NonDeclare;
