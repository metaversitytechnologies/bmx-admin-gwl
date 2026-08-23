import PropTypes from "prop-types";
import ActivityRow from "./ActivityRow";

const ActivityDateGroup = ({ label, items, isFirst }) => (
  <section
    className={`account-operations-date-group${isFirst ? " is-first" : ""}`}>
    <h3 className="account-operations-date-heading">{label}</h3>
    <div className="account-operations-date-rows">
      {items.map((activity, index) => (
        <ActivityRow
          key={activity?.id ?? `${activity?.date}-${index}`}
          activity={activity}
        />
      ))}
    </div>
  </section>
);

ActivityDateGroup.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  isFirst: PropTypes.bool,
};

export default ActivityDateGroup;
