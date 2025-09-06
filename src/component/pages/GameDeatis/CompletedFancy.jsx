import { Card, Col, Empty, Row } from "antd";
import { useGetCompletedFancyMutation } from "../../../store/service/SportDetailServices";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuRefreshCw } from "react-icons/lu";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const CompletedFancy = () => {
  const [showComp, setShowComp] = useState(false);
  const { id } = useParams();
  const nav = useNavigate();
  const [trigger, { data: fancyData }] = useGetCompletedFancyMutation();
  useEffect(() => {
    trigger({
      matchId: id,
    });
  }, [id]);

  const totalNetPnl =
    fancyData?.data?.reduce((acc, item) => acc + item.netPnl, 0) || 0;

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <Card
          style={{
            margin: "12px",
            width: "100%",
            // marginTop: "0px",
          }}
          className="sport_detail completed_fancy"
          title={
            <div style={{ fontSize: "16px" }}>
              Completed Fancy [{fancyData?.data?.length || 0}]
            </div>
          }
          extra={
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "-18px",
                  justifyContent: "flex-end",
                }}>
                <button
                  onClick={() => setShowComp(!showComp)}
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "24px",
                    padding: "0px 8px",
                    float: "right",
                    lineHeight: "38px",
                    verticalAlign: "moddle",
                    marginLeft: "0px",
                    borderRadius: "unset",
                  }}>
                  {showComp ? (
                    <TiArrowSortedUp
                      style={{ lineHeight: "10px", verticalAlign: "middle" }}
                    />
                  ) : (
                    <TiArrowSortedDown
                      style={{ lineHeight: "10px", verticalAlign: "middle" }}
                    />
                  )}
                </button>
                <button
                  onClick={() =>
                    trigger({
                      matchId: id,
                    })
                  }
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "20px",
                    padding: "0px 8px",
                    float: "right",
                    lineHeight: "38px",
                    verticalAlign: "moddle",
                    marginLeft: "8px",
                    borderRadius: "unset",
                  }}>
                  <LuRefreshCw
                    style={{
                      lineHeight: "10px",
                      verticalAlign: "middle",
                      margin: "0",
                    }}
                  />
                </button>
              </div>
            </div>
          }>
          {showComp && (
            <>
              <Row
                gutter={[16, 16]}
                justify="center"
                className="fancy_pl"
                align="middle">
                <Col xs={24} md={24} lg={6} xl={6}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#545454",
                    }}>
                    Total P/L:{" "}
                    <span style={{ color: totalNetPnl > 0 ? "green" : "red" }}>
                      {totalNetPnl?.toFixed(2)}
                    </span>
                  </p>
                </Col>
              </Row>
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
                  <tbody>
                    {fancyData?.data?.length > 0 ? (
                      fancyData?.data?.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className={item?.isBack ? "back" : "lay"}>
                            <td>{item?.fancyName}</td>
                            <td>{item?.pnl?.toFixed(2)}</td>
                            <td>{item?.result}</td>
                            <td>{item?.netPnl?.toFixed(2)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  nav(
                                    `/event-profit-loss/${id}/${item?.fancyId}`
                                  )
                                }
                                type="button"
                                className="ant-btn  ant-btn-sm gx-text-white gx-border-redius0"
                                style={{
                                  backgroundColor: "rgb(255, 85, 0)",
                                  padding: "0px 8px",
                                  height: "24px",
                                  lineHeight: "23px",
                                  border: "unset",
                                  outline: "unset",
                                  fontWeight: 400,
                                }}>
                                <span>Show Bets</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5}>
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default CompletedFancy;
