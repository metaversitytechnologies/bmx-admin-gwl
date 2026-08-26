import { Inbox } from "lucide-react";

const FancyPLEmpty = () => (
  <div className="fpl-empty">
    <span className="fpl-empty-icon">
      <Inbox size={20} strokeWidth={1.8} />
    </span>
    <p className="fpl-empty-title">No profit &amp; loss records found</p>
    <p className="fpl-empty-subtitle">
      Try adjusting the selected user or fancy filter.
    </p>
  </div>
);

export default FancyPLEmpty;
