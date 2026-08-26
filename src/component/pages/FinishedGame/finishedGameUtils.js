import moment from "moment";

// Presentation-only formatting — does not alter the underlying value.
export const formatAmount = (value) =>
  Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

// Display-only date split — the raw `createdOn` value is untouched.
export const formatDateParts = (value, timeFormat) => {
  const parsed = moment(value);
  if (!value || !parsed.isValid()) {
    return { date: value || "—", time: "" };
  }
  return { date: parsed.format("DD MMM YYYY"), time: parsed.format(timeFormat) };
};

// New (presentation-only) 3-way sign split for P/L cells. The original only
// checked `pnl > 0` (else red, including zero) — a neutral zero state is a
// more accurate read of an already-known value, not a new classification.
export const getPnlColorClass = (value) => {
  if (value > 0) return "fg-is-positive";
  if (value < 0) return "fg-is-negative";
  return "fg-is-neutral";
};

// The "winner" field's real value set isn't documented anywhere in the
// codebase, but the approved reference explicitly shows "SUSPENDED" as a
// real value this field can hold — so we only special-case that one keyword
// and treat everything else as a plain winning-team name.
export const isSuspended = (winner) =>
  (winner || "").trim().toUpperCase() === "SUSPENDED";
