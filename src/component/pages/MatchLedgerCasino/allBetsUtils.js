// Presentation-only helper: a bet counts as "winning" when its selection
// matches the round's recorded winner. Purely derived from the two fields
// already rendered in the Player/Winner columns — no new API data.
export const isWinningBet = (row) =>
  Boolean(row?.winner) && row.selectionName === row.winner;
