import { Ticket, SlidersHorizontal, TrendingUp, TrendingDown, Crown, Users } from "lucide-react";
import PropTypes from "prop-types";

const AllBetsSummary = ({ totalBets, totalStake, totalPnl, totalWinners, totalClients }) => {
  const pnlTone = totalPnl > 0 ? "positive" : totalPnl < 0 ? "negative" : "neutral";

  const items = [
    { key: "bets", icon: Ticket, label: "Total Bets", value: totalBets, tone: "pink" },
    { key: "stake", icon: SlidersHorizontal, label: "Total Stake", value: totalStake.toFixed(2), tone: "indigo" },
    {
      key: "pnl",
      icon: totalPnl < 0 ? TrendingDown : TrendingUp,
      label: "Total PNL",
      value: totalPnl.toFixed(2),
      tone: pnlTone,
      colorValue: true,
    },
    { key: "winners", icon: Crown, label: "Total Winners", value: totalWinners, tone: "amber" },
    { key: "clients", icon: Users, label: "Total Clients", value: totalClients, tone: "violet" },
  ];

  return (
    <div className="ab-summary">
      {items.map(({ key, icon: Icon, label, value, tone, colorValue }) => (
        <div className="ab-summary-item" key={key}>
          <span className={`ab-summary-icon ab-summary-icon-${tone}`}>
            <Icon size={16} strokeWidth={1.8} />
          </span>
          <span className="ab-summary-text">
            <span className="ab-summary-label">{label}</span>
            <span className={`ab-summary-value ${colorValue ? `ab-summary-value-${tone}` : ""}`}>{value}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

AllBetsSummary.propTypes = {
  totalBets: PropTypes.number.isRequired,
  totalStake: PropTypes.number.isRequired,
  totalPnl: PropTypes.number.isRequired,
  totalWinners: PropTypes.number.isRequired,
  totalClients: PropTypes.number.isRequired,
};

export default AllBetsSummary;
