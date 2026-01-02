import { Card, Table } from "antd";
import "./MyLedger.scss";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyLedgerQuery } from "../../../../store/service/userlistService";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    onCell: () => ({ style: { whiteSpace: "nowrap" } }),
  },
  {
    title: "Event Name",
    dataIndex: "collectionName",
    key: "collectionName",
    onCell: () => ({ style: { whiteSpace: "nowrap" } }),
  },
  {
    title: "Credit",
    dataIndex: "credit",
    key: "credit",
    align: "right",
    onCell: () => ({ style: { whiteSpace: "nowrap" } }),
  },
  {
    title: "Debit",
    dataIndex: "debit",
    key: "debit",
    align: "right",
    onCell: () => ({ style: { whiteSpace: "nowrap" } }),
  },

  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    align: "right",
    render: (text, record) => <span>{record?.balance?.toFixed(2)}</span>,
  },
  {
    title: "Type",
    dataIndex: "ledgerType",
    key: "ledgerType",
    onCell: () => ({ style: { whiteSpace: "nowrap" } }),
  },
  {
    title: "Remark",
    dataIndex: "description",
    key: "description",
    onCell: () => ({ style: { whiteSpace: "nowrap" } }),
  },
];

const MyLedger = () => {
  const nav = useNavigate();
  const handleBackbtn = () => {
    nav(-1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentYear = moment().year();
  const timeBefore = moment(`2025-01-01`).format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);

  const {
    data: ledgerData,
    isLoading,
    isFetching,
  } = useGetMyLedgerQuery({
    ledgerType: "ALL",
    fromDate: timeBefore,
    toDate: time,
  });

  const totalCreadit =
    ledgerData?.data?.reduce((acc, item) => acc + item.credit, 0) || 0;
  const totalDebit =
    ledgerData?.data?.reduce((acc, item) => acc + item.debit, 0) || 0;
  // const totalBalance =
  //   ledgerData?.data?.reduce(
  //     (acc, item) => acc + Number(item.balance || 0),
  //     0
  //   ) || 0;

  // const totalBalance = totalCreadit - totalDebit;
  const totalBalance = totalDebit - totalCreadit;

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
          <div>
            <h3 style={{ padding: "5px", color: "green", fontSize: "20px" }}>
              Lena :{totalDebit?.toFixed(2)}
            </h3>
          </div>
          <div>
            <h3
              style={{
                padding: "5px",
                color: "rgb(214, 75, 75)",
                fontSize: "20px",
              }}>
              Dena : {totalCreadit?.toFixed(2)}
            </h3>
          </div>
          <div>
            <h3
              style={{ fontSize: "20px" }}
              className={totalBalance < 0 ? "text_danger" : "text_success"}>
              Balance: {Math.abs(totalBalance?.toFixed(2))}{" "}
              {totalBalance > 0 ? "( Lena )" : "( Dena )"}
            </h3>
          </div>
        </div>
        <div className="table_section">
          <Table
            className="live_table limit_update"
            bordered
            columns={columns}
            loading={{
              spinning: isLoading || isFetching,
              indicator: <CustomLoading />,
            }}
            pagination={{
              defaultPageSize: 50,
              pageSizeOptions: [50, 100, 150, 200, 250],
            }}
            dataSource={ledgerData?.data}
          />
        </div>
      </Card>
    </>
  );
};

export default MyLedger;
