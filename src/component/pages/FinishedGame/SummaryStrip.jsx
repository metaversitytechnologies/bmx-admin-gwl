const SummaryStrip = () => {
  return (
    <div
      className="summary_strip"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "0",
        margin: "8px 16px 12px",
        padding: "14px 16px",
        background: "#f1f3f5",
        borderRadius: "8px",
        boxSizing: "border-box",
      }}>
      <div
        className="summary_item"
        style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span
          className="summary_label"
          style={{
            fontSize: "12px",
            color: "#8a8a8a",
            fontWeight: 600,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
          }}>
          COMMISSION+
        </span>
        <span
          className="summary_value positive"
          style={{ fontSize: "22px", fontWeight: 600, color: "#2fb344" }}>
          0.00
        </span>
      </div>
      <div
        className="summary_item"
        style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span
          className="summary_label"
          style={{
            fontSize: "12px",
            color: "#8a8a8a",
            fontWeight: 600,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
          }}>
          COMMISSION-
        </span>
        <span
          className="summary_value negative"
          style={{ fontSize: "22px", fontWeight: 600, color: "#f03e3e" }}>
          0.00
        </span>
      </div>
      <div
        className="summary_item"
        style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span
          className="summary_label"
          style={{
            fontSize: "12px",
            color: "#8a8a8a",
            fontWeight: 600,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
          }}>
          P/L
        </span>
        <span
          className="summary_value negative"
          style={{ fontSize: "22px", fontWeight: 600, color: "#f03e3e" }}>
          0.00
        </span>
      </div>
    </div>
  );
};

export default SummaryStrip;
