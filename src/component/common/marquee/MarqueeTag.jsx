import Marquee from "react-fast-marquee";
import "./MarqueeTag.scss";

const MarqueeTag = () => {
  const domain = window.location.hostname.split(".").slice(-2).join(".");
  return (
    <>
      <div className="marque_section">
        <Marquee style={{ textTransform: "capitalize" }}>
          "{window.location.hostname.split(".")?.[1]}{" "} में आपका स्वागत है हमारी
          कोई डुप्लीकेट वेबसाइट नहीं है कृपा हमारी आधिकारिक लिंक{" "}
          <span style={{ padding: "0px 3px" }}>{domain}</span> से ही लॉगिन करें"
        </Marquee>
      </div>
    </>
  );
};

export default MarqueeTag;
