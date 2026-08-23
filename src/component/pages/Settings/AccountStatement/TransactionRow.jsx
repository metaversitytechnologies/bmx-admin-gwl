import PropTypes from "prop-types";
import moment from "moment";
import { formatDescription, formatAmount } from "./accountStatementUtils";

const TransactionRow = ({ txn }) => {
  const credit = Number(txn?.credit) || 0;
  const debit = Number(txn?.debit) || 0;
  const hasCredit = credit > 0;
  const hasDebit = debit > 0;

  return (
    <div className="account-statement-row">
      <div className="account-statement-row-top">
        <p className="account-statement-row-description">
          {formatDescription(txn?.description)}
        </p>

        <div className="account-statement-row-amount-block">
          {hasCredit && (
            <>
              <span className="account-statement-row-amount is-credit">
                +{formatAmount(credit)}
              </span>
              <span className="account-statement-row-type is-credit">CR</span>
            </>
          )}
          {hasDebit && (
            <>
              <span className="account-statement-row-amount is-debit">
                -{formatAmount(debit)}
              </span>
              <span className="account-statement-row-type is-debit">DR</span>
            </>
          )}
          {!hasCredit && !hasDebit && (
            <span className="account-statement-row-amount is-neutral">0</span>
          )}
        </div>
      </div>

      <div className="account-statement-row-bottom">
        <span className="account-statement-row-meta">
          {moment(txn?.date).format("hh:mm A")} ·{" "}
          {hasCredit
            ? `DR ${formatAmount(debit)}`
            : `CR ${formatAmount(credit)}`}
        </span>
        <span className="account-statement-row-balance">
          <span className="account-statement-row-balance-label">Balance</span>{" "}
          <span className="account-statement-row-balance-value">
            {formatAmount(txn?.closing, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
      </div>
    </div>
  );
};

TransactionRow.propTypes = {
  txn: PropTypes.object.isRequired,
};

export default TransactionRow;
