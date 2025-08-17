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
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [clientId, setClientId] = useState("");
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);

  const userType = localStorage.getItem("userType");

  const [userTrigger, { data: userData }] = useLazyFilterbyClientQuery();

  const [trigger, { data, isLoading }] = useGetCommitionReportMutation();

  useEffect(() => {
    trigger({ userId: clientId, fromDate: dateData[0], toDate: dateData[1] });
  }, [clientId, dateData]);

  const onChange = (data, dateString) => {
    setDateData(dateString);
  };

  useEffect(() => {
    userTrigger({
      userType: 2,
    });
  }, []);

  const handleApply = () => {
    trigger({ userId: clientId, fromDate: dateData[0], toDate: dateData[1] });
  };

  return (
    <>
      <div className="match_slip login_report" style={{ position: "relative" }}>
        {isLoading && <CustomLoading />}
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail  team_name"
          title="Commission Len Den"
          extra={<button>Back</button>}>
          <Row
            gutter={[16, 8]}
            className="date_picker"
            justify="start"
            align="stretch"
            style={{
              padding: "8px",
            }}>
            <Col xl={7} lg={7} md={24} xs={24} className="datepicker_sport">
              <RangePicker
                style={{ marginBottom: "10px", width: "300px" }}
                defaultValue={[dayjs(timeBefore), dayjs(time)]}
                onChange={onChange}
                bordered={false}
                showSecond
                renderExtraFooter={() => (
                  <Space
                    style={{
                      padding: "10px",
                    }}>
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
                  onSearch={(value) => {
                    if (value) userTrigger({ userId: value, userType: 2 });
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
          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <table className="live_table login_data_table">
              <tr>
                <th style={{ textAlign: "center" }} colSpan={6}>
                  Mila Hai
                </th>
                <th style={{ textAlign: "center" }} colSpan={4}>
                  Dena hai
                </th>
                <th>Bacha Hai</th>
              </tr>
              <tr>
                <th>Name</th>
                <th>M.Comm.</th>
                <th>S.Comm.</th>
                <th>C.Comm.</th>
                <th>T.Comm.</th>
                <th>Action.</th>
                <th>M.Comm.</th>
                <th>S.Comm.</th>
                <th>C.Comm.</th>
                <th>T.Comm.</th>
                <th>Comm.</th>
              </tr>

              {data?.data?.length > 0 ? (
                data?.data?.map((items) => {
                  const isUser = items?.userId?.startsWith("C");

                  return (
                    <tr
                      key={items?.userid}
                      style={{
                        background: isUser ? "#fff" : "#000",
                        color: "#fff",
                      }}>
                      <td
                        style={{
                          color: isUser ? "#000" : "#fff",
                          fontWeight: 600,
                        }}>
                        <span
                          className="gx-text-blue gx-text-nowrap"
                          onClick={() => setOpenUser(!openUser)}>
                          <span className="gx-px-2 ">
                            {" "}
                            {items?.userName} ({items?.userId})
                          </span>
                          <i className="icon icon-view-o"></i>
                        </span>
                      </td>
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
                        {items?.totalCommMila?.toFixed(2)}
                      </td>
                      <td>
                        {isUser && (
                          <div className="ant-row gx-pl-4">
                            <div className="ant-col">
                              <Button
                                type="button"
                                className="ant-btn ant-btn-default gx-bg-grey gx-text-white">
                                <span>Reset</span>
                              </Button>
                              <Button
                                type="button"
                                className="ant-btn ant-btn-default gx-bg-grey gx-text-white"
                                onClick={() => setOpen(!open)}>
                                <span>History</span>
                              </Button>
                            </div>
                          </div>
                        )}
                      </td>
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
                        {items?.totalCommDena?.toFixed(2)}
                      </td>
                      <td style={{ color: "green", fontWeight: 600 }}>
                        {items?.leftCommission?.toFixed(2) || "0.00"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={11}>
                    {" "}
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              )}
            </table>
          </div>
        </Card>
      </div>
      <CommissionModal setOpenModals={setOpen} openModal={open} />
      <UserCommissionModal setOpenModals={setOpenUser} openModal={openUser} />
    </>
  );
};

export default CommissionLenDen;
