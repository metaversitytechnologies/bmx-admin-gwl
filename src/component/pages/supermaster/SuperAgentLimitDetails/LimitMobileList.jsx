import { Empty } from "antd";
import PropTypes from "prop-types";
import { convertCode } from "../../../../store/constant";
import LimitActions from "./LimitActions";
import LimitAmountInput from "./LimitAmountInput";

const LimitMobileList = ({
  data,
  inputValues,
  onInputChange,
  onAction,
  actionState,
}) => (
  <div className="update-limit-mobile-list">
    {data?.length > 0 ? (
      data.map((user) => {
        const busy = actionState?.userId === user.userId;
        return (
          <div className="update-limit-card" key={user.userId}>
            <div className="update-limit-card-top">
              <span className="update-limit-card-name">
                {convertCode(user?.userId)}
              </span>
              <span className="update-limit-card-sep">•</span>
              <span className="update-limit-card-code">({user?.userName})</span>
              <span className="update-limit-card-chips">
                {user?.balance + user?.balanceWithPnl}
              </span>
            </div>
            <div className="update-limit-card-bottom">
              <LimitAmountInput
                value={inputValues[user.userId] || ""}
                onChange={(e) => onInputChange(user.userId, e.target.value)}
                disabled={busy}
              />
              <LimitActions
                onAdd={() => onAction(user, true)}
                onMinus={() => onAction(user, false)}
                addLoading={busy && actionState?.type === "add"}
                minusLoading={busy && actionState?.type === "minus"}
                disabled={busy}
              />
            </div>
          </div>
        );
      })
    ) : (
      <Empty />
    )}
  </div>
);

LimitMobileList.propTypes = {
  data: PropTypes.array,
  inputValues: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
  actionState: PropTypes.shape({
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
  }),
};

export default LimitMobileList;
