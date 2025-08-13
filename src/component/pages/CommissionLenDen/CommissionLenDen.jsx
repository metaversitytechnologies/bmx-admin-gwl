import {
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
// import { useGetCommissionMutation } from "../../../store/service/CasinoServices";
import { useLazyFilterbyClientQuery } from "../../../store/service/supermasteAccountStatementServices";
import { useGetCommitionReportMutation } from "../../../store/service/SportDetailServices";

const { RangePicker } = DatePicker;

const CommissionLenDen = () => {
  const [clientId, setClientId] = useState("");
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);

  const [userTrigger, { data: userData }] = useLazyFilterbyClientQuery();

  const [trigger, { data }] = useGetCommitionReportMutation();

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

  return (
    <>
      <div className="match_slip login_report">
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
            <Col xl={2} lg={2} md={24} xs={24}>
              <Button
                type="ghost"
                style={{
                  backgroundColor: "rgb(170, 74, 68)",
                  color: "#fff",
                  borderRadius: "unset",
                  height: "36px",
                }}>
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
                  return (
                    <tr key={items?.userid}>
                      <td>
                        {items?.userId} ({items?.userName})
                      </td>
                      <td>{items?.matchCommMila}</td>
                      <td>{items?.sessionCommMila}</td>
                      <td>{items?.casinoCommMila}</td>
                      <td>{items?.totalCommMila}</td>
                      <td>{items?.matchCommDena}</td>
                      <td>{items?.sessionCommDena}</td>
                      <td>{items?.casinoCommDena}</td>
                      <td>{items?.totalCommDena}</td>
                      <td>{items?.leftCommission}</td>
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
    </>
  );
};

export default CommissionLenDen;
