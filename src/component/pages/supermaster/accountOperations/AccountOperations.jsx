import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";
import { History } from "lucide-react";
import { useAccOprationQuery } from "../../../../store/service/userlistService";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";
import AccountOperationsToolbar from "./AccountOperationsToolbar";
import OperationsTable from "./OperationsTable";
import MobileActivityFeed from "./MobileActivityFeed";
import AccountOperationsPagination from "./AccountOperationsPagination";
import { formatWithCodes, formatOperationLabel } from "./accountOperationsUtils";

const AccountOperations = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  // Retained for behavioral parity with the previous implementation — this
  // endpoint has never actually been filtered by the selected date range.
  const [, setDateData] = useState([timeBefore, time]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const { data, isFetching, isLoading } = useAccOprationQuery(
    {
      userId: id ? id : userId,
    },
    { refetchOnMountOrArgChange: true }
  );

  // Kept for visual/behavioral parity with the previous implementation —
  // this endpoint has never been filtered by the date range control.
  const onDateChange = (date, dateString) => {
    setDateData(dateString);
  };

  const activities = data?.data || [];

  const filteredActivities = searchTerm.trim()
    ? activities.filter((activity) => {
        const haystack = [
          formatOperationLabel(activity?.operation),
          formatWithCodes(activity?.doneBy),
          formatWithCodes(activity?.description),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(searchTerm.trim().toLowerCase());
      })
    : activities;

  const total = filteredActivities.length;
  const pagedActivities = filteredActivities.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="main_live_section list_supers admin-details-panel account-operations-panel">
      <AppPageHeader
        icon={<History size={20} strokeWidth={1.8} />}
        title="Activity History"
        subtitle={
          <>
            Review account changes and administrative activity ·{" "}
            {activities.length} {activities.length === 1 ? "activity" : "activities"}
          </>
        }
        onBack={handleBackClick}
      />

      <AccountOperationsToolbar
        defaultDateRange={[dayjs(timeBefore), dayjs(time)]}
        onDateChange={onDateChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        total={total}
      />

      <div
        className="account-operations-body"
        style={{ position: "relative" }}>
        {(isLoading || isFetching) && <CustomLoading />}
        <OperationsTable data={pagedActivities} />
        <MobileActivityFeed data={pagedActivities} />
      </div>

      <AccountOperationsPagination
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

export default AccountOperations;
