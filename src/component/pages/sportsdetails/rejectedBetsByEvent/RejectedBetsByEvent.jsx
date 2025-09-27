import { Card, Col, Row, Select, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRejectedBetQuery } from "../../../../store/service/SportDetailServices";
import { useState, useMemo } from "react";

const RejectedBetsByEvent = () => {
  const nav = useNavigate();
  const { id, name } = useParams();
  const { data } = useGetRejectedBetQuery({ matchId: id });

  const [selectedUser, setSelectedUser] = useState("ALL");

  const userOptions = useMemo(() => {
    if (!data?.data) return [];
    const uniqueUsers = Array.from(
      new Map(
        data.data.map((item) => [
          item.userId,
          { label: item.userId, value: item.userId },
        ])
      ).values()
    );
    return [{ label: "All User", value: "ALL" }, ...uniqueUsers];
  }, [data]);

  const filteredData = useMemo(() => {
    if (!selectedUser || selectedUser === "ALL") return data?.data || [];
    return data?.data.filter((item) => item.userId === selectedUser);
  }, [data, selectedUser]);

  const columns = [
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text) => <span>{Number(text).toFixed(2)}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: "Run",
      dataIndex: "run",
      key: "run",
    },
    {
      title: "Team",
      dataIndex: "run",
      key: "team",
      render: () => <span>{name}</span>,
    },
    {
      title: "Client",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Agent",
      dataIndex: "parentId",
      key: "parentId",
    },
    {
      title: "Date",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Bet Status",
      dataIndex: "bet_status",
      key: "bet_status",
      render: () => <span>Deleted</span>,
    },
    {
      title: "Remark",
      dataIndex: "selectionName",
      key: "selectionName",
    },
  ];

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
        <Row className="fancy_data_sess mr">
          <Col xs={24} md={24} lg={8} xl={8}>
            <Select
              placeholder="Select User"
              options={userOptions}
              showSearch
              style={{ width: "100%" }}
              value={selectedUser}
              onChange={(value) => setSelectedUser(value)}
            />
          </Col>
        </Row>
        <div className="table_section" style={{ marginBottom: "10px" }}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey={(record, index) => index}
            pagination={{ pageSize: 50 }}
          />
        </div>
      </Card>
    </div>
  );
};

export default RejectedBetsByEvent;
