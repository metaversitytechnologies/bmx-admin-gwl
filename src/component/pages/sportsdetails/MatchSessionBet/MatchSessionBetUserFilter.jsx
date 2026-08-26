import { Select } from "antd";
import { User } from "lucide-react";
import PropTypes from "prop-types";

// Plain Select rather than antd Form/Form.Item — the original Form had no
// reachable submit button, so its validation never actually ran; only the
// Select's own value/onSelect/onSearch/options drove real behavior, and
// those are preserved here exactly.
const MatchSessionBetUserFilter = ({
  clientId,
  onSelectClient,
  onSearchClient,
  userOptions,
}) => (
  <div className="msb-filter-field">
    <label className="msb-filter-label" htmlFor="msb-select-user">
      Select User
    </label>
    <Select
      id="msb-select-user"
      className="msb-filter-select"
      placeholder="Select User"
      showSearch
      allowClear
      value={clientId}
      suffixIcon={<User size={14} strokeWidth={1.8} />}
      onSearch={onSearchClient}
      onSelect={onSelectClient}
      options={userOptions}
    />
  </div>
);

MatchSessionBetUserFilter.propTypes = {
  clientId: PropTypes.string,
  onSelectClient: PropTypes.func.isRequired,
  onSearchClient: PropTypes.func.isRequired,
  userOptions: PropTypes.array.isRequired,
};

export default MatchSessionBetUserFilter;
