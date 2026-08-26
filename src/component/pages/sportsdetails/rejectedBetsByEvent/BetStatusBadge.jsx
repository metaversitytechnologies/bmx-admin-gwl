import PropTypes from "prop-types";

// Maps a status string to one of the three treatments the approved design
// calls for. Written to handle Rejected/Cancelled too (not just Deleted) so
// it's ready if this column is ever wired to a real per-row status — today
// the underlying data always resolves to "Deleted" (see RejectedBetsByEvent).
const variantFor = (label) => {
  const value = (label || "").toLowerCase();
  if (value.includes("reject")) return "rejected";
  if (value.includes("cancel")) return "cancelled";
  return "deleted";
};

const BetStatusBadge = ({ label }) => (
  <span className={`rb-status-badge rb-status-${variantFor(label)}`}>
    <span className="rb-status-dot" />
    {label}
  </span>
);

BetStatusBadge.propTypes = {
  label: PropTypes.string.isRequired,
};

export default BetStatusBadge;
