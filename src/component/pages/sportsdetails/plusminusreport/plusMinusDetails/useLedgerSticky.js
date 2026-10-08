import { useLayoutEffect } from "react";

// The six legacy renderers share this behavior without changing their data or markup.
export default function useLedgerSticky(viewportRef, data) {
  useLayoutEffect(() => {
    const root = viewportRef.current;
    if (!root) return undefined;
    const tables = [...root.querySelectorAll("table.plus-table.plus_minus_sec")];
    // This ref represents one API ledger report, including its aggregate totals.
    // Separate report instances never share listeners or a horizontal position.
    const scrollports = [...root.querySelectorAll(".ledger-table-scroll")];
    let scrollLeft = scrollports[0]?.scrollLeft || 0;
    const synchronize = (source) => {
      const next = source.scrollLeft;
      // Programmatic scroll events arrive asynchronously. Comparing positions
      // also ignores vertical-only events and prevents feedback loops.
      if (next === scrollLeft) return;
      scrollLeft = next;
      scrollports.forEach((port) => {
        if (port !== source && port.scrollLeft !== next) {
          port.scrollLeft = next;
        }
      });
    };
    const onScroll = (event) => synchronize(event.currentTarget);
    scrollports.forEach((port) => {
      port.scrollLeft = scrollLeft;
      port.addEventListener("scroll", onScroll, { passive: true });
    });
    const marked = [];
    const headerRows = [];
    tables.forEach((table) => {
      // Footer-only tables use thead for totals: pin their label horizontally only.
      const hasClients = table.tBodies.length > 0;
      const headings = [...table.children]
        .filter((section) => section.tagName === "THEAD" && hasClients)
        .flatMap((section) => [...section.rows]);
      headerRows.push(headings);
      // Track occupied grid columns so rowSpan never pins a financial cell as Client.
      const spans = [];
      [...table.rows].forEach((row) => {
        let column = 0;
        [...row.cells].forEach((cell) => {
          while (spans[column] > 0) column += 1;
          if (column === 0 && cell.colSpan === 1) {
            cell.classList.add("ledger-sticky-client");
            marked.push(cell);
          }
          if (headings.includes(row)) {
            cell.classList.add("ledger-sticky-heading");
            marked.push(cell);
          }
          for (let i = 0; i < cell.colSpan; i += 1) spans[column + i] = cell.rowSpan;
          column += cell.colSpan;
        });
        for (let i = 0; i < spans.length; i += 1) spans[i] = Math.max(0, (spans[i] || 0) - 1);
      });
    });
    const measure = () => {
      headerRows.forEach((rows) => {
        let top = 0;
        rows.forEach((row) => {
          [...row.cells].forEach((cell) => cell.style.setProperty("--ledger-header-top", `${top}px`));
          top += row.getBoundingClientRect().height;
        });
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    headerRows.flat().forEach((row) => observer.observe(row));
    return () => {
      observer.disconnect();
      scrollports.forEach((port) => port.removeEventListener("scroll", onScroll));
      marked.forEach((cell) => {
        cell.classList.remove("ledger-sticky-client", "ledger-sticky-heading");
        cell.style.removeProperty("--ledger-header-top");
      });
    };
  }, [viewportRef, data]);
}
