import { useLocation, useParams } from "react-router-dom";
import { useGetCompleteLedgerQuery } from "../../../../../store/service/SportDetailServices";
import LedgerDashboard from "./components/LedgerDashboard";

const PlusMinusTable = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { data: ledgerData, isLoading, isFetching, isError, refetch } = useGetCompleteLedgerQuery({
    matchId: id,
    matchCompleted: state?.matchCompleted ?? true,
    fancyIdList: state?.first,
    userIdList: state?.thirdUserid,
    oddsAndSessionBoth: true,
  });

  if (isLoading) return <div className="pnl-message" role="status">Loading match profit and loss…</div>;
  if (isError) return <div className="pnl-message" role="alert">
    <p>Unable to load this match’s ledger.</p>
    <button type="button" onClick={refetch}>Try again</button>
  </div>;
  if (!ledgerData?.data) return <div className="pnl-message" role="status">No ledger data is available for this match.</div>;

  return <div aria-busy={isFetching}>
    <LedgerDashboard data={ledgerData.data} userType={localStorage.getItem("userType")} />
  </div>;
};

export default PlusMinusTable;
