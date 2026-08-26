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
