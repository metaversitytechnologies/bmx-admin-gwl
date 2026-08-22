import { ArrowLeft, Receipt } from "lucide-react";
import PropTypes from "prop-types";

const AccountStatementHeader = ({ count, onBack }) => (
  <div className="admin-details-header account-statement-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <Receipt size={20} strokeWidth={1.8} />
      </span>
      <div>
        <div className="account-statement-title-row">
          <span className="team_name admin-details-title">
            Transaction History
          </span>
          <span className="account-statement-count-badge">
            {count} {count === 1 ? "Transaction" : "Transactions"}
          </span>
        </div>
        <p className="admin-details-subtitle">
          Review credits, debits and account activity
        </p>
      </div>
    </div>
    <div className="show_btn">
      <button type="button" className="admin-details-back" onClick={onBack}>
        <ArrowLeft size={15} strokeWidth={1.8} />
        <span className="account-statement-back-label">Back</span>
      </button>
    </div>
  </div>
);

AccountStatementHeader.propTypes = {
  count: PropTypes.number,
  onBack: PropTypes.func.isRequired,
};

export default AccountStatementHeader;
