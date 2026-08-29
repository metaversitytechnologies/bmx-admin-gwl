import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import { useGetCasinoBetListByTableQuery } from "../../../store/service/CasinoServices";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";
import DisplayGamesTable from "./DisplayGamesTable";
import DisplayGamesPagination from "./DisplayGamesPagination";

const DisplayGames = () => {
  const nav = useNavigate();
  const { id, name, date } = useParams();
  const { data, isLoading, isFetching } = useGetCasinoBetListByTableQuery({
    tableId: id,
    isActive: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

  const totalPnl = useMemo(
    () =>
      data?.data?.reduce((acc, item) => {
        return acc + (item.pnl || 0);
      }, 0),
    [data?.data]
  );

  const rounds = data?.data || [];
  const total = rounds.length;
  const rows = rounds
    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
    .map((round, localIndex) => ({
      round,
      globalIndex: (currentPage - 1) * pageSize + localIndex,
    }));

  const handleShowBets = (roundId) => nav(`/all-bets/${roundId}`);

  return (
    <div className="match_slip match_ledger main_live_section list_supers admin-details-panel display-games-panel">
      <AppPageHeader
        icon={<LayoutGrid size={20} strokeWidth={1.8} />}
        title={`${name} ${date ? date : ""}`}
        subtitle="Review completed game rounds for this table"
        onBack={() => nav(-1)}
      />
      <div className="table_section sport_detail m-0 admin-details-table-shell display-games-table-shell">
        <div className="dg-total">
          <p>
            Total :{" "}
            <span className={totalPnl > 0 ? "dg-total-positive" : "dg-total-negative"}>
              {totalPnl?.toFixed(2)}
            </span>
          </p>
        </div>
        <div style={{ position: "relative" }}>
          {(isLoading || isFetching) && <CustomLoading />}
          <DisplayGamesTable rows={rows} onShowBets={handleShowBets} />
        </div>
        <DisplayGamesPagination
          currentPage={currentPage}
          pageSize={pageSize}
          total={total}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default DisplayGames;
