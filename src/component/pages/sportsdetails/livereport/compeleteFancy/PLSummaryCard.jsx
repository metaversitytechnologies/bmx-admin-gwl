import { TrendingUp, TrendingDown } from "lucide-react";
import PropTypes from "prop-types";
import { formatSignedAmount, getPnlColorClass } from "./fancyPLUtils";

const PLSummaryCard = ({ totalPnl }) => {
  const isPositive = totalPnl >= 0;
  return (
    <div className={`fpl-summary-card ${getPnlColorClass(totalPnl)}`}>
      <span className="fpl-summary-label">Total P/L</span>
      <span className={`fpl-summary-value ${getPnlColorClass(totalPnl)}`}>
        {formatSignedAmount(totalPnl)}
      </span>
      <span className="fpl-summary-trend">
        {isPositive ? (
          <TrendingUp size={12} strokeWidth={2.2} />
        ) : (
          <TrendingDown size={12} strokeWidth={2.2} />
        )}
        {isPositive ? "Positive" : "Negative"}
      </span>
    </div>
  );
};

PLSummaryCard.propTypes = {
  totalPnl: PropTypes.number,
};

export default PLSummaryCard;
