// Presentation-only formatting — does not alter the underlying value.
export const formatAmount = (value) =>
  Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

// Same >= 0 / < 0 split the original rowClassName used, just mapped to new,
// much more subtle classes/signs instead of full saturated row colors.
export const getPnlColorClass = (value) => {
  if (value >= 0) return "fpl-is-positive";
  if (value < 0) return "fpl-is-negative";
  return "fpl-is-neutral";
};

// Sign-prefixed, absolute-value display for PNL cells (avoids a doubled
// "−-520.00" if we naively concatenated a sign onto a negative number).
export const formatSignedAmount = (value) => {
  const num = Number(value || 0);
  const sign = num >= 0 ? "+" : "−";
  return `${sign}${formatAmount(Math.abs(num))}`;
};
