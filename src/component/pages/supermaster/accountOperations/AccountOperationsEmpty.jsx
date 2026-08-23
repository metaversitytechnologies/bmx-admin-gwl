import { History } from "lucide-react";

const AccountOperationsEmpty = () => (
  <div className="account-operations-empty">
    <span className="account-operations-empty-icon">
      <History size={20} strokeWidth={1.8} />
    </span>
    <p className="account-operations-empty-title">No activity found</p>
    <p className="account-operations-empty-subtitle">
      Try changing the date range or search term.
    </p>
  </div>
);

export default AccountOperationsEmpty;
