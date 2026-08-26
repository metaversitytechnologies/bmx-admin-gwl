import { Trophy } from "lucide-react";

const SportsEmpty = () => (
  <div className="sports-details-empty">
    <span className="sports-details-empty-icon">
      <Trophy size={20} strokeWidth={1.8} />
    </span>
    <p className="sports-details-empty-title">No fixtures found</p>
    <p className="sports-details-empty-subtitle">
      Try adjusting the date range.
    </p>
  </div>
);

export default SportsEmpty;
