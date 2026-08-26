import { Link } from "react-router-dom";
import { Calendar, CircleDot, PlayCircle } from "lucide-react";
import moment from "moment";
import PropTypes from "prop-types";
import SportsActionMenu from "./SportsActionMenu";
import SportsEmpty from "./SportsEmpty";

const SportsDesktopTable = ({
  rows,
  dropdownStates,
  toggleDropdown,
  closeAllDropdowns,
  onSelectMatch,
  onPlusMinus,
  onNavigate,
}) => (
  <div className="table_section admin-details-table-scroll sports-details-table-scroll">
    <table className="admin-details-table sports-details-table">
      <thead>
        <tr>
          <th>Action</th>
          <th>Code</th>
          <th>Name</th>
          <th>Setting</th>
          <th>Time</th>
          <th>Status</th>
          <th>Declare</th>
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map(({ match, globalIndex }) => (
            <tr key={match.key || globalIndex}>
              <td data-label="Action">
                <SportsActionMenu
                  match={match}
                  isOpen={dropdownStates[globalIndex]}
                  onToggle={() => toggleDropdown(globalIndex)}
                  onCloseAll={closeAllDropdowns}
                  onSelectMatch={onSelectMatch}
                  onPlusMinus={onPlusMinus}
                  onNavigate={onNavigate}
                />
              </td>
              <td data-label="Code" className="admin-details-code sports-details-code">
                {String(globalIndex + 1).padStart(2, "0")}
              </td>
              <td data-label="Name" className="sports-details-name">
                <span className="sports-details-name-icon" aria-hidden="true">
                  <CircleDot size={13} strokeWidth={1.8} />
                </span>
                <Link
                  to={`/Events/${match.matchId}/4/live-report`}
                  className="sports-details-name-link"
                  title={match.matchName}>
                  {match.matchName}
                </Link>
              </td>
              <td data-label="Setting">
                <span className="sports-details-setting-chip">No Change</span>
              </td>
              <td data-label="Time" className="admin-details-number sports-details-time">
                <Calendar size={13} strokeWidth={1.8} className="sports-details-time-icon" />
                {moment(match.openDate).format("DD-MM-YYYY HH:mm:ss")}
              </td>
              <td data-label="Status">
                <span className="sports-details-status">
                  <PlayCircle size={13} strokeWidth={2} />
                  Inplay
                </span>
              </td>
              <td data-label="Declare">
                <span className="sports-details-declare">No</span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7}>
              <SportsEmpty />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

SportsDesktopTable.propTypes = {
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

export default SportsDesktopTable;
