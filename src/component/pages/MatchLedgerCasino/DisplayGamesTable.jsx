import { Clock3, Eye } from "lucide-react";
import moment from "moment";
import PropTypes from "prop-types";
import DisplayGamesEmpty from "./DisplayGamesEmpty";
import { getPnlColorClass } from "./displayGamesUtils";

const DisplayGamesTable = ({ rows, onShowBets }) => (
  <div className="table_section admin-details-table-scroll display-games-table-scroll">
    <table className="admin-details-table display-games-table">
      <thead>
        <tr>
          <th>S No.</th>
          <th>Game ID</th>
          <th>Started At</th>
          <th>Plus/Minus</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map(({ round, globalIndex }) => (
            <tr key={round.roundId ?? globalIndex}>
              <td data-label="S No.">
                <span className="dg-sno-badge">{globalIndex + 1}</span>
              </td>
              <td data-label="Game ID" className="dg-game-id">
                {round.roundId}
              </td>
              <td data-label="Started At" className="dg-started-at">
                <Clock3
                  size={14}
                  strokeWidth={1.8}
                  className="dg-started-at-icon"
                />
                <span>{moment().format("YYYY-MM-DD HH:mm:ss A")}</span>
              </td>
              <td
                data-label="Plus/Minus"
                className={`dg-pnl ${getPnlColorClass(round.pnl)}`}>
                {round.pnl}
              </td>
              <td data-label="Action">
                <button
                  type="button"
                  className="dg-show-bets-btn"
                  onClick={() => onShowBets(round.roundId)}>
                  <Eye size={14} strokeWidth={1.8} />
                  <span>Show Bets</span>
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>
              <DisplayGamesEmpty />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

DisplayGamesTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      round: PropTypes.object.isRequired,
      globalIndex: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onShowBets: PropTypes.func.isRequired,
};

export default DisplayGamesTable;
