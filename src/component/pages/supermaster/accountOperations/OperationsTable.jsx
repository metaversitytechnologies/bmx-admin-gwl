import PropTypes from "prop-types";
import moment from "moment";
import { formatWithCodes, formatOperationLabel } from "./accountOperationsUtils";
import AccountOperationsEmpty from "./AccountOperationsEmpty";

const OperationsTable = ({ data }) => (
  <div className="account-operations-table-scroll">
    <table className="account-operations-table">
      <colgroup>
        <col style={{ width: "180px" }} />
        <col style={{ width: "180px" }} />
        <col style={{ width: "190px" }} />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>Date &amp; Time</th>
          <th>Operation</th>
          <th>Done By</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data.map((activity, index) => (
            <tr key={activity?.id ?? `${activity?.date}-${index}`}>
              <td>
                <div className="account-operations-date">
                  {moment(activity?.date).format("DD MMM YYYY")}
                </div>
                <div className="account-operations-time">
                  {moment(activity?.date).format("hh:mm A")}
                </div>
              </td>
              <td>
                <span className="account-operations-badge">
                  {formatOperationLabel(activity?.operation)}
                </span>
              </td>
              <td className="account-operations-done-by">
                {formatWithCodes(activity?.doneBy)}
              </td>
              <td className="account-operations-description">
                {formatWithCodes(activity?.description)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>
              <AccountOperationsEmpty />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

OperationsTable.propTypes = {
  data: PropTypes.array,
};

export default OperationsTable;
