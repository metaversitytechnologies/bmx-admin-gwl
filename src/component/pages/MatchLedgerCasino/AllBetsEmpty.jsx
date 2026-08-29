import { ListChecks } from "lucide-react";

const AllBetsEmpty = () => (
  <div className="ab-empty">
    <span className="ab-empty-icon">
      <ListChecks size={20} strokeWidth={1.8} />
    </span>
    <p className="ab-empty-title">No bets found</p>
    <p className="ab-empty-subtitle">No bets were found for this casino round.</p>
  </div>
);

export default AllBetsEmpty;
