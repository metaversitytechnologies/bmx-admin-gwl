import PropTypes from "prop-types";
import {
  formatAmount,
  formatDateParts,
  getAmountColorClass,
  getRowTintClass,
  getRowTypeLabel,
} from "./matchBetsUtils";
import MatchBetsEmpty from "./MatchBetsEmpty";

const MatchBetsDesktopTable = ({ rows }) => (
  <div className="mb-table-scroll">
    <table className="mb-table">
      <colgroup>
        <col style={{ width: "70px" }} />
        <col style={{ width: "90px" }} />
        <col style={{ width: "85px" }} />
        <col style={{ width: "90px" }} />
        <col style={{ minWidth: "160px" }} />
        <col style={{ width: "110px" }} />
        <col style={{ minWidth: "160px" }} />
        <col style={{ width: "175px" }} />
        <col style={{ width: "85px" }} />
        <col style={{ width: "85px" }} />
      </colgroup>
      <thead>
        <tr>
          <th className="mb-num-col">Rate</th>
          <th className="mb-num-col">Amount</th>
          <th>Type</th>
          <th>Team</th>
          <th>Client</th>
          <th>OddsType</th>
          <th>Agent</th>
          <th>Date</th>
          <th className="mb-num-col">Loss</th>
          <th className="mb-num-col">Profit</th>
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, index) => {
            const { date, time } = formatDateParts(row?.date);
            return (
              <tr key={index} className={getRowTintClass(row?.mode)}>
                <td className="mb-num-col">
                  {Number(row?.odds || 0).toFixed(2)}
                </td>
                <td className="mb-num-col">{formatAmount(row?.stake)}</td>
                <td>{getRowTypeLabel(row?.mode)}</td>
                <td className="mb-ellipsis-cell" title={row?.team}>
                  {row?.team}
                </td>
                <td
                  className="mb-ellipsis-cell"
                  title={`${row?.username} (${row?.userId})`}>
                  {row?.username} ({row?.userId})
                </td>
                <td>{row?.marketType}</td>
                <td
                  className="mb-ellipsis-cell"
                  title={`${row?.parentName} (${row?.parentId})`}>
                  {row?.parentName} ({row?.parentId})
                </td>
                <td>
                  <div className="mb-date-cell">
                    <span>{date}</span>
                    {time && <span className="mb-date-time">{time}</span>}
                  </div>
                </td>
                <td
                  className={`mb-num-col mb-amount ${getAmountColorClass(
                    row?.liability
                  )}`}>
                  {formatAmount(row?.liability)}
                </td>
                <td
                  className={`mb-num-col mb-amount ${getAmountColorClass(
                    row?.pnl
                  )}`}>
                  {formatAmount(row?.pnl)}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={10}>
              <MatchBetsEmpty />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

MatchBetsDesktopTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default MatchBetsDesktopTable;
