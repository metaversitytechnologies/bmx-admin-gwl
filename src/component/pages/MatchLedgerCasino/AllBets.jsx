import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ListChecks } from "lucide-react";
import { useGetCasinoBetByMarketQuery } from "../../../store/service/CasinoServices";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";
import AllBetsSummary from "./AllBetsSummary";
import AllBetsTable from "./AllBetsTable";
import AllBetsPagination from "./AllBetsPagination";
import AllBetsError from "./AllBetsError";
import { isWinningBet } from "./allBetsUtils";

const AllBets = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetCasinoBetByMarketQuery({ marketId: id });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

  const handleBackClick = () => nav(-1);

  const bets = data?.data || [];
  const total = bets.length;

  const summary = useMemo(() => {
    const rows = data?.data || [];
    const totalStake = rows.reduce((acc, bet) => acc + (bet.stake || 0), 0);
    const totalPnl = rows.reduce((acc, bet) => acc + (bet.pnl || 0), 0);
    const totalWinners = rows.filter(isWinningBet).length;
    const totalClients = new Set(rows.map((bet) => bet.userId)).size;
    return { totalBets: rows.length, totalStake, totalPnl, totalWinners, totalClients };
  }, [data?.data]);

  const rows = bets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="match_slip account_match_slip main_live_section list_supers admin-details-panel casino-all-bets-panel">
      <AppPageHeader
        icon={<ListChecks size={20} strokeWidth={1.8} />}
        title={`All Bets: ${id}`}
        subtitle="Review every bet placed on this casino round"
        onBack={handleBackClick}
      />
      <div className="table_section sport_detail m-0 admin-details-table-shell all-bets-table-shell">
        {isError ? (
          <AllBetsError onRetry={refetch} />
        ) : (
          <>
            {/* <AllBetsSummary {...summary} /> */}
            <div style={{ position: "relative" }}>
              {(isLoading || isFetching) && <CustomLoading />}
              <AllBetsTable rows={rows} />
            </div>
            <AllBetsPagination
              currentPage={currentPage}
              pageSize={pageSize}
              total={total}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AllBets;
