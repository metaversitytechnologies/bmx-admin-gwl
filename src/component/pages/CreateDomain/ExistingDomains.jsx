import PropTypes from "prop-types";
import DomainToolbar from "./DomainToolbar";
import DomainTable from "./DomainTable";
import DomainMobileList from "./DomainMobileList";
import DomainPagination from "./DomainPagination";

const ExistingDomains = ({
  total,
  searchTerm,
  onSearchChange,
  data,
  onUpdate,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => (
  <div className="create-domain-list-card">
    <div className="create-domain-list-heading">
      <h2 className="create-domain-list-title">Existing Domains</h2>
      <span className="create-domain-count-badge">{total}</span>
    </div>

    <DomainToolbar searchTerm={searchTerm} onSearchChange={onSearchChange} />

    <div className="create-domain-table-wrap">
      <DomainTable data={data} onUpdate={onUpdate} />
      <DomainMobileList data={data} onUpdate={onUpdate} />
    </div>

    <DomainPagination
      currentPage={currentPage}
      pageSize={pageSize}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  </div>
);

ExistingDomains.propTypes = {
  total: PropTypes.number.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  data: PropTypes.array,
  onUpdate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default ExistingDomains;
