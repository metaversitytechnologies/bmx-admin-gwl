import { Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ListChecks } from "lucide-react";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";
import MatkaBetsTable from "./components/MatkaBetsTable";
import {
  useGetMatkaBetsQuery,
  useGetMatkaMarketQuery,
} from "../../../store/service/MatkaServices";

const AllBetsMatka = () => {
  const nav = useNavigate();
  const { eventId } = useParams();
  const matchIdRaw = eventId;
  const matchIdNumber = Number(matchIdRaw);
  const matchId = Number.isNaN(matchIdNumber) ? matchIdRaw : matchIdNumber;

  const {
    data: betsData,
    isLoading: isBetsLoading,
    isFetching: isBetsFetching,
    error: betsError,
  } = useGetMatkaBetsQuery(
    { matchId },
    { skip: !matchId, refetchOnMountOrArgChange: true }
  );
  const {
    data: marketData,
    isLoading: isMarketLoading,
    isFetching: isMarketFetching,
    error: marketError,
  } = useGetMatkaMarketQuery(
    { matkaId: matchId },
    { skip: !matchId, refetchOnMountOrArgChange: true }
  );

  const bets = Array.isArray(betsData?.data) ? betsData.data : [];
  const matchName = marketData?.data?.matkaName || "";
  const isBusy =
    isBetsLoading || isBetsFetching || isMarketLoading || isMarketFetching;
  const errorMessage =
    (betsData?.status === false && betsData?.message) ||
    (marketData?.status === false && marketData?.message) ||
    betsError?.data?.message ||
    marketError?.data?.message;

  return (
    <div className="match_slip main_live_section list_supers admin-details-panel all-bets-matka-panel">
      <AppPageHeader
        icon={<ListChecks size={20} strokeWidth={1.8} />}
        title="All Bets"
        subtitle="Review every bet placed on this Matka game"
        onBack={() => nav(-1)}
      />
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail team_name">
        <div style={{ padding: "20px" }}>
          {errorMessage && (
            <div
              style={{
                marginBottom: "12px",
                padding: "10px 12px",
                background: "#fff1f0",
                color: "#cf1322",
                border: "1px solid #ffa39e",
                borderRadius: "6px",
              }}>
              {errorMessage}
            </div>
          )}

          {isBusy ? (
            <div style={{ padding: "30px 0", position: "relative" }}>
              <CustomLoading />
            </div>
          ) : (
            <MatkaBetsTable bets={bets} matchName={matchName} showId={false} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default AllBetsMatka;
