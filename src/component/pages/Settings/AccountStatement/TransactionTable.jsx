import { Empty } from "antd";
import PropTypes from "prop-types";
import moment from "moment";
import { formatDescription } from "./accountStatementUtils";

const TransactionTable = ({ data }) => (
  <div className="account-statement-table-scroll">
    <table className="account-statement-table">
      <colgroup>
        <col style={{ width: "14%" }} />
        <col style={{ width: "45%" }} />
        <col style={{ width: "13%" }} />
        <col style={{ width: "13%" }} />
        <col style={{ width: "15%" }} />
      </colgroup>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th className="text-right">CR</th>
          <th className="text-right">DR</th>
          <th className="text-right">Balance</th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data.map((txn, index) => {
            const credit = Number(txn?.credit) || 0;
            const debit = Number(txn?.debit) || 0;
            return (
              <tr key={txn?.id ?? `${txn?.date}-${index}`}>
                <td>
                  <div className="account-statement-date">
                    {moment(txn?.date).format("DD MMM YYYY")}
                  </div>
                  <div className="account-statement-time">
                    {moment(txn?.date).format("hh:mm:ss A")}
                  </div>
                </td>
                <td className="account-statement-description">
                  {formatDescription(txn?.description)}
                </td>
                <td
                  className={`text-right account-statement-amount${
                    credit > 0 ? " is-credit" : ""
                  }`}>
                  {credit > 0 ? `+${txn?.credit}` : txn?.credit}
                </td>
                <td
                  className={`text-right account-statement-amount${
                    debit > 0 ? " is-debit" : ""
                  }`}>
                  {debit > 0 ? `-${txn?.debit}` : txn?.debit}
                </td>
                <td className="text-right account-statement-balance">
                  {txn?.closing?.toFixed(2)}
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

TransactionTable.propTypes = {
  data: PropTypes.array,
};

export default TransactionTable;
