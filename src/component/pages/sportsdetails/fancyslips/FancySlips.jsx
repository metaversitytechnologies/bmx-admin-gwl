import React, { useState } from "react";
import { Card, Select, Row, Col, Table, Form, Button, Spin, Empty } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./FancySlips.scss";

const FancySlips = ({ type, name }) => {
  const [clientId, setClientId] = useState("");
  const [formData, setFormData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();
  const { id } = useParams();

  const staticUserOptions = [
    { label: "User One (user1)", value: "user1" },
    { label: "User Two (user2)", value: "user2" },
    { label: "User Three (user3)", value: "user3" },
  ];

  const staticResultData = [
    {
      odds: 1.5,
      stake: 100,
      marketname: "Over/Under",
      matchname: "Team A vs Team B",
      selectionname: "Over 2.5",
      userid: "user1",
      dealerid: "agent1",
      date: "2025-06-13 14:00",
      netpnl: 50,
      pricevalue: 1200,
      isback: true,
    },
    {
      odds: 2.1,
      stake: 200,
      marketname: "Match Odds",
      matchname: "Team A vs Team B",
      selectionname: "Team A",
      userid: "user2",
      dealerid: "agent2",
      date: "2025-06-13 14:05",
      netpnl: -100,
      pricevalue: 500,
      isback: false,
    },
  ];

  const handleBackClick = () => {
    nav(-1);
  };

  const onFinish = (values) => {
    setIsLoading(true);
    setFormData(values);
    // Filter data based on selected user
    const filtered = staticResultData.filter(
      (item) => item.userid === values.username
    );
    setTimeout(() => {
      setFilteredData(filtered);
      setIsLoading(false);
    }, 500); // simulate loading
  };

  return (
    <div className="match_slip match_bets_report">
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
                  options={staticUserOptions}
                  showSearch
                  allowClear
                  onSelect={(value) => setClientId(value)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={8}>
              <Form.Item
                name="username"
                label="Select OddsType"
                required={false}
                rules={[{ required: true, message: "Please Select User" }]}>
                <Select
                  placeholder="Select User"
                  options={staticUserOptions}
                  showSearch
                  allowClear
                  onSelect={(value) => setClientId(value)}
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
                  <th>Selection Name</th>
                  <th>Client</th>
                  <th>Agent</th>
                  <th>Date</th>
                  <th>Profit/Loss</th>
                  <th
                    style={{
                      display: `${type === 2 ? "none" : "table-cell"}`,
                    }}>
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody>
                {staticResultData.length > 0 ? (
                  staticResultData.map((res, id) => (
                    <tr
                      key={id}
                      className={res?.isback === false ? "lay" : "back"}>
                      <td className="text-right">{res?.odds}</td>
                      <td className="text-right">{res?.stake}</td>
                      <td>{res?.marketname}</td>
                      <td>{res?.matchname}</td>
                      <td>{res?.selectionname}</td>
                      <td>{res?.userid}</td>
                      <td>{res?.dealerid}</td>
                      <td>{res?.date}</td>
                      <td
                        className={
                          res?.netpnl < 0
                            ? "text-right text_danger"
                            : "text-right text_success"
                        }>
                        {res?.netpnl}
                      </td>
                      <td
                        style={{
                          display: `${type === 2 ? "none" : "table-cell"}`,
                        }}>
                        {res?.pricevalue}
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
  );
};

export default FancySlips;
