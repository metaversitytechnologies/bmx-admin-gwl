import React from "react";
import { Col, Empty, Row, Spin } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SuperAgentProfitLoss from "./SuperAgentProfitLoss/SuperAgentProfitLoss";
import "./EventProfitLoss.scss";
import MasterProfitLoss from "./SuperAgentProfitLoss/MasterProfitLoss";
import DealerProfitLoss from "./SuperAgentProfitLoss/DealerProfitLoss";
import ClientProfitLoss from "./SuperAgentProfitLoss/ClientProfitLoss";

// Mock static data
const profitLoss = {
  data: {
    data: [
      {
        userId: "user1",
        date: "2025-06-13",
        selectionName: "Team A",
        result: "Won",
        isback: true,
        value: 2.5,
        volume: 100,
        stake: 200,
        pnl: 120,
      },
      {
        userId: "user2",
        date: "2025-06-13",
        selectionName: "Team B",
        result: "Lost",
        isback: false,
        value: 1.8,
        volume: 150,
        stake: 180,
        pnl: -50,
      },
    ],
    showBetsdata: {
      superMaster: [
        { userId: "SuperMaster1", pnl: 100, comm: 10 },
        { userId: "SuperMaster2", pnl: -40, comm: 5 },
      ],
      master: [
        { userId: "Master1", pnl: 90, comm: 8 },
        { userId: "Master2", pnl: -30, comm: 4 },
      ],
      dealer: [
        { userId: "Dealer1", pnl: 70, comm: 7 },
        { userId: "Dealer2", pnl: -20, comm: 3 },
      ],
      client: [
        { userId: "Client1", pnl: 50, comm: 2 },
        { userId: "Client2", pnl: -10, comm: 1 },
      ],
    },
  },
};

const EventProfitLoss = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const handleBackClick = () => {
    nav(-1);
  };

  const isLoading = false;
  const isFetching = false;

  const userType = localStorage.getItem("userType") ?? "5"; // default for testing

  return (
    <>
      <Row>
        <Col className={`${userType !== "5" ? "d-none" : ""}`} xs={24} md={24} xl={7} lg={7}>
          <SuperAgentProfitLoss data={profitLoss.data.showBetsdata} />
        </Col>
        <Col className={`${userType === "0" || userType === "5" ? "" : "d-none"}`} xs={24} md={24} xl={7} lg={7}>
          <MasterProfitLoss data={profitLoss.data.showBetsdata} />
        </Col>
        <Col className={`${["0", "1", "5"].includes(userType) ? "" : "d-none"}`} xs={24} md={24} xl={7} lg={7}>
          <DealerProfitLoss data={profitLoss.data.showBetsdata} />
        </Col>
        <Col xs={24} md={24} xl={7} lg={7}>
          <ClientProfitLoss data={profitLoss.data.showBetsdata} />
        </Col>
      </Row>

      <div className="main_live_section">
        <div className="_match">
          <div className="sub_live_section live_report" style={{ borderRadius: "2px 2px 0 0", fontSize: "16px" }}>
            <div style={{ padding: "9px 8px" }} className="team_name">Event Profit and Loss</div>
            <div className="show_btn">
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
        </div>

        <div>
          <div className="sport_detail my_ledger main_match_ledger" style={{ padding: "0px", margin: "0px", width: "100%" }}>
            <div className="table_section statement_tabs_data ant-spin-nested-loading">
              <table className="live_table" style={{ marginBottom: "8px" }}>
                <thead>
                  <tr>
                    <th>username</th>
                    <th>Date</th>
                    <th>Selection</th>
                    <th>Result</th>
                    <th>Back/Lay</th>
                    <th>Value</th>
                    <th>Volume</th>
                    <th>Stake</th>
                    <th>pnl</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={9}>
                        <div className="spin_icon comp_spin">
                          <Spin size="large" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    profitLoss.data.data.map((res, idx) => (
                      <tr key={idx}>
                        <td>{res.userId}</td>
                        <td>{res.date}</td>
                        <td>{res.selectionName}</td>
                        <td>{res.result}</td>
                        <td>{res.isback ? "Back" : "Lay"}</td>
                        <td>{res.value}</td>
                        <td>{res.volume}</td>
                        <td>{res.stake}</td>
                        <td className={res.pnl > 0 ? "text_success" : "text_danger"}>{res.pnl}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {profitLoss.data.data.length === 0 && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventProfitLoss;
