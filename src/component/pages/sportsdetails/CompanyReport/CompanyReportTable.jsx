import PropTypes from "prop-types";
import { convertCode } from "../../../../store/constant";
import {
  REPORT_COLUMNS,
  formatAmount,
  getRowColorClass,
  getTotalColorClass,
} from "./companyReportUtils";
import ReportEmpty from "./ReportEmpty";

const CompanyReportTable = ({ rows, totals, visibleColumns, onSelectUser }) => {
  const activeColumns = REPORT_COLUMNS.filter((c) =>
    visibleColumns.includes(c.key)
  );
  const colCount = 2 + activeColumns.length;

  return (
    <div className="cr-table-scroll">
      <table className="cr-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            {activeColumns.map((c) => (
              <th key={c.key} className="cr-num-col">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={row?.userId ?? index}>
                <td>
                  <button
                    type="button"
                    className="cr-code-btn"
                    onClick={() => onSelectUser(row?.userId)}>
                    {convertCode(row?.userId)}
                  </button>
                </td>
                <td className="cr-name-cell" title={row?.userName}>
                  {row?.userName}
                </td>
                {activeColumns.map((c) => (
                  <td
                    key={c.key}
                    className={`cr-num-col cr-amount ${getRowColorClass(
                      row?.[c.key]
                    )}`}>
                    {formatAmount(row?.[c.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={colCount}>
                <ReportEmpty />
              </td>
            </tr>
          )}
        </tbody>
        {rows.length > 0 && (
          <tfoot>
            <tr className="cr-total-row">
              <td colSpan={2}>Total</td>
              {activeColumns.map((c) => (
                <td
                  key={c.key}
                  className={`cr-num-col cr-amount ${getTotalColorClass(
                    totals?.[c.key]
                  )}`}>
                  {formatAmount(totals?.[c.key])}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

CompanyReportTable.propTypes = {
  rows: PropTypes.array.isRequired,
  totals: PropTypes.object,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectUser: PropTypes.func.isRequired,
};

export default CompanyReportTable;
