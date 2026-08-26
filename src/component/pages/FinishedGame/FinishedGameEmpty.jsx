import { Trophy } from "lucide-react";

const FinishedGameEmpty = () => (
  <div className="fg-empty">
    <span className="fg-empty-icon">
      <Trophy size={20} strokeWidth={1.8} />
    </span>
    <p className="fg-empty-title">No completed games found</p>
    <p className="fg-empty-subtitle">
      Try changing the date range or game type.
    </p>
  </div>
);

export default FinishedGameEmpty;
