import { ArrowLeft, Globe2 } from "lucide-react";
import PropTypes from "prop-types";

const CreateDomainHeader = ({ count, onBack }) => (
  <div className="admin-details-header create-domain-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <Globe2 size={24} strokeWidth={1.8} />
      </span>
      <div className="create-domain-title-block">
        <span className="team_name admin-details-title">Create Domain</span>
        <p className="admin-details-subtitle">
          Add new domain and manage existing domains
        </p>
        {typeof count === "number" && (
          <span className="create-domain-count-badge">
            {count} {count === 1 ? "Domain" : "Domains"}
          </span>
        )}
      </div>
    </div>
    <div className="show_btn">
      <button
        type="button"
        className="admin-details-back"
        onClick={onBack}
        aria-label="Back">
        <ArrowLeft size={16} strokeWidth={2} />
        <span className="create-domain-back-label">Back</span>
      </button>
    </div>
  </div>
);

CreateDomainHeader.propTypes = {
  count: PropTypes.number,
  onBack: PropTypes.func.isRequired,
};

export default CreateDomainHeader;
