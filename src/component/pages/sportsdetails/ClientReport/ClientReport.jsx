import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAgentPlusMinusQuery } from "../../../../store/service/SportDetailServices";
import ClientReportHeader from "./ClientReportHeader";
import ClientReportSummary from "./ClientReportSummary";
import ClientReportTable from "./ClientReportTable";
import ClientReportPagination from "./ClientReportPagination";
import { getFirstColumnTitle } from "./clientReportUtils";

const ClientReport = () => {
  const { id, name } = useParams();
  const userId = localStorage.getItem("userId");
  const [userName, setUserName] = useState(userId);
  const nav = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetAgentPlusMinusQuery(
    {
      matchId: id,
      userId: userName,
    },
    { refetchOnMountOrArgChange: true }
  );

  const rows = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [rows]);

  const columnTitle = getFirstColumnTitle(rows);
  const totalNetAccount = rows.reduce(
    (acc, item) => acc + (Number(item.pnl) || 0),
    0
  );

  const total = rows.length;
  const pagedRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="main_live_section list_supers admin-details-panel client-report2-panel">
      <ClientReportHeader subtitle={name} onBack={() => nav(-1)} />

      <div className="cr2-content">
        <ClientReportSummary
          levelLabel={columnTitle}
          totalCount={total}
          totalNetAccount={totalNetAccount}
        />

        <ClientReportTable
          rows={pagedRows}
          columnTitle={columnTitle}
          isLoading={isLoading}
          isError={isError}
          onRetry={refetch}
          onDrillDown={(drillUserId) => setUserName(drillUserId)}
        />

        <ClientReportPagination
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

export default ClientReport;
