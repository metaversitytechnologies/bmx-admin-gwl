import Marquee from "react-fast-marquee";
import "./MarqueeTag.scss";
import { useGetMessageQuery } from "../../../store/service/userlistService";

const MarqueeTag = () => {
  // const domain = window.location.hostname.split(".").slice(-2).join(".");
  // const { data } = useGetMessageQuery();
  const { data } = useGetMessageQuery();

  return (
    <>
      <div className="marque_section">
        <Marquee style={{ textTransform: "capitalize" }}>
          {data?.data}
          {/* "{window.location.hostname.split(".")?.[1]} में आपका स्वागत है हमारी
          कोई डुप्लीकेट वेबसाइट नहीं है कृपा हमारी आधिकारिक लिंक{" "}
          <span style={{ padding: "0px 3px" }}>{domain}</span> से ही लॉगिन करें" */}
          {/* {window.location.hostname.split(".")?.[1]} में आपका स्वागत है हमारी
          कोई डुप्लीकेट वेबसाइट नहीं है कृपया हमारी आधिकारिक लिंक{" "}
          <span style={{ padding: "1px 3px" }}>{domain}</span> से ही लॉगिन करें */}
        </Marquee>
      </div>
    </>
  );
};

export default MarqueeTag;
