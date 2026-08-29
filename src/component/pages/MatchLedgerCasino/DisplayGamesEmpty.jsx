import { LayoutGrid } from "lucide-react";

const DisplayGamesEmpty = () => (
  <div className="dg-empty">
    <span className="dg-empty-icon">
      <LayoutGrid size={20} strokeWidth={1.8} />
    </span>
    <p className="dg-empty-title">No game rounds found</p>
    <p className="dg-empty-subtitle">Completed rounds for this table will appear here.</p>
  </div>
);

export default DisplayGamesEmpty;
