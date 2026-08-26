import { Pagination } from "antd";
import PropTypes from "prop-types";

const ClientReportPagination = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}) => {
  const firstEntry = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastEntry = Math.min(currentPage * pageSize, total);

  return (
    <div className="admin-details-pagination cr2-pagination">
      <div className="admin-details-page-info">
        Showing {firstEntry} to {lastEntry} of {total} entries
      </div>
      <Pagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        showSizeChanger
        pageSizeOptions={["10", "25", "50", "100"]}
        onChange={(page) => onPageChange(page)}
        onShowSizeChange={(_, size) => onPageSizeChange(size)}
      />
    </div>
  );
};

ClientReportPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default ClientReportPagination;
