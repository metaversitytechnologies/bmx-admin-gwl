import { ArrowLeft, Trophy } from "lucide-react";
import PropTypes from "prop-types";

const SportsDetailsHeader = ({ onBack }) => (
  <div className="sub_live_section live_report admin-details-header sports-details-header">
    <div className="admin-details-title-wrap sports-details-title-wrap">
      <span className="admin-details-icon sports-details-icon">
        <Trophy size={22} strokeWidth={1.8} />
      </span>
      <div>
        <div className="team_name admin-details-title sports-details-title">
          Sports Detail
        </div>
        <p className="admin-details-subtitle sports-details-subtitle">
          View and manage sports fixtures and their current settings
        </p>
      </div>
    </div>
    <div className="show_btn">
      <button
        type="button"
        onClick={onBack}
        className="admin-details-back sports-details-back">
        <ArrowLeft size={15} strokeWidth={1.8} />
        <span className="sports-details-back-label">Back</span>
      </button>
    </div>
  </div>
);

SportsDetailsHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default SportsDetailsHeader;
