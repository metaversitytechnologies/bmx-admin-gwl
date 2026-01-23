import { Card, Empty, Tabs } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const buildRunnerRows = () =>
  Array.from({ length: 100 }, (_, index) => ({
    label: String(index).padStart(2, "0"),
    value: "0.00",
  }));

const InplayMatkaDetail = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { eventId, name } = useParams();
  const runners = buildRunnerRows();
  const harupRows = Array.from({ length: 10 }, (_, index) => ({
    label: String(index),
    value: "0.00",
  }));
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab") === "harup" ? "harup" : "single-jodi";

  return (
    <div className="match_slip">
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail team_name"
        title={`${(name || "").toUpperCase()} | EVENT ID: ${eventId || ""}`}
        extra={<button onClick={() => nav(-1)}>Back</button>}>
        <div style={{ padding: "20px" }}>
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              const params = new URLSearchParams(location.search);
              if (key === "harup") {
                params.set("tab", "harup");
              } else {
                params.delete("tab");
              }
              nav({
                pathname: `/matka/inplay/${eventId || ""}/${name || ""}`,
                search: params.toString(),
              });
            }}
            type="card"
            size="small"
            items={[
              { key: "single-jodi", label: "SINGLE JODI" },
              { key: "harup", label: "HARUP" },
            ]}
          />

          {activeTab === "harup" ? (
            <>
              {[
                { title: "ANDAR", rows: harupRows },
                { title: "BAHAR", rows: harupRows },
              ].map((section) => (
                <div key={section.title} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      background: "#b8892c",
                      color: "#fff",
                      padding: "6px 12px",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.3px",
                    }}>
                    {section.title}
                  </div>
                  <div
                    style={{
                      border: "1px solid #f0f0f0",
                      borderTop: "none",
                      padding: "12px",
                      borderRadius: "0 0 8px 8px",
                      background: "#fff",
                    }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                        gap: "10px",
                      }}>
                      {section.rows.map((runner) => (
                        <div
                          key={`${section.title}-${runner.label}`}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "6px",
                          }}>
                          <div
                            style={{
                              width: "100%",
                              borderRadius: "6px",
                              border: "1px solid #d9d9d9",
                              background: "#f2f2f2",
                              padding: "6px 8px",
                              textAlign: "center",
                              fontSize: "13px",
                              color: "#2f2f2f",
                            }}>
                            {runner.label}
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#2fb344",
                              fontWeight: 600,
                            }}>
                            {runner.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "10px",
                marginBottom: "24px",
              }}>
              {runners.map((runner) => (
                <div
                  key={runner.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                  }}>
                  <div
                    style={{
                      width: "100%",
                      borderRadius: "6px",
                      border: "1px solid #d9d9d9",
                      background: "#f2f2f2",
                      padding: "6px 8px",
                      textAlign: "center",
                      fontSize: "13px",
                      color: "#2f2f2f",
                    }}>
                    {runner.label}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#2fb344",
                      fontWeight: 600,
                    }}>
                    {runner.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <table className="live_table login_data_table">
              <thead>
                <tr>
                  <th>USERNAME</th>
                  <th>RUNNER NAME</th>
                  <th>BET PRICE</th>
                  <th>BET VALUE</th>
                  <th>BET AMOUNT</th>
                  <th>PLACE TIME</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InplayMatkaDetail;
