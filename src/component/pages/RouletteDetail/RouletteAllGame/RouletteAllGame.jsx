import { Card, Empty, Spin } from "antd";
import "./RouletteAllGame.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const mockGames = [
  {
    roundId: "R12345",
    matchName: "Roulette Table A",
    netPnl: -45.00,
  },
  {
    roundId: "R67890",
    matchName: "Roulette Table B",
    netPnl: 120.50,
  },
  {
    roundId: "R11223",
    matchName: "Roulette Table C",
    netPnl: 0.00,
  },
];

const RouletteAllGame = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const nav = useNavigate();

  const [allGamesData, setAllGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllGamesData(mockGames);
      setIsLoading(false);
    }, 1000); // simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const handleShowBets = (val) => {
    nav(`/casino/show-bets/${val}`, { state: { state, id } });
  };

  return (
    <Card
      className="sport_detail main_match_ledger"
      title={`${state?.isAuraDetails || "Roulette"} ${state?.rouletteDate || ""}`}
      extra={<button onClick={() => nav(-1)}>Back</button>}
    >
      <div className="table_section ant-spin-nested-loading" style={{ marginBottom: "12px" }}>
        {isLoading ? (
          <Spin className="spin_icon betting_icon comp_spin" size="large" />
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>S no.</th>
                  <th>Game ID</th>
                  <th className="text-right">Match Name</th>
                  <th className="text-right">Net Pnl</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {allGamesData?.length > 0 ? (
                  allGamesData.map((res, idx) => (
                    <tr key={res.roundId}>
                      <td>{idx + 1}</td>
                      <td>{res.roundId}</td>
                      <td className="text-right">{res.matchName}</td>
                      <td className={`text-right ${res.netPnl < 0 ? "text_danger" : res.netPnl > 0 ? "text_success" : ""}`}>
                        {res.netPnl.toFixed(2)}
                      </td>
                      <td className="text-center">
                        <button className="action_btn" onClick={() => handleShowBets(res.roundId)}>
                          Show Bets
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </Card>
  );
};

export default RouletteAllGame;
