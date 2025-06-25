import { Button, Card, Col, DatePicker, Row, Space, Tag } from "antd";
import { Link } from "react-router-dom";

const { RangePicker } = DatePicker;

const MatchLedgerCasino = () => {
  return (
    <>
      <div className="match_slip match_ledger">
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail  team_name"
          title="Match Ledger"
          extra={<button>Back</button>}>
          <div className="gx-mt-3">
            <Row
              className="date_picker gx-px-5"
              style={{
                gap: "16px",
              }}>
              <Col>
                <RangePicker
                  style={{ marginBottom: "10px", width: "300px" }}
                  // defaultValue={[dayjs(timeBefore), dayjs(time)]}
                  // onChange={onChange}
                  bordered={false}
                  showSecond
                  renderExtraFooter={() => (
                    <Space
                      style={{
                        padding: "10px",
                      }}>
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
                  style={{ height: "36px", lineHeight: "32px" }}>
                  Submit
                </Button>
              </Col>
            </Row>
          </div>

          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <table className="live_table login_data_table">
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <Link className="gx-text-blue">AmarAkbarAnthony</Link>
                </td>
                <td>25-06-2025 02:36:56 PM</td>
                <td>
                  <div className="gx-bg-flex gx-justify-content-end">
                    <Button
                      style={{
                        height: "36px",
                        padding: "0px 15px",
                        borderRadius: "5px",
                        marginRight: "15px",
                      }}
                      type="primary">
                      <Link to="/components/casino/casinoinplayview/3056/AmarAkbarAnthony">
                        View
                      </Link>
                    </Button>
                    <Button
                      type="link"
                      style={{
                        height: "36px",
                        padding: "0px 15px",
                        borderRadius: "5px",
                        border: "1px solid #d9d9d9",
                        background: "#fff",
                        color: "#545454",
                      }}>
                      <Link to="/components/casino/inplaycasinodetails/AmarAkbarAnthony/3056/">
                        Display Games
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            </table>

            {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
          </div>
        </Card>
      </div>
    </>
  );
};

export default MatchLedgerCasino;
