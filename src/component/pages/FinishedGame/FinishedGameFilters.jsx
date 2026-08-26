import { DatePicker, Select } from "antd";
import { Calendar, Trophy } from "lucide-react";
import PropTypes from "prop-types";

const { RangePicker } = DatePicker;

const FinishedGameFilters = ({
  defaultValue,
  onDateChange,
  recordCount,
}) => (
  <div className="admin-details-toolbar finished-game-toolbar">
    <div className="finished-game-filter-field">
      <RangePicker
        className="finished-game-range-picker"
        defaultValue={defaultValue}
        onChange={onDateChange}
        suffixIcon={<Calendar size={14} strokeWidth={1.8} />}
      />
    </div>
    <div className="finished-game-filter-field">
      <Select
        className="finished-game-type-select"
        placeholder="All Game Types"
        options={[]}
        showSearch
        allowClear
        suffixIcon={<Trophy size={14} strokeWidth={1.8} />}
      />
    </div>
    <span className="finished-game-record-count">
      {recordCount} {recordCount === 1 ? "completed game" : "completed games"}
    </span>
  </div>
);

FinishedGameFilters.propTypes = {
  defaultValue: PropTypes.array,
  onDateChange: PropTypes.func.isRequired,
  recordCount: PropTypes.number.isRequired,
};

export default FinishedGameFilters;
