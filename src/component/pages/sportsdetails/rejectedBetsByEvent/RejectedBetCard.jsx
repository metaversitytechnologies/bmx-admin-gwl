import PropTypes from "prop-types";
import TypeBadge from "./TypeBadge";
import BetStatusBadge from "./BetStatusBadge";
import {
  formatAgent,
  formatAmount,
  formatDateParts,
  parseRemark,
} from "./rejectedBetsUtils";

// Reusable mobile record card — carries every field the desktop table row
// shows, restacked for a narrow viewport. Data logic mirrors the desktop
// columns exactly (see RejectedBetsTable) so the two views never drift.
const RejectedBetCard = ({ row, teamName }) => {
  const { date, time } = formatDateParts(row.time);
  const remark = parseRemark(row.selectionName);
  const agent = formatAgent(row.parentId);
  const isAgentEmpty = agent === "—";

  return (
    <div className="rb-card">
      <div className="rb-card-top">
        <span className="rb-client-badge">{row.userId}</span>
        <BetStatusBadge label="Deleted" />
      </div>

      <div className="rb-card-team" title={teamName}>
        {teamName}
      </div>

      <div className="rb-card-metrics">
        <div className="rb-card-metric">
          <span className="rb-card-metric-label">Rate</span>
          <span className="rb-card-metric-value">
            {Number(row.rate || 0).toFixed(2)}
          </span>
        </div>
        <div className="rb-card-metric">
          <span className="rb-card-metric-label">Amount</span>
          <span className="rb-card-metric-value rb-card-metric-amount">
            {formatAmount(row.amount)}
          </span>
        </div>
        <div className="rb-card-metric">
          <span className="rb-card-metric-label">Run</span>
          <span className="rb-card-metric-value">{row.run ?? "—"}</span>
        </div>
        <TypeBadge mode={row.mode} />
      </div>

      <div className="rb-card-meta">
        <span>{date}</span>
        {time && (
          <>
            <span className="rb-card-meta-dot" aria-hidden="true">
              ·
            </span>
            <span>{time}</span>
          </>
        )}
        {!isAgentEmpty && (
          <>
            <span className="rb-card-meta-dot" aria-hidden="true">
              ·
            </span>
            <span>Agent {agent}</span>
          </>
        )}
      </div>

      {remark.main && (
        <div className="rb-card-remark">
          <span className="rb-card-remark-text">{remark.main}</span>
          {remark.reason && (
            <span className="rb-reason-badge">{remark.reason}</span>
          )}
        </div>
      )}
    </div>
  );
};

RejectedBetCard.propTypes = {
  row: PropTypes.object.isRequired,
  teamName: PropTypes.string,
};

export default RejectedBetCard;
