import { useCallback, useEffect, useState } from "react";
import { Swords, Activity, ClipboardList } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMatchAndSessionBetMutation } from "../../../../store/service/SportDetailServices";
import { useLazyFilterbyClientQuery } from "../../../../store/service/supermasteAccountStatementServices";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";
import MatchSessionBetUserFilter from "./MatchSessionBetUserFilter";
import BetSectionCard from "./BetSectionCard";
import MatchBetsTable from "./MatchBetsTable";
import SessionBetsTable from "./SessionBetsTable";
import MatchSessionBetSummary from "./MatchSessionBetSummary";

const MatchSessionBet = () => {
  const [clientId, setClientId] = useState("");
  const { id, inplay } = useParams();
  const nav = useNavigate();
  const [trigger, { data: matchBets, isLoading, isError }] =
    useGetMatchAndSessionBetMutation();
  const [userTrigger, { data: userData }] = useLazyFilterbyClientQuery();

  const fetchBets = useCallback(() => {
    trigger({
      matchId: id ?? "",
      userId: clientId,
      matchCompleted: inplay === "0" ? true : false,
    });
  }, [clientId, id, inplay]);

  useEffect(() => {
    fetchBets();
  }, [fetchBets]);

  const matchRows = matchBets?.data?.matchBets?.betList || [];
  const sessionRows = matchBets?.data?.sessionBets || [];

  // Same two sums the original screen computed, kept under their original
  // names: `totalPnl` is the Session Bets PNL sum, `totalPnlM` is the Match
  // Bets PNL sum.
  const totalPnl = sessionRows.reduce(
    (acc, item) => acc + (item.netPnl || 0),
    0
  );
  const totalPnlM = matchRows.reduce((acc, item) => acc + (item.pnl || 0), 0);

  // New (presentation-only) sums — both fields already exist per-row, we're
  // just totaling them for the new Amount column in the totals footer / the
  // Summary Information strip.
  const totalAmountMatch = matchRows.reduce(
    (acc, item) => acc + (Number(item.stake) || 0),
    0
  );
  const totalAmountSession = sessionRows.reduce(
    (acc, item) => acc + (Number(item.amount) || 0),
    0
  );

  const userOptions =
    userData?.data?.map((user) => ({
      label: `${user.userName} (${user.userId})`,
      value: user.userId,
    })) || [];

  return (
    <div className="main_live_section list_supers admin-details-panel match-session-bet-panel">
      <AppPageHeader
        icon={<ClipboardList size={20} strokeWidth={1.8} />}
        title="Match & Session Bet Details"
        subtitle={<>MatchCode : {id}</>}
        onBack={() => nav(-1)}
      />

      <div className="msb-content">
        <MatchSessionBetUserFilter
          clientId={clientId}
          onSelectClient={setClientId}
          onSearchClient={(value) => {
            if (value) userTrigger({ userId: value, userType: 1 });
          }}
          userOptions={userOptions}
        />

        <div className="msb-cards">
          <div className="msb-card-col msb-card-col-match">
            <BetSectionCard
              icon={<Swords size={15} strokeWidth={1.8} />}
              title="Match Bets"
              count={matchRows.length}>
              <MatchBetsTable
                rows={matchRows}
                isLoading={isLoading}
                isError={isError}
                onRetry={fetchBets}
                totalAmount={totalAmountMatch}
                totalPnl={totalPnlM}
                totalPnlColorSign={totalPnl}
              />
            </BetSectionCard>
          </div>
          <div className="msb-card-col msb-card-col-session">
            <BetSectionCard
              icon={<Activity size={15} strokeWidth={1.8} />}
              title="Session Bets"
              count={sessionRows.length}>
              <SessionBetsTable
                rows={sessionRows}
                isLoading={isLoading}
                isError={isError}
                onRetry={fetchBets}
                totalPnl={totalPnl}
              />
            </BetSectionCard>
          </div>
        </div>

        <MatchSessionBetSummary
          totalMatchAmount={totalAmountMatch}
          totalMatchPnl={totalPnlM}
          totalSessionAmount={totalAmountSession}
          totalSessionPnl={totalPnl}
        />
      </div>
    </div>
  );
};

export default MatchSessionBet;
