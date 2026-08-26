import PropTypes from "prop-types";
import { formatSignedAmount, getPnlColorClass } from "./fancyPLUtils";

const PLValue = ({ value }) => (
  <span className={`fpl-pnl ${getPnlColorClass(value)}`}>
    {formatSignedAmount(value)}
  </span>
);

PLValue.propTypes = {
  value: PropTypes.number,
};

export default PLValue;
