import { Pagination } from "antd";
import PropTypes from "prop-types";

// Mirrors SportsPagination's exact visual structure, but wired to
// FinishedGame's real (server-driven) pagination state instead of a
// client-side slice, and keeps the original pageSizeOptions verbatim.
const FinishedGamePagination = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}) => {
  const firstEntry = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastEntry = Math.min(currentPage * pageSize, total);

  return (
    <div className="admin-details-pagination finished-game-pagination">
      <div className="admin-details-page-info">
        Showing {firstEntry} to {lastEntry} of {total} entries
      </div>
      <Pagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        showSizeChanger
        pageSizeOptions={[50, 100, 150, 200, 250]}
        onChange={(page) => onPageChange(page)}
        onShowSizeChange={(_, size) => onPageSizeChange(size)}
      />
    </div>
  );
};

FinishedGamePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default FinishedGamePagination;
