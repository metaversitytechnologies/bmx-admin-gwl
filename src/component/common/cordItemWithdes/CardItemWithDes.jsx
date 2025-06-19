import React from 'react'
import { Card } from "antd";
// import "./CardItem.scss"

const gridStyle = {
    width: "23%",
    background: "#7d5c0e",
    color: "#fff",
    margin: "10px",
  };
  

const CardItemWithDes = ({dataDes}) => {
  return (
    <>
      <Card>
      {dataDes?.map((res,) => {
        return (
          <Card.Grid key={res?.id} hoverable={false} style={gridStyle}>
            <div className="main_card_section">
              <div className="icon_card_section">{res?.icon}</div>
              <div className="tital_card_section">
                <h2>{res?.title}</h2>
                <p>{res?.desc}</p>
              </div>
            </div>
          </Card.Grid>
        );
      })}
      </Card>
    </>
  )
}

export default CardItemWithDes
