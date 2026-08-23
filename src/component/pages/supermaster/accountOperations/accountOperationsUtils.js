import moment from "moment";
import { convertCode } from "../../../../store/constant";

// Same code-expansion regex the page has always used on doneBy/description —
// presentation only, does not touch the underlying backend value.
export const formatWithCodes = (text) =>
  text?.replace(/\((.*?)\)/g, (match, code) => `(${convertCode(code)})`);

const OPERATION_LABELS = {
  MatkaCommission: "Matka Commission",
  MatchCommission: "Match Commission",
  SessionCommission: "Session Commission",
  UpdateBetStatus: "Bet Status",
  UpdatePassword: "Password",
};

// Display-only label for the raw operation enum value. Falls back to a
// humanized version of the raw value for any type not in the map, so an
// unrecognized/future operation still renders reasonably.
export const formatOperationLabel = (value) => {
  if (!value) return "";
  if (OPERATION_LABELS[value]) return OPERATION_LABELS[value];
  return value.replace(/([a-z])([A-Z])/g, "$1 $2");
};

// Presentation-only grouping for the mobile feed — preserves the original
// order and never re-sorts or mutates the source records.
export const groupActivitiesByDate = (activities = []) => {
  const groups = [];
  const indexByKey = new Map();

  activities.forEach((activity) => {
    const key = moment(activity?.date).format("YYYY-MM-DD");
    if (!indexByKey.has(key)) {
      indexByKey.set(key, groups.length);
      groups.push({
        key,
        label: moment(activity?.date).format("DD MMM YYYY").toUpperCase(),
        items: [],
      });
    }
    groups[indexByKey.get(key)].items.push(activity);
  });

  return groups;
};
