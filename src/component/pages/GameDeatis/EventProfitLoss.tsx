import { Card, Empty } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { useGetSessionBetMutation } from "../../../store/service/SportDetailServices";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const EventProfitLossList = () => {
  const [marketId, setMarketId] = useState("");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { id, fancyId } = useParams();

  // Static data to replace API call
  const [triggerSessionBets, { data: sessionData }] =
    useGetSessionBetMutation();

  useEffect(() => {
    if (fancyId) {
      triggerSessionBets({
        matchId: id,
        userId: "",
        marketId: fancyId,
        matchCompleted: true,
      });
    }
  }, [fancyId, id]);

  return (
    <>
      <div className="main_live_section list_supers admin-details-panel game-event-profit-loss-panel">
        <AppPageHeader
          icon={<TrendingUp size={20} strokeWidth={1.8} />}
          title="Event Profit and Loss"
          subtitle="Review session bet profit and loss for this event"
          onBack={() => nav(-1)}
        />
        <Card
          style={{
            margin: "12px",
            width: "100%",
          }}
          className="sport_detail ledger_data led_super">
          <div className="table_section ant-spin-nested-loading">
            <table>
              <thead>
                <tr>
                  <th>username</th>
                  <th>Date</th>
                  <th>Selection</th>
                  <th>Result</th>
                  <th>Back/Lay</th>
                  <th>Value</th>
                  <th>Volume</th>
                  <th>Stake</th>
                  <th>pnl</th>
                </tr>
              </thead>
              <tbody>
                {sessionData?.data?.length > 0 ? (
                  sessionData?.data?.map((res, id) => (
                    <tr
                      key={id}
                      className={
                        res?.netPnl > 0 ? "gx-bg-green-0" : "gx-bg-red"
                      }>
                      <td>
                        {res?.username} ({res?.userId})
                      </td>
                      <td>{res?.time}</td>
                      <td>{res?.selectionName}</td>
                      <td>{res?.declared}</td>
                      <td>{res?.mode}</td>
                      <td>{res?.rate}</td>
                      <td>{res?.run}</td>

                      <td>{res?.amount}</td>
                      <td>{res?.netPnl}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default EventProfitLossList;
