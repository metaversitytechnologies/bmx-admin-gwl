import PropTypes from "prop-types";

// Same raw `mode` value the original cell printed as plain text — just
// styled as a compact pill. Anything other than "YES" (case-insensitive)
// gets the "NO" treatment, matching the original's implicit binary display.
const TypeBadge = ({ mode }) => {
  const isYes = (mode || "").toUpperCase() === "YES";
  return (
    <span className={`rb-type-badge ${isYes ? "rb-type-yes" : "rb-type-no"}`}>
      {mode}
    </span>
  );
};

TypeBadge.propTypes = {
  mode: PropTypes.string,
};

export default TypeBadge;
