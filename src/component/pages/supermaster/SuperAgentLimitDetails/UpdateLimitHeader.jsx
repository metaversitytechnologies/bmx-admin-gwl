import { ArrowLeft, Scale } from "lucide-react";
import PropTypes from "prop-types";

const UpdateLimitHeader = ({ onBack }) => (
  <div className="admin-details-header update-limit-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <Scale size={20} strokeWidth={1.8} />
      </span>
      <div>
        <div className="team_name admin-details-title">Update Limit</div>
        <p className="admin-details-subtitle">
          Manage chip limits for all admins
        </p>
      </div>
    </div>
    <div className="show_btn">
      <button type="button" className="admin-details-back" onClick={onBack}>
        <ArrowLeft size={15} strokeWidth={1.8} />
        <span className="update-limit-back-label">Back</span>
      </button>
    </div>
  </div>
);

UpdateLimitHeader.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default UpdateLimitHeader;
