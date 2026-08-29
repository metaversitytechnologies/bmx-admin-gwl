import { Clock3, UserRound } from "lucide-react";
import PropTypes from "prop-types";
import AllBetsEmpty from "./AllBetsEmpty";
import { getPnlColorClass } from "./displayGamesUtils";

const AllBetsTable = ({ rows }) => (
  <div className="table_section admin-details-table-scroll all-bets-table-scroll">
    <table className="admin-details-table all-bets-table">
      <colgroup>
        <col style={{ width: "190px" }} />
        <col style={{ width: "120px" }} />
        <col style={{ width: "200px" }} />
        <col style={{ width: "100px" }} />
        <col style={{ width: "90px" }} />
        <col style={{ width: "140px" }} />
        <col style={{ width: "140px" }} />
        <col style={{ width: "100px" }} />
        <col style={{ width: "100px" }} />
      </colgroup>
      <thead>
        <tr>
          <th>Date</th>
          <th>Client</th>
          <th>RoundId</th>
          <th>Bet Type</th>
          <th>Odds</th>
          <th>Player</th>
          <th>Winner</th>
          <th>Stake</th>
          <th>PNL</th>
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((bet, index) => (
            <tr key={`${bet.marketId}-${bet.userId}-${index}`}>
              <td data-label="Date">
                <span className="ab-date">
                  <span>{bet.date}</span>
                </span>
              </td>
              <td data-label="Client">
                <span className="ab-client-badge">{bet.userId}</span>
              </td>
              <td data-label="RoundId" className="ab-round-id">
                {bet.marketId}
              </td>
              <td data-label="Bet Type">
                <span className="ab-type-badge">{bet.isBack ? "K" : "L"}</span>
              </td>
              <td data-label="Odds" className="ab-odds">
                {bet.odds}
              </td>
              <td data-label="Player">
                <span className="ab-player">
                  <span>{bet.selectionName}</span>
                </span>
              </td>
              <td data-label="Winner">
                <span className="ab-winner">
                  <span>{bet.winner}</span>
                </span>
              </td>
              <td data-label="Stake" className="ab-stake">
                {bet.stake}
              </td>
              <td
                data-label="PNL"
                className={`ab-pnl ${getPnlColorClass(bet.pnl)}`}>
                {bet.pnl}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9}>
              <AllBetsEmpty />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

AllBetsTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default AllBetsTable;
