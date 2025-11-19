import { Card, Col, Row, Select, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRejectedBetQuery } from "../../../../store/service/SportDetailServices";
import { render } from "react-dom";

const RejectedBetsByEvent = () => {
  const nav = useNavigate();
  const { id, name } = useParams();

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
      key: "run",
      render: () => <span>{name}</span>,
    },
    {
      title: "Client",
      dataIndex: "userId",
      key: "userId",
    },
    // {
    //   title: "Agent",
    //   dataIndex: "parentId",
    //   key: "parentId",
    // },
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
      title: "Market Type",
      dataIndex: "marketName",
      key: "bet_status",
    },
    {
      title: "Remark",
      dataIndex: "selectionName",
      key: "selectionName",
    },
  ];

  const { data } = useGetRejectedBetQuery({
    matchId: id,
  });

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
            dataSource={data?.data || []}
            rowKey={(record, index) => index}
          />
        </div>
      </Card>
    </div>
  );
};

export default RejectedBetsByEvent;
