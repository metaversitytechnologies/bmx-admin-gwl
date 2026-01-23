import { Button } from "antd";
import { Link } from "react-router-dom";

const baseStyle = {
  height: "26px",
  padding: "0px 15px",
  borderRadius: "5px",
  marginRight: "15px",
  fontWeight: 200,
};

const LinkButton = ({
  to,
  label,
  icon,
  type = "primary",
  style,
  className,
}) => {
  return (
    <Link to={to}>
      <Button
        type={type}
        icon={icon}
        className={className}
        style={{ ...baseStyle, ...style }}>
        {label}
      </Button>
    </Link>
  );
};

export default LinkButton;
