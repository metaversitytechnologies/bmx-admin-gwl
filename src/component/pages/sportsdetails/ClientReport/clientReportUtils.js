// Presentation-only formatting — does not alter the underlying value.
export const formatAmount = (value) =>
  Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

// New (presentation-only) 3-way sign split for Net Account cells/cards. The
// original only checked `amount > 0` (else red, including zero) — we add a
// neutral zero state since it's a more accurate read of an already-known
// value, not a new/invented classification.
export const getAmountColorClass = (value) => {
  if (value > 0) return "cr2-is-positive";
  if (value < 0) return "cr2-is-negative";
  return "cr2-is-neutral";
};

// Same userId-prefix hierarchy check the original component duplicated
// between the column title and the per-row role badge — consolidated here
// since both call sites computed the exact same thing from the exact same
// field.
export const getRoleLabel = (userId) => {
  if (userId?.includes("AD")) return "Admin";
  if (userId?.includes("SUB")) return "Mini Admin";
  if (userId?.includes("M")) return "Master";
  if (userId?.includes("SA")) return "Super";
  if (userId?.includes("A")) return "Agent";
  return "Client";
};

// Same first-column-title derivation the original computed from the whole
// row set (checked in this exact order).
export const getFirstColumnTitle = (rows) => {
  if (rows.some((r) => r.userId?.includes("AD"))) return "Admin";
  if (rows.some((r) => r.userId?.includes("SUB"))) return "Mini Admin";
  if (rows.some((r) => r.userId?.includes("M"))) return "Master";
  if (rows.some((r) => r.userId?.includes("SA"))) return "Super";
  if (rows.some((r) => r.userId?.includes("A"))) return "Agent";
  if (rows.some((r) => r.userId)) return "Client";
  return "User";
};
