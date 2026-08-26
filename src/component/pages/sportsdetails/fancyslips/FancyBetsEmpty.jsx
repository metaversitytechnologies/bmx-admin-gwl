import { Target } from "lucide-react";

const FancyBetsEmpty = () => (
  <div className="fb-empty">
    <span className="fb-empty-icon">
      <Target size={20} strokeWidth={1.8} />
    </span>
    <p className="fb-empty-title">No fancy bets found</p>
    <p className="fb-empty-subtitle">Try a different user or fancy market.</p>
  </div>
);

export default FancyBetsEmpty;
