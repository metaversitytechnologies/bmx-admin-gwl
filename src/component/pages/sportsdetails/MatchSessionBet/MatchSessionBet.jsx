import { Card, Select, Row, Col, Form, Empty } from "antd";
import { useGetMatchAndSessionBetMutation } from "../../../../store/service/SportDetailServices";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyFilterbyClientQuery } from "../../../../store/service/supermasteAccountStatementServices";

const MatchSessionBet = () => {
  const [clientId, setClientId] = useState("");
  const { id, inplay } = useParams();
  const nav = useNavigate();
  const [trigger, { data: matchBets }] = useGetMatchAndSessionBetMutation();
  const [userTrigger, { data: userData }] = useLazyFilterbyClientQuery();

  useEffect(() => {
    trigger({
      matchId: id ?? "",
      userId: clientId,
      matchCompleted: inplay === "0" ? true : false,
    });
  }, [clientId, id, inplay]);

  const totalPnl = matchBets?.data?.sessionBets?.reduce((acc, item) => {
    return acc + (item.netPnl || 0);
  }, 0);
  const totalPnlM = matchBets?.data?.matchBets?.betList?.reduce((acc, item) => {
    return acc + (item.pnl || 0);
  }, 0);

  return (
    <div className="match_slip match_bets_session">
      <Card
        style={{ margin: "0px", width: "100%" }}
        className="sport_detail session_bet"
        title={`Match & Session Bet Details MatchCode : ${id}`}
        extra={<button onClick={() => nav(-1)}>Back</button>}>
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
                  {matchBets?.data?.matchBets?.betList?.length > 0 ? (
                    matchBets?.data.matchBets?.betList?.map((bet, index) => {
                      return (
                        <tr
                          key={index}
                          className={bet?.mode === "K" ? "back" : "lay"}>
                          <td>{index + 1}</td>
                          <td>{Number(bet?.odds)?.toFixed(2)}</td>
                          <td>{bet?.mode === "K" ? "Lagai" : "KHAI"}</td>
                          <td>{bet?.team}</td>
                          <td>{bet.marketType}</td>
                          <td>{bet?.stake}</td>
                          <td>{bet?.pnl}</td>
                          <td>{bet?.date}</td>
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
                  <tr>
                    <td style={{ fontWeight: 700 }}>Total</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <span
                        style={{
                          color: totalPnl > 0 ? "green" : "red",
                          fontWeight: 700,
                        }}>
                        {totalPnlM?.toFixed(2)}
                      </span>
                    </td>
                    <td></td>
                  </tr>
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
                          className={item?.mode === "YES" ? "back" : "lay"}>
                          <td>{index + 1}</td>
                          <td>{item?.selectionName}</td>
                          <td>{Number(item?.rate)?.toFixed(2)}</td>
                          <td>{item?.run}</td>
                          <td>{item?.declared}</td>
                          <td>{item?.mode === "YES" ? "NO" : "YES"}</td>
                          <td>{item?.amount}</td>
                          <td
                            style={{
                              color: item?.netPnl > 0 ? "green" : "red",
                            }}>
                            {item?.netPnl}
                          </td>
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
                  <tr>
                    <td style={{ fontWeight: 700 }}>Total</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <span
                        style={{
                          color: totalPnl > 0 ? "green" : "red",
                          fontWeight: 700,
                        }}>
                        {totalPnl?.toFixed(2)}
                      </span>
                    </td>
                    <td></td>
                  </tr>
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
