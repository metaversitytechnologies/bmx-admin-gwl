import { useRef } from "react";
import { ChevronDown, ListTree } from "lucide-react";
import PropTypes from "prop-types";

const VISIBLE_ON_MOBILE = 5;

const SelectAllCheckbox = ({ allSelected, someSelected, onToggle, label }) => {
  const ref = useRef(null);
  return (
    <label className="pmr-row pmr-row-header">
      <input
        ref={(el) => {
          ref.current = el;
          if (el) el.indeterminate = !allSelected && someSelected;
        }}
        type="checkbox"
        className="pmr-checkbox"
        checked={allSelected}
        onChange={() => onToggle(!allSelected)}
        aria-label={label}
      />
      <span className="pmr-row-label">Session</span>
      <span className="pmr-row-value pmr-row-value-header">Declare</span>
    </label>
  );
};

SelectAllCheckbox.propTypes = {
  allSelected: PropTypes.bool.isRequired,
  someSelected: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

const SessionDeclareCard = ({
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
  const allSelected = rows.length > 0 && rows.every((r) => selected.includes(r.sessionId));
  const someSelected = rows.some((r) => selected.includes(r.sessionId));

  return (
    <div className="pmr-card">
      <div className="pmr-card-heading">
        <ListTree size={14} strokeWidth={2} />
        Session (Declare)
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
          <p>Couldn&apos;t load sessions.</p>
          <button type="button" onClick={onRetry}>
            Retry
          </button>
        </div>
      ) : rows.length === 0 ? (
        <p className="pmr-empty-text">No sessions available for this match.</p>
      ) : (
        <>
          <SelectAllCheckbox
            allSelected={allSelected}
            someSelected={someSelected}
            onToggle={onToggleAll}
            label="Select all sessions"
          />

          <div className={`pmr-rows${expanded ? " is-expanded" : ""}`}>
            {rows.map((row) => {
              const isChecked = selected.includes(row.sessionId);
              const hasDeclare =
                row.declare !== null && row.declare !== undefined && row.declare !== "";
              return (
                <label className="pmr-row" key={row.sessionId}>
                  <input
                    type="checkbox"
                    className="pmr-checkbox"
                    checked={isChecked}
                    onChange={() => onToggleRow(row.sessionId)}
                    aria-label={`Select ${row.sessionName}`}
                  />
                  <span className="pmr-row-label" title={row.sessionName}>
                    {row.sessionName}
                  </span>
                  <span className="pmr-row-value">
                    <span className="pmr-declare-badge">
                      {hasDeclare ? row.declare : "—"}
                    </span>
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

SessionDeclareCard.propTypes = {
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

export default SessionDeclareCard;
