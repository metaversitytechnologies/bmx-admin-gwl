import { Pagination } from "antd";
import "./TablePagination.scss";

const TablePagination = ({
  total,
  pageSize = 10,
  current = 1,
  onChange,
  className,
  style,
  ...rest
}) => {
  if (!total || total <= 0) {
    return null;
  }

  return (
    <Pagination
      className={className}
      style={style}
      total={total}
      pageSize={pageSize}
      current={current}
      onChange={onChange}
      showSizeChanger={false}
      {...rest}
    />
  );
};

export default TablePagination;
