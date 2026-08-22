import { Input } from "antd";
import PropTypes from "prop-types";

const LimitAmountInput = ({ value, onChange, disabled }) => (
  <Input
    type="number"
    min={0}
    inputMode="numeric"
    className="update-limit-amount-input"
    placeholder="Enter amount"
    value={value}
    disabled={disabled}
    onChange={onChange}
  />
);

LimitAmountInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default LimitAmountInput;
