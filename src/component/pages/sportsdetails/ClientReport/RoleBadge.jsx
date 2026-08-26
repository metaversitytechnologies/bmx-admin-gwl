import PropTypes from "prop-types";

// Same drill-down interaction the original badge had: clicking it re-queries
// the report scoped to this row's userId, but only when the row isn't a
// Client (Client rows have nothing further to drill into).
const RoleBadge = ({ label, isClient, onDrillDown }) => (
  <span
    className={`cr2-role-badge${isClient ? "" : " cr2-role-clickable"}`}
    onClick={() => {
      if (!isClient) onDrillDown();
    }}
    role={isClient ? undefined : "button"}
    tabIndex={isClient ? undefined : 0}
    onKeyDown={(e) => {
      if (!isClient && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onDrillDown();
      }
    }}>
    {label}
  </span>
);

RoleBadge.propTypes = {
  label: PropTypes.string.isRequired,
  isClient: PropTypes.bool.isRequired,
  onDrillDown: PropTypes.func.isRequired,
};

export default RoleBadge;
