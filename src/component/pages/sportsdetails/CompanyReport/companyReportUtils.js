import { convertCode } from "../../../../store/constant";

// Presentation-only formatting — does not alter the underlying value.
export const formatAmount = (value) =>
  Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// Same two-way logic the original body-row cells used (zero renders the
// same as a negative value — no separate neutral case for rows).
export const getRowColorClass = (value) =>
  value > 0 ? "cr-is-positive" : "cr-is-negative";

// Same three-way `getColor` logic the original Total row used.
export const getTotalColorClass = (value) => {
  if (value > 0) return "cr-is-positive";
  if (value < 0) return "cr-is-negative";
  return "cr-is-neutral";
};

// Same field/label set the original table columns used (excluding
// Code/Name, which are always shown and not independently toggleable).
export const REPORT_COLUMNS = [
  { key: "matchAmount", label: "Match Amt" },
  { key: "sessionAmount", label: "Session Amt" },
  { key: "total", label: "Total" },
  { key: "matchComm", label: "Match Comm+" },
  { key: "sessionComm", label: "Session Comm+" },
  { key: "totalComm", label: "Total Comm" },
  { key: "myShare", label: "My Share" },
  { key: "mapp", label: "M.App" },
  { key: "netAmount", label: "Net Amount" },
];

// Same reduce shape/formula the original totalValues calculation used.
export const sumReport = (rows = []) =>
  rows.reduce(
    (acc, curr) => {
      acc.matchAmount += curr?.matchAmount || 0;
      acc.sessionAmount += curr?.sessionAmount || 0;
      acc.total += curr?.total || 0;
      acc.matchComm += curr?.matchComm || 0;
      acc.sessionComm += curr?.sessionComm || 0;
      acc.totalComm += curr?.totalComm || 0;
      acc.myShare += curr?.myShare || 0;
      acc.mapp += curr?.mapp || 0;
      acc.netAmount += curr?.netAmount || 0;
      return acc;
    },
    {
      matchAmount: 0,
      sessionAmount: 0,
      total: 0,
      matchComm: 0,
      sessionComm: 0,
      totalComm: 0,
      myShare: 0,
      mapp: 0,
      netAmount: 0,
    }
  );

// Client-side only — exports exactly what's currently displayed, does not
// touch the API or any calculation.
export const buildReportCsv = (rows = []) => {
  const headers = ["Code", "Name", ...REPORT_COLUMNS.map((c) => c.label)];
  const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

  const lines = [headers.map(escape).join(",")];
  rows.forEach((row) => {
    const line = [
      escape(convertCode(row?.userId)),
      escape(row?.userName),
      ...REPORT_COLUMNS.map((c) => Number(row?.[c.key] || 0).toFixed(2)),
    ];
    lines.push(line.join(","));
  });

  return lines.join("\n");
};

export const downloadCsv = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
