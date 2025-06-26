import { Card, Col, Empty, Row, Select, Spin } from "antd";

const CompletedFancy = () => {
  return (
    <>
      <div>
        <Card
          style={{
            margin: "12px",
            width: "100%",
          }}
          className="sport_detail completed_fancy"
          title="Completed Fancy [0]"
          extra={
            <div>
              <button
                style={{
                  marginLeft: "10px",
                  borderRadius: "unset",
                  fontWeight: 400,
                }}>
                Refresh
              </button>
            </div>
          }>
          <Row
            gutter={[16, 16]}
            justify="center"
            className="fancy_pl"
            align="middle">
            <Col xs={24} md={24} lg={6} xl={6}>
              <p style={{ fontSize: "16px", fontWeight: 60 }}>
                Total P/L: <span>0.00</span>
              </p>
            </Col>
          </Row>
          <div className="table_section ant-spin-nested-loading">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>P&L</th>
                  <th>Won By</th>
                  <th>Net P&L</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan={5}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CompletedFancy;
