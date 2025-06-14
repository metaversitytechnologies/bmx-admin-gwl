import { Card, Empty, Spin } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setData } from "../../../../../store/global/slice";

const CompeleteFancy = () => {
  const [marketId, setMarketId] = useState("");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { id } = useParams();

  // Static data to replace API call
  const completeFancyData = {
    data: {
      list: [
        {
          key: "1",
          selectionname: "Fancy 1",
          pnl: 120.5,
          result: "Team A",
          netpnl: 100.0,
          _id: "market_1",
        },
        {
          key: "2",
          selectionname: "Fancy 2",
          pnl: -75.3,
          result: "Team B",
          netpnl: -80.0,
          _id: "market_2",
        },
      ],
      total: {
        pnl: 45.2,
        netpnl: 20.0,
      },
    },
  };

  const isLoading = false;
  const isFetching = false;

  const handleShowBets = (val) => {
    setMarketId(val);
    dispatch(setData(val));
    nav(`/Events/${id}/pl/live-report`, { state: { id: val } });
  };

  const handleRefresh = () => {
    // With static data, refresh does nothing
  };

  return (
    <>
      <div>
        <Card
          style={{
            margin: "12px",
            width: "100%",
          }}
          className="sport_detail completed_fancy"
          title="Completed fancy"
          extra={
            <div>
              <button onClick={handleRefresh}>Refresh</button>
              {pathname?.includes("completed-fancy-slips") && (
                <button style={{ marginLeft: "10px" }} onClick={() => nav(-1)}>
                  Back
                </button>
              )}
            </div>
          }>
          <div className="table_section ant-spin-nested-loading">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>P&L</th>
                  <th>Won By</th>
                  <th>Net P&L</th>
                  <th>Action</th>
                </tr>
              </thead>

              {isLoading || isFetching ? (
                <tbody>
                  <tr>
                    <td colSpan={5}>
                      <div className="spin_icon comp_spin">
                        <Spin size="large" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <>
                  <tbody>
                    {(completeFancyData?.data?.list?.length ?? 0) >= 0 && (
                      <tr>
                        <td>Total</td>
                        <td
                          className={
                            completeFancyData.data.total.pnl < 0
                              ? "text_danger"
                              : "text_success"
                          }>
                          {completeFancyData.data.total.pnl.toFixed(2)}
                        </td>
                        <td></td>
                        <td
                          className={
                            completeFancyData.data.total.netpnl < 0
                              ? "text_danger"
                              : "text_success"
                          }>
                          {completeFancyData.data.total.netpnl.toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    )}

                    {completeFancyData.data.list.map((res) => (
                      <tr key={res.key}>
                        <td>{res.selectionname}</td>
                        <td
                          className={
                            res.pnl < 0 ? "text_danger" : "text_success"
                          }>
                          {res.pnl.toFixed(2)}
                        </td>
                        <td>{res.result}</td>
                        <td
                          className={
                            res.netpnl < 0 ? "text_danger" : "text_success"
                          }>
                          {res.netpnl.toFixed(2)}
                        </td>
                        <td>
                          <button
                            className="show_bets"
                            onClick={() => handleShowBets(res._id)}>
                            Show Bets
                          </button>
                        </td>
                      </tr>
                    ))}
                    {completeFancyData.data.list.length === 0 && (
                      <tr>
                        <td colSpan={5}>
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CompeleteFancy;
