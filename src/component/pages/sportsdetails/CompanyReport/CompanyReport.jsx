import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileBarChart2 } from "lucide-react";
import { useGetCompletLedgerQuery } from "../../../../store/service/SportDetailServices";
import { convertCode } from "../../../../store/constant";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";
import ReportSummaryCards from "./ReportSummaryCards";
import ReportToolbar from "./ReportToolbar";
import CompanyReportTable from "./CompanyReportTable";
import MobileReportTable from "./MobileReportTable";
import { REPORT_COLUMNS, buildReportCsv, downloadCsv, sumReport } from "./companyReportUtils";

const CompanyReport = () => {
  const nav = useNavigate();
  const { id, name } = useParams();
  const [userId, setUserId] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    REPORT_COLUMNS.map((c) => c.key)
  );

  const { data } = useGetCompletLedgerQuery(
    {
      matchId: id,
      userId: userId,
    },
    { refetchOnMountOrArgChange: true }
  );

  const rows = useMemo(() => data?.data || [], [data]);

  // Presentation-only client-side filter — does not touch the API or the
  // userId drill-down query above.
  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) => {
      const code = convertCode(row?.userId)?.toString().toLowerCase() || "";
      const userName = row?.userName?.toString().toLowerCase() || "";
      return code.includes(term) || userName.includes(term);
    });
  }, [rows, searchTerm]);

  // Same reduce formula as before, always over the full fetched set so the
  // Total row / KPI values keep matching "existing calculations" regardless
  // of the (new, presentation-only) search filter above.
  const totalValues = useMemo(() => sumReport(rows), [rows]);

  const handleToggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleExport = () => {
    const csv = buildReportCsv(filteredRows);
    downloadCsv(csv, `company-report-${id || "match"}.csv`);
  };

  const toolbarColumns = REPORT_COLUMNS.map((c) => ({
    ...c,
    visible: visibleColumns.includes(c.key),
  }));

  return (
    <div className="main_live_section list_supers admin-details-panel company-report-panel">
      <AppPageHeader
        icon={<FileBarChart2 size={20} strokeWidth={1.8} />}
        title="Company Report"
        subtitle={name}
        onBack={() => nav(-1)}
      />

      <div className="cr-content">
        <ReportSummaryCards totals={totalValues} />

        <ReportToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          columns={toolbarColumns}
          onToggleColumn={handleToggleColumn}
          onExport={handleExport}
        />

        <CompanyReportTable
          rows={filteredRows}
          totals={totalValues}
          visibleColumns={visibleColumns}
          onSelectUser={setUserId}
        />

        <MobileReportTable
          rows={filteredRows}
          totals={totalValues}
          onSelectUser={setUserId}
        />
      </div>
    </div>
  );
};

export default CompanyReport;
