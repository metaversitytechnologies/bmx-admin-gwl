import { Button, Card, Empty, Input, Select } from "antd";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Ticket,
  WalletCards,
} from "lucide-react";
import PropTypes from "prop-types";
import {
  useGetQueryMatchBetsQuery,
  useGetSessionHavingBetQuery,
  useGetSessionQureyBetQuery,
} from "../../../../../store/service/SportDetailServices";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AddDetails from "../../../GameDeatis/AddDetails";
import { convertCode } from "../../../../../store/constant";
import {
  MATCH_BETS_POLL_MS,
  SESSION_BETS_POLL_MS,
} from "../../../../../store/pollingIntervals";

const formatDateTime = (value) => {
  if (!value) return { date: "-", time: "" };
  const formatted = new Date(value).toLocaleString();
  const [date, ...timeParts] = formatted.split(",");
  return { date, time: timeParts.join(",").trim() };
};

const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");

const SummaryStrip = ({ rows, isMatchBet }) => {
  const totals = useMemo(
    () =>
      rows.reduce(
        (acc, item) => {
          const amount = isMatchBet ? item?.stake : item?.amount;
          acc.amount += Number(amount || 0);
          acc.loss += Number(item?.liability || 0);
          acc.profit += Number(item?.pnl || 0);
          return acc;
        },
        { amount: 0, loss: 0, profit: 0 },
      ),
    [rows, isMatchBet],
  );

  return (
    <div className="live-bets-summary-strip">
      <div>
        <span className="live-bets-summary-icon is-purple">
          <Ticket size={17} strokeWidth={2} />
        </span>
        <p>Total Bets</p>
        <strong>{formatNumber(rows.length)}</strong>
      </div>
      <div>
        <span className="live-bets-summary-icon is-green">
          <WalletCards size={17} strokeWidth={2} />
        </span>
        <p>Total Amount</p>
        <strong>{formatNumber(totals.amount)}</strong>
      </div>
      <div>
        <span className="live-bets-summary-icon is-red">
          <TrendingLossIcon />
        </span>
        <p>Total Loss</p>
        <strong>{formatNumber(totals.loss)}</strong>
      </div>
      <div>
        <span className="live-bets-summary-icon is-green">
          <TrendingProfitIcon />
        </span>
        <p>Total Profit</p>
        <strong>{formatNumber(totals.profit)}</strong>
      </div>
    </div>
  );
};

const TrendingLossIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true">
    <path d="m3 7 6 6 4-4 8 8" />
    <path d="M21 10v7h-7" />
  </svg>
);

const TrendingProfitIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true">
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M14 7h7v7" />
  </svg>
);

const TypePill = ({ children, tone }) => (
  <span className={`live-bets-type-pill ${tone}`}>{children}</span>
);

const EmptyRow = ({ colSpan }) => (
  <tr>
    <td className="live-bets-empty-cell" colSpan={colSpan}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span>
            <strong>No bets found</strong>
            <small>There are no matching bets for the selected filters.</small>
          </span>
        }
      />
    </td>
  </tr>
);

