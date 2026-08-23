import PropTypes from "prop-types";
import TransactionRow from "./TransactionRow";

const TransactionDateGroup = ({ label, items, isFirst }) => (
  <section
    className={`account-statement-date-group${isFirst ? " is-first" : ""}`}>
    <h3 className="account-statement-date-heading">{label}</h3>
    <div className="account-statement-date-rows">
      {items.map((txn, index) => (
        <TransactionRow key={txn?.id ?? `${txn?.date}-${index}`} txn={txn} />
      ))}
    </div>
  </section>
);

TransactionDateGroup.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  isFirst: PropTypes.bool,
};

export default TransactionDateGroup;
