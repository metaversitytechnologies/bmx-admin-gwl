import { useEffect, useRef, useState } from "react";
import { Columns3, Download, Search } from "lucide-react";
import PropTypes from "prop-types";

const ReportToolbar = ({
  searchTerm,
  onSearchChange,
  columns,
  onToggleColumn,
  onExport,
}) => {
  const [columnsOpen, setColumnsOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setColumnsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="cr-toolbar">
      <div className="cr-search-form">
        <Search size={15} strokeWidth={1.8} />
        <input
          type="text"
          placeholder="Search by code or name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search by code or name"
        />
      </div>

      <div className="cr-toolbar-actions">
        <div className="cr-columns-wrap" ref={wrapRef}>
          <button
            type="button"
            className={`cr-toolbar-btn${columnsOpen ? " is-active" : ""}`}
            onClick={() => setColumnsOpen((v) => !v)}
            aria-expanded={columnsOpen}>
            <Columns3 size={14} strokeWidth={1.8} />
            Columns
          </button>
          {columnsOpen && (
            <div className="cr-columns-menu" role="menu">
              {columns.map((col) => (
                <label className="cr-columns-item" key={col.key}>
                  <input
                    type="checkbox"
                    checked={col.visible}
                    onChange={() => onToggleColumn(col.key)}
                  />
                  {col.label}
                </label>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="cr-toolbar-btn"
          onClick={onExport}
          aria-label="Export report to CSV">
          <Download size={14} strokeWidth={1.8} />
          Export
        </button>
      </div>
    </div>
  );
};

ReportToolbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      visible: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleColumn: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
};

export default ReportToolbar;
