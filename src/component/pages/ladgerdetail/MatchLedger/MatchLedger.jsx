import { Card, DatePicker, Empty, Select, Table } from "antd";
import { useMemo, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import { CalendarDays, TrendingUp } from "lucide-react";
import { useGetLedgerProfitLossQuery } from "../../../../store/service/SportDetailServices";
import { useNavigate } from "react-router-dom";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";

const formatLedgerAmount = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const MatchLedger = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const nav = useNavigate();

  const columns = useMemo(
    () => [
      {
        title: "#",
        key: "serial",
        width: 68,
        align: "center",
        render: (_, __, index) => (
          <span className="profit-loss-serial">
            {String((currentPage - 1) * pageSize + index + 1).padStart(2, "0")}
          </span>
        ),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (text) => (
          <span className="profit-loss-date">
            <CalendarDays size={14} strokeWidth={1.9} />
            {moment(text).format("DD-MM-YYYY")}
          </span>
        ),
        width: 190,
      },
      {
        title: "Event Name",
        dataIndex: "eventName",
        key: "eventName",
        className: "profit-loss-event-cell",
      },

      {
        title: "Debit",
        dataIndex: "debit",
        align: "right",
        key: "debit",
        render: (text) => (
          <span className="profit-loss-amount profit-loss-debit">
            {formatLedgerAmount(text || 0)}
          </span>
        ),
        width: 150,
      },
      {
        title: "Credit",
        dataIndex: "credit",
        key: "credit",
        align: "right",
        render: (text) => (
          <span className="profit-loss-amount profit-loss-credit">
            {formatLedgerAmount(text || 0)}
          </span>
        ),
        width: 150,
      },
    ],
    [currentPage, pageSize],
  );

  const onChange = (date, dateString) => {
    setDateData(dateString);
    setCurrentPage(1);
  };

  const {
    data: ledgerData,
    isLoading,
    isFetching,
  } = useGetLedgerProfitLossQuery(
    {
      startDate: dateData[0],
      endDate: dateData[1],
    },
    { refetchOnMountOrArgChange: true },
  );

  const totalCredit = useMemo(
    () =>
      ledgerData?.data?.reduce(
        (acc, item) => acc + (item.credit || 0) + (item.debit || 0),
        0,
      ) || 0,
    [ledgerData?.data],
  );

  const totalClassName =
    totalCredit > 0
      ? "is-positive"
      : totalCredit < 0
        ? "is-negative"
        : "is-zero";
  const totalEntries = ledgerData?.data?.length || 0;
  const firstEntry = totalEntries ? (currentPage - 1) * pageSize + 1 : 0;
  const lastEntry = Math.min(currentPage * pageSize, totalEntries);

  return (
    <>
      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)} className="report_overlay" />
      )}

      <div className="main_live_section list_supers admin-details-panel profit-loss-panel">
        <AppPageHeader
          icon={<TrendingUp size={20} strokeWidth={1.8} />}
          title="Profit Loss"
          subtitle="Review match-wise profit and loss by date range"
          onBack={() => nav(-1)}
        />
        <Card className="sport_detail my_ledger main_match_ledger profit_loss_table">
          <div className="profit-loss-toolbar">
            <div className="profit-loss-filter-group">
              <div className="profit-loss-control profit-loss-range-control">
                <DatePicker.RangePicker
                  defaultValue={[dayjs(timeBefore), dayjs(time)]}
                  onChange={onChange}
                  format="YYYY-MM-DD"
                />
              </div>
              <div className="profit-loss-control profit-loss-select-control">
                <Select
                  placeholder="Select Game Type"
                  options={[
                    {
                      label: "All",
                      value: "All",
                    },
                    {
                      label: "Sport",
                      value: "sport",
                    },
                    {
                      label: "Int Casino",
                      value: "intcasino",
                    },
                    {
                      label: "Diamond Casino",
                      value: "casino",
                    },
                  ]}
                  showSearch
                  allowClear
                />
              </div>
            </div>
            <div className={`profit-loss-total ${totalClassName}`}>
              <span>Total:</span>
              <strong>₹{formatLedgerAmount(totalCredit || 0)}</strong>
            </div>
          </div>

          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            
            <div className="profit-loss-table-viewport">
              <Table
                className="profit-loss-ant-table"
                columns={columns}
                rowKey={(record) =>
                  record.id ??
                  record._id ??
                  record.key ??
                  record.eventId ??
                  record.matchId ??
                  `${record.date}-${record.eventName}-${record.credit ?? 0}-${
                    record.debit ?? 0
                  }`
                }
                rowClassName={() => "no-wrap"}
                loading={{
                  spinning: isLoading || isFetching,
                  indicator: <CustomLoading />,
                }}
                dataSource={ledgerData?.data}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <span>
                          No profit/loss records found
                          <small>
                            Try changing the date range or game type.
                          </small>
                        </span>
                      }
                    />
                  ),
                }}
                pagination={{
                  current: currentPage,
                  pageSize,
                  total: totalEntries,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "25", "50", "100"],
                  showTotal: () =>
                    `Showing ${firstEntry} to ${lastEntry} of ${totalEntries} entries`,
                  onChange: (page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                  },
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default MatchLedger;
