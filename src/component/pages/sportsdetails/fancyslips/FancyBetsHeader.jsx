import { ArrowLeft, Target } from "lucide-react";
import PropTypes from "prop-types";

const FancyBetsHeader = ({ onBack }) => (
  <div className="admin-details-header fancy-bets-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <Target size={20} strokeWidth={1.8} />
      </span>
      <div>
        <div className="team_name admin-details-title">Fancy Bets</div>
        <p className="admin-details-subtitle">
          View fancy and session bets placed on this match
        </p>
      </div>
    </div>
    <div className="show_btn">
      <button type="button" className="admin-details-back" onClick={onBack}>
        <ArrowLeft size={15} strokeWidth={1.8} />
        <span className="fancy-bets-back-label">Back</span>
      </button>
    </div>
  </div>
);

FancyBetsHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default FancyBetsHeader;
