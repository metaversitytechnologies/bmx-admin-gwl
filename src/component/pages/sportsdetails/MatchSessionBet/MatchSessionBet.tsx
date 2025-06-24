import { Card, Select, Row, Col, Table, Form, Button, Spin, Empty } from "antd";

const MatchSessionBet = () => {
  return (
    <div className="match_slip match_bets_session">
      <Card
        style={{ margin: "0px", width: "100%" }}
        className="sport_detail session_bet"
        title={"Match & Session Bet Details MatchCode : 1.245015151"}
        extra={<button>Back</button>}>
        <Form
          name="basic"
          autoComplete="off"
          layout="vertical"
          className="form_data">
          <Row className="fancy_data_sess mr">
            <Col xs={24} md={24} lg={8} xl={8}>
              <Form.Item
                name="username"
                label=""
                required={false}
                rules={[{ required: true, message: "Please Select User" }]}>
                <Select
                  placeholder="Select User"
                  options={[]}
                  showSearch
                  allowClear
                  // onSelect={(value) => setClientId(value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={24} lg={12} xl={12}>
            <div className="table_section statement_tabs_data active_match_table">
              <table className="">
                <thead>
                  <tr>
                    <th>Sr</th>
                    <th>Rate</th>
                    <th>Mode</th>
                    <th>Team</th>
                    <th>Odds Type</th>
                    <th>Amount</th>
                    <th>PNL</th>
                    <th>Date and Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={8}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
          <Col xs={24} md={24} lg={12} xl={12}>
            <div className="table_section statement_tabs_data active_match_table">
              <table className="">
                <thead>
                  <tr>
                    <th>Sr</th>
                    <th>Session</th>
                    <th>Rate</th>
                    <th>Run</th>
                    <th>Decision Run</th>
                    <th>Mode</th>
                    <th>Amount</th>
                    <th>PNL</th>
                    <th>Date and Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={10}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MatchSessionBet;
