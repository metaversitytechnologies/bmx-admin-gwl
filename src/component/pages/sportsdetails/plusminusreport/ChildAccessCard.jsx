import { useRef } from "react";
import { ChevronDown, Users } from "lucide-react";
import PropTypes from "prop-types";
import { convertCode } from "../../../../store/constant";

const VISIBLE_ON_MOBILE = 5;

const ChildAccessCard = ({
  rows,
  selected,
  onToggleRow,
  onToggleAll,
  isLoading,
  isError,
  onRetry,
  expanded,
  onToggleExpand,
}) => {
  const headerRef = useRef(null);
  const allSelected = rows.length > 0 && rows.every((r) => selected.includes(r.userId));
  const someSelected = rows.some((r) => selected.includes(r.userId));

  return (
    <div className="pmr-card">
      <div className="pmr-card-heading">
        <Users size={14} strokeWidth={2} />
        Child
        {rows.length > 0 && <span className="pmr-count-badge">{rows.length}</span>}
      </div>

      {isLoading ? (
        <div className="pmr-skeleton-rows">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="pmr-skeleton-row" key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="pmr-error-state">
          <p>Couldn&apos;t load child accounts.</p>
          <button type="button" onClick={onRetry}>
            Retry
          </button>
        </div>
      ) : rows.length === 0 ? (
        <p className="pmr-empty-text">No child accounts available.</p>
      ) : (
        <>
          <label className="pmr-row pmr-row-header">
            <input
              ref={(el) => {
                headerRef.current = el;
                if (el) el.indeterminate = !allSelected && someSelected;
              }}
              type="checkbox"
              className="pmr-checkbox"
              checked={allSelected}
              onChange={() => onToggleAll(!allSelected)}
              aria-label="Select all child accounts"
            />
            <span className="pmr-row-label">Child</span>
          </label>

          <div className={`pmr-rows${expanded ? " is-expanded" : ""}`}>
            {rows.map((row) => {
              const isChecked = selected.includes(row.userId);
              const displayCode = convertCode(row.userId);
              return (
                <label className="pmr-row" key={row.userId}>
                  <input
                    type="checkbox"
                    className="pmr-checkbox"
                    checked={isChecked}
                    onChange={() => onToggleRow(row.userId)}
                    aria-label={`Select ${displayCode}`}
                  />
                  <span className="pmr-row-label" title={displayCode}>
                    {displayCode}
                  </span>
                </label>
              );
            })}
          </div>

          {rows.length > VISIBLE_ON_MOBILE && (
            <button type="button" className="pmr-view-all" onClick={onToggleExpand}>
              {expanded ? "View less" : `View all (${rows.length})`}
              <ChevronDown
                size={14}
                strokeWidth={2}
                className={expanded ? "pmr-chevron-flipped" : ""}
              />
            </button>
          )}
        </>
      )}
    </div>
  );
};

ChildAccessCard.propTypes = {
  rows: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onToggleRow: PropTypes.func.isRequired,
  onToggleAll: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  onRetry: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
};

export default ChildAccessCard;
