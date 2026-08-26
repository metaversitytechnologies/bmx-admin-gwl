import { Calendar, CircleCheck } from "lucide-react";
import PropTypes from "prop-types";
import FinishedGameActionMenu from "./FinishedGameActionMenu";
import FinishedGameEmpty from "./FinishedGameEmpty";
import {
  formatAmount,
  formatDateParts,
  getPnlColorClass,
  isSuspended,
} from "./finishedGameUtils";

// Mirrors Sports Detail's mobile card-list pattern (not a horizontal-scroll
// table) — every field from the desktop table is still present, just
// stacked into a compact card.
const FinishedGameMobileList = ({
  rows,
  dropdownStates,
  toggleDropdown,
  closeAllDropdowns,
  onSelectMatch,
  onPlusMinus,
  onNavigate,
}) => (
  <div className="fg-mobile-list">
    {rows.length > 0 ? (
      rows.map(({ match, globalIndex }) => {
        const matchTime = formatDateParts(match.createdOn, "HH:mm");
        const declared = formatDateParts(match.createdOn, "h:mm A");
        const suspended = isSuspended(match.winner);
        return (
          <div className="fg-mobile-item" key={match.key ?? globalIndex}>
            <div className="fg-mobile-top">
              <span className="fg-mobile-name" title={match.eventName}>
                {match.eventName}
              </span>
              <FinishedGameActionMenu
                match={match}
                isOpen={dropdownStates[globalIndex]}
                onToggle={() => toggleDropdown(globalIndex)}
                onCloseAll={closeAllDropdowns}
                onSelectMatch={onSelectMatch}
                onPlusMinus={onPlusMinus}
                onNavigate={onNavigate}
              />
            </div>

            <div className="fg-mobile-row">
              <span className="fg-competition-badge">T20</span>
              <span className={`fg-pnl fg-mobile-pnl ${getPnlColorClass(match.pnl)}`}>
                {formatAmount(match.pnl)}
              </span>
            </div>

            <div className="fg-mobile-field">
              <span className="fg-mobile-label">
                <Calendar size={11} strokeWidth={1.8} />
                Match Time
              </span>
              <span className="fg-mobile-value">
                {matchTime.date} · {matchTime.time}
              </span>
            </div>

            <div className="fg-mobile-field">
              <span className="fg-mobile-label">Declared</span>
              <span className="fg-mobile-value">
                {declared.date} · {declared.time}
              </span>
            </div>

            <div className="fg-mobile-field">
              <span className="fg-mobile-label">Result</span>
              {suspended ? (
                <span className="fg-result-badge fg-result-suspended">
                  <span className="fg-result-dot" />
                  Suspended
                </span>
              ) : (
                <span className="fg-result-badge fg-result-winner">
                  <CircleCheck size={13} strokeWidth={2} />
                  {match.winner}
                </span>
              )}
            </div>
          </div>
        );
      })
    ) : (
      <FinishedGameEmpty />
    )}
  </div>
);

FinishedGameMobileList.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      match: PropTypes.object.isRequired,
      globalIndex: PropTypes.number.isRequired,
    })
  ).isRequired,
  dropdownStates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  toggleDropdown: PropTypes.func.isRequired,
  closeAllDropdowns: PropTypes.func.isRequired,
  onSelectMatch: PropTypes.func.isRequired,
  onPlusMinus: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default FinishedGameMobileList;
