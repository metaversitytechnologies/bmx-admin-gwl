import { Checkbox } from "antd";
import { ListChecks, Settings2, Trophy } from "lucide-react";
import PropTypes from "prop-types";

const MatchSettingsCard = ({ matchName, showOdds, onOddsChange }) => (
  <div className="pmr-settings-card">
    <div className="pmr-card-heading">
      <Settings2 size={14} strokeWidth={2} />
      Match Settings
    </div>

    <div className="pmr-settings-row">
      <span className="pmr-settings-icon">
        <Trophy size={14} strokeWidth={1.8} />
      </span>
      <span className="pmr-settings-label">Match</span>
      <span className="pmr-settings-value" title={matchName}>
        {matchName}
      </span>
    </div>

    <div className="pmr-settings-row">
      <span className="pmr-settings-icon">
        <ListChecks size={14} strokeWidth={1.8} />
      </span>
      <span className="pmr-settings-label">Odds</span>
      <label className="pmr-settings-toggle">
        <Checkbox
          className="pmr-odds-checkbox"
          checked={showOdds}
          onChange={onOddsChange}
        />
        <span className="pmr-settings-toggle-text">
          {showOdds ? "Enabled ✓" : "Disabled"}
        </span>
      </label>
    </div>
  </div>
);

MatchSettingsCard.propTypes = {
  matchName: PropTypes.string.isRequired,
  showOdds: PropTypes.bool.isRequired,
  onOddsChange: PropTypes.func.isRequired,
};

export default MatchSettingsCard;
