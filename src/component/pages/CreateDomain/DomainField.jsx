import PropTypes from "prop-types";
import { Form, Input } from "antd";

// Thin presentational wrapper — Input stays the direct Form.Item child so
// antd's value/onChange binding and validation remain completely native.
const DomainField = ({ label, name, placeholder, icon, rules }) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    className="create-domain-field">
    <Input
      className="create-domain-input"
      placeholder={placeholder}
      prefix={icon}
    />
  </Form.Item>
);

DomainField.propTypes = {
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  rules: PropTypes.array,
};

export default DomainField;
