import PropTypes from "prop-types";

// Generic small outlined/filled pill used for the Username and Back/Lay
// cells. Purely presentational — the `variant` is derived from data the
// table already has (pnl sign / isBack), never invented.
const StatusBadge = ({ variant, children }) => (
  <span className={`fpl-badge fpl-badge-${variant}`}>{children}</span>
);

StatusBadge.propTypes = {
  variant: PropTypes.oneOf(["positive", "negative", "blue", "rose"])
    .isRequired,
  children: PropTypes.node,
};

export default StatusBadge;
