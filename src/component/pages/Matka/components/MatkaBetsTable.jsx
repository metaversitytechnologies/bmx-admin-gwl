import { Empty } from "antd";

const MatkaBetsTable = ({ bets = [], matchName = "", showId = true }) => {
  const colSpan = showId ? 10 : 9;

  return (
    <div className="table_section statement_tabs_data ant-spin-nested-loading">
      <table className="live_table login_data_table">
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
                {showId && <td>{bet?.betId || bet?.id || index + 1}</td>}
                <td>{matchName || "-"}</td>
                <td>{bet.matkaName || "-"}</td>
                <td>{bet.rate ?? "-"}</td>
                <td>{bet.nation ?? "-"}</td>
                <td>{bet.amount ?? "-"}</td>
                <td>
                  <span className={bet.pnl >= 0 ? "text_success" : "text_danger"}>
                    {Number(bet.pnl || 0).toFixed(2)}
                  </span>
                </td>
                <td>
                  {bet.declared === "null" || !bet.declared ? "-" : bet.declared}
                </td>
                <td>
                  <span className={bet.back ? "text_info" : "text_danger"}>
                    {bet.back ? "BACK" : "LAY"}
                  </span>
                </td>
                <td>{bet.betTime || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={colSpan}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MatkaBetsTable;
