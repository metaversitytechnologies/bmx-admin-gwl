import { Table } from "antd";
import PropTypes from "prop-types";
import TypeBadge from "./TypeBadge";
import BetStatusBadge from "./BetStatusBadge";
import RejectedBetsEmpty from "./RejectedBetsEmpty";
import RejectedBetsError from "./RejectedBetsError";
import { formatAgent, formatAmount, formatDateParts } from "./rejectedBetsUtils";

const buildColumns = (teamName) => [
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
    width: 80,
    align: "right",
    className: "rb-col-num",
    render: (text) => Number(text || 0).toFixed(2),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 100,
    align: "right",
    className: "rb-col-num rb-col-amount",
    render: (value) => formatAmount(value),
  },
  {
    title: "Type",
    dataIndex: "mode",
    key: "mode",
    width: 80,
    render: (mode) => <TypeBadge mode={mode} />,
  },
  {
    title: "Run",
    dataIndex: "run",
    key: "run",
    width: 70,
    align: "right",
    className: "rb-col-num",
  },
  {
    // Original behavior preserved exactly: this column always shows the
    // route's `name` param (the match name) rather than any per-row field.
    title: "Team",
    dataIndex: "run",
    key: "team",
    width: 220,
    render: () => (
      <span className="rb-ellipsis-cell" title={teamName}>
        {teamName}
      </span>
    ),
  },
  {
    title: "Client",
    dataIndex: "userId",
    key: "userId",
    // fixed: "left",
    width: 120,
    render: (userId) => <span className="rb-client-badge">{userId}</span>,
  },
  {
    title: "Agent",
    dataIndex: "parentId",
    key: "parentId",
    width: 100,
    render: (value) => formatAgent(value),
  },
  {
    title: "Date",
    dataIndex: "time",
    key: "time",
    width: 130,
    render: (value) => {
      const { date, time } = formatDateParts(value);
      return (
        <div className="rb-date-cell">
          <span>{date}</span>
          {time && <span className="rb-date-time">{time}</span>}
        </div>
      );
    },
  },
  {
    // The original always rendered the literal text "Deleted" here,
    // ignoring the row's own `bet_status` value — preserved exactly (the
    // API endpoint is get-deleted-bet-list, so this is very likely
    // intentional rather than a leftover bug). See BetStatusBadge for the
    // Rejected/Cancelled treatments this badge is ready to show if this
    // column is ever wired to the real field.
    title: "Bet Status",
    dataIndex: "bet_status",
    key: "bet_status",
    width: 120,
    render: () => <BetStatusBadge label="Deleted" />,
  },
  {
    title: "Remark",
    dataIndex: "selectionName",
    key: "selectionName",
    width: 240,
    render: (text) => (
      <span className="rb-remark-cell" title={text}>
        {text}
      </span>
    ),
  },
];

const RejectedBetsTable = ({ rows, teamName, isLoading, isError, onRetry }) => {
  if (isError) {
    return (
      <div className="rb-table-card">
        <RejectedBetsError onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="rb-table-card">
      <Table
        className="rb-table"
        columns={buildColumns(teamName)}
        dataSource={rows}
        rowKey={(record, index) => index}
        loading={isLoading}
        scroll={{ x: 1160 }}
        locale={{ emptyText: <RejectedBetsEmpty /> }}
        pagination={{
          pageSize: 50,
          showTotal: (total, range) =>
            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
        }}
      />
    </div>
  );
};

RejectedBetsTable.propTypes = {
  rows: PropTypes.array.isRequired,
  teamName: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default RejectedBetsTable;
