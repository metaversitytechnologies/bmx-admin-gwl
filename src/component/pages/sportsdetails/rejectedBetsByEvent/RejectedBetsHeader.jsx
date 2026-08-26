import { ArrowLeft, ShieldX } from "lucide-react";
import PropTypes from "prop-types";

const RejectedBetsHeader = ({ onBack }) => (
  <div className="admin-details-header rb-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <ShieldX size={20} strokeWidth={1.8} />
      </span>
      <div>
        <div className="team_name admin-details-title">
          Rejected &amp; Cancelled Bets
        </div>
        <p className="admin-details-subtitle">
          Review rejected, cancelled and deleted betting activity
        </p>
      </div>
    </div>
    <div className="show_btn">
      <button type="button" className="admin-details-back" onClick={onBack}>
        <ArrowLeft size={15} strokeWidth={1.8} />
        <span className="rb-back-label">Back</span>
      </button>
    </div>
  </div>
);

RejectedBetsHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default RejectedBetsHeader;
