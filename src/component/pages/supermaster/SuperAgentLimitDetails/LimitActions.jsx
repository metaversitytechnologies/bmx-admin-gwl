import { Button } from "antd";
import PropTypes from "prop-types";

const LimitActions = ({ onAdd, onMinus, addLoading, minusLoading, disabled }) => (
  <div className="update-limit-actions">
    <Button
      className="update-limit-add"
      onClick={onAdd}
      loading={addLoading}
      disabled={disabled}>
      Add
    </Button>
    <Button
      className="update-limit-minus"
      onClick={onMinus}
      loading={minusLoading}
      disabled={disabled}>
      Minus
    </Button>
  </div>
);

LimitActions.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onMinus: PropTypes.func.isRequired,
  addLoading: PropTypes.bool,
  minusLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default LimitActions;
