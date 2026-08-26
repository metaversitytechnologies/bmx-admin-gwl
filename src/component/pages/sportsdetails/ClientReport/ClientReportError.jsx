import { AlertTriangle, RotateCw } from "lucide-react";
import PropTypes from "prop-types";

const ClientReportError = ({ onRetry }) => (
  <div className="cr2-error">
    <span className="cr2-error-icon">
      <AlertTriangle size={16} strokeWidth={1.8} />
    </span>
    <span className="cr2-error-text">Failed to load data.</span>
    <button
      type="button"
      className="cr2-error-retry"
      onClick={onRetry}
      aria-label="Retry loading">
      <RotateCw size={13} strokeWidth={2} />
      Retry
    </button>
  </div>
);

ClientReportError.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

export default ClientReportError;
