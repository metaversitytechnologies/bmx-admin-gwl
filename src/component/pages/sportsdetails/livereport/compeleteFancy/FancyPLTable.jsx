import { Table } from "antd";
import PropTypes from "prop-types";
import StatusBadge from "./StatusBadge";
import PLValue from "./PLValue";
import FancyPLEmpty from "./FancyPLEmpty";
import FancyPLError from "./FancyPLError";
import { formatAmount, getPnlColorClass } from "./fancyPLUtils";

const buildColumns = () => [
  {
    title: "Username",
    dataIndex: "userId",
    key: "userId",
    fixed: "left",
    width: 140,
    render: (text, record) => (
      <StatusBadge variant={record?.pnl >= 0 ? "positive" : "negative"}>
        {text}
      </StatusBadge>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 160,
    className: "fpl-col-date",
  },
  {
    title: "F. Name",
    dataIndex: "fancyName",
    key: "fancyName",
    width: 200,
  },
  {
    title: "Rate",
    dataIndex: "odds",
    key: "odds",
    width: 80,
    align: "right",
    className: "fpl-col-num",
  },
  {
    title: "Value",
    dataIndex: "priceValue",
    key: "priceValue",
    width: 90,
    align: "right",
    className: "fpl-col-num",
  },
  {
    title: "Back/Lay",
    dataIndex: "isBack",
    key: "isBack",
    width: 100,
    render: (text) => (
      <StatusBadge variant={text ? "blue" : "rose"}>
        {text ? "Yes" : "No"}
      </StatusBadge>
    ),
  },
  {
    title: "Result",
    dataIndex: "result",
    key: "result",
    width: 110,
  },
  {
    title: "Creator",
    dataIndex: "creator",
    key: "creator",
    width: 130,
  },
  {
    title: "Stake",
    dataIndex: "stake",
    key: "stake",
    width: 100,
    align: "right",
    className: "fpl-col-num",
    render: (value) => formatAmount(value),
  },
  {
    title: "PNL",
    dataIndex: "pnl",
    key: "pnl",
    // fixed: "right",
    width: 120,
    align: "right",
    render: (value) => <PLValue value={value} />,
  },
];

const FancyPLTable = ({ rows, isLoading, isError, onRetry }) => {
  if (isError) {
    return (
      <div className="fpl-table-card">
        <FancyPLError onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="fpl-table-card">
      <Table
        className="fpl-table"
        columns={buildColumns()}
        dataSource={rows}
        rowKey={(record, index) => index}
        loading={isLoading}
        rowClassName={(record) => `fpl-row ${getPnlColorClass(record?.pnl)}`}
        locale={{ emptyText: <FancyPLEmpty /> }}
        pagination={{
          showTotal: (total, range) =>
            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
        }}
      />
    </div>
  );
};

FancyPLTable.propTypes = {
  rows: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default FancyPLTable;
