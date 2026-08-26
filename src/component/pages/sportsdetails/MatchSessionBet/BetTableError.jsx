import { AlertTriangle, RotateCw } from "lucide-react";
import PropTypes from "prop-types";

const BetTableError = ({ colSpan, onRetry }) => (
  <tr>
    <td colSpan={colSpan}>
      <div className="msb-error">
        <span className="msb-error-icon">
          <AlertTriangle size={16} strokeWidth={1.8} />
        </span>
        <span className="msb-error-text">Failed to load data.</span>
        <button
          type="button"
          className="msb-error-retry"
          onClick={onRetry}
          aria-label="Retry loading">
          <RotateCw size={13} strokeWidth={2} />
          Retry
        </button>
      </div>
    </td>
  </tr>
);

BetTableError.propTypes = {
  colSpan: PropTypes.number.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default BetTableError;
