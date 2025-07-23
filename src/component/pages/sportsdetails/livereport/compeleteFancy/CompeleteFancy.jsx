import { Card, Col, Empty, Row, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setData } from "../../../../../store/global/slice";
import { useGetCompletedFancyMutation } from "../../../../../store/service/SportDetailServices";

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



  return (
    <>
      <div>
        <Card
          style={{
            margin: "12px",
            width: "100%",
          }}
          className="sport_detail completed_fancy"
          title="Fancy Profit and Loss"
          extra={
            <div>
              {/* <button onClick={handleRefresh}>Refresh</button> */}
              {pathname?.includes("completed-fancy-slips") && (
                <button style={{ marginLeft: "10px" }} onClick={() => nav(-1)}>
                  Back
                </button>
              )}
            </div>
          }>
          <Row
            gutter={[16, 16]}
            justify="center"
            className="fancy_pl"
            align="middle">
            <Col xs={24} md={24} lg={6} xl={6}>
              <Select
                placeholder="Select User"
                options={[]}
                showSearch
                allowClear
                // onSelect={(value) => setClientId(value)}
              />
            </Col>
            <Col xs={24} md={24} lg={6} xl={6}>
              <Select
                placeholder="Select User"
                options={[]}
                showSearch
                allowClear
                // onSelect={(value) => setClientId(value)}
              />
            </Col>
            <Col xs={24} md={24} lg={6} xl={6}>
              <p className="total_pl_fancy">
                Total P/L: <span>0.00</span>
              </p>
            </Col>
          </Row>
          <div className="table_section ant-spin-nested-loading">
            <table>
              <thead>
                <tr>
                  <th>username</th>
                  <th>Date</th>
                  <th>F. Name</th>
                  <th>Rate</th>
                  <th>Value</th>
                  <th>Back/Lay</th>
                  <th>Result</th>
                  <th>Creator</th>
                  <th>Stake</th>
                  <th>pnl</th>
                </tr>
              </thead>
              <tbody>
                {/* {fancyData?.data?.map((items) => {
                  return (
                    <tr className="gx-bg-red">
                      <td>clientdemo (C67329)</td>
                      <td>26 Jun 11:31:42 AM</td>
                      <td>{items?.fancyName}</td>
                      <td>100.00</td>
                      <td>71</td>
                      <td>Yes</td>
                      <td>65</td>
                      <td> agemas (A10285)</td>
                      <td>100</td>
                      <td>{items?.pnl}</td>
                    </tr>
                  );
                })} */}

                <tr className="gx-bg-green-0">
                  <td>clientdemo (C67329)</td>
                  <td>26 Jun 11:18:18 AM</td>
                  <td>10 OVER RUNS SL(SL VS BAN)ADV</td>
                  <td>100.00</td>
                  <td>55</td>
                  <td>Yes</td>
                  <td>55</td>
                  <td> agemas (A10285)</td>
                  <td>100</td>
                  <td>100.00</td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td colSpan={10}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CompeleteFancy;
