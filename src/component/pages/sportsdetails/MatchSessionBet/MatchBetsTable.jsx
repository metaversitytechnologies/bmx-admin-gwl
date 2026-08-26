import PropTypes from "prop-types";
import {
  formatAmount,
  formatDateParts,
  getAmountColorClass,
  getMatchRowTintClass,
} from "./matchSessionBetUtils";
import BetTableSkeleton from "./BetTableSkeleton";
import BetTableEmpty from "./BetTableEmpty";
import BetTableError from "./BetTableError";

const COLUMN_COUNT = 8;

const MatchBetsTable = ({
  rows,
  isLoading,
  isError,
  onRetry,
  totalAmount,
  totalPnl,
  totalPnlColorSign,
}) => (
  <div className="msb-table-scroll">
    <table className="msb-table">
      <thead>
        <tr>
          <th>Sr</th>
          <th className="msb-num-col">Rate</th>
          <th>Mode</th>
          <th>Team</th>
          <th>Odds Type</th>
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
          rows.map((bet, index) => {
            const { date, time } = formatDateParts(bet?.date);
            const isLagai = bet?.mode === "L";
            return (
              <tr key={index} className={getMatchRowTintClass(bet?.mode)}>
                <td>{index + 1}</td>
                <td className="msb-num-col">
                  {Number(bet?.odds || 0).toFixed(2)}
                </td>
                <td>
                  <span
                    className={`msb-mode-pill ${
                      isLagai ? "msb-mode-lagai" : "msb-mode-khai"
                    }`}>
                    {isLagai ? "Lagai" : "KHAI"}
                  </span>
                </td>
                <td className="msb-ellipsis-cell" title={bet?.team}>
                  {bet?.team}
                </td>
                <td>{bet?.marketType}</td>
                <td className="msb-num-col">{formatAmount(bet?.stake)}</td>
                <td
                  className={`msb-num-col msb-amount ${getAmountColorClass(
                    bet?.pnl
                  )}`}>
                  {formatAmount(bet?.pnl)}
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
          <BetTableEmpty colSpan={COLUMN_COUNT} message="No match bets found" />
        )}
      </tbody>
      {!isLoading && !isError && rows.length > 0 && (
        <tfoot>
          <tr className="msb-totals-row">
            <td colSpan={5}>Total</td>
            <td className="msb-num-col msb-amount">
              {formatAmount(totalAmount)}
            </td>
            <td
              className={`msb-num-col msb-amount ${getAmountColorClass(
                totalPnlColorSign
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

MatchBetsTable.propTypes = {
  rows: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onRetry: PropTypes.func.isRequired,
  totalAmount: PropTypes.number,
  totalPnl: PropTypes.number,
  totalPnlColorSign: PropTypes.number,
};

export default MatchBetsTable;
