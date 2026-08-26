import { ArrowLeft, Trophy } from "lucide-react";
import PropTypes from "prop-types";

// Mirrors SportsDetailsHeader exactly (same shared admin-details-* classes)
// so this page reads as the same product as Sports Detail.
const FinishedGameHeader = ({ onBack }) => (
  <div className="sub_live_section live_report admin-details-header finished-game-header">
    <div className="admin-details-title-wrap finished-game-title-wrap">
      <span className="admin-details-icon finished-game-icon">
        <Trophy size={22} strokeWidth={1.8} />
      </span>
      <div>
        <div className="team_name admin-details-title finished-game-title">
          Completed Games Detail
        </div>
        <p className="admin-details-subtitle finished-game-subtitle">
          Review completed fixtures, results and profit/loss
        </p>
      </div>
    </div>
    <div className="show_btn">
      <button
        type="button"
        onClick={onBack}
        className="admin-details-back finished-game-back">
        <ArrowLeft size={15} strokeWidth={1.8} />
        <span className="finished-game-back-label">Back</span>
      </button>
    </div>
  </div>
);

FinishedGameHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default FinishedGameHeader;
