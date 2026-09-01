import { Card, Empty, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookText,
  CalendarDays,
} from "lucide-react";
import { useGetMyLedgerQuery } from "../../../../store/service/userlistService";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";

const formatLedgerAmount = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

const MyLedger = () => {
  const nav = useNavigate();
  const handleBackbtn = () => {
    nav(-1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeBefore = moment(`2025-01-01`).format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

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
  const balanceType = totalBalance > 0 ? "Lena" : "Dena";
  const isBalanceLena = totalBalance > 0;
  const totalEntries = ledgerData?.data?.length || 0;
  const firstEntry = totalEntries ? (currentPage - 1) * pageSize + 1 : 0;
  const lastEntry = Math.min(currentPage * pageSize, totalEntries);

  const columns = [
    {
      title: "#",
      key: "serial",
      width: 64,
      align: "center",
      render: (_, __, index) => (
        <span className="my-ledger-serial">
          {String((currentPage - 1) * pageSize + index + 1).padStart(2, "0")}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 160,
      render: (text) => (
        <span className="my-ledger-date">
          <CalendarDays size={14} strokeWidth={1.9} />
          {moment(text).format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      title: "Event Name",
      dataIndex: "collectionName",
      key: "collectionName",
      className: "my-ledger-event-cell",
      width: 230,
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      align: "right",
      width: 130,
      render: (text) => (
        <span
          className={`my-ledger-amount ${
            Number(text || 0) > 0 ? "is-credit" : "is-zero"
          }`}>
          {formatLedgerAmount(text)}
        </span>
      ),
    },
    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
      align: "right",
      width: 120,
      render: (text) => (
        <span
          className={`my-ledger-amount ${
            Number(text || 0) > 0 ? "is-debit" : "is-zero"
          }`}>
          {formatLedgerAmount(text)}
        </span>
      ),
    },

    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      align: "right",
      width: 150,
      render: (text, record) => (
        <span className="my-ledger-amount is-balance">
          {formatLedgerAmount(record?.balance)}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "ledgerType",
      key: "ledgerType",
      align: "center",
      width: 120,
      render: (text) => <span className="my-ledger-type-badge">{text}</span>,
    },
    {
      title: "Remark",
      dataIndex: "description",
      key: "description",
      className: "my-ledger-remark-cell",
      width: 180,
    },
  ];

  return (
    <>
      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)} className="report_overlay" />
      )}
      <div className="main_live_section list_supers admin-details-panel my-ledger-panel">
        <AppPageHeader
          icon={<BookText size={20} strokeWidth={1.8} />}
          title="My Ledger"
          subtitle="Review your personal ledger and balances"
          onBack={handleBackbtn}
        />
        <Card className="sport_detail ledger_data my-ledger-card">
          <section className="my-ledger-summary" aria-label="Ledger balance summary">
            <article className="my-ledger-summary-item is-lena">
              <span className="my-ledger-summary-icon">
                <ArrowUpRight size={20} strokeWidth={2.2} />
              </span>
              <div>
                <span>Lena</span>
                <strong>{formatLedgerAmount(totalDebit)}</strong>
              </div>
            </article>
            <article className="my-ledger-summary-item is-dena">
              <span className="my-ledger-summary-icon">
                <ArrowDownRight size={20} strokeWidth={2.2} />
              </span>
              <div>
                <span>Dena</span>
                <strong>{formatLedgerAmount(totalCreadit)}</strong>
              </div>
            </article>
            <article
              className={`my-ledger-summary-item ${
                isBalanceLena ? "is-lena" : "is-dena"
              }`}>
              <span className="my-ledger-summary-icon">
                {isBalanceLena ? (
                  <ArrowUpRight size={20} strokeWidth={2.2} />
                ) : (
                  <ArrowDownRight size={20} strokeWidth={2.2} />
                )}
              </span>
              <div>
                <span>Balance ( {balanceType} )</span>
                <strong>{formatLedgerAmount(Math.abs(totalBalance))}</strong>
              </div>
            </article>
          </section>

          <div className="table_section my-ledger-table-section">
            <div className="my-ledger-mobile-hint">Swipe to view all columns</div>
            <div className="my-ledger-table-viewport">
              <Table
                className="my-ledger-ant-table"
                columns={columns}
                loading={{
                  spinning: isLoading || isFetching,
                  indicator: <CustomLoading />,
                }}
                pagination={{
                  current: currentPage,
                  pageSize,
                  pageSizeOptions: [50, 100, 150, 200, 250],
                  showSizeChanger: true,
                  total: totalEntries,
                  showTotal: () =>
                    `Showing ${firstEntry} to ${lastEntry} of ${totalEntries} entries`,
                  onChange: (page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                  },
                }}
                dataSource={ledgerData?.data}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <span>
                          No ledger entries found
                          <small>
                            No transactions are available for the selected
                            period.
                          </small>
                        </span>
                      }
                    />
                  ),
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default MyLedger;
