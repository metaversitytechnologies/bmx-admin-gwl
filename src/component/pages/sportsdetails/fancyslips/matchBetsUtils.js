import moment from "moment";

// Presentation-only formatting — does not alter the underlying value.
// Matches the whole-number-friendly style ("50000 -> 50,000") requested for
// Amount/Loss/Profit, while still showing decimals if the API sends them.
export const formatAmount = (value) =>
  Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

// The bookmaker overview cards always showed 2 decimals (matches the
// original `.toFixed(2)` call), just with thousands separators added.
export const formatDecimal = (value) =>
  Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// Display-only date split — the raw `res.date` string is untouched.
export const formatDateParts = (value) => {
  const parsed = moment(value);
  if (!value || !parsed.isValid()) {
    return { date: value || "—", time: "" };
  }
  return { date: parsed.format("DD MMM YYYY"), time: parsed.format("h:mm A") };
};

// Same classification the original table used for the "Type" column.
export const getRowTypeLabel = (mode) => (mode !== "L" ? "Lagai" : "Khai");

// Same mode check the original used for row tinting ("back"/"lay" classes),
// just mapped to new, much more subtle color classes.
export const getRowTintClass = (mode) =>
  mode === "L" ? "mb-row-khai" : "mb-row-lagai";

// New (presentation-only) sign-based color for Loss/Profit cells.
export const getAmountColorClass = (value) => {
  if (value > 0) return "mb-is-positive";
  if (value < 0) return "mb-is-negative";
  return "mb-is-neutral";
};
