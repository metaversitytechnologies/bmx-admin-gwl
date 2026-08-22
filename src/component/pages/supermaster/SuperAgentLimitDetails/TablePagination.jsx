import { Pagination } from "antd";
import PropTypes from "prop-types";

const TablePagination = ({
  currentPage,
  totalPages,
  pageSize,
  firstEntry,
  lastEntry,
  totalEntries,
  onPageChange,
  onPageSizeChange,
}) => (
  <div className="admin-details-pagination update-limit-pagination">
    <div className="admin-details-page-info">
      Showing {firstEntry} to {lastEntry} of {totalEntries} entries
    </div>
    <Pagination
      current={currentPage + 1}
      total={totalPages * pageSize}
      pageSize={pageSize}
      showSizeChanger
      pageSizeOptions={["25", "50", "100", "200", "300", "500"]}
      onChange={(page) => onPageChange(page - 1)}
      onShowSizeChange={(_, size) => onPageSizeChange(size)}
    />
  </div>
);

TablePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  firstEntry: PropTypes.number.isRequired,
  lastEntry: PropTypes.number.isRequired,
  totalEntries: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default TablePagination;
