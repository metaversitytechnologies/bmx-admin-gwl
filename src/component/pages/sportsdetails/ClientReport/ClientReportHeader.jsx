import { ArrowLeft, Users } from "lucide-react";
import PropTypes from "prop-types";

const ClientReportHeader = ({ subtitle, onBack }) => (
  <div className="admin-details-header cr2-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <Users size={20} strokeWidth={1.8} />
      </span>
      <div>
        <div className="team_name admin-details-title">Client Report</div>
        {subtitle && <p className="admin-details-subtitle">{subtitle}</p>}
      </div>
    </div>
    <div className="show_btn">
      <button type="button" className="admin-details-back" onClick={onBack}>
        <ArrowLeft size={15} strokeWidth={1.8} />
        <span className="cr2-back-label">Back</span>
      </button>
    </div>
  </div>
);

ClientReportHeader.propTypes = {
  subtitle: PropTypes.string,
  onBack: PropTypes.func.isRequired,
};

export default ClientReportHeader;
