import { useState } from "react";
import PropTypes from "prop-types";
import { convertCode } from "../../../../store/constant";
import {
  formatAmount,
  getRowColorClass,
  getTotalColorClass,
} from "./companyReportUtils";
import ReportEmpty from "./ReportEmpty";

// Same row order/data as desktop, just grouped into three tabs so every
// field stays reachable without a 13-column mobile table.
const GROUPS = {
  amounts: {
    label: "Amounts",
    columns: [
      { key: "matchAmount", label: "Match" },
      { key: "sessionAmount", label: "Session" },
      { key: "total", label: "Total" },
    ],
  },
  commission: {
    label: "Commission",
    columns: [
      { key: "matchComm", label: "Match Comm+" },
      { key: "sessionComm", label: "Session Comm+" },
      { key: "totalComm", label: "Total Comm" },
    ],
  },
  share: {
    label: "Share / Net",
    columns: [
      { key: "myShare", label: "My Share" },
      { key: "mapp", label: "M.App" },
      { key: "netAmount", label: "Net Amount" },
    ],
  },
};

const MobileReportTable = ({ rows, totals, onSelectUser }) => {
  const [activeGroup, setActiveGroup] = useState("amounts");
  const group = GROUPS[activeGroup];

  return (
    <div className="cr-mobile-wrap">
      <div className="cr-segmented" role="tablist" aria-label="Report column group">
        {Object.entries(GROUPS).map(([key, g]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeGroup === key}
            className={`cr-segmented-option${
              activeGroup === key ? " is-active" : ""
            }`}
            onClick={() => setActiveGroup(key)}>
            {g.label}
          </button>
        ))}
      </div>

      <div className="cr-mobile-table-scroll">
        <table className="cr-mobile-table">
          <thead>
            <tr>
              <th>Code / Name</th>
              {group.columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr key={row?.userId ?? index}>
                  <td className="cr-mobile-identity">
                    <button
                      type="button"
                      className="cr-code-btn"
                      onClick={() => onSelectUser(row?.userId)}>
                      {convertCode(row?.userId)}
                    </button>
                    <span className="cr-mobile-name" title={row?.userName}>
                      {row?.userName}
                    </span>
                  </td>
                  {group.columns.map((c) => (
                    <td
                      key={c.key}
                      title={formatAmount(row?.[c.key])}
                      className={`cr-amount ${getRowColorClass(row?.[c.key])}`}>
                      {formatAmount(row?.[c.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={1 + group.columns.length}>
                  <ReportEmpty />
                </td>
              </tr>
            )}
          </tbody>
          {rows.length > 0 && (
            <tfoot>
              <tr className="cr-total-row">
                <td>Total</td>
                {group.columns.map((c) => (
                  <td
                    key={c.key}
                    className={`cr-amount ${getTotalColorClass(
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
    </div>
  );
};

MobileReportTable.propTypes = {
  rows: PropTypes.array.isRequired,
  totals: PropTypes.object,
  onSelectUser: PropTypes.func.isRequired,
};

export default MobileReportTable;
