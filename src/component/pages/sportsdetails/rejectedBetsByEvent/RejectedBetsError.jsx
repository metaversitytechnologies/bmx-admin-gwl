import { AlertTriangle, RotateCw } from "lucide-react";
import PropTypes from "prop-types";

const RejectedBetsError = ({ onRetry }) => (
  <div className="rb-error">
    <span className="rb-error-icon">
      <AlertTriangle size={16} strokeWidth={1.8} />
    </span>
    <span className="rb-error-text">Unable to load bet records.</span>
    <button
      type="button"
      className="rb-error-retry"
      onClick={onRetry}
      aria-label="Retry loading">
      <RotateCw size={13} strokeWidth={2} />
      Retry
    </button>
  </div>
);

RejectedBetsError.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

export default RejectedBetsError;
