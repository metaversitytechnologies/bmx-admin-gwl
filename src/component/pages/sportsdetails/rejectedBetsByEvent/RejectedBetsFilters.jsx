import { Select } from "antd";
import { User } from "lucide-react";
import PropTypes from "prop-types";

// Only the existing "All Users" filter is wired up here — the approved
// design also sketches Deleted/Rejected/Cancelled status chips, but every
// row this page ever renders currently resolves to "Deleted" (the Bet
// Status column's original render function hardcodes it, and the API
// endpoint is literally get-deleted-bet-list), so status chips would filter
// to identical results every time. Left out per this task's own guidance to
// skip filtering that isn't safely backed by real data.
const RejectedBetsFilters = ({
  selectedUser,
  onSelectUser,
  userOptions,
  recordCount,
}) => (
  <div className="rb-toolbar">
    <Select
      className="rb-filter-select"
      placeholder="Select User"
      showSearch
      suffixIcon={<User size={14} strokeWidth={1.8} />}
      value={selectedUser}
      onChange={onSelectUser}
      options={userOptions}
    />
    <span className="rb-record-count">
      {recordCount} {recordCount === 1 ? "record" : "records"}
    </span>
  </div>
);

RejectedBetsFilters.propTypes = {
  selectedUser: PropTypes.string,
  onSelectUser: PropTypes.func.isRequired,
  userOptions: PropTypes.array.isRequired,
  recordCount: PropTypes.number.isRequired,
};

export default RejectedBetsFilters;
