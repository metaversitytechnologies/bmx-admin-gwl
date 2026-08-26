import { CircleCheck, CircleDot } from "lucide-react";
import PropTypes from "prop-types";
import FinishedGameActionMenu from "./FinishedGameActionMenu";
import FinishedGameEmpty from "./FinishedGameEmpty";
import {
  formatAmount,
  formatDateParts,
  getPnlColorClass,
  isSuspended,
} from "./finishedGameUtils";

const FinishedGameDesktopTable = ({
  rows,
  dropdownStates,
  toggleDropdown,
  closeAllDropdowns,
  onSelectMatch,
  onPlusMinus,
  onNavigate,
}) => (
  <div className="table_section admin-details-table-scroll finished-game-table-scroll">
    <table className="admin-details-table finished-game-table">
      <thead>
        <tr>
          <th>Action</th>
          <th>Match</th>
          <th>Match Time</th>
          <th>Declared</th>
          <th>Competition</th>
          <th>Result</th>
          <th className="fg-num-col">P/L</th>
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map(({ match, globalIndex }) => {
            const matchTime = formatDateParts(match.createdOn, "HH:mm:ss");
            const declared = formatDateParts(match.createdOn, "h:mm A");
            const suspended = isSuspended(match.winner);
            return (
              <tr key={match.key ?? globalIndex}>
                <td data-label="Action">
                  <FinishedGameActionMenu
                    match={match}
                    isOpen={dropdownStates[globalIndex]}
                    onToggle={() => toggleDropdown(globalIndex)}
                    onCloseAll={closeAllDropdowns}
                    onSelectMatch={onSelectMatch}
                    onPlusMinus={onPlusMinus}
                    onNavigate={onNavigate}
                  />
                </td>
                <td data-label="Match" className="fg-match-cell">
                  <span className="fg-match-icon" aria-hidden="true">
                    <CircleDot size={13} strokeWidth={1.8} />
                  </span>
                  <span className="fg-match-name" title={match.eventName}>
                    {match.eventName}
                  </span>
                </td>
                <td data-label="Match Time">
                  <div className="fg-date-cell">
                    <span>{matchTime.date}</span>
                    {matchTime.time && (
                      <span className="fg-date-time">{matchTime.time}</span>
                    )}
                  </div>
                </td>
                <td data-label="Declared">
                  <div className="fg-date-cell">
                    <span>{declared.date}</span>
                    {declared.time && (
                      <span className="fg-date-time">{declared.time}</span>
                    )}
                  </div>
                </td>
                <td data-label="Competition">
                  <span className="fg-competition-badge">T20</span>
                </td>
                <td data-label="Result">
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
                </td>
                <td
                  data-label="P/L"
                  className={`fg-num-col fg-pnl ${getPnlColorClass(
                    match.pnl
                  )}`}>
                  {formatAmount(match.pnl)}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={7}>
              <FinishedGameEmpty />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

FinishedGameDesktopTable.propTypes = {
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

export default FinishedGameDesktopTable;
