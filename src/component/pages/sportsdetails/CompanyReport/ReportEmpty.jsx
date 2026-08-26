import { FileBarChart2 } from "lucide-react";

const ReportEmpty = () => (
  <div className="cr-empty">
    <span className="cr-empty-icon">
      <FileBarChart2 size={20} strokeWidth={1.8} />
    </span>
    <p className="cr-empty-title">No report data found</p>
    <p className="cr-empty-subtitle">Try adjusting your search.</p>
  </div>
);

export default ReportEmpty;
