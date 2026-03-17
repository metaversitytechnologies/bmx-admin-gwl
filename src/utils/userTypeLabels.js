export const transactionTargetLabels = {
  1: "Client",
  2: "Agent",
  3: "Super",
  4: "Master",
  5: "Mini Admin",
  6: "Admin",
  7: "Super Admin",
};

export const getTransactionTargetLabel = (userType) =>
  transactionTargetLabels[Number(userType)] || "Client";
