import { Card, Empty, Input, Row, Select } from "antd";
import "./style.scss";
import {
  useGetAllSessionBetQuery,
  useGetFancyBookMutation,
  useGetMatchBetsMutation,
  useGetSessionBetMutation,
  useGetSessionHavingBetQuery,
} from "../../../../../store/service/SportDetailServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddDetails from "../../../GameDeatis/AddDetails";

const FancyBets = ({ setFancyId, fancyId, setShowMatchBet, showMatchBet }) => {
  const [oddsType, setOddsType] = useState("Bookmaker");
  const [searchTermOdds, setSearchTermOdds] = useState("");
  const [searchTermfancy, setSearchTermfancy] = useState("");
  const [openResponsive, setOpenResponsive] = useState(false);
  const [sessionType, setSessionType] = useState(false);
  const [clientId, setClientId] = useState("");
  const { id } = useParams();

  const [trigger, { data: matchBets }] = useGetMatchBetsMutation();

  const { data: sessionBets } = useGetSessionHavingBetQuery({
    matchCompleted: false,
    matchId: id ?? "",
  });
  const [triggerSessionBets, { data: sessionData }] =
    useGetSessionBetMutation();
  const [getFancyBook, { data: fancyBookData }] = useGetFancyBookMutation();

  useEffect(() => {
    trigger({
      matchId: id,
      userId: "",
      matchCompleted: false,
      marketType: oddsType,
    });
  }, [oddsType]);

  useEffect(() => {
    triggerSessionBets({
      matchId: id,
      userId: "",
      marketId: fancyId,
      matchCompleted: false,
    });
    if (fancyId) {
      getFancyBook({ fancyId: fancyId, matchId: id });
    }
  }, [fancyId, id]);

  const filteredAllOdds =
    matchBets?.data?.betList?.filter(
      (item) =>
        item?.username?.toLowerCase().includes(searchTermOdds.toLowerCase()) ||
        item?.userId?.toString().includes(searchTermOdds)
    ) || [];
  const filteredAllfancy =
    sessionData?.data?.filter(
      (item) =>
        item?.username?.toLowerCase().includes(searchTermfancy.toLowerCase()) ||
        item?.userId?.toString().includes(searchTermfancy)
    ) || [];

  return (
    <>
      <Row
        justify="start"
        align="middle"
        style={{ backgroundColor: "rgb(115, 118, 111)", marginTop: "10px" }}>
        <div
          onClick={() => setShowMatchBet(1)}
          style={{
            background: showMatchBet === 1 ? "var(--bg-color)" : "",
            color: "#fff",
            padding: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}>
          Match Bet ({filteredAllOdds?.length || 0})
        </div>
        <div
          onClick={() => setShowMatchBet(2)}
          style={{
            background: showMatchBet === 2 ? "var(--bg-color)" : "",
            color: "#fff",
            padding: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}>
          Fancy Bet ({filteredAllfancy?.length || 0})
        </div>
      </Row>

      {showMatchBet === 1 && (
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail matched_bets">
          <div className="deskOpen gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white">
            {/* Match Bets - {filteredAllOdds?.length || 0} */}

            <div
              className=" gx-py-2 gx-px-1  gx-text-white gx-text-uppercase"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Input
                placeholder="Search Client..."
                value={searchTermOdds}
                onChange={(e) => setSearchTermOdds(e.target.value)}
              />
              <span className=" gx-font-weight-semi-bold OddsType">
                OddsType
              </span>
              <Select
                style={{ width: 150 }}
                defaultValue="All OddsType"
                value={oddsType}
                onChange={(value) => setOddsType(value)}
                options={[
                  // {
                  //   value: "All",
                  //   label: "All OddsType",
                  // },
                  {
                    value: "Bookmaker",
                    label: "Bookmaker",
                  },
                ]}
              />
            </div>
            <button
              type="button"
              className="ant-btn ant-btn-primary gx-border-redius0 gx-bg-flex gx-align-items-center">
              <span className="ml-1 px-1">PDF</span>
            </button>
          </div>

          <div
            className="mobile-open gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white"
            style={{
              gap: "12px",
            }}>
            <div>
              <div style={{ textAlign: "center", textTransform: "uppercase" }}>
                {/* Match Bets - {filteredAllOdds?.length || 0} */}
                &nbsp;
              </div>
              <div className="  gx-text-white gx-text-uppercase">
                <Input
                  style={{ height: "32px" }}
                  placeholder="Search Client..."
                  value={searchTermOdds}
                  onChange={(e) => setSearchTermOdds(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div
                style={{ textAlign: "center", textTransform: "uppercase" }}
                className=" gx-font-weight-semi-bold OddsType">
                OddsType
              </div>
              <Select
                style={{ width: 150 }}
                defaultValue="All OddsType"
                value={oddsType}
                onChange={(value) => setOddsType(value)}
                options={[
                  // {
                  //   value: "All",
                  //   label: "All OddsType",
                  // },
                  {
                    value: "Bookmaker",
                    label: "Bookmaker",
                  },
                ]}
              />
            </div>
            <button
              type="button"
              className="ant-btn ant-btn-primary gx-border-redius0 gx-bg-flex gx-align-items-center">
              <span className="ml-1 px-1">PDF</span>
            </button>
          </div>

          <div className="table_section">
            <div className="table_section">
              <table className="">
                <thead>
                  <tr>
                    <th>Client</th>

                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Odds Type</th>
                    <th>Team</th>
                    <th>Agent</th>
                    <th>Date</th>
                    <th>Loss</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAllOdds?.length > 0 ? (
                    filteredAllOdds.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          item?.mode !== "L"
                            ? "matchdtailsYesBackground"
                            : "matchdtailsNoBack"
                        }>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setOpenResponsive(true);
                            setSessionType(false);
                            setClientId(item.userId);
                          }}>
                          {item?.username} ({item?.userId})
                        </td>
                        <td>{Number(item?.odds)?.toFixed(2)}</td>
                        <td>{item?.stake}</td>
                        <td>{item?.mode !== "L" ? "Lagia" : "Khai"}</td>
                        <td>{item?.marketType}</td>
                        <td>{item?.team}</td>

                        <td>
                          {item?.parentName} (convertCode({item?.parentId}))
                        </td>
                        <td>{new Date(item?.date).toLocaleString()}</td>
                        <td>{item?.liability}</td>
                        <td>{item?.pnl}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        style={{ textAlign: "center", padding: "2rem" }}>
                        <Empty description="No Data Available" />
                      </td>
                    </tr>
                  )}
                  {matchBets?.data?.betList?.length > 0 && (
                    <tr>
                      <td colSpan={8}>Total</td>
                      <td>
                        {matchBets?.data?.betList?.reduce(
                          (acc, item) => acc + item.liability,
                          0
                        ) || 0}
                      </td>
                      <td>
                        {matchBets?.data?.betList?.reduce(
                          (acc, item) => acc + item.pnl,
                          0
                        ) || 0}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}
      {showMatchBet === 2 && (
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail matched_bets">
          <div className="deskOpen gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white">
            {/* Fancy Bets - {filteredAllfancy?.length || 0} */}
            {fancyId && (
              <button
                type="button"
                className="ant-btn ant-btn-default gx-my-0  gx-bg-primary gx-text-white"
                style={{ fontWeight: 400 }}
                onClick={() => {
                  setFancyId("");
                  triggerSessionBets({
                    matchId: id,
                    userId: "",
                    marketId: "",
                    matchCompleted: false,
                  });
                }}>
                <span>All Fancy</span>
              </button>
            )}
            <Input
              style={{ width: "200px" }}
              placeholder="Search Client..."
              value={searchTermfancy}
              onChange={(e) => setSearchTermfancy(e.target.value)}
            />
            <div className=" gx-py-2 gx-px-1  gx-text-white gx-text-uppercase">
              <span className=" gx-font-weight-semi-bold OddsType">
                OddsType
              </span>
              <Select
                style={{ width: 150 }}
                defaultValue="All OddsType"
                value={fancyId}
                onChange={(value) => setFancyId(value)}
                options={[
                  { value: "", label: "All Fancies" },
                  ...(sessionBets?.data || []).map((item) => ({
                    value: item.fancyId,
                    label: item.fancyName,
                  })),
                ]}
              />
            </div>
            <button
              type="button"
              className="ant-btn ant-btn-primary gx-border-redius0 gx-bg-flex gx-align-items-center">
              <span className="ml-1 px-1">PDF</span>
            </button>
          </div>

          <div className="mobile-open gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white">
            <div>
              <div style={{ textAlign: "center", textTransform: "uppercase" }}>
                {/* Fancy Bets - {filteredAllfancy?.length || 0} */}
                &nbsp;
              </div>

              <Input
                style={{ width: "150px", height: "33px" }}
                placeholder="Search Client..."
                value={searchTermfancy}
                onChange={(e) => setSearchTermfancy(e.target.value)}
              />
            </div>
            <div className=" gx-py-2 gx-px-1  gx-text-white gx-text-uppercase">
              <div
                style={{ textAlign: "center" }}
                className=" gx-font-weight-semi-bold OddsType">
                OddsType
              </div>
              <Select
                style={{ width: 150 }}
                defaultValue="All OddsType"
                value={fancyId}
                onChange={(value) => setFancyId(value)}
                options={[
                  { value: "", label: "All Fancies" },
                  ...(sessionBets?.data || []).map((item) => ({
                    value: item.fancyId,
                    label: item.fancyName,
                  })),
                ]}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}>
              {fancyId && (
                <button
                  type="button"
                  className="ant-btn ant-btn-default gx-my-0  gx-bg-primary gx-text-white"
                  style={{ fontWeight: 400 }}
                  onClick={() => {
                    setFancyId("");
                    triggerSessionBets({
                      matchId: id,
                      userId: "",
                      marketId: "",
                      matchCompleted: false,
                    });
                  }}>
                  <span>All Fancy</span>
                </button>
              )}
              <button
                type="button"
                className="ant-btn ant-btn-primary gx-border-redius0 gx-bg-flex gx-align-items-center">
                <span className="ml-1 px-1">PDF</span>
              </button>
            </div>
          </div>

          <div className="table_section">
            <div className="table_section">
              <table className="">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Rate</th>
                    <th>Run</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Team</th>
                    <th>Agent</th>
                    <th>Date</th>
                    <th>Loss</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAllfancy?.length > 0 ? (
                    filteredAllfancy?.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          item?.mode === "YES"
                            ? "matchdtailsYesBackground"
                            : "matchdtailsNoBack"
                        }>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setOpenResponsive(true);
                            setSessionType(true);
                            setClientId(item.userId);
                          }}>
                          {item?.username} ({item?.userId})
                        </td>
                        <td>{Number(item?.rate)?.toFixed(2)}</td>
                        <td>{item?.run}</td>
                        <td>{item?.amount}</td>
                        <td>{item?.mode}</td>
                        <td>{item?.selectionName}</td>

                        <td>
                          {item?.parentName} ({item?.parentId})
                        </td>
                        <td>{item?.time}</td>
                        <td>{item?.liability}</td>
                        <td>{item?.pnl}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        style={{ textAlign: "center", padding: "2rem" }}>
                        <Empty description="No Data Available" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          {fancyId && (
            <div className="table_section">
              <div className="table_section">
                <table className="">
                  <thead>
                    <tr>
                      <th>Run</th>
                      <th>PnL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fancyBookData?.data?.length > 0 ? (
                      fancyBookData?.data.map((item, index) => (
                        <tr key={index}>
                          <td>{item?.odds}</td>
                          <td>{item?.pnl}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="10"
                          style={{ textAlign: "center", padding: "2rem" }}>
                          <Empty description="No Data Available" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* <br />
      <br />
      <Card
        style={{
          margin: "0px",
          width: "100%",
        }}
        className="sport_detail matched_bets">
        <div className="gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white">
          All Fancy Bets - {filteredAllSession?.length || 0}
          <div>
            <Input
              placeholder="Search Client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="ant-btn ant-btn-primary gx-border-redius0 gx-bg-flex gx-align-items-center">
            <span className="ml-1 px-1">PDF</span>
          </button>
        </div>

        <div className="table_section">
          <div className="table_section">
            <table className="">
              <thead>
                <tr>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Team</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Loss</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {filteredAllSession?.length > 0 ? (
                  filteredAllSession?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className={
                          item?.mode === "YES"
                            ? "matchdtailsYesBackground"
                            : "matchdtailsNoBack"
                        }>
                        <td>{item?.rate}</td>
                        <td>{item?.amount}</td>
                        <td>{item?.mode}</td>
                        <td>{item?.selectionName}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setOpenResponsive(true);
                            setSessionType(true);
                            setClientId(item.userId);
                          }}>
                          {item?.username} ({item?.userId})
                        </td>
                        
                        <td>{item?.time}</td>
                        <td>{item?.liability}</td>
                        <td>{item?.pnl}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      style={{ textAlign: "center", padding: "2rem" }}>
                      <Empty description="No Data Available" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card> */}
      <br />
      <br />
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

export default FancyBets;
