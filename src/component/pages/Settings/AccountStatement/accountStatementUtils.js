import moment from "moment";
import { convertCode } from "../../../../store/constant";

export const formatDescription = (text) =>
  text?.replace(/\((.*?)\)/g, (match, code) => `(${convertCode(code)})`);

// Presentation-only number formatting — does not alter the underlying value.
export const formatAmount = (value, options) =>
  Number(value || 0).toLocaleString("en-US", options);

// Presentation-only grouping for the mobile feed — preserves the original
// transaction order and never re-sorts or mutates the source records.
export const groupTransactionsByDate = (transactions = []) => {
  const groups = [];
  const indexByKey = new Map();

  transactions.forEach((txn) => {
    const key = moment(txn?.date).format("YYYY-MM-DD");
    if (!indexByKey.has(key)) {
      indexByKey.set(key, groups.length);
      groups.push({
        key,
        label: moment(txn?.date).format("DD MMM YYYY").toUpperCase(),
        items: [],
      });
    }
    groups[indexByKey.get(key)].items.push(txn);
  });

  return groups;
};
