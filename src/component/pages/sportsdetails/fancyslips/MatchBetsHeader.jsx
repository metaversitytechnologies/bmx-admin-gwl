import { ArrowLeft, Receipt } from "lucide-react";
import PropTypes from "prop-types";

const MatchBetsHeader = ({ title, onBack }) => (
  <div className="admin-details-header match-bets-header">
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">
        <Receipt size={20} strokeWidth={1.8} />
      </span>
      <div>
        <div className="team_name admin-details-title">{title}</div>
      </div>
    </div>
    <div className="show_btn">
      <button type="button" className="admin-details-back" onClick={onBack}>
        <ArrowLeft size={15} strokeWidth={1.8} />
        <span className="match-bets-back-label">Back</span>
      </button>
    </div>
  </div>
);

MatchBetsHeader.propTypes = {
  title: PropTypes.string,
  onBack: PropTypes.func.isRequired,
};

export default MatchBetsHeader;
