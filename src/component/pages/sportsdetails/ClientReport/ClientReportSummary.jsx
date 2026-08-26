import { Users, Wallet } from "lucide-react";
import PropTypes from "prop-types";
import { formatAmount, getAmountColorClass } from "./clientReportUtils";

// Both figures are plain count/sum over the already-fetched rows. The first
// card's label follows the same dynamic hierarchy-level title the table's
// first column already uses (Admin/Master/Super/Agent/Client/...) rather
// than a hardcoded "Total Admin", since this page can show any level.
const ClientReportSummary = ({ levelLabel, totalCount, totalNetAccount }) => (
  <div className="cr2-summary-grid">
    <div className="cr2-summary-card">
      <span className="cr2-summary-icon">
        <Users size={16} strokeWidth={1.8} />
      </span>
      <div>
        <p className="cr2-summary-label">Total {levelLabel}</p>
        <p className="cr2-summary-value">{totalCount}</p>
      </div>
    </div>
    <div className="cr2-summary-card">
      <span className="cr2-summary-icon">
        <Wallet size={16} strokeWidth={1.8} />
      </span>
      <div>
        <p className="cr2-summary-label">Total Net Account</p>
        <p
          className={`cr2-summary-value ${getAmountColorClass(
            totalNetAccount
          )}`}>
          {formatAmount(totalNetAccount)}
        </p>
      </div>
    </div>
  </div>
);

ClientReportSummary.propTypes = {
  levelLabel: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalNetAccount: PropTypes.number.isRequired,
};

export default ClientReportSummary;
