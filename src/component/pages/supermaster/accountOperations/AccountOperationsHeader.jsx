import { ArrowLeft, History } from "lucide-react";
import PropTypes from "prop-types";

const AccountOperationsHeader = ({ count, onBack }) => (
  <div className="admin-details-header account-operations-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <History size={20} strokeWidth={1.8} />
      </span>
      <div className="account-operations-title-block">
        <span className="team_name admin-details-title">
          Activity History
        </span>
        <p className="admin-details-subtitle">
          Review account changes and administrative activity ·{" "}
          {count} {count === 1 ? "activity" : "activities"}
        </p>
      </div>
    </div>
    <div className="show_btn">
      <button
        type="button"
        className="admin-details-back"
        onClick={onBack}
        aria-label="Back">
        <ArrowLeft size={16} strokeWidth={2} />
        <span className="account-operations-back-label">Back</span>
      </button>
    </div>
  </div>
);

AccountOperationsHeader.propTypes = {
  count: PropTypes.number,
  onBack: PropTypes.func.isRequired,
};

export default AccountOperationsHeader;
