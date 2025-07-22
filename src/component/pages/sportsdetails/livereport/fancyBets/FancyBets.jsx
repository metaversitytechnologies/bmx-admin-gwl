import { Card, Empty, Select } from "antd";
import "./style.scss";
import {
  useGetFancyBookMutation,
  useGetMatchBetsMutation,
  useGetSessionBetMutation,
  useGetSessionHavingBetQuery,
} from "../../../../../store/service/SportDetailServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FancyBets = ({ setFancyId, fancyId }) => {
  const [oddsType, setOddsType] = useState("All");
  const [sessionType, setSessionType] = useState("");
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
    if (fancyId) {
      triggerSessionBets({
        matchId: id,
        userId: "",
        marketId: fancyId,
        matchCompleted: false,
      });
      getFancyBook({ fancyId: fancyId, matchId: id });
    }
  }, [fancyId, id]);

  console.log(sessionData?.data, fancyBookData?.data, "sessionData");

  return (
    <>
      {fancyId ? (
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail matched_bets">
          <div className="gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white">
            Fancy Bets - {sessionData?.data?.length || 0}
            <button
              type="button"
              className="ant-btn ant-btn-default gx-my-0  gx-bg-primary gx-text-white"
              style={{ fontWeight: 400 }} onClick={() => setFancyId("")}>
              <span>Match Bets</span>
            </button>
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
                    <th>Agent</th>
                    <th>Date</th>
                    <th>Loss</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionData?.data?.length > 0 ? (
                    sessionData?.data.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          item?.mode === "L"
                            ? "matchdtailsYesBackground"
                            : "matchdtailsNoBack"
                        }>
                        <td>{item?.rate}</td>
                        <td>{item?.amount}</td>
                        <td>{item?.mode}</td>
                        <td>{item?.selectionName}</td>
                        <td>
                          {item?.username} ({item?.userId})
                        </td>
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
        </Card>
      ) : (
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail matched_bets">
          <div className="gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white">
            Match Bets - {matchBets?.data?.betList?.length || 0}
            <div className=" gx-py-2 gx-px-1  gx-text-white gx-text-uppercase">
              <span className=" gx-font-weight-semi-bold OddsType">
                OddsType
              </span>
              <Select
                style={{ width: 150 }}
                defaultValue="All OddsType"
                value={oddsType}
                onChange={(value) => setOddsType(value)}
                options={[
                  {
                    value: "All",
                    label: "All OddsType",
                  },
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
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Odds Type</th>
                    <th>Team</th>
                    <th>Client</th>
                    <th>Agent</th>
                    <th>Date</th>
                    <th>Loss</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {matchBets?.data?.betList?.length > 0 ? (
                    matchBets.data.betList.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          item?.mode === "L"
                            ? "matchdtailsYesBackground"
                            : "matchdtailsNoBack"
                        }>
                        <td>{item?.odds}</td>
                        <td>{item?.stake}</td>
                        <td>{item?.mode === "L" ? "Lagia" : "Khai"}</td>
                        <td>{item?.marketType}</td>
                        <td>{item?.team}</td>
                        <td>
                          {item?.username} ({item?.userId})
                        </td>
                        <td>
                          {item?.parentName} ({item?.parentId})
                        </td>
                        <td>{new Date(item?.date).toLocaleString()}</td>
                        <td>{item?.netPnl < 0 ? item?.netPnl : 0}</td>
                        <td>{item?.netPnl > 0 ? item?.netPnl : 0}</td>
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
        </Card>
      )}
      <br />
      <br />
    </>
  );
};

export default FancyBets;
