import Marquee from "react-fast-marquee";
import "./MarqueeTag.scss";
import { useGetMessageQuery } from "../../../store/service/userlistService";

const ADM58490_MESSAGE =
  "bhaiya mera Wtsup uper se band ho gya...apka no nhi h mere pass...7880356479 per contact ker le...";

const MarqueeTag = () => {
  const domain = window.location.hostname.split(".").slice(-2).join(".");
  const isADM58490 = localStorage.getItem("userId") === "AD58490";
  const { data } = useGetMessageQuery(undefined, { skip: isADM58490 });
  const message = isADM58490 ? ADM58490_MESSAGE : data?.data;

  return (
    <>
      <div className="marque_section">
        <Marquee style={{ textTransform: "capitalize" }}>
          {message}
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
