import { ArrowLeft, Receipt } from "lucide-react";
import PropTypes from "prop-types";

const AccountStatementHeader = ({ count, onBack }) => (
  <div className="admin-details-header account-statement-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <Receipt size={20} strokeWidth={1.8} />
      </span>
      <div className="account-statement-title-block">
        <span className="team_name admin-details-title">
          Transaction History
        </span>
        <p className="admin-details-subtitle">
          Account activity · {count} {count === 1 ? "transaction" : "transactions"}
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
