import { Empty } from "antd";
import PropTypes from "prop-types";
import moment from "moment";
import { formatDescription } from "./accountStatementUtils";

const TransactionMobileList = ({ data }) => (
  <div className="account-statement-mobile-list">
    {data?.length > 0 ? (
      data.map((txn, index) => {
        const credit = Number(txn?.credit) || 0;
        const debit = Number(txn?.debit) || 0;
        const hasCredit = credit > 0;
        const hasDebit = debit > 0;

        return (
          <div
            className="account-statement-card"
            key={txn?.id ?? `${txn?.date}-${index}`}>
            <div className="account-statement-card-top">
              <div>
                <div className="account-statement-card-date">
                  {moment(txn?.date).format("DD MMM YYYY")}
                </div>
                <div className="account-statement-card-time">
                  {moment(txn?.date).format("hh:mm A")}
                </div>
              </div>
              {hasCredit && (
                <span className="account-statement-badge is-credit">
                  +{txn?.credit} CR
                </span>
              )}
              {hasDebit && (
                <span className="account-statement-badge is-debit">
                  -{txn?.debit} DR
                </span>
              )}
              {!hasCredit && !hasDebit && (
                <span className="account-statement-badge is-neutral">0</span>
              )}
            </div>

            <p className="account-statement-card-description">
              {formatDescription(txn?.description)}
            </p>

            <div className="account-statement-card-bottom">
              <span>
                {hasCredit ? `DR ${txn?.debit}` : `CR ${txn?.credit}`}
              </span>
              <span>Balance {txn?.closing?.toFixed(2)}</span>
            </div>
          </div>
        );
      })
    ) : (
      <Empty />
    )}
  </div>
);

TransactionMobileList.propTypes = {
  data: PropTypes.array,
};

export default TransactionMobileList;
