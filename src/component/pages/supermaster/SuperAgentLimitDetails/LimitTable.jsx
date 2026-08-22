import { Empty } from "antd";
import PropTypes from "prop-types";
import { convertCode } from "../../../../store/constant";
import LimitActions from "./LimitActions";
import LimitAmountInput from "./LimitAmountInput";

const LimitTable = ({ data, inputValues, onInputChange, onAction, actionState }) => (
  <div className="update-limit-table-scroll">
    <table className="update-limit-table">
      <colgroup>
        <col style={{ width: "14%" }} />
        <col style={{ width: "24%" }} />
        <col style={{ width: "16%" }} />
        <col style={{ width: "24%" }} />
        <col style={{ width: "22%" }} />
      </colgroup>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th className="text-right">C. Chips</th>
          <th>Add / Minus Limit</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data.map((user) => {
            const busy = actionState?.userId === user.userId;
            return (
              <tr key={user.userId}>
                <td className="update-limit-code">
                  {convertCode(user?.userId)}
                </td>
                <td className="update-limit-name">{user?.userName}</td>
                <td className="text-right update-limit-chips">
                  {user?.balance + user?.balanceWithPnl}
                </td>
                <td>
                  <LimitAmountInput
                    value={inputValues[user.userId] || ""}
                    onChange={(e) => onInputChange(user.userId, e.target.value)}
                    disabled={busy}
                  />
                </td>
                <td className="text-center">
                  <LimitActions
                    onAdd={() => onAction(user, true)}
                    onMinus={() => onAction(user, false)}
                    addLoading={busy && actionState?.type === "add"}
                    minusLoading={busy && actionState?.type === "minus"}
                    disabled={busy}
                  />
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>
              <Empty />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

LimitTable.propTypes = {
  data: PropTypes.array,
  inputValues: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
  actionState: PropTypes.shape({
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
  }),
};

export default LimitTable;
