import { Card, Empty, Spin } from "antd";
import "./ShowBets.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const mockBetData = [
  {
    key: 1,
    date: "2025-06-14 15:22:01",
    clientId: "client_001",
    market: "Straight",
    rate: 2.5,
    selection: "17",
    stake: 100,
    profit: 150,
    loss: 0,
    netpnl: 150,
    isBack: true,
  },
  {
    key: 2,
    date: "2025-06-14 15:23:45",
    clientId: "client_002",
    market: "Split",
    rate: 17,
    selection: "17/20",
    stake: 50,
    profit: 0,
    loss: 50,
    netpnl: -50,
    isBack: false,
  },
  {
    key: 3,
    date: "2025-06-14 15:25:30",
    clientId: "client_003",
    market: "Color",
    rate: 1.8,
    selection: "Red",
    stake: 200,
    profit: 160,
    loss: 0,
    netpnl: 160,
    isBack: true,
  },
];

const ShowBets = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({ data: mockBetData });
      setIsLoading(false);
    }, 1000); // simulate network latency
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      className="sport_detail show_bet"
      title={`All Bets - ${id}`}
      extra={
        <button onClick={() => nav(-1)}>
          <LeftOutlined /> Back
        </button>
      }>
      <div className="table_section show_bet_table ant-spin-nested-loading" style={{ marginBottom: "12px" }}>
        {isLoading ? (
          <Spin className="spin_icon betting_icon comp_spin" size="large" />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Market</th>
                <th className="text-right">Rate</th>
                <th>Number</th>
                <th className="text-right">Stake</th>
                <th className="text-right">Profit</th>
                <th className="text-right">Loss</th>
                <th className="text-right">Net Pnl</th>
              </tr>
            </thead>
            <tbody>
              {data.data.length > 0 ? (
                data.data.map((res) => (
                  <tr key={res.key} className={res.isBack ? "back" : "lay"}>
                    <td>{res.date}</td>
                    <td>{res.clientId}</td>
                    <td>{res.market}</td>
                    <td className="text-right">{res.rate}</td>
                    <td>{res.selection}</td>
                    <td className="text-right">{res.stake}</td>
                    <td className="text-right">{res.profit.toFixed(2)}</td>
                    <td className="text-right">{res.loss}</td>
                    <td className={`text-right ${res.netpnl < 0 ? "text_danger" : "text_success"}`}>
                      {res.netpnl.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
};

export default ShowBets;
