import { Coins, UsersRound } from "lucide-react";
import PropTypes from "prop-types";

const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");

const LimitStats = ({ totalAdmins, totalChips }) => (
  <div className="admin-details-kpis update-limit-kpis">
    <div className="admin-kpi-card admin-kpi-card-purple">
      <span className="admin-kpi-icon">
        <UsersRound size={20} strokeWidth={1.8} />
      </span>
      <div>
        <p>Total Admins</p>
        <strong>{formatNumber(totalAdmins)}</strong>
        <small>All admins on this list</small>
      </div>
    </div>
    <div className="admin-kpi-card admin-kpi-card-green">
      <span className="admin-kpi-icon">
        <Coins size={20} strokeWidth={1.8} />
      </span>
      <div>
        <p>Total Chips</p>
        <strong>{formatNumber(totalChips)}</strong>
        <small>Sum for current page</small>
      </div>
    </div>
  </div>
);

LimitStats.propTypes = {
  totalAdmins: PropTypes.number,
  totalChips: PropTypes.number,
};

export default LimitStats;
