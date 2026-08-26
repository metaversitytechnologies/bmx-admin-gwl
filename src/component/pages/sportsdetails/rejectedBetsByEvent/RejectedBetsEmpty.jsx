import { ShieldCheck } from "lucide-react";

const RejectedBetsEmpty = () => (
  <div className="rb-empty">
    <span className="rb-empty-icon">
      <ShieldCheck size={20} strokeWidth={1.8} />
    </span>
    <p className="rb-empty-title">No rejected or cancelled bets found</p>
    <p className="rb-empty-subtitle">
      Try changing the selected user or filters.
    </p>
  </div>
);

export default RejectedBetsEmpty;
