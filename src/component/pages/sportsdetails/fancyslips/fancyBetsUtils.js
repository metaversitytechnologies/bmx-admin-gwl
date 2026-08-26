import moment from "moment";

// Presentation-only formatting — does not alter the underlying value.
export const formatAmount = (value) =>
  Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

// Display-only date split — the raw `res.time` value is untouched.
export const formatDateParts = (value) => {
  const parsed = moment(value);
  if (!value || !parsed.isValid()) {
    return { date: value || "—", time: "" };
  }
  return { date: parsed.format("DD MMM YYYY"), time: parsed.format("h:mm A") };
};

// Same mode check the original used for row tinting ("back"/"lay" classes),
// just mapped to new, much more subtle color classes.
export const getRowTintClass = (mode) =>
  mode === "YES" ? "fb-row-yes" : "fb-row-no";

// New (presentation-only) sign-based color for Loss/Profit/summary cells.
export const getAmountColorClass = (value) => {
  if (value > 0) return "fb-is-positive";
  if (value < 0) return "fb-is-negative";
  return "fb-is-neutral";
};

// The original Result column just printed the raw `declared` value with no
// interpretation (other pages in this app follow the same convention for
// this exact field — e.g. Matka's bets table shows it raw or "-", never a
// derived Win/Loss label). We only distinguish "not yet declared" (falsy or
// the literal string "null", matching that same app-wide convention) from
// "declared", we do not invent a Win/Loss/Pending classification on top of
// an unconfirmed value set.
export const getResultState = (declared) => {
  if (!declared || declared === "null") {
    return { label: "Pending", isPending: true };
  }
  return { label: declared, isPending: false };
};
