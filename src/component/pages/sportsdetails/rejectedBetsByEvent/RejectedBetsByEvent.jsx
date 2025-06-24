import React from "react";
import { Card, Col, Form, Row, Select, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";

// Mock static data
const mockData = [
  {
    pricevalue: 2.5,
    stake: 100,
    matchname: "Team A vs Team B",
    userid: "Client123",
    dealerid: "AgentX",
    date: "2025-06-13 14:30",
    pnl: -50,
    bet_status: "Deleted",
  },
  {
    pricevalue: 1.8,
    stake: 200,
    matchname: "Team C vs Team D",
    userid: "Client456",
    dealerid: "AgentY",
    date: "2025-06-13 15:00",
    pnl: 75,
    bet_status: "Deleted",
  },
];

const columns = [
  {
    title: "Rate",
    dataIndex: "pricevalue",
    key: "pricevalue",
  },
  {
    title: "Amount",
    dataIndex: "stake",
    key: "stake",
  },
  {
    title: "Team",
    dataIndex: "matchname",
    key: "matchname",
  },
  {
    title: "Client",
    dataIndex: "userid",
    key: "userid",
  },
  {
    title: "Agent",
    dataIndex: "dealerid",
    key: "dealerid",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Loss",
    dataIndex: "stake",
    key: "loss",
    render: (text, record) =>
      record.pnl < 0 ? <span>{record.stake}</span> : <span>0</span>,
  },
  {
    title: "Profit",
    dataIndex: "pnl",
    key: "profit",
    render: (text, record) =>
      record.pnl > 0 ? <span>{record.pnl}</span> : <span>0</span>,
  },
  {
    title: "Bet Status",
    dataIndex: "bet_status",
    key: "bet_status",
  },
];

const RejectedBetsByEvent = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const handleBackClick = () => {
    nav(-1);
  };

  return (
    <div className="match_slip rehected_bet">
      <Card
        style={{ margin: "0px", width: "100%" }}
        className="sport_detail"
        title="REJECTED And CANCELLED Bets"
        extra={<button onClick={handleBackClick}>Back</button>}>
        <Row className=" fancy_data_sess mr ">
          <Col xs={24} md={24} lg={8} xl={8}>
            <Select
              placeholder="Select User"
              options={[]}
              showSearch
              allowClear
            />
          </Col>
        </Row>
        <div className="table_section" style={{ marginBottom: "10px" }}>
          <Table
            columns={columns}
            dataSource={mockData}
            rowKey={(record, index) => index}
          />
        </div>
      </Card>
    </div>
  );
};

export default RejectedBetsByEvent;
