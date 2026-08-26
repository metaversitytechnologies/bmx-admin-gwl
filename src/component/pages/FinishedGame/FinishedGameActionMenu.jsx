import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

// Same 8 navigation targets/handlers the original page's row dropdown had
// (inplay is "0" here since these are completed, not live, matches) — only
// the trigger element and open/close wiring are new, mirroring
// SportsActionMenu's established pattern.
const FinishedGameActionMenu = ({
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
            <p
              className="title_section"
              onClick={() => onPlusMinus(match.matchId)}>
              Match and Session Plus Minus
            </p>
          ),
          key: "0",
        },
        {
          label: (
            <p
              className="title_section"
              onClick={() =>
                onNavigate(`/matchplusminus/${match?.matchId}/${match?.eventName}`)
              }>
              Match and Session Plus Minus 2
            </p>
          ),
          key: "1",
        },
        {
          label: (
            <Link
              onClick={onCloseAll}
              className="title_section"
              to={`/match-slips/${match.matchId}/0`}>
              Display Match Bets
            </Link>
          ),
          key: "2",
        },
        {
          label: (
            <Link
              onClick={onCloseAll}
              className="title_section"
              to={`/fancy-slips/${match.matchId}/0`}>
              Display Session Bets
            </Link>
          ),
          key: "3",
        },
        {
          label: (
            <Link
              onClick={onCloseAll}
              className="title_section"
              to={`/matchsessionbet/${match.matchId}/0`}>
              Match And Session Bet
            </Link>
          ),
          key: "4",
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
          key: "5",
        },
        {
          label: (
            <Link
              onClick={onCloseAll}
              className="title_section"
              to={`/agent-list/${match.matchId}/${match?.eventName}`}>
              Agent Plus Minus
            </Link>
          ),
          key: "6",
        },
        {
          label: (
            <Link
              onClick={onCloseAll}
              className="title_section"
              to={`/rejectedBetsByEvent/${match.matchId}/${match?.eventName}`}>
              Rejected Bet
            </Link>
          ),
          key: "7",
        },
      ],
      className: "sport_list",
    }}
    trigger={["click", "contextMenu"]}>
    <button
      type="button"
      className={`admin-details-row-menu finished-game-action-button${
        isOpen ? " admin-details-row-menu-open finished-game-action-button-open" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        onSelectMatch(match.eventName);
      }}
      aria-label="Row actions">
      <Space>
        <ChevronDown size={14} strokeWidth={2} />
      </Space>
    </button>
  </Dropdown>
);

FinishedGameActionMenu.propTypes = {
  match: PropTypes.shape({
    matchId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    eventName: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onCloseAll: PropTypes.func.isRequired,
  onSelectMatch: PropTypes.func.isRequired,
  onPlusMinus: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default FinishedGameActionMenu;
