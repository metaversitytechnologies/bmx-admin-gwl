import { Input } from "antd";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

const DomainToolbar = ({ searchTerm, onSearchChange }) => (
  <div className="create-domain-toolbar">
    <div className="admin-details-search-form create-domain-search-form">
      <Input
        prefix={<Search size={17} strokeWidth={1.8} />}
        placeholder="Search by app name, url or id..."
        allowClear
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  </div>
);

DomainToolbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default DomainToolbar;
