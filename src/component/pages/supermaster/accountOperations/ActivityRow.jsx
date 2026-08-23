import PropTypes from "prop-types";
import moment from "moment";
import { formatWithCodes, formatOperationLabel } from "./accountOperationsUtils";

const ActivityRow = ({ activity }) => (
  <div className="account-operations-row">
    <div className="account-operations-row-top">
      <span className="account-operations-row-operation">
        <span className="account-operations-row-dot" aria-hidden="true" />
        {formatOperationLabel(activity?.operation)}
      </span>
      <span className="account-operations-row-time">
        {moment(activity?.date).format("hh:mm A")}
      </span>
    </div>

    <p className="account-operations-row-description">
      {formatWithCodes(activity?.description)}
    </p>

    <p className="account-operations-row-doneby">
      {formatWithCodes(activity?.doneBy)}
    </p>
  </div>
);

ActivityRow.propTypes = {
  activity: PropTypes.object.isRequired,
};

export default ActivityRow;
