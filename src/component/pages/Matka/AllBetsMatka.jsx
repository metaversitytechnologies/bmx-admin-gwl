import { Card, Empty } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const AllBetsMatka = () => {
  const nav = useNavigate();
  const { eventId } = useParams();

  return (
    <div className="match_slip">
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail team_name"
        title={`ALL BETS - ${eventId || ""}`}
        extra={<button onClick={() => nav(-1)}>Back</button>}>
        <div style={{ padding: "20px" }}>
          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <table className="live_table login_data_table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>USERNAME</th>
                  <th>RUNNER NAME</th>
                  <th>BET PRICE</th>
                  <th>BET AMOUNT</th>
                  <th>STATUS</th>
                  <th>PLACE TIME</th>
                  <th>PROFIT</th>
                  <th>LOSS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={9}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AllBetsMatka;
