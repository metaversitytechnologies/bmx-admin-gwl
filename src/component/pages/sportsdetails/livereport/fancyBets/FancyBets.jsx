import { Card, Empty, Select } from "antd";
import "./style.scss";
import { useGetMatchBetsMutation } from "../../../../../store/service/SportDetailServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FancyBets = () => {
  const [oddsType, setOddsType] = useState("All");
  const { id } = useParams();

  const [trigger, { data: matchBets }] = useGetMatchBetsMutation()

  useEffect(() => {
    trigger({
      matchId: id,
      userId: "",
      matchCompleted: false,
      marketType: oddsType
    })
  }, [oddsType]);


  return (
    <>
      <Card
        style={{
          margin: "0px",
          width: "100%",
        }}
        className="sport_detail matched_bets"
      >
        <div className="gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2  gx-text-white">
          Match Bets - 2
          <div className=" gx-py-2 gx-px-1  gx-text-white gx-text-uppercase">
            <span className=" gx-font-weight-semi-bold OddsType">OddsType</span>
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
                  <tr key={index} className={item?.mode === "L" ? "matchdtailsYesBackground" : "matchdtailsNoBack"}>
                    <td>{item?.odds}</td>
                    <td>{item?.stake}</td>
                    <td>{item?.mode === "L" ? "Lagia" : "Khai"}</td>
                    <td>{item?.marketType}</td>
                    <td>{item?.team}</td>
                    <td>{item?.username} ({item?.userId})</td>
                    <td>{item?.parentName} ({item?.parentId})</td>
                    <td>{new Date(item?.date).toLocaleString()}</td>
                    <td>{item?.netPnl < 0 ? item?.netPnl : 0}</td>
                    <td>{item?.netPnl > 0 ? item?.netPnl : 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center", padding: "2rem" }}>
                    <Empty description="No Data Available" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      <br />
      <br />
    </>
  );
};

export default FancyBets;
