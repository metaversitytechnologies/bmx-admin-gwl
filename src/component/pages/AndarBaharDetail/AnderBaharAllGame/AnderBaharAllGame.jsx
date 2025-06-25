import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const data = [
  {
    key: 1,
    sno: 1,
    game_id: 641233,
    started_at: "4 Jul 03:47 PM",
    winner: 21,
    plus_minus: 27.44,
    action: "Show Bets",
  },
  {
    key: 2,
    sno: 2,
    game_id: 641234,
    started_at: "5 Jul 03:47 PM",
    winner: 21,
    plus_minus: 27.44,
    action: "Show Bets",
  },
  {
    key: 3,
    sno: 3,
    game_id: 641234,
    started_at: "6 Jul 03:47 PM",
    winner: 21,
    plus_minus: 27.44,
    action: "Show Bets",
  },
  {
    key: 4,
    sno: 4,
    game_id: 641235,
    started_at: "7 Jul 03:47 PM",
    winner: 21,
    plus_minus: 27.44,
    action: "Show Bets",
  },
];

const AnderBaharAllGame = () => {
  const nav = useNavigate();

  return (
    <Card
      className="sport_detail main_match_ledger all_casino_games"
      title="AndarBahar 04-07-2023"
      extra={<button onClick={() => nav(-1)}>Back</button>}>
      <div className="matchladger_total">
        <p>
          Total : <span style={{ color: "red" }}>-36.96</span>
        </p>
      </div>
      <div className="table_section match_casino_ledger" style={{ marginBottom: "12px" }}>
        <table>
          <thead>
            <tr>
              <th>S no.</th>
              <th>Game ID</th>
              <th>Started AT</th>
              {/* <th>Winner</th> */}
              <th>Plus/Minus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((res) => (
              <tr key={res.key}>
                <td>{res.sno}</td>
                <td>{res.game_id}</td>
                <td>{res.started_at}</td>
                {/* <td>{res.winner}</td> */}
                <td>{res.plus_minus}</td>
                <td>
                  <button
                    className="action_btn"
                    onClick={() => {
                      nav(`/Casino/show-bet/${res?.game_id}`);
                    }}>
                    {res.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Divider />
    <Pagination
      className="pagination_main ledger_pagination"
      defaultCurrent={1}
      total={50}
    /> */}
    </Card>
  );
};

export default AnderBaharAllGame;
