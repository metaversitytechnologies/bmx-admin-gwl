import {  Card, Empty, Row } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { CircleCheckBig } from "lucide-react";
import { useGetCompletdMatchesQuery } from "../../../store/service/userlistService";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const CompletedActive = () => {
  const nav = useNavigate();

  // ✅ Local states for PF-side pagination

  const { data: sportDetail } = useGetCompletdMatchesQuery({});

  return (
    <div className="main_live_section list_supers admin-details-panel completed-active-panel">
      <AppPageHeader
        icon={<CircleCheckBig size={20} strokeWidth={1.8} />}
        title="Complete Match Active Bet"
        subtitle="Review active bets for completed matches"
        onBack={() => nav(-1)}
      />
    <Card className="sport_detail">
      <Row className="date_picker" justify="center"></Row>

      <div className="table_section">
        <table className="ant-spin-nested-loading">
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Date</th>
              <th>Event Name</th>
              <th>Team</th>
              <th>Odds</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sportDetail?.data?.length > 0 ? (
              sportDetail?.data?.map((res, id) => (
                <tr key={res.matchId || id}>
                  <td>{id + 1}</td>
                  <td>
                    {" "}
                    {moment(res.date, "ddd MMM DD HH:mm:ss [IST] YYYY").format(
                      "DD-MM-YYYY hh:mm:ss A",
                    )}
                  </td>
                  <td>{res?.matchName}</td>
                  <td>{res?.team}</td>
                  <td>{res?.odds}</td>
                  <td>{res.stake}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
    </div>
  );
};

export default CompletedActive;
