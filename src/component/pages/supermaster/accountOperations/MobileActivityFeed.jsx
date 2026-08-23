import PropTypes from "prop-types";
import { groupActivitiesByDate } from "./accountOperationsUtils";
import ActivityDateGroup from "./ActivityDateGroup";
import AccountOperationsEmpty from "./AccountOperationsEmpty";

const MobileActivityFeed = ({ data }) => {
  const groups = groupActivitiesByDate(data);

  return (
    <div className="account-operations-mobile-list">
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <ActivityDateGroup
            key={group.key}
            label={group.label}
            items={group.items}
            isFirst={index === 0}
          />
        ))
      ) : (
        <AccountOperationsEmpty />
      )}
    </div>
  );
};

MobileActivityFeed.propTypes = {
  data: PropTypes.array,
};

export default MobileActivityFeed;
