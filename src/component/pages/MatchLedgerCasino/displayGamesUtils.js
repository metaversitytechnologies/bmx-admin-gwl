// Presentation-only 3-way sign split for P/L-style cells. The original
// columns rendered the raw value with no color coding at all — this only
// adds a semantic color based on the existing value's sign. Returns the
// shared global `.pnl-is-*` utility classes (main.scss) so every page's
// P/L treatment stays visually identical.
export const getPnlColorClass = (value) => {
  if (value > 0) return "pnl-is-positive";
  if (value < 0) return "pnl-is-negative";
  return "pnl-is-neutral";
};
