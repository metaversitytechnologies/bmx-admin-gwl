import { Select } from "antd";
import { User, ListFilter } from "lucide-react";
import PropTypes from "prop-types";

const FancyPLFilters = ({
  clientId,
  onSelectClient,
  onSearchClient,
  userOptions,
  selectedFancyId,
  onSelectFancy,
  onClearFancy,
  fancyOptions,
}) => (
  <div className="fpl-filters">
    <Select
      className="fpl-filter-select"
      placeholder="Select User"
      showSearch
      suffixIcon={<User size={14} strokeWidth={1.8} />}
      onSearch={onSearchClient}
      value={clientId}
      onSelect={onSelectClient}
      options={userOptions}
    />
    <Select
      className="fpl-filter-select"
      placeholder="Select Fancy"
      value={selectedFancyId}
      onSelect={onSelectFancy}
      allowClear
      suffixIcon={<ListFilter size={14} strokeWidth={1.8} />}
      onClear={onClearFancy}
      options={fancyOptions}
      showSearch
    />
  </div>
);

FancyPLFilters.propTypes = {
  clientId: PropTypes.string,
  onSelectClient: PropTypes.func.isRequired,
  onSearchClient: PropTypes.func.isRequired,
  userOptions: PropTypes.array.isRequired,
  selectedFancyId: PropTypes.string,
  onSelectFancy: PropTypes.func.isRequired,
  onClearFancy: PropTypes.func.isRequired,
  fancyOptions: PropTypes.array.isRequired,
};

export default FancyPLFilters;
