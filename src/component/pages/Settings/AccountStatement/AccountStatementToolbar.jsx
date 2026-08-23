import { DatePicker } from "antd";
import PropTypes from "prop-types";

const { RangePicker } = DatePicker;

const TYPE_OPTIONS = [
  { value: "ALL", label: "All" },
  { value: "PNL", label: "P&L" },
  { value: "ACCOUNT", label: "Account" },
];

const AccountStatementToolbar = ({
  defaultDateRange,
  onDateChange,
  detailType,
  onDetailTypeChange,
  total,
}) => (
  <div className="admin-details-toolbar account-statement-toolbar">
    <div className="admin-details-toolbar-left account-statement-toolbar-left">
      <RangePicker
        className="account-statement-range"
        defaultValue={defaultDateRange}
        onChange={onDateChange}
        format="DD MMM YYYY"
      />

      <div
        className="account-statement-segmented"
        role="tablist"
        aria-label="Transaction type filter">
        {TYPE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={detailType === option.value}
            className={`account-statement-segmented-option${
              detailType === option.value ? " is-active" : ""
            }`}
            onClick={() => onDetailTypeChange(option.value)}>
            {option.label}
          </button>
        ))}
      </div>
    </div>

    <div className="admin-details-toolbar-right account-statement-toolbar-right">
      <span className="account-statement-results">
        {total} {total === 1 ? "result" : "results"}
      </span>
    </div>
  </div>
);

AccountStatementToolbar.propTypes = {
  defaultDateRange: PropTypes.array,
  onDateChange: PropTypes.func.isRequired,
  detailType: PropTypes.string.isRequired,
  onDetailTypeChange: PropTypes.func.isRequired,
  total: PropTypes.number,
};

export default AccountStatementToolbar;
