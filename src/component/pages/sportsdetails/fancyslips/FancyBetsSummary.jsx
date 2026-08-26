import { useMemo } from "react";
import { Hash, Wallet, TrendingDown, TrendingUp } from "lucide-react";
import PropTypes from "prop-types";
import { formatAmount, getAmountColorClass } from "./fancyBetsUtils";

// All four figures are plain sums/counts over the already-fetched rows —
// nothing here is derived from an unconfirmed field (e.g. no win-rate,
// since the "declared" field's value set isn't confirmed — see
// getResultState in fancyBetsUtils.js).
const FancyBetsSummary = ({ rows }) => {
  const totals = useMemo(
    () =>
      rows.reduce(
        (acc, row) => {
          acc.count += 1;
          acc.amount += Number(row?.amount) || 0;
          acc.loss += Number(row?.liability) || 0;
          acc.profit += Number(row?.pnl) || 0;
          return acc;
        },
        { count: 0, amount: 0, loss: 0, profit: 0 }
      ),
    [rows]
  );

  return (
    <div className="fb-summary-grid">
      <div className="fb-summary-card">
        <span className="fb-summary-icon">
          <Hash size={16} strokeWidth={1.8} />
        </span>
        <span className="fb-summary-value">{totals.count}</span>
        <span className="fb-summary-label">Total Bets</span>
      </div>
      <div className="fb-summary-card">
        <span className="fb-summary-icon">
          <Wallet size={16} strokeWidth={1.8} />
        </span>
        <span className="fb-summary-value">{formatAmount(totals.amount)}</span>
        <span className="fb-summary-label">Total Amount</span>
      </div>
      <div className={`fb-summary-card ${getAmountColorClass(totals.loss)}`}>
        <span className="fb-summary-icon">
          <TrendingDown size={16} strokeWidth={1.8} />
        </span>
        <span className={`fb-summary-value ${getAmountColorClass(totals.loss)}`}>
          {formatAmount(totals.loss)}
        </span>
        <span className="fb-summary-label">Total Loss</span>
      </div>
      <div className={`fb-summary-card ${getAmountColorClass(totals.profit)}`}>
        <span className="fb-summary-icon">
          <TrendingUp size={16} strokeWidth={1.8} />
        </span>
        <span className={`fb-summary-value ${getAmountColorClass(totals.profit)}`}>
          {formatAmount(totals.profit)}
        </span>
        <span className="fb-summary-label">Total Profit</span>
      </div>
    </div>
  );
};

FancyBetsSummary.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default FancyBetsSummary;
