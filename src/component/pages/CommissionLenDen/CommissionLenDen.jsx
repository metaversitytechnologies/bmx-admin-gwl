import { Button, Card, DatePicker, Empty, Pagination, Select } from "antd";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useLazyFilterbyClientQuery } from "../../../store/service/supermasteAccountStatementServices";
import {
  useGetCommissionClientWiseMutation,
  useGetCommissionResetMutation,
  useGetCommitionReportHostopryMutation,
  useGetCommitionReportMutation,
} from "../../../store/service/SportDetailServices";
import {
  CalendarDays,
  Eye,
  HandCoins,
  History,
  RefreshCcw,
  RotateCcw,
  UserRound,
} from "lucide-react";
import CommissionModal from "./CommissionModal";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import UserCommissionModal from "./UserCommissionModal";
import { openNotification, openNotificationError } from "../../../App";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const { RangePicker } = DatePicker;

const CommissionLenDen = () => {
  // ----------------- State -----------------
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [clientId, setClientId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const initialDateRange = useMemo(
    () => [
      moment().subtract(14, "days").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ],
    [],
  );
  const [dateData, setDateData] = useState([
    initialDateRange[0],
    initialDateRange[1],
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const userId = localStorage.getItem("userId");
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
  const [triggerClient, { data: commissionDate, loading }] =
    useGetCommissionClientWiseMutation();
  const [getCommiHistory, { data: commHistory, isLoading: histLoading }] =
    useGetCommitionReportHostopryMutation();
  const [getResetComm, { isLoading: resetLoading }] =
    useGetCommissionResetMutation();
  const rows = useMemo(() => data?.data || [], [data]);
  const totalEntries = rows.length;
  const firstEntry = totalEntries ? (currentPage - 1) * pageSize + 1 : 0;
  const lastEntry = Math.min(currentPage * pageSize, totalEntries);
  const selectedUserLabel =
    userDetails?.label || (userType == 2 ? `Me (${userId})` : "All Users");
  const paginatedRows = useMemo(
    () => rows.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [rows, currentPage, pageSize],
  );

  // ----------------- Effects -----------------
  useEffect(() => {
    trigger({
      userId: userType == 2 ? userId : clientId,
      fromDate: dateData[0],
      toDate: dateData[1],
    });
  }, [clientId, dateData, trigger, userId, userType]);

  useEffect(() => {
    userTrigger({ userType: 2 });
  }, [userTrigger]);

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
        },
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

  const handleApply = () => {
    setCurrentPage(1);
    trigger({
      userId: userType == 2 ? userId : clientId,
      fromDate: dateData[0],
      toDate: dateData[1],
    });
  };

  const handleDateChange = (_, dateString) => {
    setDateData(dateString);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setDateData(initialDateRange);
    setClientId("");
    setUserDetails(null);
    setCurrentPage(1);
    trigger({
      userId: userType == 2 ? userId : "",
      fromDate: initialDateRange[0],
      toDate: initialDateRange[1],
    });
  };

  const handleClientWiseData = (clientId) => {
    setOpenUser(!openUser);
    triggerClient({
      userId: clientId?.userId,
      fromDate: dateData[0],
      toDate: dateData[1],
    });
  };

  const totalFull =
    totals.mMatch +
    totals.mSession +
    totals.mCasino -
    (totals.dMatch + totals.dSession + totals.dCasino);

  const handleOpenHistory = (userId) => {
    getCommiHistory({
      userId: userId,
      // fromDate: dateData[0],
      // toDate: dateData[1],
    });
    setOpen(true);
  };

  const handleResetComm = async (userIds) => {
    const res = await getResetComm({
      userId: userIds,
      fromDate: dateData[0],
      toDate: dateData[1],
    }).unwrap();
    if (res?.status) {
      trigger({
        userId: userType == 2 ? userId : clientId,
        fromDate: dateData[0],
        toDate: dateData[1],
      });
      openNotification("Commission Report Reset Successfully", "success");
    } else {
      openNotificationError(res?.message, "error");
    }
  };

  return (
    <>
      <div className="match_slip login_report main_live_section list_supers admin-details-panel commission-len-den-panel">
        {isLoading && <CustomLoading />}

        <AppPageHeader
          icon={<HandCoins size={20} strokeWidth={1.8} />}
          title="Commission Len Den"
          subtitle="Track commission dena/mila activity across clients"
        />

        <Card
          style={{ margin: "0px", width: "100%" }}
          className="sport_detail team_name commission-len-den-card">
          <div className="commission-filter-toolbar">
            <div className="commission-filter-main">
              <div className="commission-control commission-date-control">
                <CalendarDays size={16} strokeWidth={1.9} />
                <RangePicker
                  value={[dayjs(dateData[0]), dayjs(dateData[1])]}
                  onChange={handleDateChange}
                  bordered={false}
                  showSecond
                  allowClear={false}
                />
              </div>

              {userType != 2 && (
                <div className="commission-control commission-user-control">
                  <UserRound size={16} strokeWidth={1.9} />
                  <Select
                    placeholder="Select User"
                    showSearch
                    value={clientId}
                    allowClear
                    onClear={() => {
                      setClientId("");
                      setUserDetails(null);
                    }}
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
                </div>
              )}

              <Button
                className="approved-primary-button commission-apply-button"
                icon={<RefreshCcw size={15} strokeWidth={2} />}
                onClick={handleApply}>
                Apply
              </Button>
            </div>

            <Button
              className="commission-reset-button"
              icon={<RotateCcw size={15} strokeWidth={2} />}
              onClick={handleResetFilters}>
              Reset
            </Button>
          </div>

          {/* Table Section */}

          <div className="table_section statement_tabs_data ant-spin-nested-loading commission-table-shell">
            <div className="commission-table-scroll">
              <table className="live_table login_data_table commission-table">
                <colgroup>
                  <col className="commission-col-name" />
                  <col className="commission-col-value" />
                  <col className="commission-col-value" />
                  <col className="commission-col-value" />
                  <col className="commission-col-value" />
                  <col className="commission-col-action" />
                  <col className="commission-col-value" />
                  <col className="commission-col-value" />
                  <col className="commission-col-value" />
                  <col className="commission-col-value" />
                  <col className="commission-col-value" />
                </colgroup>
                {/* Table Headers */}
                <thead>
                  <tr className="commission-group-row">
                    <th className=" commission-group-name"></th>
                    <th
                      className="text-center commission-group-label"
                      colSpan={5}>
                      Mila Hai
                    </th>
                    <th
                      className="text-center commission-group-label commission-group-dena"
                      colSpan={4}>
                      Dena Hai
                    </th>
                    <th className="text-center commission-group-label commission-group-bacha">
                      Bacha Hai
                    </th>
                  </tr>
                  <tr>
                    <th className=" commission-name-head">Name</th>
                    <th className="text-center">M.Comm.</th>
                    <th className="text-center">S.Comm.</th>
                    <th className="text-center">C.Comm.</th>
                    <th className="text-center">T.Comm.</th>
                    <th className="text-center commission-action-head">
                      Action
                    </th>
                    <th className="text-center">M.Comm.</th>
                    <th className="text-center">S.Comm.</th>
                    <th className="text-center">C.Comm.</th>
                    <th className="text-center">T.Comm.</th>
                    <th className="text-center">Comm.</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Totals Row (Top Row for Selected Client) */}
                  {rows.length > 0 && (
                    <tr className="commission-total-row">
                      <td className=" commission-name-cell">
                        <span className="gx-px-2">{selectedUserLabel}</span>
                      </td>
                      <td className="commission-value commission-value-success">
                        {totals.mMatch?.toFixed(2)}
                      </td>
                      <td className="commission-value commission-value-success">
                        {totals.mSession?.toFixed(2)}
                      </td>
                      <td className="commission-value commission-value-success">
                        {totals.mCasino?.toFixed(2)}
                      </td>
                      <td className="commission-value commission-value-success">
                        {(
                          totals.mMatch +
                          totals.mSession +
                          totals.mCasino
                        )?.toFixed(2)}
                      </td>
                      <td></td>
                      <td className="commission-value commission-value-danger">
                        {totals.dMatch?.toFixed(2)}
                      </td>
                      <td className="commission-value commission-value-danger">
                        {totals.dSession?.toFixed(2)}
                      </td>
                      <td className="commission-value commission-value-danger">
                        {totals.dCasino?.toFixed(2)}
                      </td>
                      <td className="commission-value commission-value-danger">
                        {(
                          totals.dMatch +
                          totals.dSession +
                          totals.dCasino
                        )?.toFixed(2)}
                      </td>
                      <td
                        className={`commission-value ${
                          totalFull >= 0
                            ? "commission-value-success"
                            : "commission-value-danger"
                        }`}>
                        {totalFull?.toFixed(2)}
                      </td>
                    </tr>
                  )}

                  {/* Data Rows */}
                  {paginatedRows.length > 0 ? (
                    paginatedRows.map((items) => {
                      const isUser = items?.userId?.startsWith("C");
                      const fullData =
                        items?.matchCommMila +
                        items?.sessionCommMila +
                        items?.casinoCommMila -
                        (items?.matchCommDena +
                          items?.sessionCommDena +
                          items?.casinoCommDena);
                      return (
                        <tr key={items?.userId}>
                          <td className=" commission-name-cell">
                            <span
                              onClick={() => handleClientWiseData(items)}
                              className="commission-name-link">
                              {items?.userName} ({items?.userId})
                              <Eye size={14} strokeWidth={1.9} />
                            </span>
                          </td>
                          {/* Mila */}
                          <td className="commission-value commission-value-success">
                            {items?.matchCommMila?.toFixed(2)}
                          </td>
                          <td className="commission-value commission-value-success">
                            {items?.sessionCommMila?.toFixed(2)}
                          </td>
                          <td className="commission-value commission-value-success">
                            {items?.casinoCommMila?.toFixed(2)}
                          </td>
                          <td className="commission-value commission-value-success">
                            {(
                              items?.matchCommMila +
                              items?.sessionCommMila +
                              items?.casinoCommMila
                            )?.toFixed(2)}
                          </td>
                          <td>
                            {isUser && (
                              <div className="commission-row-actions">
                                <Button
                                  loading={resetLoading}
                                  onClick={() => handleResetComm(items?.userId)}
                                  className="commission-action commission-action-reset"
                                  icon={
                                    <RotateCcw size={14} strokeWidth={2} />
                                  }>
                                  <span>Reset</span>
                                </Button>
                                <Button
                                  className="commission-action commission-action-history"
                                  icon={<History size={14} strokeWidth={2} />}
                                  onClick={() =>
                                    handleOpenHistory(items?.userId)
                                  }>
                                  <span>History</span>
                                </Button>
                              </div>
                            )}
                          </td>
                          {/* Dena */}
                          <td className="commission-value commission-value-danger">
                            {items?.matchCommDena?.toFixed(2)}
                          </td>
                          <td className="commission-value commission-value-danger">
                            {items?.sessionCommDena?.toFixed(2)}
                          </td>
                          <td className="commission-value commission-value-danger">
                            {items?.casinoCommDena?.toFixed(2)}
                          </td>
                          <td className="commission-value commission-value-danger">
                            {(
                              items?.matchCommDena +
                              items?.sessionCommDena +
                              items?.casinoCommDena
                            )?.toFixed(2)}
                          </td>
                          <td
                            className={`commission-value ${
                              fullData >= 0
                                ? "commission-value-success"
                                : "commission-value-danger"
                            }`}>
                            {fullData?.toFixed(2) || "0.00"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="commission-empty-cell" colSpan={11}>
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={
                            <span>
                              <strong>No commission records found</strong>
                              <small>
                                Try changing the date range or selected user.
                              </small>
                            </span>
                          }
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="admin-details-pagination commission-pagination">
              <span className="admin-details-pagination-text">
                Showing {firstEntry} to {lastEntry} of {totalEntries} entries
              </span>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalEntries}
                showSizeChanger
                pageSizeOptions={["10", "25", "50", "100"]}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Modals */}
      <CommissionModal
        commHistory={commHistory?.data}
        setOpenModals={setOpen}
        openModal={open}
        isLoading={histLoading}
      />
      <UserCommissionModal
        setOpenModals={setOpenUser}
        openModal={openUser}
        commissionDate={commissionDate?.data}
        loading={loading}
      />
    </>
  );
};

export default CommissionLenDen;
