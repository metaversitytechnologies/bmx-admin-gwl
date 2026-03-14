import { EyeOutlined } from "@ant-design/icons";
import { Card, Empty, Modal, Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import MatkaBetsTable from "./components/MatkaBetsTable";
import {
  useGetMatkaBetBySidMutation,
  useGetMatkaBetsQuery,
  useGetMatkaLiabilityQuery,
  useGetMatkaMarketQuery,
} from "../../../store/service/MatkaServices";

const InplayMatkaDetail = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { eventId, name } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const activeTabParam = searchParams.get("tab") || "";
  const [selectedTab, setSelectedTab] = useState("");
  const [isBetDetailsOpen, setIsBetDetailsOpen] = useState(false);
  const [selectedRunnerName, setSelectedRunnerName] = useState("");
  const [betDetails, setBetDetails] = useState([]);

  const matchIdRaw = eventId;
  const matchIdNumber = Number(matchIdRaw);
  const matchId = Number.isNaN(matchIdNumber) ? matchIdRaw : matchIdNumber;

  const {
    data: marketData,
    isLoading: isMarketLoading,
    isFetching: isMarketFetching,
    error: marketError,
  } = useGetMatkaMarketQuery(
    { matkaId: matchId },
    { skip: !matchId }
  );

  const {
    data: betsData,
    isLoading: isBetsLoading,
    isFetching: isBetsFetching,
    error: betsError,
  } = useGetMatkaBetsQuery(
    { matchId: matchId },
    { skip: !matchId }
  );
  const [getMatkaBetBySid, { isLoading: isBetDetailsLoading }] =
    useGetMatkaBetBySidMutation();

  const matchInfo = marketData?.data
    ? {
        name: marketData.data.matkaName,
        time: marketData.data.time,
      }
    : null;
  const markets = useMemo(
    () => (Array.isArray(marketData?.data?.matkaMarket) ? marketData.data.matkaMarket : []),
    [marketData]
  );
  const bets = useMemo(
    () => (Array.isArray(betsData?.data) ? betsData.data : []),
    [betsData]
  );

  const normalizedTabParam = (activeTabParam || "").toUpperCase();
  const isHarupMarket = (marketName = "") =>
    marketName.toUpperCase().includes("HARUP");

  const singleMarket = useMemo(() => {
    return (
      markets.find((market) => {
        const name = (market?.marketName || "").toUpperCase();
        return name.includes("SINGLE") || name.includes("JODI");
      }) ||
      markets.find((market) => !isHarupMarket(market?.marketName || "")) ||
      null
    );
  }, [markets]);
  const harupAndarMarket = useMemo(() => {
    return (
      markets.find((market) => {
        const name = (market?.marketName || "").toUpperCase();
        return name.includes("HARUP") && name.includes("ANDAR");
      }) || null
    );
  }, [markets]);
  const harupBaharMarket = useMemo(() => {
    return (
      markets.find((market) => {
        const name = (market?.marketName || "").toUpperCase();
        return name.includes("HARUP") && name.includes("BAHAR");
      }) || null
    );
  }, [markets]);
  const tabItems = useMemo(() => {
    const items = [];
    if (singleMarket) items.push({ key: "SINGLE_JODI", label: "SINGLE JODI" });
    if (harupAndarMarket || harupBaharMarket) {
      items.push({ key: "HARUP", label: "HARUP" });
    }
    return items;
  }, [singleMarket, harupAndarMarket, harupBaharMarket]);

  useEffect(() => {
    if (!tabItems.length) return;
    if (!selectedTab) {
      if (normalizedTabParam === "HARUP") {
        setSelectedTab("HARUP");
        return;
      }
      if (
        normalizedTabParam.includes("HARUP") &&
        (harupAndarMarket || harupBaharMarket)
      ) {
        setSelectedTab("HARUP");
        return;
      }
      if (normalizedTabParam === "SINGLE_JODI" || normalizedTabParam === "SINGLE JODI") {
        setSelectedTab("SINGLE_JODI");
        return;
      }
      if (normalizedTabParam.includes("SINGLE") && singleMarket) {
        setSelectedTab("SINGLE_JODI");
        return;
      }
      setSelectedTab(tabItems[0]?.key || "");
    }
  }, [
    tabItems,
    selectedTab,
    normalizedTabParam,
    singleMarket,
    harupAndarMarket,
    harupBaharMarket,
  ]);

  const selectedSingleMarket = selectedTab === "SINGLE_JODI" ? singleMarket : null;
  const selectedSingleMarketName = selectedSingleMarket?.marketName
    ? selectedSingleMarket.marketName.split("_")[0]
    : "";
  const getMarketId = (marketName) =>
    (marketName || "")
      .replace(/\bharup\b/i, "")
      .replace(/\s+/g, " ")
      .trim();

  const selectedSingleMarketId = getMarketId(selectedSingleMarket?.marketName);
  const harupAndarMarketId = getMarketId(harupAndarMarket?.marketName);
  const harupBaharMarketId = getMarketId(harupBaharMarket?.marketName);

  const {
    data: singleLiabilityData,
    isLoading: isSingleLiabilityLoading,
    isFetching: isSingleLiabilityFetching,
  } = useGetMatkaLiabilityQuery(
    {
      matchId: matchId,
      marketId: selectedSingleMarketId,
    },
    { skip: !matchId || selectedTab !== "SINGLE_JODI" || !selectedSingleMarketId }
  );

  const {
    data: harupAndarLiabilityData,
    isLoading: isHarupAndarLiabilityLoading,
    isFetching: isHarupAndarLiabilityFetching,
  } = useGetMatkaLiabilityQuery(
    {
      matchId: matchId,
      marketId: harupAndarMarketId,
    },
    { skip: !matchId || selectedTab !== "HARUP" || !harupAndarMarketId }
  );

  const {
    data: harupBaharLiabilityData,
    isLoading: isHarupBaharLiabilityLoading,
    isFetching: isHarupBaharLiabilityFetching,
  } = useGetMatkaLiabilityQuery(
    {
      matchId: matchId,
      marketId: harupBaharMarketId,
    },
    { skip: !matchId || selectedTab !== "HARUP" || !harupBaharMarketId }
  );

  const isBusy =
    isMarketLoading ||
    isMarketFetching ||
    isBetsLoading ||
    isBetsFetching ||
    isSingleLiabilityLoading ||
    isSingleLiabilityFetching ||
    isHarupAndarLiabilityLoading ||
    isHarupAndarLiabilityFetching ||
    isHarupBaharLiabilityLoading ||
    isHarupBaharLiabilityFetching;

  const buildLiabilityMap = (liabilityPayload) => {
    if (!Array.isArray(liabilityPayload?.data)) return {};
    return liabilityPayload.data.reduce((acc, item) => {
      acc[item.selectionId] = item.liability;
      return acc;
    }, {});
  };
  const singleLiabilities = useMemo(
    () => buildLiabilityMap(singleLiabilityData),
    [singleLiabilityData]
  );
  const harupAndarLiabilities = useMemo(
    () => buildLiabilityMap(harupAndarLiabilityData),
    [harupAndarLiabilityData]
  );
  const harupBaharLiabilities = useMemo(
    () => buildLiabilityMap(harupBaharLiabilityData),
    [harupBaharLiabilityData]
  );

  const errorMessage =
    (marketData?.status === false && marketData?.message) ||
    (betsData?.status === false && betsData?.message) ||
    marketError?.data?.message ||
    betsError?.data?.message;

  const filteredBets = useMemo(() => {
    return bets.filter((bet) => {
      const betName = (bet.matkaName || "").toUpperCase();
      const marketId = (bet.marketId || "").toUpperCase();

      if (selectedTab === "HARUP") {
        return betName.includes("HARUP") || marketId.includes("HARUP");
      }

      if (selectedTab === "SINGLE_JODI") {
        const selectedName = (selectedSingleMarketName || "").toUpperCase();
        const marketName = (selectedSingleMarket?.marketName || "").toUpperCase();
        return (
          betName === marketName ||
          betName === selectedName ||
          betName.includes(selectedName) ||
          marketId.includes(selectedName)
        );
      }

      return true;
    });
  }, [bets, selectedTab, selectedSingleMarket, selectedSingleMarketName]);

  const getMarketSuffix = (marketName = "") => {
    const upperName = marketName.toUpperCase();

    if (upperName.includes("JODI")) return "_JODI";
    if (upperName.includes("ANDAR")) return "_HARUP_ANDAR";
    if (upperName.includes("BAHAR")) return "_HARUP_BAHAR";

    return "";
  };

  const buildBetDetailsMarketId = (baseName = "", marketName = "") => {
    const suffix = getMarketSuffix(marketName);

    if (!baseName || !suffix) return baseName;

    const firstDashIndex = baseName.indexOf("-");
    if (firstDashIndex === -1) {
      return `${baseName}${suffix}`;
    }

    return `${baseName.slice(0, firstDashIndex)}${suffix}${baseName.slice(firstDashIndex)}`;
  };

  const handleRunnerBetDetails = async (runner, market) => {
    if (!matchId) return;

    const selectionId = Number(runner?.selectionId);
    if (Number.isNaN(selectionId)) return;

    const matkaName = marketData?.data?.matkaName || name || "";
    const marketId = buildBetDetailsMarketId(matkaName, market?.marketName || "");

    setSelectedRunnerName(runner?.selectionName || String(runner?.selectionId || ""));
    setBetDetails([]);
    setIsBetDetailsOpen(true);

    try {
      const response = await getMatkaBetBySid({
        matkaId: matchId,
        marketId,
        selectionId,
      }).unwrap();

      setBetDetails(Array.isArray(response?.data) ? response.data : []);
    } catch {
      setBetDetails([]);
    }
  };

  const betDetailsTableCellStyle = {
    padding: "10px 12px",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #f0f0f0",
    fontSize: "13px",
  };

  const betDetailsTableHeadStyle = {
    ...betDetailsTableCellStyle,
    background: "var(--bg-color)",
    color: "#fff",
    fontWeight: 600,
    borderBottom: "none",
  };

  const renderRunnerGrid = (market, liabilitiesMap) => {
    const runners = market?.data || [];
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "10px",
          marginBottom: "24px",
        }}>
        {runners.map((runner) => (
          <div
            key={runner.selectionId || runner.selectionName}
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
                padding: "8px",
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}>
                <span
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: "13px",
                    color: "#2f2f2f",
                    fontWeight: 600,
                  }}>
                  {runner.selectionName}
                </span>
                <button
                  type="button"
                  onClick={() => handleRunnerBetDetails(runner, market)}
                  aria-label={`View bets for ${runner.selectionName}`}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "var(--bg-color)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    fontSize: "15px",
                  }}>
                  <EyeOutlined />
                </button>
              </div>
            </div>
            <div
              style={{
                fontSize: "13px",
                color:
                  Number(liabilitiesMap[runner.selectionId] || 0) < 0
                    ? "#f03e3e"
                    : "#2fb344",
                fontWeight: 600,
              }}>
              {Number(liabilitiesMap[runner.selectionId] || 0).toFixed(2)}
            </div>
          </div>
        ))}
        {runners.length === 0 && (
          <div style={{ gridColumn: "1 / -1" }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="match_slip">
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail team_name"
        title={`${(name || matchInfo?.name || "").toUpperCase()}`}
        extra={<button onClick={() => nav("/matka/inplay")}>Back</button>}>
        <div style={{ padding: "20px" }}>
          <Tabs
            activeKey={selectedTab || (tabItems[0]?.key || "")}
            onChange={(key) => {
              const params = new URLSearchParams(location.search);
              if (key) {
                params.set("tab", key);
              } else {
                params.delete("tab");
              }
              setSelectedTab(key);
              nav({
                pathname: `/matka/inplay/${eventId || ""}/${name || ""}`,
                search: params.toString(),
              });
            }}
            type="card"
            size="small"
            items={tabItems}
          />

          {errorMessage && (
            <div
              style={{
                marginBottom: "12px",
                padding: "10px 12px",
                background: "#fff1f0",
                color: "#cf1322",
                border: "1px solid #ffa39e",
                borderRadius: "6px",
              }}>
              {errorMessage}
            </div>
          )}

          {isBusy ? (
            <div style={{ padding: "30px 0", position: "relative" }}>
              <CustomLoading />
            </div>
          ) : (
            <>
              {selectedTab === "SINGLE_JODI" &&
                renderRunnerGrid(selectedSingleMarket, singleLiabilities)}

              {selectedTab === "HARUP" && (
                <>
                  <div
                    style={{
                      marginBottom: "14px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}>
                    <div
                      style={{
                        background: "var(--bg-color)",
                        color: "#fff",
                        padding: "8px 12px",
                        fontWeight: 600,
                        fontSize: "18px",
                        borderBottom: "1px solid rgba(0,0,0,0.08)",
                      }}>
                      ANDAR
                    </div>
                    <div style={{ padding: "12px 12px 0 12px" }}>
                      {renderRunnerGrid(harupAndarMarket, harupAndarLiabilities)}
                    </div>
                  </div>
                  <div
                    style={{
                      marginBottom: "14px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}>
                    <div
                      style={{
                        background: "var(--bg-color)",
                        color: "#fff",
                        padding: "8px 12px",
                        fontWeight: 600,
                        fontSize: "18px",
                        borderBottom: "1px solid rgba(0,0,0,0.08)",
                      }}>
                      BAHAR
                    </div>
                    <div style={{ padding: "12px 12px 0 12px" }}>
                      {renderRunnerGrid(harupBaharMarket, harupBaharLiabilities)}
                    </div>
                  </div>
                </>
              )}
              {!selectedTab && (
                <div style={{ marginBottom: "24px" }}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
            </>
          )}
          <MatkaBetsTable bets={filteredBets} matchName={matchInfo?.name || ""} />
        </div>
      </Card>

      <Modal
        open={isBetDetailsOpen}
        onCancel={() => {
          setIsBetDetailsOpen(false);
          setBetDetails([]);
          setSelectedRunnerName("");
        }}
        footer={null}
        width={1000}
        title={`Bet Details${selectedRunnerName ? ` - ${selectedRunnerName}` : ""}`}>
        {isBetDetailsLoading ? (
          <div style={{ padding: "30px 0", position: "relative" }}>
            <CustomLoading />
          </div>
        ) : (
          <div
            style={{
              overflowX: "auto",
              background: "#fff",
              border: "1px solid #f0f0f0",
              borderRadius: "8px",
            }}>
            <table
              style={{
                width: "100%",
                minWidth: "860px",
                borderCollapse: "collapse",
              }}>
              <thead>
                <tr>
                  <th style={betDetailsTableHeadStyle}>ID</th>
                  <th style={betDetailsTableHeadStyle}>CLIENT NAME</th>
                  <th style={betDetailsTableHeadStyle}>GAME</th>
                  <th style={betDetailsTableHeadStyle}>RATE</th>
                  <th style={betDetailsTableHeadStyle}>BET NUM</th>
                  <th style={betDetailsTableHeadStyle}>STACK</th>
                  <th style={betDetailsTableHeadStyle}>P&amp;L</th>
                  <th style={betDetailsTableHeadStyle}>RESULT</th>
                  <th style={betDetailsTableHeadStyle}>CREATED AT</th>
                </tr>
              </thead>
              <tbody>
                {betDetails.length > 0 ? (
                  betDetails.map((bet, index) => (
                    <tr key={`${bet?.betId || bet?.id || bet?.userId || index}-${index}`}>
                      <td style={betDetailsTableCellStyle}>
                        {bet?.betId || bet?.id || index + 1}
                      </td>
                      <td style={betDetailsTableCellStyle}>{bet?.userId || "-"}</td>
                      <td style={betDetailsTableCellStyle}>{bet?.matkaName || "-"}</td>
                      <td style={betDetailsTableCellStyle}>{bet?.rate ?? "-"}</td>
                      <td style={betDetailsTableCellStyle}>{bet?.nation ?? "-"}</td>
                      <td style={betDetailsTableCellStyle}>{bet?.amount ?? "-"}</td>
                      <td style={betDetailsTableCellStyle}>
                        <span className={bet?.pnl >= 0 ? "text_success" : "text_danger"}>
                          {Number(bet?.pnl || 0).toFixed(2)}
                        </span>
                      </td>
                      <td style={betDetailsTableCellStyle}>
                        {bet?.declared === "null" || !bet?.declared ? "-" : bet.declared}
                      </td>
                      <td style={betDetailsTableCellStyle}>{bet?.date || bet?.betTime || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} style={{ padding: "24px 12px" }}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InplayMatkaDetail;
