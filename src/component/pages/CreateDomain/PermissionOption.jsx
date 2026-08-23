import PropTypes from "prop-types";
import { Checkbox } from "antd";

// Icon + text render as Checkbox children so the whole row stays inside
// antd's native <label>, preserving click-anywhere-to-toggle + keyboard
// accessibility exactly as a plain Checkbox would provide.
const PermissionOption = ({ option }) => {
  const Icon = option.icon;
  return (
    <Checkbox
      value={option.value}
      className={`create-domain-permission-row ${option.className || ""}`}>
      <span className="create-domain-permission-icon">
        <Icon size={16} strokeWidth={1.8} />
      </span>
      <span className="create-domain-permission-text">
        <span className="create-domain-permission-label">{option.label}</span>
        <span className="create-domain-permission-desc">
          {option.description}
        </span>
      </span>
    </Checkbox>
  );
};

PermissionOption.propTypes = {
  option: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.elementType.isRequired,
    className: PropTypes.string,
  }).isRequired,
};

export default PermissionOption;
