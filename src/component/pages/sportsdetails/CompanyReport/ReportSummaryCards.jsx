import { Coins, PieChart, Percent, TrendingUp, Wallet } from "lucide-react";
import PropTypes from "prop-types";
import { formatAmount, getTotalColorClass } from "./companyReportUtils";

// Five of the already-computed totalValues fields, matching the task's
// requested KPI set — no new calculation, purely a display selection.
const KPI_DEFS = [
  { key: "matchAmount", label: "Total Match Amt", icon: TrendingUp },
  { key: "sessionAmount", label: "Total Session Amt", icon: Coins },
  { key: "totalComm", label: "Total Comm+", icon: Percent },
  { key: "myShare", label: "My Share", icon: PieChart },
  { key: "netAmount", label: "Net Amount", icon: Wallet, span: true },
];

const ReportSummaryCards = ({ totals }) => (
  <div className="cr-kpi-grid">
    {KPI_DEFS.map(({ key, label, icon: Icon, span }) => {
      const value = totals?.[key] || 0;
      return (
        <div
          className={`cr-kpi-card${span ? " cr-kpi-span" : ""}`}
          key={key}>
          <span className="cr-kpi-icon">
            <Icon size={14} strokeWidth={1.8} />
          </span>
          <span className="cr-kpi-label">{label}</span>
          <span className={`cr-kpi-value ${getTotalColorClass(value)}`}>
            {formatAmount(value)}
          </span>
        </div>
      );
    })}
  </div>
);

ReportSummaryCards.propTypes = {
  totals: PropTypes.object,
};

export default ReportSummaryCards;
