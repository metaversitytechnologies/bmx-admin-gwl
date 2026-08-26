import PropTypes from "prop-types";
import {
  formatAmount,
  formatDateParts,
  getAmountColorClass,
  getSessionRowTintClass,
} from "./matchSessionBetUtils";
import BetTableSkeleton from "./BetTableSkeleton";
import BetTableEmpty from "./BetTableEmpty";
import BetTableError from "./BetTableError";

const COLUMN_COUNT = 9;

const SessionBetsTable = ({ rows, isLoading, isError, onRetry, totalPnl }) => (
  <div className="msb-table-scroll">
    <table className="msb-table msb-session-table">
      <thead>
        <tr>
          <th>Sr</th>
          <th>Session</th>
          <th className="msb-num-col">Rate</th>
          <th className="msb-num-col">Run</th>
          <th className="msb-num-col">Decision Run</th>
          <th>Mode</th>
          <th className="msb-num-col">Amount</th>
          <th className="msb-num-col">PNL</th>
          <th>Date and Time</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <BetTableSkeleton columns={COLUMN_COUNT} />
        ) : isError ? (
          <BetTableError colSpan={COLUMN_COUNT} onRetry={onRetry} />
        ) : rows.length > 0 ? (
          rows.map((item, index) => {
            const { date, time } = formatDateParts(item?.time);
            const isYes = item?.mode === "YES";
            return (
              <tr key={index} className={getSessionRowTintClass(item?.mode)}>
                <td>{index + 1}</td>
                <td className="msb-session-name" title={item?.selectionName}>
                  {item?.selectionName}
                </td>
                <td className="msb-num-col">
                  {Number(item?.rate || 0).toFixed(2)}
                </td>
                <td className="msb-num-col">{item?.run}</td>
                <td className="msb-num-col">{item?.declared}</td>
                <td>
                  <span
                    className={`msb-mode-pill ${
                      isYes ? "msb-mode-yes" : "msb-mode-no"
                    }`}>
                    {item?.mode}
                  </span>
                </td>
                <td className="msb-num-col">{formatAmount(item?.amount)}</td>
                <td
                  className={`msb-num-col msb-amount ${getAmountColorClass(
                    item?.netPnl
                  )}`}>
                  {formatAmount(item?.netPnl)}
                </td>
                <td>
                  <div className="msb-date-cell">
                    <span>{date}</span>
                    {time && <span className="msb-date-time">{time}</span>}
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <BetTableEmpty
            colSpan={COLUMN_COUNT}
            message="No session bets found"
          />
        )}
      </tbody>
      {!isLoading && !isError && rows.length > 0 && (
        <tfoot>
          <tr className="msb-totals-row">
            <td colSpan={6}>Total</td>
            <td></td>
            <td
              className={`msb-num-col msb-amount ${getAmountColorClass(
                totalPnl
              )}`}>
              {formatAmount(totalPnl)}
            </td>
            <td></td>
          </tr>
        </tfoot>
      )}
    </table>
  </div>
);

SessionBetsTable.propTypes = {
  rows: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onRetry: PropTypes.func.isRequired,
  totalPnl: PropTypes.number,
};

export default SessionBetsTable;
