import { DatePicker, Input } from "antd";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

const { RangePicker } = DatePicker;

const AccountOperationsToolbar = ({
  defaultDateRange,
  onDateChange,
  searchTerm,
  onSearchChange,
  total,
}) => (
  <div className="admin-details-toolbar account-operations-toolbar">
    <div className="admin-details-toolbar-left account-operations-toolbar-left">
      <RangePicker
        className="account-operations-range"
        defaultValue={defaultDateRange}
        onChange={onDateChange}
        format="DD MMM YYYY"
      />

      <div className="admin-details-search-form account-operations-search-form">
        <Input
          prefix={<Search size={15} strokeWidth={1.8} />}
          placeholder="Search activity..."
          allowClear
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>

    <div className="admin-details-toolbar-right account-operations-toolbar-right">
      <span className="account-operations-results">
        {total} {total === 1 ? "result" : "results"}
      </span>
    </div>
  </div>
);

AccountOperationsToolbar.propTypes = {
  defaultDateRange: PropTypes.array,
  onDateChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  total: PropTypes.number,
};

export default AccountOperationsToolbar;
