import { Button, Card, Col, DatePicker, Row, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import { useCasinoDayWisePlQuery } from "../../../store/service/CasinoServices";

const { RangePicker } = DatePicker;

const CasinoPandLDetail = () => {
  const { data } = useCasinoDayWisePlQuery({
    index: 0,
    noOfRecords: 50,
    fromDate: "2025-06-30",
    toDate: "2025-07-30",
  });

  console.log(data, "datadatadatadatadata");
  return (
    <>
      <div className="match_slip match_ledger">
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail  team_name"
          title="Casino PandL Detail"
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
                <th>Event Name</th>
                <th>Date & Time</th>
                <th>P/L</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>Total</td>
                <td></td>
                <td style={{ color: "green" }}>2.00</td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <Link className="gx-text-blue">AmarAkbarAnthony</Link>
                </td>
                <td>25-06-2025 02:36:56 PM</td>
                <td style={{ color: "green" }}> 2.00</td>
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
                      <Link to="/plusminuscasinodeatils/2025-07-29">
                        plusminus2
                      </Link>
                    </Button>
                    <Button
                      style={{
                        height: "36px",
                        padding: "0px 15px",
                        borderRadius: "5px",
                        marginRight: "15px",
                      }}
                      type="primary">
                      <Link to="/Casino/AndarBahar/plus-minus-type">
                        plusminus
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
                      <Link to={`/display-games/51/TeenPatti/23-07-2025`}>
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

export default CasinoPandLDetail;
