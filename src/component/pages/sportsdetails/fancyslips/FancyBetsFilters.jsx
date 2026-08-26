import { Select } from "antd";
import PropTypes from "prop-types";

// Plain Selects rather than antd Form/Form.Item — the original Form had no
// reachable submit button, so its validation/onFinish never actually ran;
// only the Select's own value/onSelect/onSearch/options drove real behavior,
// and those are preserved here exactly.
const FancyBetsFilters = ({
  clientId,
  onSelectClient,
  onSearchClient,
  userOptions,
  fancyId,
  onSelectFancy,
  fancyOptions,
}) => (
  <div className="fb-filters">
    <div className="fb-filter-field">
      <label className="fb-filter-label" htmlFor="fb-select-user">
        Select User
      </label>
      <Select
        id="fb-select-user"
        className="fb-filter-select"
        placeholder="Select User"
        showSearch
        allowClear
        value={clientId}
        onSearch={onSearchClient}
        onSelect={onSelectClient}
        options={userOptions}
      />
    </div>
    <div className="fb-filter-field">
      <label className="fb-filter-label" htmlFor="fb-select-fancy">
        Select Fancy
      </label>
      <Select
        id="fb-select-fancy"
        className="fb-filter-select"
        placeholder="Select Fancy"
        showSearch
        allowClear
        value={fancyId}
        onSelect={onSelectFancy}
        options={fancyOptions}
      />
    </div>
  </div>
);

FancyBetsFilters.propTypes = {
  clientId: PropTypes.string,
  onSelectClient: PropTypes.func.isRequired,
  onSearchClient: PropTypes.func.isRequired,
  userOptions: PropTypes.array.isRequired,
  fancyId: PropTypes.string,
  onSelectFancy: PropTypes.func.isRequired,
  fancyOptions: PropTypes.array.isRequired,
};

export default FancyBetsFilters;
