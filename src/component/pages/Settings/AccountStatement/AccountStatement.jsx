import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";
import { useAccountOprationQuery } from "../../../../store/service/userlistService";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import AccountStatementHeader from "./AccountStatementHeader";
import AccountStatementToolbar from "./AccountStatementToolbar";
import TransactionTable from "./TransactionTable";
import MobileTransactionFeed from "./MobileTransactionFeed";
import TransactionPagination from "./TransactionPagination";

const AccountStatement = () => {
  const timeBefore = moment().startOf("year").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [detailType, setDetailsType] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const { id } = useParams();

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const { data, isFetching, isLoading } = useAccountOprationQuery(
    {
      detailType: detailType,
      fromDate: dateData[0],
      toDate: dateData[1],
      ...(id && { userId: id }),
    },
    { refetchOnMountOrArgChange: true }
  );

  // Reads the raw dayjs values instead of the antd-formatted dateStrings so
  // that the mobile-friendly display format on the RangePicker never
  // changes the fromDate/toDate values sent to the API.
  const onChange = (dates) => {
    setDateData([
      dates?.[0] ? dates[0].format("YYYY-MM-DD") : "",
      dates?.[1] ? dates[1].format("YYYY-MM-DD") : "",
    ]);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [detailType, dateData]);

  const transactions = data?.data || [];
  const total = transactions.length;
  const pagedTransactions = transactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="main_live_section list_supers admin-details-panel account-statement-panel">
      <AccountStatementHeader count={total} onBack={handleBackClick} />

      <AccountStatementToolbar
        defaultDateRange={[dayjs(timeBefore), dayjs(time)]}
        onDateChange={onChange}
        detailType={detailType}
        onDetailTypeChange={setDetailsType}
        total={total}
      />

      <div
        className="account-statement-body"
        style={{ position: "relative" }}>
        {(isLoading || isFetching) && <CustomLoading />}
        <TransactionTable data={pagedTransactions} />
        <MobileTransactionFeed data={pagedTransactions} />
      </div>

      <TransactionPagination
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default AccountStatement;
