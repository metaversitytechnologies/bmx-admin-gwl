import { Activity, BarChart3 } from "lucide-react";
import PropTypes from "prop-types";
import { formatDecimal } from "./matchBetsUtils";

const BookmakerOverview = ({ summary }) => {
  if (!summary?.length) return null;

  return (
    <div className="mb-overview">
      <div className="mb-overview-heading">
        <Activity size={14} strokeWidth={2} />
        Bookmaker Overview
      </div>
      <div className="mb-overview-grid">
        {summary.map((item, index) => {
        
          const isPositive = item?.pnl > 0;
          return (
            <div
              key={item?.selectionId ?? index}
              className={`mb-overview-card ${
                isPositive ? "mb-is-positive" : "mb-is-negative"
              }`}>
              <span className="mb-overview-icon">
                <BarChart3 size={16} strokeWidth={1.8} />
              </span>
              <span className="mb-overview-value">
                {formatDecimal(item?.pnl)}
              </span>
              
              <span className="mb-overview-count">(0)</span>
              <span className="mb-overview-team" title={item?.team}>
                {item?.team}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

BookmakerOverview.propTypes = {
  summary: PropTypes.array,
};

export default BookmakerOverview;
