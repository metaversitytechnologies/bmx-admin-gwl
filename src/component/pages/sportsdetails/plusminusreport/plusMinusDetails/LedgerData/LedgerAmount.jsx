import PropTypes from "prop-types";

// Color the raw number; preserve the caller's existing formatting unchanged.
export default function LedgerAmount({ value, children }) {
  const tone = value < 0 ? "negative" : value > 0 ? "positive" : "neutral";
  return <span className={`ledger-amount ledger-amount-${tone}`}>{children}</span>;
}
LedgerAmount.propTypes = { value: PropTypes.number, children: PropTypes.node };
