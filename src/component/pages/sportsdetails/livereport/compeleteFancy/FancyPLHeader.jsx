import { ArrowLeft, LineChart } from "lucide-react";
import PropTypes from "prop-types";

const FancyPLHeader = ({ showBack, onBack }) => (
  <div className="admin-details-header fpl-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <LineChart size={20} strokeWidth={1.8} />
      </span>
      <div>
        <div className="team_name admin-details-title">
          Fancy Profit and Loss
        </div>
        <p className="admin-details-subtitle">
          Track fancy market performance and settlements
        </p>
      </div>
    </div>
    {showBack && (
      <div className="show_btn">
        <button type="button" className="admin-details-back" onClick={onBack}>
          <ArrowLeft size={15} strokeWidth={1.8} />
          <span className="fpl-back-label">Back</span>
        </button>
      </div>
    )}
  </div>
);

FancyPLHeader.propTypes = {
  showBack: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
};

export default FancyPLHeader;
