import React from "react";
import { Col, Empty, Row, Spin } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SuperAgentProfitLoss from "./SuperAgentProfitLoss/SuperAgentProfitLoss";
import { useProfitLossQuery } from "../../../../../store/service/ProfitLossServices";
import "./EventProfitLoss.scss";
import moment from "moment";
// import AgentProfitLoss from "./SuperAgentProfitLoss/MasterProfitLoss";
import MasterProfitLoss from "./SuperAgentProfitLoss/MasterProfitLoss";
import DealerProfitLoss from "./SuperAgentProfitLoss/DealerProfitLoss";
import ClientProfitLoss from "./SuperAgentProfitLoss/ClientProfitLoss";
// import AdminProfitLoss from "./SuperAgentProfitLoss/AdminProfitLoss";
// import SubAdminProfitLoss from "./SuperAgentProfitLoss/SubAdminProfitLoss";

// const columns = [
//   {
//     title: "username",
//     dataIndex: "userid",
//     key: "userid",
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//     key: "date",
//   },
//   {
//     title: "Selection",
//     dataIndex: "selectionname",
//     key: "selectionname",
//   },
//   {
//     title: "Result",
//     dataIndex: "result",
//     key: "result",
//   },

//   {
//     title: "Back/Lay",
//     dataIndex: "Back/Lay",
//     key: "Back/Lay",
//   },
//   {
//     title: "Value",
//     dataIndex: "pricevalue",
//     key: "pricevalue",
//   },
//   {
//     title: "Stake",
//     dataIndex: "netpnl",
//     key: "netpnl",
//   },
//   {
//     title: "pnl",
//     dataIndex: "netpnl",
//     key: "netpnl",
//   },
// ];

const EventProfitLoss = () => {
  const nav = useNavigate();

  const { id } = useParams();

  const handleBackClick = () => {
    nav("/");
  };

  const { state } = useLocation();

  console.log(state?.id, "dsfsadfsd");

  const {
    data: profitLoss,
    isFetching,
    isLoading,
  } = useProfitLossQuery({
    matchid: Number(id),
    marketid: state?.id,
  });

  const userType = localStorage.getItem("userType");

  return (
    <>
      <Row>
        <Col
          className={`${userType != "5" ? "d-none" : ""}`}
          xs={24}
          md={24}
          xl={7}
          lg={7}>
          <SuperAgentProfitLoss data={profitLoss?.data?.showBetsdata} />
        </Col>
        <Col
          className={`${userType === "0" ? "" : "d-none"}`}
          xs={24}
          md={24}
          xl={7}
          lg={7}>
          <MasterProfitLoss data={profitLoss?.data?.showBetsdata} />
        </Col>
        <Col
          className={`${userType === "1" ? "" : "d-none"}`}
          xs={24}
          md={24}
          xl={7}
          lg={7}>
          <DealerProfitLoss data={profitLoss?.data?.showBetsdata} />
        </Col>
        <Col className="" xs={24} md={24} xl={7} lg={7}>
          <ClientProfitLoss data={profitLoss?.data?.showBetsdata} />
        </Col>
      </Row>

      <div className="main_live_section">
        <div className="_match">
          <div
            className="sub_live_section live_report"
            style={{ borderRadius: "2px 2px 0 0", fontSize: "16px" }}>
            <div style={{ padding: "9px 8px" }} className="team_name">
              Event Profit and Loss
            </div>
            <div className="show_btn">
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
        </div>
        <div>
          <div
            className="table_section sport_detail main_pl"
            style={{ padding: "0px", margin: "0px", width: "100%" }}>
            {/* <Table
              className="live_table limit_update"
              bordered
              columns={columns}
              dataSource={profitLoss?.data?.data}></Table> */}
            <div className="table_section statement_tabs_data ant-spin-nested-loading">
              <table className="live_table" style={{ marginBottom: "8px" }}>
                <tr>
                  <th>username</th>
                  <th>Date</th>
                  <th>Selection</th>
                  <th>Result</th>
                  <th>Back/Lay</th>
                  <th>Value</th>
                  <th>Stake</th>
                  <th>pnl</th>
                </tr>
                {isLoading || isFetching ? (
                  <div className="spin_icon comp_spin">
                    <Spin size="large" />
                  </div>
                ) : (
                  ""
                )}
                {profitLoss?.data?.data?.map((res, id) => {
                  return (
                    <tr
                      className={res?.pnl > 0 ? "bg_green" : "bg_red"}
                      style={{ color: "#fff" }}
                      key={id}>
                      <td>{res?.userId}</td>
                      <td>{res?.date}</td>
                      <td>{res?.selectionName}</td>
                      <td>{res?.result}</td>
                      <td>{res?.isback === true ? "Yes" : "No"}</td>
                      <td>{res?.value}</td>
                      <td>{res?.stake}</td>
                      <td>{res?.pnl}</td>
                    </tr>
                  );
                })}
              </table>
              {profitLoss?.data?.data?.length === 0 && (
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
