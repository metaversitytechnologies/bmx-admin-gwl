import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
import {
  formatAmount,
  formatDateParts,
  getAmountColorClass,
  getRowTintClass,
  getRowTypeLabel,
} from "./matchBetsUtils";

const MobileBetRow = ({ row }) => {
  const [expanded, setExpanded] = useState(false);
  const { date, time } = formatDateParts(row?.date);

  return (
    <>
      <tr className={getRowTintClass(row?.mode)}>
        <td className="mb-num-col">{Number(row?.odds || 0).toFixed(2)}</td>
        <td className="mb-num-col">{formatAmount(row?.stake)}</td>
        <td>{getRowTypeLabel(row?.mode)}</td>
        <td className="mb-ellipsis-cell" title={row?.team}>
          {row?.team}
        </td>
        <td className="mb-ellipsis-cell" title={row?.username}>
          {row?.username}
        </td>
        <td className="mb-mobile-action">
          <button
            type="button"
            className={`mb-expand-btn${expanded ? " is-open" : ""}`}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={
              expanded ? "Hide additional bet details" : "Show additional bet details"
            }>
            <ChevronDown size={14} strokeWidth={2} />
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="mb-detail-row">
          <td colSpan={6}>
            <div className="mb-detail-grid">
              <span className="mb-detail-label">OddsType</span>
              <span className="mb-detail-value">{row?.marketType}</span>

              <span className="mb-detail-label">Agent</span>
              <span className="mb-detail-value">
                {row?.parentName} ({row?.parentId})
              </span>

              <span className="mb-detail-label">Date</span>
              <span className="mb-detail-value">
                {date}
                {time ? ` · ${time}` : ""}
              </span>

              <span className="mb-detail-label">Loss</span>
              <span
                className={`mb-detail-value ${getAmountColorClass(
                  row?.liability
                )}`}>
                {formatAmount(row?.liability)}
              </span>

              <span className="mb-detail-label">Profit</span>
              <span
                className={`mb-detail-value ${getAmountColorClass(row?.pnl)}`}>
                {formatAmount(row?.pnl)}
              </span>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

MobileBetRow.propTypes = {
  row: PropTypes.object.isRequired,
};

export default MobileBetRow;
