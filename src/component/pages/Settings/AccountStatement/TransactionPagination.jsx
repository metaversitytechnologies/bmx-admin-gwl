import { Pagination } from "antd";
import PropTypes from "prop-types";

const TransactionPagination = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}) => {
  const firstEntry = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastEntry = Math.min(currentPage * pageSize, total);

  return (
    <div className="admin-details-pagination account-statement-pagination">
      <div className="admin-details-page-info">
        Showing {firstEntry} to {lastEntry} of {total} transactions
      </div>
      <Pagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        showSizeChanger
        pageSizeOptions={["50", "100", "150", "200", "250"]}
        onChange={(page) => onPageChange(page)}
        onShowSizeChange={(_, size) => onPageSizeChange(size)}
      />
    </div>
  );
};

TransactionPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default TransactionPagination;
