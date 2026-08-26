import { Inbox } from "lucide-react";

const ClientReportEmpty = () => (
  <div className="cr2-empty">
    <span className="cr2-empty-icon">
      <Inbox size={20} strokeWidth={1.8} />
    </span>
    <p className="cr2-empty-title">No client report records found</p>
  </div>
);

export default ClientReportEmpty;
