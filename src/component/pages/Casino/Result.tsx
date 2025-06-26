import { Card, Table } from "antd";
import React from "react";

const Result = ({ name }: any) => {
  const columns = [
    {
      title: "Game ID",
      dataIndex: "Client",
      key: "Client",
    },
    {
      title: "Started AT",
      dataIndex: "RoundId",
      key: "RoundId",
    },
    {
      title: "Plus/Minus",
      dataIndex: "Player",
      key: "Player",
    },
    
  ];
  return (
    <div className="match_slip NonDeclare">
      <Card
        className="sport_detail team_name"
        title={name}
        style={{
          margin: 0,
          width: "100%",
          boxShadow: "0 0 5px 5px rgba(0, 0, 0, .03)",
        }}
        extra={
          <div>
            <h1 className="total_extra">Total: <span>0.00</span></h1>
          </div>
        }
        >
        <Table bordered columns={columns}></Table>
      </Card>
    </div>
  );
};

export default Result;
