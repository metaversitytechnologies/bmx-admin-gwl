import { ArrowLeft, FileBarChart2 } from "lucide-react";
import PropTypes from "prop-types";

const CompanyReportHeader = ({ matchName, onBack }) => (
  <div className="admin-details-header company-report-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <FileBarChart2 size={20} strokeWidth={1.8} />
      </span>
      <div>
        <div className="team_name admin-details-title">Company Report</div>
        {matchName && (
          <p className="admin-details-subtitle" title={matchName}>
            {matchName}
          </p>
        )}
      </div>
    </div>
    <div className="show_btn">
      <button type="button" className="admin-details-back" onClick={onBack}>
        <ArrowLeft size={15} strokeWidth={1.8} />
        <span className="company-report-back-label">Back</span>
      </button>
    </div>
  </div>
);

CompanyReportHeader.propTypes = {
  matchName: PropTypes.string,
  onBack: PropTypes.func.isRequired,
};

export default CompanyReportHeader;
