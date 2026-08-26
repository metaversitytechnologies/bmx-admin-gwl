import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

// A collapsible card shell shared by the Match Bets and Session Bets
// sections. Collapsing is a user convenience only — it defaults to
// expanded so no data is hidden on load.
const BetSectionCard = ({ icon, title, count, children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="msb-card">
      <div className="msb-card-header">
        <div className="msb-card-heading">
          <span className="msb-card-icon">{icon}</span>
          <span className="msb-card-title">{title}</span>
          <span className="msb-card-count">{count}</span>
        </div>
        <button
          type="button"
          className={`msb-card-toggle${expanded ? " is-open" : ""}`}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}>
          <ChevronDown size={16} strokeWidth={2} />
        </button>
      </div>
      {expanded && <div className="msb-card-body">{children}</div>}
    </div>
  );
};

BetSectionCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default BetSectionCard;
