import PropTypes from "prop-types";

// Color the raw number; preserve the caller's existing formatting unchanged.
export default function LedgerAmount({ value, children, commission = false }) {
  const tone = value < 0 ? "negative" : value > 0 ? "positive" : "neutral";
  return (
    <span
      className={`ledger-amount ledger-amount-${tone}${commission ? " ledger-amount-commission" : ""}`}>
      {children}
    </span>
  );
}
LedgerAmount.propTypes = {
  value: PropTypes.number,
  children: PropTypes.node,
  commission: PropTypes.bool,
};
