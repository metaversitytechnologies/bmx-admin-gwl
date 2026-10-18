import { Calendar, CircleCheck, Trophy } from "lucide-react";
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
        const matchTime = formatDateParts(match.createdOn, "hh:mm A");
        const declared = formatDateParts(match.createdOn, "h:mm A");
        const suspended = isSuspended(match.winner);
        return (
          <div className="fg-mobile-item" key={match.key ?? globalIndex}>
            <div className="fg-mobile-top">
              <span className="fg-mobile-number">{String(globalIndex + 1).padStart(2, "0")}</span>
              <span className="fg-mobile-name" title={match.eventName}>
                {match.eventName}
              </span>
              <FinishedGameActionMenu
                match={match}
                isOpen={dropdownStates[globalIndex]}
                onToggle={(open) => toggleDropdown(globalIndex, open)}
                onCloseAll={closeAllDropdowns}
                onSelectMatch={onSelectMatch}
                onPlusMinus={onPlusMinus}
                onNavigate={onNavigate}
              />
            </div>

            <div className="fg-mobile-row">
              <span className="fg-competition-badge">T20</span>
            </div>

            <div className="fg-mobile-detail-grid">
              <div className="fg-mobile-detail-content">
                <div className="fg-mobile-field fg-mobile-time-field">
                  <span className="fg-mobile-label"><Calendar size={16} strokeWidth={1.8} /> Match Time</span>
                  <span className="fg-mobile-value">{matchTime.date} · {matchTime.time}</span>
                </div>

                <div className="fg-mobile-field fg-mobile-result-field">
                  <span className="fg-mobile-label"><Trophy size={16} strokeWidth={1.8} /> Result</span>
                  {suspended ? (
                    <span className="fg-result-badge fg-result-suspended">
                      <span className="fg-result-dot" /> Suspended
                    </span>
                  ) : (
                    <span className="fg-result-badge fg-result-winner">
                      <CircleCheck size={13} strokeWidth={2} /> {match.winner}
                    </span>
                  )}
                </div>
              </div>
              <div className={`fg-mobile-pnl-box ${getPnlColorClass(match.pnl)}`}>
                <span className="fg-mobile-pnl-icon" aria-hidden="true">▥</span>
                <span className="fg-pnl fg-mobile-pnl">{formatAmount(match.pnl)}</span>
              </div>
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
