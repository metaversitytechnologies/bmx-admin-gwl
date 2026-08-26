import { AlertTriangle, RotateCw } from "lucide-react";
import PropTypes from "prop-types";

const FinishedGameError = ({ onRetry }) => (
  <div className="fg-error">
    <span className="fg-error-icon">
      <AlertTriangle size={16} strokeWidth={1.8} />
    </span>
    <span className="fg-error-text">Unable to load completed games.</span>
    <button
      type="button"
      className="fg-error-retry"
      onClick={onRetry}
      aria-label="Retry loading">
      <RotateCw size={13} strokeWidth={2} />
      Retry
    </button>
  </div>
);

FinishedGameError.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

export default FinishedGameError;
