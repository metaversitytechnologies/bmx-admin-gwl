import { useState } from "react";
import PropTypes from "prop-types";
import { convertCode } from "../../../../../../store/constant";
import { getAccountEntries, getLedgerLayout, getLedgerRows } from "../ledgerPresentation";

const amount = (value) => typeof value === "number" ? value.toFixed(2) : "";
const valueClass = (value) => value < 0 ? "pnl-negative" : "";

function FinancialTable({ rows, layout, label }) {
  // Amount columns belong to Agent PlusMinus without changing their order.
  const groups = layout.groups[0].label === ""
    ? [{ ...layout.groups[1], columns: [...layout.groups[0].columns, ...layout.groups[1].columns] }, ...layout.groups.slice(2)]
    : layout.groups;
  const columns = groups.flatMap((group) => group.columns);
  return (
    <table className="pnl-table" aria-label={label}>
      <colgroup>
        <col className="pnl-client-column" />
        {columns.map(([key]) => <col key={key} />)}
      </colgroup>
      <thead>
        <tr className="pnl-group-row">
          <th rowSpan={2} scope="col">{layout.clientLabel}</th>
          {groups.map((group, index) => (
            <th key={index} scope="colgroup" colSpan={group.columns.length}
              className={`pnl-group pnl-group-${index % 4}`}>{group.label}</th>
          ))}
        </tr>
        <tr className="pnl-metric-row">
          {groups.flatMap((group, index) => group.columns.map(([key, name], columnIndex) => (
            <th key={key} scope="col" className={`pnl-group-${index % 4}${columnIndex === 0 ? " pnl-group-start" : ""}`}>{name}</th>
          )))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => row.kind === "hierarchy" ? (
          <HierarchyBand key={row.id} row={row} columnCount={columns.length + 1} />
        ) : (
          <tr key={row.id} className={`pnl-row pnl-row-${row.kind}`}>
            <th scope="row">{row.label}</th>
            {groups.flatMap((group) => group.columns.map(([key], index) => (
              <td key={key} className={`${valueClass(row.data[key])}${index === 0 ? " pnl-group-start" : ""}`}>
                {amount(row.data[key])}
              </td>
            )))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const hierarchyStyles = {
  subAdminName: { label: "Admin", tone: "admin" },
  superMasterName: { label: "Master Agent", tone: "master" },
  masterName: { label: "Super Agent", tone: "super" },
  dealerName: { label: "Agent", tone: "agent" },
};

function HierarchyBand({ row, columnCount }) {
  const presentation = hierarchyStyles[row.level.key];
  const account = convertCode(row.data[row.level.key]) || "";
  const [, code = "", name = ""] = account.match(/^(\S+)(?:\s+([\s\S]*))?$/) || [];
  return <tr className={`pnl-hierarchy-row pnl-hierarchy-${presentation?.tone || "admin"}`}>
    <th colSpan={columnCount} scope="rowgroup">
      <div className="pnl-hierarchy-content">
        <span className="pnl-hierarchy-badge">{presentation?.label || row.level.label}</span>
        <strong className="pnl-hierarchy-code">{code}</strong>
        <span className="pnl-hierarchy-name">{name}</span>
      </div>
    </th>
  </tr>;
}

function TotalProfit({ value }) {
  if (typeof value !== "number") return null;
  return <div className="pnl-profit">
    <span>Total P&amp;L</span>
    <strong className={valueClass(value)}>{amount(value)}</strong>
  </div>;
}

export default function LedgerDashboard({ data, userType }) {
  const [selectedId, setSelectedId] = useState("overview");
  const layout = getLedgerLayout(userType);
  if (!layout) return <div className="pnl-message" role="status">This account does not have a ledger view.</div>;
  const entries = getAccountEntries(data, layout);
  const selected = entries.find((entry) => entry.id === selectedId);
  const activeId = selected?.id || "overview";
  const visible = selected ? [selected] : entries.filter((entry) => entry.depth === 0);
  const rootRows = layout.levels.length === 0
    ? getLedgerRows(data, -1, layout)
    : [{ id: "grand-total", kind: "grand-total", label: layout.totalLabel, data }];

  return <div className="pnl-dashboard">
    <nav className="pnl-navigation" aria-label="Ledger accounts">
      <div className="pnl-navigation-tabs">
        <button type="button" aria-pressed={activeId === "overview"}
          onClick={() => setSelectedId("overview")}>Overview</button>
        {layout.levels.map((level, depth) => {
          const path = selected ? [...selected.ancestors, selected] : [];
          const current = path.find((entry) => entry.depth === depth);
          const parent = path.find((entry) => entry.depth === depth - 1);
          const options = entries.filter((entry) => entry.depth === depth &&
            (!parent || entry.ancestors.some((ancestor) => ancestor.id === parent.id)));
          return <label className="pnl-account-filter" key={level.key}>
            <span>{level.label}</span>
            <select aria-label={`${level.label} account`} value={current?.id || ""}
              onChange={(event) => setSelectedId(event.target.value || parent?.id || "overview")}>
              <option value="">All accounts</option>
              {options.map((entry) => <option key={entry.id} value={entry.id}>
                {convertCode(entry.item[level.key])}
              </option>)}
            </select>
          </label>;
        })}
      </div>
      <TotalProfit value={(selected?.item || data)[layout.finalKey]} />
    </nav>

    <div className="pnl-sections">
      {visible.map((entry, index) => {
        const name = convertCode(entry.item[entry.level.key]);
        return <section className={`pnl-card pnl-tone-${index % 2 === 0 ? "green" : "blue"}`}
          key={entry.id} aria-label={name || entry.level.label}>
          <header className="pnl-card-header">
            <div className="pnl-card-heading">
              <span className="pnl-eyebrow">{entry.level.label}</span>
              <h2>{name || entry.level.label}</h2>
            </div>
            <TotalProfit value={entry.item[layout.finalKey]} />
          </header>
          
          <div className="pnl-table-scroll" tabIndex={0} role="region" aria-label={`${name || entry.level.label} financial table`}>
            <FinancialTable layout={layout} rows={getLedgerRows(entry.item, entry.depth, layout, entry.id)}
              label={`${name || entry.level.label} profit and loss`} />
          </div>
        </section>;
      })}
      {activeId === "overview" && <section className="pnl-card pnl-summary" aria-label="Ledger totals">
        <header className="pnl-card-header"><h2>{layout.levels.length ? layout.totalLabel : "Client PlusMinus"}</h2>
          <TotalProfit value={data[layout.finalKey]} /></header>
        <div className="pnl-table-scroll" tabIndex={0} role="region" aria-label="Ledger totals table">
          <FinancialTable rows={rootRows} layout={layout} label="Ledger totals" />
        </div>
      </section>}
    </div>
  </div>;
}

FinancialTable.propTypes = { rows: PropTypes.array.isRequired, layout: PropTypes.object.isRequired, label: PropTypes.string.isRequired };
HierarchyBand.propTypes = { row: PropTypes.object.isRequired, columnCount: PropTypes.number.isRequired };
TotalProfit.propTypes = { value: PropTypes.number };
LedgerDashboard.propTypes = { data: PropTypes.object.isRequired, userType: PropTypes.string };
