import { Button } from "antd";

const baseStyle = {
  height: "26px",
  padding: "0px 15px",
  borderRadius: "5px",
  marginRight: "15px",
  fontWeight: 200,
};

const ActionButton = ({
  label,
  children,
  type = "primary",
  onClick,
  loading,
  style,
  className,
  ...rest
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      loading={loading}
      className={className}
      style={{ ...baseStyle, ...style }}
      {...rest}>
      {label || children}
    </Button>
  );
};

export default ActionButton;
