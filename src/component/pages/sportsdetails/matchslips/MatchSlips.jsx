import MatchSlipCard from "./matchslipcard/MatchSlipCard";
import { LuBarChart4 } from "react-icons/lu";
import { Card, Space, Select, Row, Col, Table } from "antd";
import "./MatchSlips.scss";
import { useNavigate } from "react-router-dom";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const columns = [
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Team",
    dataIndex: "team",
    key: "team",
  },
  {
    title: "Client",
    dataIndex: "client",
    key: "client",
  },
  {
    title: "Agent",
    dataIndex: "agent",
    key: "agent",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Loss",
    dataIndex: "loss",
    key: "loss",
  },
  {
    title: "Profit",
    dataIndex: "profit",
    key: "profit",
  },
];
const data = [];

const dataDes = [
  {
    id: 1,
    icon: <LuBarChart4 />,
    title: "0",
    desc: "Essex",
    size: "20px",
  },
  {
    id: 2,
    icon: <LuBarChart4 />,
    title: "0",
    desc: "Somerset",
    size: "20px",
  },
];

const MatchSlips = () => {
  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  return (
    <>
      <div className="match_slip">
        <div>
          <MatchSlipCard dataDes={dataDes} />
        </div>
        <div>
          <Card
            style={{
              margin: "0px",
              width: "100%",
            }}
            className="sport_detail"
            title="Match Bets"
            extra={<button onClick={handleBackClick}>Back</button>}>
            <Row style={{ margin: "10px 18px" }}>
              <Col xl={5} lg={5} md={24} xs={24}>
                <Select
                  defaultValue="Select Super"
                  className="match_slip_selected"
                  onChange={handleChange}
                  options={[
                    {
                      value: "All Supers",
                      label: "Jack",
                    },
                  ]}
                />
              </Col>
              <Col xl={5} lg={5} md={24} xs={24}>
                <Select
                  defaultValue="Select Agent"
                  className="match_slip_selected"
                  onChange={handleChange}
                  options={[
                    {
                      value: "All Agents",
                      label: "All Agents",
                    },
                  ]}
                />
              </Col>
              <Col xl={5} lg={5} md={24} xs={24}>
                <Select
                  defaultValue="Select Client"
                  className="match_slip_selected"
                  onChange={handleChange}
                  options={[
                    {
                      value: "All Users",
                      label: "All Users",
                    },
                  ]}
                />
              </Col>
            </Row>

            <div className="table_section" style={{ marginBottom: "100px" }}>
              <Table columns={columns} dataSource={data} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MatchSlips;
