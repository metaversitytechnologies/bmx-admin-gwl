import { ArrowLeft, ClipboardList } from "lucide-react";
import PropTypes from "prop-types";

const MatchSessionBetHeader = ({ matchId, onBack }) => (
  <div className="admin-details-header msb-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <ClipboardList size={20} strokeWidth={1.8} />
      </span>
      <div>
        <div className="team_name admin-details-title">
          Match &amp; Session Bet Details
        </div>
        <p className="admin-details-subtitle">MatchCode : {matchId}</p>
      </div>
    </div>
    <div className="show_btn">
      <button type="button" className="admin-details-back" onClick={onBack}>
        <ArrowLeft size={15} strokeWidth={1.8} />
        <span className="msb-back-label">Back</span>
      </button>
    </div>
  </div>
);

MatchSessionBetHeader.propTypes = {
  matchId: PropTypes.string,
  onBack: PropTypes.func.isRequired,
};

export default MatchSessionBetHeader;
