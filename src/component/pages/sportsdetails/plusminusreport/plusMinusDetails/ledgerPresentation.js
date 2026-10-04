const levels = [
  { key: "adminName", label: "Admin", total: "ADM" },
  { key: "subAdminName", label: "madmin", total: "AD" },
  { key: "superMasterName", label: "MasterAgent", total: "MA" },
  { key: "masterName", label: "SuperAgent", total: "SA" },
  { key: "dealerName", label: "Agent", total: "A" },
];

const groups = [
  ["Dealer", "Agent PlusMinus"],
  ["Master", "Super Agent PlusMinus"],
  ["SuperMaster", "Master Agent PlusMinus"],
  ["SubAdmin", "madmin PlusMinus"],
  ["Admin", "Admin PlusMinus"],
  ["SuperAdmin", "Super Admin PlusMinus"],
];
const metrics = [
  ["matchCommission", "M Com"], ["sessionCommission", "S Com"],
  ["totalCommission", "T Com"], ["netAmount", "Net Amt"],
  ["shareAmount", "SHR"], ["finalAmount", "Final"],
];

// Match the existing role-specific ledger fields and ordering exactly.
export function getLedgerLayout(userType) {
  const role = Number(userType);
  if (role < 2 || role > 7 || !Number.isInteger(role)) return null;
  if (role === 2) {
    return {
      levels: [], totalLabel: "TOTAL", finalKey: "finalAmountDealer",
      clientLabel: "CLIENT",
      groups: [
        { label: "Client PlusMinus", columns: [
          ["matchAmount", "M AMT"], ["sessionAmount", "S AMT"],
          ["clientCommission", "C COM"], ["clientNetAmount", "NET AMT"],
          ["clientMobileApp", "C MOB"], ["clientFinal", "FINAL"],
        ] },
        { label: "Agent PlusMinus", columns: [
          ["matchCommissionDealer", "M COM"], ["sessionCommissionDealer", "S COM"],
          ["totalCommissionDealer", "T COM"], ["netAmountDealer", "NET AMT"],
          ["shareAmountDealer", "SHR AMT"], ["mobileAppDealer", "MOB APP"],
          ["finalAmountDealer", "FINAL"],
        ] },
      ],
    };
  }
  return {
    levels: levels.slice(7 - role),
    totalLabel: ({ 3: "SM TOTAL", 4: "SM TOTAL", 5: "SUB TOTAL", 6: "Ad TOTAL", 7: "AA TOTAL" })[role],
    finalKey: `finalAmount${groups[role - 2][0]}`,
    clientLabel: "Client",
    groups: [
      { label: "", columns: [["matchAmount", "M Amt"], ["sessionAmount", "S Amt"], ["totalAmoount", "TOT Amt"]] },
      ...groups.slice(0, role - 1).map(([suffix, label]) => ({
        label, columns: metrics.map(([key, name]) => [`${key}${suffix}`, name]),
      })),
    ],
  };
}

export function getAccountEntries(data, layout) {
  const entries = [];
  function visit(items, depth, ancestors, prefix) {
    if (!layout.levels[depth]) return;
    (items || []).forEach((item, index) => {
      const id = `${prefix}-${index}`;
      const entry = { id, item, depth, ancestors, level: layout.levels[depth] };
      entries.push(entry);
      visit(item.ledgetList, depth + 1, [...ancestors, entry], id);
    });
  }
  visit(data?.ledgetList, 0, [], "account");
  return entries;
}

// Subtotals come from the API; never recompute or sum rounded display values.
export function getLedgerRows(item, depth, layout, prefix = "row") {
  if (depth >= layout.levels.length - 1) {
    return [
      ...(item.ledgetList || []).map((client, index) => ({
        id: `${prefix}-${index}`, kind: "client", data: client,
        label: `${client.userId ?? ""} ${client.username ?? ""}`.trim(),
      })),
      { id: `${prefix}-total`, kind: "total", label: "TOTAL", data: item },
    ];
  }
  const nextLevel = layout.levels[depth + 1];
  const rows = (item.ledgetList || []).flatMap((child, index) => [
    { id: `${prefix}-${index}-heading`, kind: "hierarchy", level: nextLevel, data: child },
    ...getLedgerRows(child, depth + 1, layout, `${prefix}-${index}`),
  ]);
  const level = layout.levels[depth];
  if (level) rows.push({ id: `${prefix}-total`, kind: level.total, label: `${level.total} TOTAL`, data: item });
  return rows;
}
