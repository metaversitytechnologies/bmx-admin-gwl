import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./MasterReport.scss";
import ReportTable from "../ReportTable";
import { useLocation, useNavigate } from "react-router-dom";
import DownloadReport from "../../../common/DownloadReport/DownloadReport";

const MasterReport = ({ reportName, userType }) => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [clientId, setClientId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nav = useNavigate();
  const { Option } = Select;
  const [form] = Form.useForm();
  const { pathname } = useLocation();

  // ⬇️ Mock User List
  const mockUserList = [
    { userId: "U001", userName: "John Doe" },
    { userId: "U002", userName: "Jane Smith" },
    { userId: "U003", userName: "Alice Johnson" },
  ];

  // ⬇️ Mock Report Data
  const mockReportData = [
    {
      key: 1,
      user: "John Doe",
      type: "Password",
      old: "1234",
      new: "abcd",
      doneBy: "Admin",
      date: "2025-06-10 14:00",
      ip: "192.168.1.1",
    },
    {
      key: 2,
      user: "Jane Smith",
      type: "Mobile",
      old: "9876543210",
      new: "9123456780",
      doneBy: "Moderator",
      date: "2025-06-12 10:30",
      ip: "192.168.1.5",
    },
  ];

  const [filteredData, setFilteredData] = useState(mockReportData);

  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  useEffect(() => {
    form?.resetFields();
    setClientId("");
  }, [pathname]);

  const handleSelect = (value) => {
    setClientId(value);
  };

  const onFinish = (value) => {
    const filtered = mockReportData.filter((item) => {
      const inDateRange =
        moment(item.date).isSameOrAfter(dateData[0]) &&
        moment(item.date).isSameOrBefore(dateData[1]);

      const matchesUser = clientId ? item.user.includes(clientId) : true;
      const matchesType = value?.reportType && value?.reportType !== "All"
        ? item.type === value?.reportType
        : true;

      return inDateRange && matchesUser && matchesType;
    });

    setFilteredData(filtered);
  };

  const headerField = ["User", "Type", "Old", "New", "Done By", "Date", "IP"];

  return (
    <>
      {isModalOpen && <div onClick={() => setIsModalOpen(false)} className="report_overlay"></div>}
      <Card
        className="sport_detail ledger_data"
        title={`${reportName} Reports`}
        extra={<button onClick={() => nav(-1)}>Back</button>}
      >
        <Form
          className="form_data mt-16 cash_data"
          name="basic"
          style={{ marginTop: "12px" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Row>
            <Col xl={8} lg={8} md={24} xs={24}>
              <Form.Item label={reportName} name="client">
                <Select
                  placeholder="Select Client"
                  options={mockUserList.map((i) => ({
                    label: `${i.userId} (${i.userName})`,
                    value: i.userName,
                  }))}
                  showSearch
                  allowClear
                  onSelect={handleSelect}
                />
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={24} xs={24}>
              <Form.Item label="Report Type" name="reportType">
                <Select defaultValue="All">
                  <Option value="All">All</Option>
                  <Option value="Share">Share</Option>
                  <Option value="Status">Status</Option>
                  <Option value="Password">Password</Option>
                  <Option value="Mobile">Mobile</Option>
                  <Option value="UserName">UserName</Option>
                  <Option value="Session Commission">Session Commission</Option>
                  <Option value="Match Commission">Match Commission</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={24} xs={24}>
              <Form.Item label="Date" name="Date">
                <DatePicker.RangePicker
                  allowClear={false}
                  className="report_date_picker"
                  defaultValue={[dayjs(timeBefore), dayjs(time)]}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="report_download">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <DownloadReport
                startDate={dateData[0]}
                endDate={dateData[1]}
                userType={userType}
                reportName={`${reportName.replace(/ /g, "_")}_reports`}
                headerField={headerField}
                reportType="dataReport"
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </Form.Item>
          </div>
        </Form>
        <ReportTable data={filteredData} isLoading={false} />
      </Card>
    </>
  );
};

export default MasterReport;
