import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import moment from "moment";
import PropTypes from "prop-types";
import SportsActionMenu from "./SportsActionMenu";
import SportsEmpty from "./SportsEmpty";

const SportsMobileList = ({
  rows,
  dropdownStates,
  toggleDropdown,
  closeAllDropdowns,
  onSelectMatch,
  onPlusMinus,
  onNavigate,
}) => (
  <div className="sports-details-mobile-list">
    {rows.length > 0 ? (
      rows.map(({ match, globalIndex }) => (
        <div className="sports-details-mobile-item" key={match.key || globalIndex}>
          <div className="sports-details-mobile-top">
            <span className="sports-details-mobile-title">
              <span className="sports-details-mobile-code">
                {String(globalIndex + 1).padStart(2, "0")} ·
              </span>{" "}
              <Link
                to={`/Events/${match.matchId}/4/live-report`}
                className="sports-details-name-link"
                title={match.matchName}>
                {match.matchName}
              </Link>
            </span>
            <span className="sports-details-status">Inplay</span>
          </div>

          <div className="sports-details-mobile-time">
            <Calendar size={12} strokeWidth={1.8} />
            {moment(match.openDate).format("DD MMM YYYY · hh:mm A")}
          </div>

          <div className="sports-details-mobile-bottom">
            <span className="sports-details-setting-chip">No Change</span>
            <span className="sports-details-mobile-declare">
              Declare: <span className="sports-details-declare">No</span>
            </span>
            <SportsActionMenu
              match={match}
              isOpen={dropdownStates[globalIndex]}
              onToggle={() => toggleDropdown(globalIndex)}
              onCloseAll={closeAllDropdowns}
              onSelectMatch={onSelectMatch}
              onPlusMinus={onPlusMinus}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      ))
    ) : (
      <SportsEmpty />
    )}
  </div>
);

SportsMobileList.propTypes = {
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

export default SportsMobileList;
