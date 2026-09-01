import { Empty } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const formatGameType = (value = "") => {
  const upperValue = String(value).toUpperCase();

  if (upperValue.includes("JODI")) return "SINGLE JODI";
  if (upperValue.includes("HARUP") && upperValue.includes("ANDAR")) return "HARUP ANDAR";
  if (upperValue.includes("HARUP") && upperValue.includes("BAHAR")) return "HARUP BAHAR";

  return String(value || "-").replace(/_/g, " ");
};

const formatBetTime = (value) => {
  if (!value) return "-";

  const parsed = dayjs(value);
  if (!parsed.isValid()) return value;

  return (
    <>
      <span>{parsed.format("DD MMM YYYY")}</span>
      <span>{parsed.format("hh:mm A")}</span>
    </>
  );
};

const formatPnl = (value) => {
  const amount = Number(value || 0);
  const formatted = Math.abs(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (amount > 0) return `+${formatted}`;
  if (amount < 0) return `-${formatted}`;

  return formatted;
};

const MatkaBetsTable = ({ bets = [], matchName = "", showId = true }) => {
  const colSpan = showId ? 10 : 9;

  return (
    <div className="table_section statement_tabs_data ant-spin-nested-loading matka-bets-table-section">
      <table className="live_table login_data_table matka-bets-table">
        <thead>
          <tr>
            {showId && <th>ID</th>}
            <th>MATKA NAME</th>
            <th>GAME</th>
            <th>RATE</th>
            <th>BET NUM</th>
            <th>STACK</th>
            <th>P&L</th>
            <th>WINNER</th>
            <th>STATUS</th>
            <th>CREATED AT</th>
          </tr>
        </thead>
        <tbody>
          {bets.length > 0 ? (
            bets.map((bet, index) => (
              <tr key={`${bet?.betId || bet?.id || index}`}>
                {showId && (
                  <td data-label="ID">
                    <span className="matka-bet-id-badge">
                      {bet?.betId || bet?.id || index + 1}
                    </span>
                  </td>
                )}
                <td data-label="Matka Name">
                  <span className="matka-bet-name">{matchName || "-"}</span>
                </td>
                <td data-label="Game">
                  <span className="matka-bet-game-tag">
                    {formatGameType(bet.matkaName)}
                  </span>
                </td>
                <td data-label="Rate">{bet.rate ?? "-"}</td>
                <td data-label="Bet Num">
                  <span className="matka-bet-num-badge">{bet.nation ?? "-"}</span>
                </td>
                <td data-label="Stack">{bet.amount ?? "-"}</td>
                <td data-label="P&L">
                  <span
                    className={
                      Number(bet.pnl || 0) > 0
                        ? "matka-bet-pnl matka-bet-pnl-positive"
                        : Number(bet.pnl || 0) < 0
                          ? "matka-bet-pnl matka-bet-pnl-negative"
                          : "matka-bet-pnl matka-bet-pnl-zero"
                    }>
                    {formatPnl(bet.pnl)}
                  </span>
                </td>
                <td data-label="Winner">
                  {bet.declared === "null" || !bet.declared ? "-" : bet.declared}
                </td>
                <td data-label="Status">
                  <span
                    className={
                      bet.back
                        ? "matka-bet-status matka-bet-status-back"
                        : "matka-bet-status matka-bet-status-lay"
                    }>
                    {bet.back ? "BACK" : "LAY"}
                  </span>
                </td>
                <td data-label="Created At">
                  <span className="matka-bet-created">{formatBetTime(bet.betTime)}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={colSpan} className="matka-bets-empty-cell">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

MatkaBetsTable.propTypes = {
  bets: PropTypes.array,
  matchName: PropTypes.string,
  showId: PropTypes.bool,
};

export default MatkaBetsTable;
