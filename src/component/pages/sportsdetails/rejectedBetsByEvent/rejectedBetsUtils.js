import moment from "moment";

// Presentation-only formatting — does not alter the underlying value.
export const formatAmount = (value) =>
  Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

// Display-only date split — the raw `time` value is untouched.
export const formatDateParts = (value) => {
  const parsed = moment(value);
  if (!value || !parsed.isValid()) {
    return { date: value || "—", time: "" };
  }
  return { date: parsed.format("DD MMM YYYY"), time: parsed.format("HH:mm:ss") };
};

// Safe placeholder for an empty/null Agent value — never renders
// "undefined"/"null"/a blank cell.
export const formatAgent = (value) =>
  value === null || value === undefined || value === "" ? "—" : value;

// Display-only remark split — pulls a trailing "-- (REASON)" / "(REASON)"
// annotation out of the raw remark string so it can render as a small
// warning pill, without altering the source string itself. Only strips a
// parenthesised reason found at the very end of the text, so unrelated
// parentheses elsewhere in a remark are left untouched.
export const parseRemark = (text) => {
  if (!text) return { main: "", reason: null };
  const match = /\s*(?:--+\s*)?\(([^()]+)\)\s*$/.exec(text);
  if (!match) return { main: text, reason: null };
  const main = text.slice(0, match.index).trim();
  return { main: main || text, reason: match[1].trim() };
};
