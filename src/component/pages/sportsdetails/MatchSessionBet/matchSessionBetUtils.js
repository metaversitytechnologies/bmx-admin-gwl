import moment from "moment";

// Presentation-only formatting — does not alter the underlying value.
export const formatAmount = (value) =>
  Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

// Display-only date split — the raw date/time value is untouched.
export const formatDateParts = (value) => {
  const parsed = moment(value);
  if (!value || !parsed.isValid()) {
    return { date: value || "—", time: "" };
  }
  return { date: parsed.format("DD MMM YYYY"), time: parsed.format("HH:mm:ss") };
};

// Same mode check the original used for Match Bets row tinting.
export const getMatchRowTintClass = (mode) =>
  mode === "L" ? "msb-row-lagai" : "msb-row-khai";

// Same mode check the original used for Session Bets row tinting.
export const getSessionRowTintClass = (mode) =>
  mode === "YES" ? "msb-row-yes" : "msb-row-no";

// New (presentation-only) sign-based color for PNL/amount cells.
export const getAmountColorClass = (value) => {
  if (value > 0) return "msb-is-positive";
  if (value < 0) return "msb-is-negative";
  return "msb-is-neutral";
};
