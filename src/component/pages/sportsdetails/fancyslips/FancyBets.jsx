import React, { useEffect, useState } from "react";
import { Card, Select, Row, Col, Table, Form, Button, Spin, Empty } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./FancySlips.scss";
import {
  useGetSessionBetMutation,
  useGetSessionHavingBetQuery,
  useGetUserSeacrhMutation,
} from "../../../../store/service/SportDetailServices";

const FancyBets = () => {
  const [clientId, setClientId] = useState("");
  const [oddsType, setOddsType] = useState("");
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();
  const { id, inplay } = useParams();

  const { data: sessionBets } = useGetSessionHavingBetQuery({
    matchCompleted: inplay !== "1" ? true : false,
    matchId: id ?? "",
  });
  const [trigger, { data: sessionData }] = useGetSessionBetMutation();
  const [userTrigger, { data: userData }] = useGetUserSeacrhMutation();

  useEffect(() => {
    trigger({
      matchId: id,
      userId: clientId,
      marketId: oddsType,
      matchCompleted: inplay !== "1" ? true : false,
    });
  }, [oddsType, clientId, id, inplay]);

  const handleBackClick = () => {
    nav(-1);
  };

  const onFinish = (values) => {
    setIsLoading(true);
    setFormData(values);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  
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
                  label=""
                  required={false}
                  rules={[{ required: true, message: "Please Odd Type User" }]}>
                  <Select
                    placeholder="Select User"
                    value={oddsType}
                    options={[
                      { value: "", label: "All Fancies" },
                      ...(sessionBets?.data || []).map((item) => ({
                        value: item.fancyId,
                        label: item.fancyName,
                      })),
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
                    <th>Session</th>
                    <th>Client Name</th>
                    <th>Creator Name</th>
                    <th>Date</th>
                    <th>Loss</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionData?.data?.length > 0 ? (
                    sessionData?.data?.map((res, id) => (
                      <tr
                        key={id}
                        className={res?.mode !== "YES" ? "lay" : "back"}>
                        <td>{res?.rate}</td>
                        <td>{res?.amount}</td>
                        <td>{res?.mode}</td>
                        <td>{res?.selectionName}</td>
                        <td>
                          {res?.username} ({res?.userId})
                        </td>
                        <td>
                          {res?.parentName} ({res?.parentId})
                        </td>

                        <td>{res?.time}</td>
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

export default FancyBets;
