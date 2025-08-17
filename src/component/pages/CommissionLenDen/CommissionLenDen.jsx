import {
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useLazyFilterbyClientQuery } from "../../../store/service/supermasteAccountStatementServices";
import { useGetCommitionReportMutation } from "../../../store/service/SportDetailServices";
import CommissionModal from "./CommissionModal";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import UserCommissionModal from "./UserCommissionModal";

const { RangePicker } = DatePicker;

const CommissionLenDen = () => {
  // ----------------- State -----------------
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [clientId, setClientId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [dateData, setDateData] = useState([
    moment().subtract(14, "days").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ]);
  const [totals, setTotals] = useState({
    mMatch: 0,
    mSession: 0,
    mCasino: 0,
    mTotal: 0,
    dMatch: 0,
    dSession: 0,
    dCasino: 0,
    dTotal: 0,
    left: 0,
  });

  const userType = localStorage.getItem("userType");

  // ----------------- API hooks -----------------
  const [userTrigger, { data: userData }] = useLazyFilterbyClientQuery();
  const [trigger, { data, isLoading }] = useGetCommitionReportMutation();

  // ----------------- Effects -----------------
  useEffect(() => {
    trigger({ userId: clientId, fromDate: dateData[0], toDate: dateData[1] });
  }, [clientId, dateData]);

  useEffect(() => {
    userTrigger({ userType: 2 });
  }, []);

  useEffect(() => {
    if (data?.data?.length > 0) {
      const calc = data.data.reduce(
        (acc, cur) => {
          acc.mMatch += cur.matchCommMila || 0;
          acc.mSession += cur.sessionCommMila || 0;
          acc.mCasino += cur.casinoCommMila || 0;
          acc.mTotal += cur.totalCommMila || 0;

          acc.dMatch += cur.matchCommDena || 0;
          acc.dSession += cur.sessionCommDena || 0;
          acc.dCasino += cur.casinoCommDena || 0;
          acc.dTotal += cur.totalCommDena || 0;

          acc.left += cur.leftCommission || 0;
          return acc;
        },
        {
          mMatch: 0,
          mSession: 0,
          mCasino: 0,
          mTotal: 0,
          dMatch: 0,
          dSession: 0,
          dCasino: 0,
          dTotal: 0,
          left: 0,
        }
      );
      setTotals(calc);
    } else {
      setTotals({
        mMatch: 0,
        mSession: 0,
        mCasino: 0,
        mTotal: 0,
        dMatch: 0,
        dSession: 0,
        dCasino: 0,
        dTotal: 0,
        left: 0,
      });
    }
  }, [data]);

  // ----------------- Handlers -----------------
  const handleApply = () => {
    trigger({ userId: clientId, fromDate: dateData[0], toDate: dateData[1] });
  };

  const handleDateChange = (_, dateString) => {
    setDateData(dateString);
  };

  // ----------------- JSX -----------------
  return (
    <>
      <div className="match_slip login_report" style={{ position: "relative" }}>
        {isLoading && <CustomLoading />}

        <Card
          style={{ margin: "0px", width: "100%" }}
          className="sport_detail team_name"
          title="Commission Len Den"
          extra={<button>Back</button>}>
          {/* Date & User Selection */}
          <Row
            gutter={[16, 8]}
            className="date_picker"
            justify="start"
            align="stretch"
            style={{ padding: "8px" }}>
            <Col xl={7} lg={7} md={24} xs={24} className="datepicker_sport">
              <RangePicker
                style={{ marginBottom: "10px", width: "300px" }}
                defaultValue={[dayjs(dateData[0]), dayjs(dateData[1])]}
                onChange={handleDateChange}
                bordered={false}
                showSecond
                renderExtraFooter={() => (
                  <Space style={{ padding: "10px" }}>
                    <Tag color="blue">Today</Tag>
                    <Tag color="blue">Yesterday</Tag>
                    <Tag color="blue">This Week</Tag>
                    <Tag color="blue">Last Week</Tag>
                    <Tag color="blue">This Month</Tag>
                    <Tag color="blue">Last Month</Tag>
                  </Space>
                )}
              />
            </Col>

            {userType != 2 && (
              <Col xl={7} lg={7} md={15} xs={15}>
                <Select
                  placeholder="Select User"
                  showSearch
                  value={clientId}
                  allowClear
                  onSearch={(value) => {
                    if (value) userTrigger({ userId: value, userType: 2 });
                  }}
                  onSelect={(value, option) => {
                    setClientId(value);
                    setUserDetails(option);
                  }}
                  options={
                    userData?.data?.map((user) => ({
                      label: `${user.userName} (${user.userId})`,
                      value: user.userId,
                    })) || []
                  }
                />
              </Col>
            )}

            <Col xl={2} lg={2} md={24} xs={24}>
              <Button
                type="ghost"
                style={{
                  backgroundColor: "rgb(170, 74, 68)",
                  color: "#fff",
                  borderRadius: "unset",
                  height: "36px",
                }}
                onClick={handleApply}>
                Apply
              </Button>
            </Col>
          </Row>

          {/* Table Section */}
          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <table className="live_table login_data_table">
              {/* Table Headers */}
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }} colSpan={6}>
                    Mila Hai
                  </th>
                  <th style={{ textAlign: "center" }} colSpan={4}>
                    Dena Hai
                  </th>
                  <th>Bacha Hai</th>
                </tr>
                <tr>
                  <th>Name</th>
                  <th>M.Comm.</th>
                  <th>S.Comm.</th>
                  <th>C.Comm.</th>
                  <th>T.Comm.</th>
                  <th>Action</th>
                  <th>M.Comm.</th>
                  <th>S.Comm.</th>
                  <th>C.Comm.</th>
                  <th>T.Comm.</th>
                  <th>Comm.</th>
                </tr>
              </thead>

              <tbody>
                {/* Totals Row (Top Row for Selected Client) */}
                {data?.data?.length > 0 && (
                  <tr style={{ background: "#000", color: "#fff" }}>
                    <td style={{ color: "#fff", fontWeight: 600 }}>
                      <span className="gx-px-2">{userDetails?.label}</span>
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {totals.mMatch}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {totals.mSession}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {totals.mCasino}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {totals.mMatch + totals.mSession + totals.mCasino}
                    </td>
                    <td></td>
                    <td style={{ color: "red", fontWeight: 600 }}>
                      {totals.dMatch}
                    </td>
                    <td style={{ color: "red", fontWeight: 600 }}>
                      {totals.dSession}
                    </td>
                    <td style={{ color: "red", fontWeight: 600 }}>
                      {totals.dCasino}
                    </td>
                    <td style={{ color: "red", fontWeight: 600 }}>
                      {totals.dMatch + totals.dSession + totals.dCasino}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {totals.mMatch +
                        totals.mSession +
                        totals.mCasino -
                        (totals.dMatch + totals.dSession + totals.dCasino)}
                    </td>
                  </tr>
                )}

                {/* Data Rows */}
                {data?.data?.length > 0 ? (
                  data.data.map((items) => {
                    const isUser = items?.userId?.startsWith("C");
                    return (
                      <tr
                        key={items?.userId}
                        style={{
                          background: isUser ? "#fff" : "#000",
                          color: isUser ? "#000" : "#fff",
                        }}>
                        <td style={{ fontWeight: 600 }}>
                          <span
                            className="gx-text-blue gx-text-nowrap"
                            onClick={() => setOpenUser(!openUser)}>
                            {items?.userName} ({items?.userId})
                          </span>
                        </td>
                        {/* Mila */}
                        <td style={{ color: "green", fontWeight: 600 }}>
                          {items?.matchCommMila?.toFixed(2)}
                        </td>
                        <td style={{ color: "green", fontWeight: 600 }}>
                          {items?.sessionCommMila?.toFixed(2)}
                        </td>
                        <td style={{ color: "green", fontWeight: 600 }}>
                          {items?.casinoCommMila?.toFixed(2)}
                        </td>
                        <td style={{ color: "green", fontWeight: 600 }}>
                          {(
                            items?.matchCommMila +
                            items?.sessionCommMila +
                            items?.casinoCommMila
                          )?.toFixed(2)}
                        </td>
                        <td>
                          {isUser && (
                            <div className="ant-row gx-pl-4">
                              <div className="ant-col">
                                <Button className="ant-btn ant-btn-default gx-bg-grey gx-text-white">
                                  <span>Reset</span>
                                </Button>
                                <Button
                                  className="ant-btn ant-btn-default gx-bg-grey gx-text-white"
                                  onClick={() => setOpen(!open)}>
                                  <span>History</span>
                                </Button>
                              </div>
                            </div>
                          )}
                        </td>
                        {/* Dena */}
                        <td style={{ color: "red", fontWeight: 600 }}>
                          {items?.matchCommDena?.toFixed(2)}
                        </td>
                        <td style={{ color: "red", fontWeight: 600 }}>
                          {items?.sessionCommDena?.toFixed(2)}
                        </td>
                        <td style={{ color: "red", fontWeight: 600 }}>
                          {items?.casinoCommDena?.toFixed(2)}
                        </td>
                        <td style={{ color: "red", fontWeight: 600 }}>
                          {(
                            items?.matchCommDena +
                            items?.sessionCommDena +
                            items?.casinoCommDena
                          )?.toFixed(2)}
                        </td>
                        <td style={{ color: "green", fontWeight: 600 }}>
                          {items?.matchCommMila +
                            items?.sessionCommMila +
                            items?.casinoCommMila -
                            (items?.matchCommDena +
                              items?.sessionCommDena +
                              items?.casinoCommDena) || "0.00"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={11}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Modals */}
      <CommissionModal setOpenModals={setOpen} openModal={open} />
      <UserCommissionModal setOpenModals={setOpenUser} openModal={openUser} />
    </>
  );
};

export default CommissionLenDen;
