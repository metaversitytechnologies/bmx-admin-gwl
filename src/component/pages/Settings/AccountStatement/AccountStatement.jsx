import "./AccountStatement.scss";
import { Card, Tabs, DatePicker, Form, Select, Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import AllStatement from "./AllStatement/AllStatement";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { globalSelector } from "../../../../store/global/slice";
import dayjs from "dayjs";
import { useLazySearchUserDownlineQuery } from "../../../../store/service/SportDetailServices";
import { useAccountOprationQuery } from "../../../../store/service/userlistService";

const { RangePicker } = DatePicker;

const AccountStatement = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [clientId, setClientId] = useState("");
  const [detailType, setDetailsType] = useState("ALL");

  const { id } = useParams();

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const {
    data,
    isFetching,
    isLoading,
  } = useAccountOprationQuery(
    {
      detailType: detailType,
      fromDate: dateData[0],
      toDate: dateData[1],
      ...(id && { userId: id }),
    },
    { refetchOnMountOrArgChange: true }
  );

  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  const handleSelect = (value) => {
    setClientId(value);
  };


  const pName = window.location.pathname;

  console.log(clientId, "clientId");

  return (
    <>
      <div className={pName == "/markets" ? "" : "match_slip"}>
        <div className="account_match_slip">
          <Card
            style={{
              margin: "0px",
              width: "100%",
            }}
            className="sport_detail "
            title={`List Of All Transactions (0)`}
            extra={<button onClick={handleBackClick}>Back</button>}>
            <div className="main_acc_section">
              <div className="datepicker">
                <Form
                  autoComplete="off"
                  name="basic"
                  // onFinish={onFinish}
                >
                  <Row>
                    <Col xs={24} lg={6}>
                      <RangePicker
                        defaultValue={[dayjs(timeBefore), dayjs(time)]}
                        style={{ marginBottom: "12px", width: "100%" }}
                        onChange={onChange}
                      />
                    </Col>
                    <Col xs={24} md={24} lg={12} xl={12}>
                      <div style={{ marginTop: "12px" }}>
                        <div className="gx-bg-flex1 gx-justify-content-center gx-flex-nowrap gx-px-1 ">
                          <div
                            className={`gx-px-2 gx-py-2 gx-bg-dark ${
                              detailType === "ALL"
                                ? "gx-bg-dark"
                                : "gx-bg-primary"
                            }`}
                            onClick={() => setDetailsType("ALL")}>
                            All
                          </div>
                          <div
                            className={`gx-px-2 gx-py-2 gx-bg-dark ${
                              detailType === "PNL"
                                ? "gx-bg-dark"
                                : "gx-bg-primary"
                            }`}
                            onClick={() => setDetailsType("PNL")}>
                            P&amp;L
                          </div>
                          <div
                            className={`gx-px-2 gx-py-2 gx-bg-dark ${
                              detailType === "ACCOUNT"
                                ? "gx-bg-dark"
                                : "gx-bg-primary"
                            }`}
                            onClick={() => setDetailsType("ACCOUNT")}>
                            Account
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="tab_section transtion_tab">
                <AllStatement
                  gameType={1}
                  clientId={clientId}
                  isLoading={isLoading || isFetching}
                  dateData={data?.data}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccountStatement;
