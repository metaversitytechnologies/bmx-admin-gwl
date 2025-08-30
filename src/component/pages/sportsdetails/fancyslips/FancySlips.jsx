/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Card, Select, Row, Col, Form, Spin, Empty } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./FancySlips.scss";
import { useGetMatchBetsMutation } from "../../../../store/service/SportDetailServices";
import { useLazyFilterbyClientQuery } from "../../../../store/service/supermasteAccountStatementServices";

const FancySlips = ({ name }) => {
  const [clientId, setClientId] = useState("");
  const [oddsType, setOddsType] = useState("Bookmaker");
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState([]);

  const nav = useNavigate();
  const { id, inplay } = useParams();

  const [trigger, { data: matchBets }] = useGetMatchBetsMutation();
  const [userTrigger, { data: userData }] = useLazyFilterbyClientQuery();

  useEffect(() => {
    trigger({
      matchId: id,
      userId: clientId,
      matchCompleted: inplay !== "1" ? true : false,
      marketType: oddsType,
    });
  }, [oddsType, clientId]);

  const handleBackClick = () => {
    nav(-1);
  };

  const onFinish = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500); // simulate loading
  };

  useEffect(() => {
    if (matchBets?.data?.betList) {
      const {
        pnl1 = 0,
        pnl2 = 0,
        pnl3 = 0,
      } = matchBets.data.betList.reduce(
        (acc, bet) => {
          acc.pnl1 += Number(bet.pnl1) || 0;
          acc.pnl2 += Number(bet.pnl2) || 0;
          acc.pnl3 += Number(bet.pnl3) || 0;
          return acc;
        },
        { pnl1: 0, pnl2: 0, pnl3: 0 }
      );

      const newSummary = [
        {
          team: matchBets.data.team1,
          selectionId: matchBets.data.selectionId1,
          pnl: pnl1,
        },
        {
          team: matchBets.data.team2,
          selectionId: matchBets.data.selectionId2,
          pnl: pnl2,
        },
      ];

      if (matchBets.data.team3) {
        newSummary.push({
          team: matchBets.data.team3,
          selectionId: matchBets.data.selectionId3,
          pnl: pnl3,
        });
      }

      setSummaryData(newSummary);
    }
  }, [matchBets]);

  return (
    <>
      <div className="match_slip match_bets_report">
        {matchBets?.data?.betList.length > 0 && (
          <div className="ant-row">
            <div className="gx-bg-flex gx-justify-content-center gx-align-items-center gx-mx-2 gx-bg-grey gx-py-2  gx-w-100">
              <h2 className="gx-text-uppercase gx-text-white gx-mt-1 gx-fs-lg gx-font-weight-bold ">
                bookmaker
              </h2>
            </div>
            <div className="gx-flex gx-overflow-auto">
              {summaryData?.map((item, index) => {
                return (
                  <div key={index} className="ant-col gx-my-3 gx-mx-1 gx-px-1 ">
                    <div
                      className={`gx-fillchart ${
                        item?.pnl > 0 ? "gx-bg-green-0" : "gx-bg-red"
                      }  gx-overlay-fillchart`}>
                      <div className="gx-media gx-align-items-center gx-my-3 gx-px-3 gx-fs-xl">
                        <div className="gx-mr-xl-3 gx-d-none gx-d-md-block">
                          <img
                            src="/Images/bar.png"
                            height={44}
                            className="icon icon-chart gx-fs-icon-lg"
                          />
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-xl gx-font-weight-bold gx-text-white mb-5">
                            {item?.pnl?.toFixed(2)}
                          </h1>
                          (0)
                          <br />
                          <h3 />
                          <p className="gx-mb-0 gx-text-nowrap gx-fs-xl mp-5">
                            {item?.team}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <Card
          style={{ margin: "0px", width: "100%" }}
          className="sport_detail session_bet"
          title={name}
          extra={<button onClick={handleBackClick}>Back</button>}>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className="form_data">
            <Row className=" fancy_data_sess mr">
              <Col xs={24} md={24} lg={8} xl={8}>
                <Form.Item
                  name="username"
                  label="Select"
                  required={false}
                  rules={[{ required: true, message: "Please Select User" }]}>
                  <Select
                    placeholder="Select User"
                    showSearch
                    onSearch={(value) => {
                      if (value) userTrigger({ userId: value, userType: 1 });
                    }}
                    value={clientId}
                    allowClear
                    onSelect={(value) => setClientId(value)}
                    options={
                      userData?.data?.map((user) => ({
                        label: `${user.userName} (${user.userId})`,
                        value: user.userId,
                      })) || []
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8} xl={8}>
                <Form.Item
                  name="oddType"
                  label="Select OddsType"
                  required={false}
                  // rules={[{ required: true, message: "Please Odd Type User" }]}
                >
                  <Select
                    placeholder="Select User"
                    value={oddsType}
                    options={[
                      // {
                      //   value: "All",
                      //   label: "All Odds Type",
                      // },
                      {
                        value: "Bookmaker",
                        label: "bookmaker",
                      },
                    ]}
                    showSearch
                    allowClear
                    onSelect={(value) => setOddsType(value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          {isLoading ? (
            <Spin className="loading_active" tip="Loading..." size="large">
              <div className="content" />
            </Spin>
          ) : (
            <div className="table_section statement_tabs_data active_match_table">
              <table className="">
                <thead>
                  <tr>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Team</th>
                    <th>Client</th>
                    <th>OddsType</th>
                    <th>Agent</th>
                    <th>Date</th>
                    <th>Loss</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {matchBets?.data?.betList.length > 0 ? (
                    matchBets?.data?.betList.map((res, id) => (
                      <tr
                        key={id}
                        className={res?.mode !== "L" ? "back" : "lay"}>
                        <td>{Number(res?.odds).toFixed(2)}</td>
                        <td>{res?.stake}</td>
                        <td>{res?.mode === "L" ? "Khai" : "Lagai"}</td>
                        <td>{res?.team}</td>
                        <td>
                          {res?.username} ({res?.userId})
                        </td>
                        <td>{res?.marketType}</td>
                        <td>
                          {res?.parentName} ({res?.parentId})
                        </td>
                        <td>{res?.date}</td>
                        <td>{res?.liability}</td>
                        <td>{res?.pnl}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default FancySlips;
