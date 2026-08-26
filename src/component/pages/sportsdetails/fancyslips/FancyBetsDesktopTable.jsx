import PropTypes from "prop-types";
import {
  formatAmount,
  formatDateParts,
  getAmountColorClass,
  getResultState,
  getRowTintClass,
} from "./fancyBetsUtils";
import FancyBetsEmpty from "./FancyBetsEmpty";

const FancyBetsDesktopTable = ({ rows }) => (
  <div className="fb-table-scroll">
    <table className="fb-table">
      <colgroup>
        <col style={{ minWidth: "160px" }} />
        <col style={{ width: "80px" }} />
        <col style={{ width: "80px" }} />
        <col style={{ width: "95px" }} />
        <col style={{ width: "70px" }} />
        <col style={{ minWidth: "140px" }} />
        <col style={{ minWidth: "160px" }} />
        <col style={{ width: "160px" }} />
        <col style={{ width: "90px" }} />
        <col style={{ width: "90px" }} />
        <col style={{ width: "100px" }} />
      </colgroup>
      <thead>
        <tr>
          <th>Client Name</th>
          <th className="fb-num-col">Run</th>
          <th className="fb-num-col">Rate</th>
          <th className="fb-num-col">Amount</th>
          <th>Type</th>
          <th>Session</th>
          <th>Creator Name</th>
          <th>Date</th>
          <th className="fb-num-col">Loss</th>
          <th className="fb-num-col">Profit</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, index) => {
            const { date, time } = formatDateParts(row?.time);
            const result = getResultState(row?.declared);
            return (
              <tr key={index} className={getRowTintClass(row?.mode)}>
                <td
                  className="fb-ellipsis-cell"
                  title={`${row?.parentName} (${row?.parentId})`}>
                  {row?.parentName} ({row?.parentId})
                </td>
                <td className="fb-num-col">{row?.run}</td>
                <td className="fb-num-col">{row?.rate}</td>
                <td className="fb-num-col">{formatAmount(row?.amount)}</td>
                <td>{row?.mode}</td>
                <td className="fb-ellipsis-cell" title={row?.selectionName}>
                  {row?.selectionName}
                </td>
                <td
                  className="fb-ellipsis-cell"
                  title={`${row?.username} (${row?.userId})`}>
                  {row?.username} ({row?.userId})
                </td>
                <td>
                  <div className="fb-date-cell">
                    <span>{date}</span>
                    {time && <span className="fb-date-time">{time}</span>}
                  </div>
                </td>
                <td
                  className={`fb-num-col fb-amount ${getAmountColorClass(
                    row?.liability
                  )}`}>
                  {formatAmount(row?.liability)}
                </td>
                <td
                  className={`fb-num-col fb-amount ${getAmountColorClass(
                    row?.pnl
                  )}`}>
                  {formatAmount(row?.pnl)}
                </td>
                <td>
                  <span
                    className={`fb-result-pill${
                      result.isPending ? " fb-result-pending" : ""
                    }`}>
                    {result.label}
                  </span>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={11}>
              <FancyBetsEmpty />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

FancyBetsDesktopTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default FancyBetsDesktopTable;
