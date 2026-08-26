import { Select } from "antd";
import PropTypes from "prop-types";

// Plain Selects rather than antd Form/Form.Item — the original Form had no
// reachable submit button, so its validation/onFinish never actually ran;
// only the Select's own value/onSelect/onSearch/options drove real behavior,
// and those are preserved here exactly.
const MatchBetsFilters = ({
  clientId,
  onSelectClient,
  onSearchClient,
  userOptions,
  oddsType,
  onSelectOddsType,
  oddsOptions,
}) => (
  <div className="mb-filters">
    <div className="mb-filter-field">
      <label className="mb-filter-label" htmlFor="mb-select-user">
        Select User
      </label>
      <Select
        id="mb-select-user"
        className="mb-filter-select"
        placeholder="Select User"
        showSearch
        allowClear
        value={clientId}
        onSearch={onSearchClient}
        onSelect={onSelectClient}
        options={userOptions}
      />
    </div>
    <div className="mb-filter-field">
      <label className="mb-filter-label" htmlFor="mb-select-odds">
        Select OddsType
      </label>
      <Select
        id="mb-select-odds"
        className="mb-filter-select"
        placeholder="Select Market"
        showSearch
        allowClear
        value={oddsType}
        onSelect={onSelectOddsType}
        options={oddsOptions}
      />
    </div>
  </div>
);

MatchBetsFilters.propTypes = {
  clientId: PropTypes.string,
  onSelectClient: PropTypes.func.isRequired,
  onSearchClient: PropTypes.func.isRequired,
  userOptions: PropTypes.array.isRequired,
  oddsType: PropTypes.string,
  onSelectOddsType: PropTypes.func.isRequired,
  oddsOptions: PropTypes.array.isRequired,
};

export default MatchBetsFilters;
