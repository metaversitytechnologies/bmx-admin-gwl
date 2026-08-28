import { Card, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const CompletedMatka = () => {
  const nav = useNavigate();
  const totalPnl = 0;

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "P/L",
      dataIndex: "pnl",
      key: "pnl",
      render: (value) => (
        <span style={{ color: value > 0 ? "green" : "red" }}>
          {Number(value || 0).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: () => "",
    },
  ];

  return (
    <div className="match_slip main_live_section list_supers admin-details-panel completed-matka-panel">
      <AppPageHeader
        icon={<CircleCheckBig size={20} strokeWidth={1.8} />}
        title="Completed Matka"
        subtitle="Review completed Matka results and profit/loss"
        onBack={() => nav(-1)}
      />
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail">
        <div style={{ padding: "20px" }}>
          <div
            className="summary_strip"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
              gap: "0",
              marginBottom: "20px",
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
                P/L
              </span>
              <span
                className={`summary_value ${
                  totalPnl > 0 ? "positive" : "negative"
                }`}
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  color: totalPnl > 0 ? "#2fb344" : "#f03e3e",
                }}>
                {totalPnl.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <Table
              columns={columns}
              dataSource={[]}
              rowKey={(record, index) => index}
              pagination={false}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompletedMatka;
