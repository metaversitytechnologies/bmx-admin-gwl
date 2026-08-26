import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

// Same 9 navigation targets/handlers the page has always used — only the
// trigger element (now a real <button>) and open/close wiring are new.
const SportsActionMenu = ({
  match,
  isOpen,
  onToggle,
  onCloseAll,
  onSelectMatch,
  onPlusMinus,
  onNavigate,
}) => (
  <Dropdown
    className="table_dropdown sport_droupdown"
    open={isOpen}
    onOpenChange={onToggle}
    menu={{
      items: [
        {
          label: (
            <Link
              onClick={onCloseAll}
              to={`/Events/${match.matchId}/4/live-report`}
              className="title_section">
              Match and Session Position
            </Link>
          ),
          key: "0",
        },
        {
          label: (
            <p
              className="title_section"
              onClick={() => onPlusMinus(match.matchId)}>
              Match and Session Plus Minus
            </p>
          ),
          key: "1",
        },
        {
          label: (
            <p
              className="title_section"
              onClick={() =>
                onNavigate(`/matchplusminus/${match?.matchId}/${match?.matchName}`)
              }>
              Match and Session Plus Minus 2
            </p>
          ),
          key: "2",
        },
        {
          label: (
            <Link
              onClick={onCloseAll}
              className="title_section"
              to={`/match-slips/${match.matchId}/1`}>
              Display Match Bets
            </Link>
          ),
          key: "3",
        },
        {
          label: (
            <Link
              onClick={onCloseAll}
              className="title_section"
              to={`/fancy-slips/${match.matchId}/1`}>
              Display Session Bets
            </Link>
          ),
          key: "4",
        },
        {
          label: (
            <Link
              onClick={onCloseAll}
              className="title_section"
              to={`/matchsessionbet/${match.matchId}/1`}>
              Match And Session Bet
            </Link>
          ),
          key: "5",
        },
        {
          label: (
            <Link
              onClick={onCloseAll}
              className="title_section"
              to={`/completed-fancy-slips/${match.matchId}`}>
              Completed Fancies
            </Link>
          ),
          key: "6",
        },
        {
          label: (
            <Link
              onClick={onCloseAll}
              className="title_section"
              to={`/agent-list/${match.matchId}/${match.matchName}`}>
              Agent Plus Minus
            </Link>
          ),
          key: "7",
        },
        {
          label: (
            <Link
              onClick={onCloseAll}
              className="title_section"
              to={`/rejectedBetsByEvent/${match.matchId}/${match?.matchName}`}>
              Rejected Bet
            </Link>
          ),
          key: "8",
        },
      ],
      className: "sport_list",
    }}
    trigger={["click", "contextMenu"]}>
    <button
      type="button"
      className={`admin-details-row-menu sports-details-action-button${
        isOpen ? " admin-details-row-menu-open sports-details-action-button-open" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        onSelectMatch(match.matchName);
      }}
      aria-label="Row actions">
      <Space>
        <ChevronDown size={14} strokeWidth={2} />
      </Space>
    </button>
  </Dropdown>
);

SportsActionMenu.propTypes = {
  match: PropTypes.shape({
    matchId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    matchName: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onCloseAll: PropTypes.func.isRequired,
  onSelectMatch: PropTypes.func.isRequired,
  onPlusMinus: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default SportsActionMenu;
