import PropTypes from "prop-types";
import { groupTransactionsByDate } from "./accountStatementUtils";
import TransactionDateGroup from "./TransactionDateGroup";
import AccountStatementEmpty from "./AccountStatementEmpty";

const MobileTransactionFeed = ({ data }) => {
  const groups = groupTransactionsByDate(data);

  return (
    <div className="account-statement-mobile-list">
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <TransactionDateGroup
            key={group.key}
            label={group.label}
            items={group.items}
            isFirst={index === 0}
          />
        ))
      ) : (
        <AccountStatementEmpty />
      )}
    </div>
  );
};

MobileTransactionFeed.propTypes = {
  data: PropTypes.array,
};

export default MobileTransactionFeed;
