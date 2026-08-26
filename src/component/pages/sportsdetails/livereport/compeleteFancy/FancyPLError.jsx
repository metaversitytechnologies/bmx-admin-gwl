import { AlertTriangle, RotateCw } from "lucide-react";
import PropTypes from "prop-types";

const FancyPLError = ({ onRetry }) => (
  <div className="fpl-error">
    <span className="fpl-error-icon">
      <AlertTriangle size={16} strokeWidth={1.8} />
    </span>
    <span className="fpl-error-text">Failed to load data.</span>
    <button
      type="button"
      className="fpl-error-retry"
      onClick={onRetry}
      aria-label="Retry loading">
      <RotateCw size={13} strokeWidth={2} />
      Retry
    </button>
  </div>
);

FancyPLError.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

export default FancyPLError;
