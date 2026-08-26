import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
import {
  formatAmount,
  formatDateParts,
  getAmountColorClass,
  getResultState,
  getRowTintClass,
} from "./fancyBetsUtils";

const FancyBetRow = ({ row }) => {
  const [expanded, setExpanded] = useState(false);
  const { date, time } = formatDateParts(row?.time);
  const result = getResultState(row?.declared);

  return (
    <>
      <tr className={getRowTintClass(row?.mode)}>
        <td
          className="fb-ellipsis-cell"
          title={`${row?.parentName} (${row?.parentId})`}>
          {row?.parentName} ({row?.parentId})
        </td>
        <td className="fb-num-col">{row?.run}</td>
        <td className="fb-num-col">{formatAmount(row?.amount)}</td>
        <td
          className={`fb-num-col fb-amount ${getAmountColorClass(row?.pnl)}`}>
          {formatAmount(row?.pnl)}
        </td>
        <td className="fb-mobile-action">
          <button
            type="button"
            className={`fb-expand-btn${expanded ? " is-open" : ""}`}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={
              expanded
                ? "Hide additional bet details"
                : "Show additional bet details"
            }>
            <ChevronDown size={14} strokeWidth={2} />
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="fb-detail-row">
          <td colSpan={5}>
            <div className="fb-detail-grid">
              <span className="fb-detail-label">Rate</span>
              <span className="fb-detail-value">{row?.rate}</span>

              <span className="fb-detail-label">Type</span>
              <span className="fb-detail-value">{row?.mode}</span>

              <span className="fb-detail-label">Session</span>
              <span className="fb-detail-value">{row?.selectionName}</span>

              <span className="fb-detail-label">Creator Name</span>
              <span className="fb-detail-value">
                {row?.username} ({row?.userId})
              </span>

              <span className="fb-detail-label">Date</span>
              <span className="fb-detail-value">
                {date}
                {time ? ` · ${time}` : ""}
              </span>

              <span className="fb-detail-label">Loss</span>
              <span
                className={`fb-detail-value ${getAmountColorClass(
                  row?.liability
                )}`}>
                {formatAmount(row?.liability)}
              </span>

              <span className="fb-detail-label">Result</span>
              <span
                className={`fb-result-pill${
                  result.isPending ? " fb-result-pending" : ""
                }`}>
                {result.label}
              </span>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

FancyBetRow.propTypes = {
  row: PropTypes.object.isRequired,
};

export default FancyBetRow;
