import { Card, Select, Row, Col, Table, Form, Button, Spin, Empty } from "antd";

const ClientReport = () => {
  return (
    <div className="match_slip client_report">
      <Card
        style={{ margin: "0px", width: "100%" }}
        className="sport_detail session_bet"
        title={
          <div>
            <h1>Client Report</h1>
            <p>MI New York v San Francisco Unicorns</p>
          </div>
        }
        extra={<button>Back</button>}>
        <div className="table_section statement_tabs_data active_match_table">
          <table className="">
            <thead>
              <tr>
                <th>superagent</th>
                <th></th>
                <th>Net Account</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ClientReport;
