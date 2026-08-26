import { Info, Wallet, TrendingUp, Layers } from "lucide-react";
import PropTypes from "prop-types";
import { formatAmount, getAmountColorClass } from "./matchSessionBetUtils";

// All four figures are plain sums over the already-fetched rows — nothing
// here is derived from a value the API doesn't already provide.
const MatchSessionBetSummary = ({
  totalMatchAmount,
  totalMatchPnl,
  totalSessionAmount,
  totalSessionPnl,
}) => (
  <div className="msb-summary">
    <div className="msb-summary-heading">
      <Info size={14} strokeWidth={2} />
      Summary Information
    </div>
    <div className="msb-summary-grid">
      <div className="msb-summary-item">
        <span className="msb-summary-icon msb-summary-icon-purple">
          <Wallet size={15} strokeWidth={1.8} />
        </span>
        <div>
          <p className="msb-summary-label">Total Match Amount</p>
          <p className="msb-summary-value">{formatAmount(totalMatchAmount)}</p>
        </div>
      </div>
      <div className="msb-summary-item">
        <span className="msb-summary-icon msb-summary-icon-green">
          <TrendingUp size={15} strokeWidth={1.8} />
        </span>
        <div>
          <p className="msb-summary-label">Total Match PNL</p>
          <p
            className={`msb-summary-value ${getAmountColorClass(
              totalMatchPnl
            )}`}>
            {formatAmount(totalMatchPnl)}
          </p>
        </div>
      </div>
      <div className="msb-summary-item">
        <span className="msb-summary-icon msb-summary-icon-blue">
          <Layers size={15} strokeWidth={1.8} />
        </span>
        <div>
          <p className="msb-summary-label">Total Session Amount</p>
          <p className="msb-summary-value">
            {formatAmount(totalSessionAmount)}
          </p>
        </div>
      </div>
      <div className="msb-summary-item">
        <span className="msb-summary-icon msb-summary-icon-neutral">
          <TrendingUp size={15} strokeWidth={1.8} />
        </span>
        <div>
          <p className="msb-summary-label">Total Session PNL</p>
          <p
            className={`msb-summary-value ${getAmountColorClass(
              totalSessionPnl
            )}`}>
            {formatAmount(totalSessionPnl)}
          </p>
        </div>
      </div>
    </div>
  </div>
);

MatchSessionBetSummary.propTypes = {
  totalMatchAmount: PropTypes.number,
  totalMatchPnl: PropTypes.number,
  totalSessionAmount: PropTypes.number,
  totalSessionPnl: PropTypes.number,
};

export default MatchSessionBetSummary;
