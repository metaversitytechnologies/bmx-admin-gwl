import React, { useState } from "react";
import { Card } from "antd";
import "./CardItem.scss"
import { Link } from "react-router-dom";


const gridStyle = {
  width: "23%",
  background: "#380023",
  color: "#fff",
  margin: "10px",
};

const CardItem = ({ data }) => {


  return (
    <>
    <Card>
      {data.map((res, id) => {
        return (
          <Card.Grid key={id} hoverable={false} className="" style={gridStyle}>
              <Link to={res?.path}>
            <div className="main_card_section">
              <div className="icon_card_section">{res?.image}</div>
              <div className="tital_card_section">
                <p style={{fontSize:`${res?.size}px`}}>{res?.name}</p>
              </div>
            </div>
              </Link>
          </Card.Grid>
        );
      })}
      </Card>
    </>
  );
};

export default CardItem;
