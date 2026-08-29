import { AlertTriangle, RotateCw } from "lucide-react";
import PropTypes from "prop-types";

const AllBetsError = ({ onRetry }) => (
  <div className="ab-error">
    <span className="ab-error-icon">
      <AlertTriangle size={16} strokeWidth={1.8} />
    </span>
    <span className="ab-error-text">Unable to load bets for this round.</span>
    <button type="button" className="ab-error-retry" onClick={onRetry} aria-label="Retry loading">
      <RotateCw size={13} strokeWidth={2} />
      Retry
    </button>
  </div>
);

AllBetsError.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

export default AllBetsError;
