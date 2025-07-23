import { useParams } from "react-router-dom";
import CardOnVideo from "./CardOnVideo";
import Card2OnVideo from "./Card2OnVideo";
import SingleCardOnVideo from "./SingleCardOnVideo";
import AndarBaharCardOnVideo from "./AndarBaharCardOnVideo";
import PropTypes from "prop-types";

const VideoSection = ({ t1, t3 }) => {
  const { id } = useParams();

  const videoData = {
    52: "3035",
    55: "3041",
    53: "3058",
    54: "3056",
    51: "3030",
    61: "3047",
    60: "3053",
  };
  const cardOnVideoById = {
    51: <CardOnVideo t1={t1} />,
    52: <Card2OnVideo t1={t1} />,
    54: <SingleCardOnVideo t1={t1} />,
    60: <AndarBaharCardOnVideo t3={t3} />,
    61: <Card2OnVideo t1={t1} />,
    55: <SingleCardOnVideo t1={t1} />,
    53: <SingleCardOnVideo t1={t1} />,
    57: <CardOnVideo t1={t1} />,
  };
  return (
    <div className="gx-news-tags-row ">
      <iframe
        title="Casino Video"
        className="gx-reletive  gx-w-100"
        style={{ height: 300, position: "relative" }}
        src={`https://casino.loki7exch.com/route/?id=${videoData[id]}`}
      />
      <div className="gx-pl-3" style={{ position: "absolute" }}>
        {t1 && cardOnVideoById[id]}
      </div>
    </div>
  );
};

VideoSection.propTypes = {
  t1: PropTypes.any,
  t3: PropTypes.any,
};

export default VideoSection;
