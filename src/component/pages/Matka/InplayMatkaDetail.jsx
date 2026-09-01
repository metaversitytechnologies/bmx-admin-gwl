import { EyeOutlined } from "@ant-design/icons";
import { Card, Empty, Modal, Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Dice5 } from "lucide-react";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";
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

  const renderRunnerGrid = (market, liabilitiesMap) => {
    const runners = market?.data || [];
    return (
      <div className="imd-runner-grid">
        {runners.map((runner) => (
          <div
            key={runner.selectionId || runner.selectionName}
            className="imd-runner-card">
            <div className="imd-runner-card-top">
              <span className="imd-runner-name">{runner.selectionName}</span>
              <button
                type="button"
                className="imd-runner-view"
                onClick={() => handleRunnerBetDetails(runner, market)}
                aria-label={`View bets for ${runner.selectionName}`}>
                <EyeOutlined />
              </button>
            </div>
            <div
              className={
                Number(liabilitiesMap[runner.selectionId] || 0) < 0
                  ? "imd-runner-value imd-runner-value-negative"
                  : "imd-runner-value imd-runner-value-positive"
              }>
              {Number(liabilitiesMap[runner.selectionId] || 0).toFixed(2)}
            </div>
          </div>
        ))}
        {runners.length === 0 && (
          <div className="imd-empty-state">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="match_slip main_live_section list_supers admin-details-panel inplay-matka-detail-panel">
      <AppPageHeader
        icon={<Dice5 size={20} strokeWidth={1.8} />}
        title={`${(name || matchInfo?.name || "").toUpperCase()}`}
        subtitle="View Matka runners, liabilities and bets for this game"
        onBack={() => nav("/matka/inplay")}
      />
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail team_name imd-workspace">
        <div className="imd-body">
          <Tabs
            className="imd-tabs"
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
            size="small"
            items={tabItems}
          />

          {errorMessage && (
            <div className="imd-error-message">
              {errorMessage}
            </div>
          )}

          {isBusy ? (
            <div className="imd-loading-state">
              <CustomLoading />
            </div>
          ) : (
            <>
              {selectedTab === "SINGLE_JODI" &&
                renderRunnerGrid(selectedSingleMarket, singleLiabilities)}

              {selectedTab === "HARUP" && (
                <div className="imd-harup-stack">
                  <div className="imd-market-section">
                    <div className="imd-market-header">
                      <span className="imd-market-title">ANDAR</span>
                      <span className="imd-market-count">
                        {harupAndarMarket?.data?.length || 0} Numbers
                      </span>
                    </div>
                    <div className="imd-market-body">
                      {renderRunnerGrid(harupAndarMarket, harupAndarLiabilities)}
                    </div>
                  </div>
                  <div className="imd-market-section">
                    <div className="imd-market-header">
                      <span className="imd-market-title">BAHAR</span>
                      <span className="imd-market-count">
                        {harupBaharMarket?.data?.length || 0} Numbers
                      </span>
                    </div>
                    <div className="imd-market-body">
                      {renderRunnerGrid(harupBaharMarket, harupBaharLiabilities)}
                    </div>
                  </div>
                </div>
              )}
              {!selectedTab && (
                <div className="imd-empty-state">
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
        className="imd-bet-details-modal"
        title={`Bet Details${selectedRunnerName ? ` - ${selectedRunnerName}` : ""}`}>
        {isBetDetailsLoading ? (
          <div className="imd-loading-state">
            <CustomLoading />
          </div>
        ) : (
          <div className="imd-modal-table-wrap">
            <table className="imd-modal-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CLIENT NAME</th>
                  <th>GAME</th>
                  <th>RATE</th>
                  <th>BET NUM</th>
                  <th>STACK</th>
                  <th>P&amp;L</th>
                  <th>RESULT</th>
                  <th>CREATED AT</th>
                </tr>
              </thead>
              <tbody>
                {betDetails.length > 0 ? (
                  betDetails.map((bet, index) => (
                    <tr key={`${bet?.betId || bet?.id || bet?.userId || index}-${index}`}>
                      <td data-label="ID">
                        <span className="imd-id-badge">{bet?.betId || bet?.id || index + 1}</span>
                      </td>
                      <td data-label="Client Name">{bet?.userId || "-"}</td>
                      <td data-label="Game">{bet?.matkaName || "-"}</td>
                      <td data-label="Rate">{bet?.rate ?? "-"}</td>
                      <td data-label="Bet Num">{bet?.nation ?? "-"}</td>
                      <td data-label="Stack">{bet?.amount ?? "-"}</td>
                      <td data-label="P&L">
                        <span className={bet?.pnl >= 0 ? "text_success" : "text_danger"}>
                          {Number(bet?.pnl || 0).toFixed(2)}
                        </span>
                      </td>
                      <td data-label="Result">
                        {bet?.declared === "null" || !bet?.declared ? "-" : bet.declared}
                      </td>
                      <td data-label="Created At">{bet?.date || bet?.betTime || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>
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
