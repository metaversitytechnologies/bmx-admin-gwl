import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./SuperAgentLimitDetails.scss";
import React from "react";
import { Tabs } from "antd";
import AddSuperLimites from "./AddSuperLimites";
import MinusLimit from "./MinusLimit";


const SuperAgentLimitDetails = () => {
  const nav = useNavigate();

  const handleBackClick = () => {
    nav(-1);
  };

  const onChange = (key) => {
    console.log(key, "ddsddasdasd");

  };

  const items = [
    {
      key: "1",
      label: `Add`,
      children: <AddSuperLimites/>,
    },
    {
      key: "2",
      label: `Minus`,
      children: <MinusLimit/>,
      color:"red"
    },
  ];

  


  const {state} = useLocation();
  // const uType = localStorage.getItem("userType")


  return (
    <>
      <div className="main_live_section">
        <div className="_match">
          <div
            className="sub_live_section live_report"
            style={{ borderRadius: "2px 2px 0 0" }}>
            <div
              style={{ padding: "9px 8px", fontSize: "22px" }}
              className="team_name">
              {state == 1 ? "Master Limit Details":state == 2?"Agent Limit Details": state == 3?"Client Limit Details":"Super Master Limit Details"}
            </div>
            <div className="show_btn">
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
        </div>

        <div>
          <Tabs
            defaultActiveKey="1"
            className="add_minus"
            destroyInactiveTabPane
            items={items}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default SuperAgentLimitDetails;
