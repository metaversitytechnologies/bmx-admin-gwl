import { Card, Col, DatePicker, Table } from "antd";
import "./MyLedger.scss";
import moment from "moment";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DownloadReport from "../../../common/DownloadReport/DownloadReport";

const columns = [
  {
    title: "Date",
    dataIndex: "dateStr",
    key: "dateStr",
  },
  {
    title: "Collection Name",
    dataIndex: "collectionName",
    key: "collectionName",
  },
  {
    title: "Debit",
    dataIndex: "debit",
    key: "debit",
    align: "right",
  },
  {
    title: "Credit",
    dataIndex: "credit",
    key: "credit",
    align: "right",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    align: "right",
    render: (text, record) => <span>{Math.abs(record?.balance)}</span>,
  },
  {
    title: "Payment Type",
    dataIndex: "paymentType",
    key: "paymentType",
    render: (text, record) => (
      <span>
        {`${record?.paymentType} ${
          record?.showDate ? `- ${record?.dateOnlyStr}` : ""
        } ${record?.isRollBack ? "- RollBack" : ""}`}
      </span>
    ),
  },
  {
    title: "Remark",
    dataIndex: "remarks",
    key: "remarks",
  },
  {
    title: "Rollback",
    dataIndex: "isRollback",
    key: "isRollback",
    render: (text, record) => <span>{record?.isRollback ? "Yes" : "No"}</span>,
  },
];

// Mock response data (replace this with whatever format you want to simulate)
const mockLedgerData = {
  list: [
    {
      dateStr: "2025-06-13",
      collectionName: "Account Adjustment",
      debit: 0,
      credit: 500,
      balance: 500,
      paymentType: "Online",
      dateOnlyStr: "13-06-2025",
      showDate: true,
      isRollBack: false,
      remarks: "Credit adjustment",
      isRollback: false,
    },
    {
      dateStr: "2025-06-14",
      collectionName: "Manual Entry",
      debit: 200,
      credit: 0,
      balance: 300,
      paymentType: "Cash",
      dateOnlyStr: "14-06-2025",
      showDate: true,
      isRollBack: true,
      remarks: "Correction",
      isRollback: true,
    },
  ],
  credit: 500,
  debit: 200,
  balance: 300,
};

const MyLedger = () => {
  const nav = useNavigate();
  const handleBackbtn = () => {
    nav(-1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeBefore = moment().subtract(30, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);

  const onChange = (date, dateString) => {
    setDateData(dateString);
  };

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setData({ data: { data: mockLedgerData, list: mockLedgerData.list } });
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [dateData]);

  const headerField = [
    "Date",
    "Collection Name",
    "Debit",
    "Credit",
    "Balance",
    "Payment Type",
    "Remark",
    "Rollback",
  ];

  const lenadenaHeading = ["Lena", "Dena", "Balance"];

  const arrBalance = [
    {
      lena: data?.data?.data?.credit?.toFixed(2),
      dena: data?.data?.data?.debit?.toFixed(2),
      balance: data?.data?.data?.balance?.toFixed(2),
    },
  ];

  return (
    <>
      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)} className="report_overlay" />
      )}
      <Card
        className="sport_detail ledger_data"
        title="My Ledger"
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <div className="my_ledger">
          <Col lg={8} xs={24} className="match_ladger">
            <DatePicker.RangePicker
              style={{ margin: "10px 0" }}
              defaultValue={[dayjs(timeBefore), dayjs(time)]}
              onChange={onChange}
            />
          </Col>
          <div>
            <h3 style={{ padding: "5px", color: "rgb(51, 181, 28)" }}>
              Lena : {data?.data?.data?.credit?.toFixed(2)}
            </h3>
          </div>
          <div>
            <h3 style={{ padding: "5px", color: "rgb(214, 75, 75)" }}>
              Dena : {data?.data?.data?.debit?.toFixed(2)}
            </h3>
          </div>
          <div>
            <h3
              className={
                data?.data?.data?.balance > 0 ? "text_danger" : "text_success"
              }>
              Balance: {Math.abs(data?.data?.data?.balance?.toFixed(2))}{" "}
              {data?.data?.data?.balance > 0 ? "( Dena )" : "( Lena )"}
            </h3>
          </div>
          <div>
            <DownloadReport
              lenadenaHeading={lenadenaHeading}
              reportType="MyLedger"
              reportName="MyLedger"
              headerField={headerField}
              startDate={dateData[0]}
              endDate={dateData[1]}
              balanceData={arrBalance}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
        <div className="table_section">
          <Table
            className="live_table limit_update"
            bordered
            columns={columns}
            loading={isLoading}
            pagination={{
              defaultPageSize: 50,
              pageSizeOptions: [50, 100, 150, 200, 250],
            }}
            dataSource={data?.data?.list}
          />
        </div>
      </Card>
    </>
  );
};

export default MyLedger;
