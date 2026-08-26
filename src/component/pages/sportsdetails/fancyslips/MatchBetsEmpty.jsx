import { Receipt } from "lucide-react";

const MatchBetsEmpty = () => (
  <div className="mb-empty">
    <span className="mb-empty-icon">
      <Receipt size={20} strokeWidth={1.8} />
    </span>
    <p className="mb-empty-title">No bets found</p>
    <p className="mb-empty-subtitle">Try a different user or odds type.</p>
  </div>
);

export default MatchBetsEmpty;