const FancyBets = ({ setFancyId, fancyId, setShowMatchBet, showMatchBet }) => {
  const [oddsType, setOddsType] = useState("Bookmaker");
  const [searchTermOdds, setSearchTermOdds] = useState("");
  const [searchTermfancy, setSearchTermfancy] = useState("");
  const [openResponsive, setOpenResponsive] = useState(false);
  const [sessionType, setSessionType] = useState(false);
  const [betsDataShow, setBetsData] = useState(false);

  const [clientId, setClientId] = useState("");
  const { id } = useParams();

  const {
    data: matchBets,
    isFetching: isFetchingMatchBets,
    refetch: refetchMatchBets,
  } = useGetQueryMatchBetsQuery(
    {
      matchId: id,
      userId: "",
      matchCompleted: false,
      marketType: oddsType,
    },
    { pollingInterval: MATCH_BETS_POLL_MS },
  );

  const { data: sessionBets } = useGetSessionHavingBetQuery({
    matchCompleted: false,
    matchId: id ?? "",
  });
  const {
    data: sessionData,
    isFetching: isFetchingSessionBets,
    refetch: refetchSessionBets,
  } = useGetSessionQureyBetQuery(
    {
      matchId: id,
      userId: "",
      marketId: fancyId,
      matchCompleted: false,
    },
    { pollingInterval: SESSION_BETS_POLL_MS },
  );

  const matchRows = matchBets?.data?.bookmaker?.betList || [];
  const fancyRows = sessionData?.data || [];
  const filteredAllOdds = matchRows.filter(
    (item) =>
      item?.username?.toLowerCase().includes(searchTermOdds.toLowerCase()) ||
      item?.userId?.toString().includes(searchTermOdds),
  );
  const filteredAllfancy = fancyRows.filter(
    (item) =>
      item?.username?.toLowerCase().includes(searchTermfancy.toLowerCase()) ||
      item?.userId?.toString().includes(searchTermfancy),
  );
  const activeRows = showMatchBet === 1 ? filteredAllOdds : filteredAllfancy;

  const handleOpenDetail = (item, isSession) => {
    setOpenResponsive(true);
    setSessionType(isSession);
    setClientId(item.userId);
  };

  const handleRefresh = () => {
    if (showMatchBet === 1) {
      refetchMatchBets();
    } else {
      refetchSessionBets();
    }
  };

  return (
    <>
      <section className="live-bets-workspace">
        <div className="live-bets-topbar">
          <div className="live-bets-tabs" role="tablist" aria-label="Bet type">
            <button
              className={`live-bets-tab${showMatchBet === 1 ? " is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={showMatchBet === 1}
              onClick={() => {
                setShowMatchBet(1);
                setBetsData(true);
                setFancyId("");
              }}>
              <Ticket size={17} strokeWidth={2} />
              <span>Match Bet</span>
              <b>{matchRows.length || 0}</b>
            </button>
            <button
              className={`live-bets-tab${showMatchBet === 2 ? " is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={showMatchBet === 2}
              onClick={() => {
                setShowMatchBet(2);
                setBetsData(true);
                setFancyId("");
              }}>
              <WalletCards size={17} strokeWidth={2} />
              <span>Fancy Bet</span>
              <b>{fancyRows.length || 0}</b>
            </button>
          </div>

          <div className="live-bets-actions">
            <Button
              className="live-bets-icon-button"
              htmlType="button"
              aria-label={betsDataShow ? "Collapse bets" : "Expand bets"}
              icon={
                betsDataShow ? (
                  <ChevronUp size={17} strokeWidth={2} />
                ) : (
                  <ChevronDown size={17} strokeWidth={2} />
                )
              }
              onClick={() => setBetsData(!betsDataShow)}
            />
            <Button
              className={`live-bets-icon-button live-bets-refresh${
                isFetchingMatchBets || isFetchingSessionBets
                  ? " is-loading"
                  : ""
              }`}
              htmlType="button"
              aria-label="Refresh bets"
              icon={<RefreshCw size={17} strokeWidth={2} />}
              onClick={handleRefresh}
            />
            <Button
              className="approved-primary-button live-bets-pdf-button"
              htmlType="button"
              icon={<FileText size={16} strokeWidth={2} />}>
              PDF
            </Button>
          </div>
        </div>

        {betsDataShow && (
          <Card
            style={{
              margin: "0px",
              width: "100%",
            }}
            className="sport_detail matched_bets live-bets-card">
            <div className="live-bets-filterbar">
              <Input
                className="live-bets-search"
                prefix={<Search size={17} strokeWidth={1.9} />}
                placeholder="Search Client..."
                value={showMatchBet === 1 ? searchTermOdds : searchTermfancy}
                onChange={(e) =>
                  showMatchBet === 1
                    ? setSearchTermOdds(e.target.value)
                    : setSearchTermfancy(e.target.value)
                }
              />
              <Select
                className="live-bets-select"
                suffixIcon={<ChevronDown size={16} strokeWidth={2} />}
                value={showMatchBet === 1 ? oddsType : fancyId}
                onChange={(value) =>
                  showMatchBet === 1 ? setOddsType(value) : setFancyId(value)
                }
                options={
                  showMatchBet === 1
                    ? [{ value: "Bookmaker", label: "BOOKMAKER" }]
                    : [
                        { value: "", label: "All Fancies" },
                        ...(sessionBets?.data || []).map((item) => ({
                          value: item.fancyId,
                          label: item.fancyName,
                        })),
                      ]
                }
              />
            </div>

            {activeRows.length > 0 && (
              <SummaryStrip rows={activeRows} isMatchBet={showMatchBet === 1} />
            )}

            <div className="live-bets-table-card">
              <div className="live-bets-table-scroll">
                {showMatchBet === 1 ? (
                  <table className="live-bets-table">
                    <thead>
                      <tr>
                        <th>
                          <SlidersHorizontal size={15} strokeWidth={2} />
                          Client
                        </th>
                        <th className="text-right">Rate</th>
                        <th className="text-right">Amount</th>
                        <th>Type</th>
                        <th>Odds Type</th>
                        <th>Team</th>
                        <th>Agent</th>
                        <th>Date</th>
                        <th className="text-right">Loss</th>
                        <th className="text-right">Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAllOdds.length > 0 ? (
                        filteredAllOdds.map((item, index) => {
                          const dateTime = formatDateTime(item?.date);
                          const isLagai = item?.mode == "K";
                          return (
                            <tr
                              key={`${item?.userId}-${item?.date}-${index}`}
                              className={
                                isLagai
                                  ? "matchdtailsYesBackground live-bets-row-lagai"
                                  : "matchdtailsNoBack live-bets-row-khai"
                              }>
                              <td
                                className="live-bets-client-cell"
                                onClick={() => handleOpenDetail(item, false)}>
                                {item?.username} <span>({item?.userId})</span>
                              </td>
                              <td className="text-right live-bets-num">
                                {item?.odds}
                              </td>
                              <td className="text-right live-bets-num">
                                {item?.stake}
                              </td>
                              <td>
                                <TypePill
                                  tone={isLagai ? "is-lagai" : "is-khai"}>
                                  {isLagai ? "Lagai" : "Khai"}
                                </TypePill>
                              </td>
                              <td>{item?.marketType}</td>
                              <td className="live-bets-wrap-cell">
                                {item?.team}
                              </td>
                              <td className="live-bets-wrap-cell">
                                {item?.parentName} (
                                {convertCode(item?.parentId)})
                              </td>
                              <td>
                                <span className="live-bets-date">
                                  {dateTime.date}
                                  {dateTime.time && (
                                    <small>{dateTime.time}</small>
                                  )}
                                </span>
                              </td>
                              <td className="text-right live-bets-num">
                                {item?.liability}
                              </td>
                              <td className="text-right live-bets-num">
                                {item?.pnl}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <EmptyRow colSpan={10} />
                      )}
                      {matchRows.length > 0 && (
                        <tr className="live-bets-total-row">
                          <td colSpan={8}>Total</td>
                          <td className="text-right live-bets-num">
                            {matchRows.reduce(
                              (acc, item) => acc + item.liability,
                              0,
                            ) || 0}
                          </td>
                          <td className="text-right live-bets-num">
                            {matchRows.reduce(
                              (acc, item) => acc + item.pnl,
                              0,
                            ) || 0}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) : (
                  <table className="live-bets-table">
                    <thead>
                      <tr>
                        <th>
                          <SlidersHorizontal size={15} strokeWidth={2} />
                          Client
                        </th>
                        <th className="text-right">Rate</th>
                        <th className="text-right">Run</th>
                        <th className="text-right">Amount</th>
                        <th>Type</th>
                        <th>Team</th>
                        <th>Agent</th>
                        <th>Date</th>
                        <th className="text-right">Loss</th>
                        <th className="text-right">Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAllfancy.length > 0 ? (
                        filteredAllfancy.map((item, index) => {
                          const isYes = item?.mode === "YES";
                          return (
                            <tr
                              key={`${item?.userId}-${item?.time}-${index}`}
                              className={
                                isYes
                                  ? "matchdtailsYesBackground live-bets-row-lagai"
                                  : "matchdtailsNoBack live-bets-row-khai"
                              }>
                              <td
                                className="live-bets-client-cell"
                                onClick={() => handleOpenDetail(item, true)}>
                                {item?.username} <span>({item?.userId})</span>
                              </td>
                              <td className="text-right live-bets-num">
                                {item?.rate}
                              </td>
                              <td className="text-right live-bets-num">
                                {item?.run}
                              </td>
                              <td className="text-right live-bets-num">
                                {item?.amount}
                              </td>
                              <td>
                                <TypePill tone={isYes ? "is-lagai" : "is-khai"}>
                                  {item?.mode}
                                </TypePill>
                              </td>
                              <td className="live-bets-wrap-cell">
                                {item?.selectionName}
                              </td>
                              <td className="live-bets-wrap-cell">
                                {item?.parentName} ({item?.parentId})
                              </td>
                              <td>
                                <span className="live-bets-date">
                                  {item?.time}
                                </span>
                              </td>
                              <td className="text-right live-bets-num">
                                {item?.liability}
                              </td>
                              <td className="text-right live-bets-num">
                                {item?.pnl}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <EmptyRow colSpan={10} />
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </Card>
        )}
      </section>
      <AddDetails
        clientId={clientId}
        sessionType={sessionType}
        open={openResponsive}
        setSessionType={setSessionType}
        setOpenResponsive={setOpenResponsive}
      />
    </>
  );
};

SummaryStrip.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMatchBet: PropTypes.bool.isRequired,
};

TypePill.propTypes = {
  children: PropTypes.node,
  tone: PropTypes.string.isRequired,
};

EmptyRow.propTypes = {
  colSpan: PropTypes.number.isRequired,
};

FancyBets.propTypes = {
  setFancyId: PropTypes.func.isRequired,
  fancyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setShowMatchBet: PropTypes.func.isRequired,
  showMatchBet: PropTypes.number.isRequired,
};

export default FancyBets;
