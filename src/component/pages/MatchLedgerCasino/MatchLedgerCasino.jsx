import { Button, Card, Col, DatePicker, Row, Space, Tag } from "antd";
import { Link } from "react-router-dom";

const { RangePicker } = DatePicker;

const MatchLedgerCasino = () => {
  const tableData = [
    { name: "AmarAkbarAnthony", path: "/casino/56" },
    { name: "Live Teen Patti One Day", path: "/casino/57" },
    { name: "DragonTiger", path: "/casino/52" },
    { name: "DragonTiger T20", path: "/casino/52" },
    { name: "luck7b", path: "/casino/53" },
    { name: "TeenpattiT20", path: "/casino/51" },
    { name: "Warli Matka", path: "#" },
  ];

  const renderTableRows = () =>
    tableData.map((items, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <Link className="gx-text-blue">{items?.name}</Link>
        </td>
        <td>25-06-2025 02:36:56 PM</td>
        <td>
          <div
            className="gx-justify-content-end"
            style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="primary"
              style={{
                height: "36px",
                padding: "0px 15px",
                borderRadius: "5px",
                marginRight: "15px",
              }}>
              <Link to={items?.path}>View</Link>
            </Button>
            <Button type="link" className="Display_Games">
              <Link
                to={`/components/casino/inplaycasinodetails/AmarAkbarAnthony/3056/`}>
                Display Games
              </Link>
            </Button>
          </div>
        </td>
      </tr>
    ));

  return (
    <div className="match_slip match_ledger">
      <Card
        className="sport_detail team_name"
        title="Match Ledger"
        extra={<button>Back</button>}
        style={{ margin: 0, width: "100%" }}>
        <div className="gx-mt-3">
          <Row className="date_picker gx-px-5" style={{ gap: 16 }}>
            <Col>
              <RangePicker
                style={{ marginBottom: 10, width: 300 }}
                bordered={false}
                showSecond
                renderExtraFooter={() => (
                  <Space style={{ padding: 10 }}>
                    <Tag color="blue">Today</Tag>
                    <Tag color="blue">Yesterday</Tag>
                    <Tag color="blue">This Week</Tag>
                    <Tag color="blue">Last Week</Tag>
                    <Tag color="blue">This Month</Tag>
                    <Tag color="blue">Last Month</Tag>
                  </Space>
                )}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                className="gx-border-redius0"
                style={{ height: 36, lineHeight: "32px" }}>
                Submit
              </Button>
            </Col>
          </Row>
        </div>

        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <table className="live_table login_data_table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>

          {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
        </div>
      </Card>
    </div>
  );
};

export default MatchLedgerCasino;
