import { Receipt } from "lucide-react";

const AccountStatementEmpty = () => (
  <div className="account-statement-empty">
    <span className="account-statement-empty-icon">
      <Receipt size={20} strokeWidth={1.8} />
    </span>
    <p className="account-statement-empty-title">No transactions found</p>
    <p className="account-statement-empty-subtitle">
      Try changing the date range or account filter.
    </p>
  </div>
);

export default AccountStatementEmpty;
