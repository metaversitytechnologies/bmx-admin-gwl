import React, { useEffect, useState } from "react";
import { Card, Select, Row, Col, Table, Form, Button, Spin, Empty } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./FancySlips.scss";
import { useGetMatchBetsMutation, useGetUserSeacrhMutation } from "../../../../store/service/SportDetailServices";

const FancyBets = () => {
  const [clientId, setClientId] = useState("");
  const [oddsType, setOddsType] = useState("");
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState([]);

  const nav = useNavigate();
  const { id } = useParams();

  const [trigger, { data: matchBets }] = useGetMatchBetsMutation()
  const [userTrigger, { data: userData }] = useGetUserSeacrhMutation();

  useEffect(() => {
    trigger({
      matchId: id,
      userId: clientId,
      matchCompleted: true,
      marketType: oddsType
    })
  }, [oddsType, clientId]);




  const handleBackClick = () => {
    nav(-1);
  };

  const onFinish = (values) => {
    setIsLoading(true);
    setFormData(values);

    setTimeout(() => {
      setIsLoading(false);
    }, 500); // simulate loading
  };


  useEffect(() => {
    if (matchBets?.data?.betList) {
      const { pnl1 = 0, pnl2 = 0, pnl3 = 0 } = matchBets.data.betList.reduce(
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
          pnl: pnl1
        },
        {
          team: matchBets.data.team2,
          selectionId: matchBets.data.selectionId2,
          pnl: pnl2
        }
      ];

      if (matchBets.data.team3) {
        newSummary.push({
          team: matchBets.data.team3,
          selectionId: matchBets.data.selectionId3,
          pnl: pnl3
        });
      }

      setSummaryData(newSummary);
    }
  }, [matchBets]);

  return (
    <>
      <div className="match_slip ledger_data led_super">

        <Card
          style={{ margin: "0px", width: "100%" }}
          className="sport_detail session_bet"
          title="Fancy Bets"
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
                  label=""
                  required={false}
                  rules={[{ required: true, message: "Please Select User" }]}>
                  <Select
                    placeholder="Select User"
                    showSearch
                    onSearch={(value) => {
                      if (value) userTrigger({ userId: value });
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
                  name=""
                  label="Select OddsType"
                  required={false}
                  rules={[{ required: true, message: "Please Odd Type User" }]}>
                  <Select
                    placeholder="Select User"
                    value={oddsType}
                    options={[{
                      value: "All Fancies",
                      label: "All Fancies",
                    }, {
                      value: "Bookmaker",
                      label: "bookmaker",
                    }
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
                        className={res?.mode !== "L" ? "lay" : "back"}>
                        <td >{res?.odds}</td>
                        <td >{res?.stake}</td>
                        <td>{res?.mode === "L" ? "Lagai" : "Khai"}</td>
                        <td>{res?.team}</td>
                        <td>{res?.username} ({res?.userId})</td>
                        <td>{res?.marketType}</td>
                        <td>{res?.parentName} ({res?.parentId})</td>
                        <td>{res?.date}</td>
                        <td>
                          {res?.liability}
                        </td>
                        <td>
                          {res?.pnl}
                        </td>

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

export default FancyBets;
