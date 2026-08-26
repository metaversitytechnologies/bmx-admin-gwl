import { Inbox } from "lucide-react";
import PropTypes from "prop-types";

const BetTableEmpty = ({ colSpan, message }) => (
  <tr>
    <td colSpan={colSpan}>
      <div className="msb-empty">
        <span className="msb-empty-icon">
          <Inbox size={18} strokeWidth={1.8} />
        </span>
        <p className="msb-empty-title">{message}</p>
      </div>
    </td>
  </tr>
);

BetTableEmpty.propTypes = {
  colSpan: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};

export default BetTableEmpty;
