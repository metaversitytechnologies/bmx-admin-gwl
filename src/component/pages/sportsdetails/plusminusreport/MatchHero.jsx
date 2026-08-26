import { ArrowLeft, Eye, Trophy } from "lucide-react";
import PropTypes from "prop-types";

const MatchHero = ({ matchName, onShow, onBack }) => (
  <div className="admin-details-header pmr-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <Trophy size={20} strokeWidth={1.8} />
      </span>
      <div>
        <div
          className="team_name admin-details-title pmr-header-title"
          title={matchName}>
          {matchName}
        </div>
        <p className="admin-details-subtitle">
          Manage session and child access for this match
        </p>
      </div>
    </div>
    <div className="show_btn pmr-header-actions">
      <button type="button" className="admin-details-back" onClick={onShow}>
        <Eye size={15} strokeWidth={1.8} />
        <span className="pmr-header-btn-label">Show</span>
      </button>
      <button type="button" className="admin-details-back" onClick={onBack}>
        <ArrowLeft size={15} strokeWidth={1.8} />
        <span className="pmr-header-btn-label">Back</span>
      </button>
    </div>
  </div>
);

MatchHero.propTypes = {
  matchName: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default MatchHero;
