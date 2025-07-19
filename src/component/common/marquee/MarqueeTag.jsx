import React from "react";
import Marquee from "react-fast-marquee";
import { Outlet } from "react-router-dom";
import "./MarqueeTag.scss";

const MarqueeTag = () => {

  return (
    <>
      <div className="marque_section">
        <Marquee style={{textTransform:"capitalize"}}>Welcome.</Marquee>
      </div>
    </>
  );
};

export default MarqueeTag;
