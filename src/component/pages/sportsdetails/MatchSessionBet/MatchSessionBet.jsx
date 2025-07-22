import { Card, Select, Row, Col, Form, Empty } from "antd";
import {
  useGetMatchAndSessionBetMutation,
  useGetUserSeacrhMutation,
} from "../../../../store/service/SportDetailServices";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MatchSessionBet = () => {
  const [clientId, setClientId] = useState("");
  const { id, inplay } = useParams();
  const nav = useNavigate();
  const [trigger, { data: matchBets }] = useGetMatchAndSessionBetMutation();
  const [userTrigger, { data: userData }] = useGetUserSeacrhMutation();

  useEffect(() => {
    trigger({
      matchId: id ?? "",
      userId: clientId,
      matchCompleted: inplay === "0" ? true : false,
    });
  }, [clientId, id, inplay]);


  return (
    <div className="match_slip match_bets_session">
      <Card
        style={{ margin: "0px", width: "100%" }}
        className="sport_detail session_bet"
        title={`Match & Session Bet Details MatchCode : ${id}`}
        extra={<button onClick={()=>nav(-1)}>Back</button>}>
        <Form
          name="basic"
          autoComplete="off"
          layout="vertical"
          className="form_data">
          <Row className="fancy_data_sess mr">
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
          </Row>
        </Form>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={24} lg={12} xl={12}>
            <div className="table_section statement_tabs_data active_match_table">
              <table className="">
                <thead>
                  <tr>
                    <th>Sr</th>
                    <th>Rate</th>
                    <th>Mode</th>
                    <th>Team</th>
                    <th>Odds Type</th>
                    <th>Amount</th>
                    <th>PNL</th>
                    <th>Date and Time</th>
                  </tr>
                </thead>
                <tbody>
                  {matchBets?.data?.matchBets?.betList > 0 ? (
                    matchBets?.data.matchBets?.betList?.map((bet, index) => {
                      return (
                        <tr
                          key={index}
                          className={
                            bet?.mode === "L"
                              ? "matchdtailsYesBackground"
                              : "matchdtailsNoBack"
                          }>
                          <td>{index + 1}</td>
                          <td>{bet?.odds}</td>
                          <td>{bet?.mode === "L" ? "Lagai" : "Khai"}</td>
                          <td>{bet?.team}</td>
                          <td>{bet.marketType}</td>
                          <td>{bet?.stake}</td>
                          <td>{bet?.pnl}</td>
                          <td>{bet?.pnl}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Col>
          <Col xs={24} md={24} lg={12} xl={12}>
            <div className="table_section statement_tabs_data active_match_table">
              <table className="">
                <thead>
                  <tr>
                    <th>Sr</th>
                    <th>Session</th>
                    <th>Rate</th>
                    <th>Run</th>
                    <th>Decision Run</th>
                    <th>Mode</th>
                    <th>Amount</th>
                    <th>PNL</th>
                    <th>Date and Time</th>
                  </tr>
                </thead>
                <tbody>
                  {matchBets?.data?.sessionBets?.length > 0 ? (
                    matchBets?.data?.sessionBets?.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={
                            item?.mode === "YES"
                              ? "matchdtailsYesBackground"
                              : "matchdtailsNoBack"
                          }>
                          <td>{index + 1}</td>
                          <td>{item?.selectionName}</td>
                          <td>{item?.rate}</td>
                          <td>{item?.run}</td>
                          <td>{item?.declared}</td>
                          <td>{item?.mode}</td>
                          <td>{item?.amount}</td>
                          <td>{item?.netPnl}</td>
                          <td>{item?.time}</td>
                        </tr>
                      );
                    })
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
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MatchSessionBet;
