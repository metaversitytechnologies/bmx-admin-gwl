// Presentation-only 3-way sign split for the Plus/Minus cell. The original
// column rendered the raw value with no color coding at all — this only
// adds a semantic color based on the existing value's sign.
export const getPnlColorClass = (value) => {
  if (value > 0) return "dg-is-positive";
  if (value < 0) return "dg-is-negative";
  return "dg-is-neutral";
};
