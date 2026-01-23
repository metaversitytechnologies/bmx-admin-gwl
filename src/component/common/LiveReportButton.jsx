import { Button } from "antd";
import { Link } from "react-router-dom";

const baseStyle = {
  height: "26px",
  padding: "0px 15px",
  borderRadius: "5px",
  marginRight: "15px",
  fontWeight: 200,
};

const LiveReportButton = ({ matchId, label = "View", style }) => {
  return (
    <Button type="primary" style={{ ...baseStyle, ...style }}>
      <Link to={`/Events/${matchId}/4/live-report`}>{label}</Link>
    </Button>
  );
};

export default LiveReportButton;
