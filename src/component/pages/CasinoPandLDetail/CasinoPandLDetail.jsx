import { useMemo, useState } from "react";
import { Button, DatePicker, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import {
  ArrowLeft,
  CalendarDays,
  ChartNoAxesCombined,
  Filter,
  Grid2X2,
  Sigma,
} from "lucide-react";
import { useGetCompletdCasinoQuery } from "../../../store/service/SportDetailServices";
import CustomLoading from "../../common/CustomLoading/CustomLoading";

const { RangePicker } = DatePicker;

const formatAmount = (value) =>
  Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const getPnlTone = (value) => {
  const amount = Number(value || 0);

  if (amount > 0) return "positive";
  if (amount < 0) return "negative";
  return "neutral";
};

const formatDisplayDate = (value) => {
  if (!value) return "—";

  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.format("DD MMM YYYY") : value;
};

const getEventCode = (eventName) =>
  String(eventName || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "EV";

const CasinoPandLDetail = () => {
  const nav = useNavigate();
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(7, "day"),
    dayjs(),
  ]);

  const fromDate = dateRange[0].format("YYYY-MM-DD");
  const toDate = dateRange[1].format("YYYY-MM-DD");

  const { data, isLoading, isFetching } = useGetCompletdCasinoQuery({
    fromDate,
    toDate,
  });

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
    }
  };

  const totalPnl = useMemo(
    () =>
      data?.data?.reduce(
        (acc, item) => (item?.casinoId === null ? acc + item.pnl : acc),
        0
      ) || 0,
    [data?.data]
  );

  const reportingDays = dateRange[1].diff(dateRange[0], "day") + 1;

  const columns = useMemo(
    () => [
      {
        title: "Event",
        dataIndex: "eventName",
        key: "eventName",
        onCell: () => ({ "data-label": "Event" }),
        render: (text, record) => {
          if (record?.isTotal) {
            return (
              <div className="cpd-event-cell cpd-total-cell">
                <span className="cpd-row-icon cpd-total-icon">
                  <Sigma size={16} strokeWidth={2} />
                </span>
                <span>Portfolio Total</span>
              </div>
            );
          }

          if (!record?.casinoId) {
            return (
              <div className="cpd-event-cell cpd-date-cell">
                <span className="cpd-row-icon">
                  <CalendarDays size={16} strokeWidth={1.8} />
                </span>
                <span>{formatDisplayDate(record?.date || text)}</span>
              </div>
            );
          }

          return (
            <div className="cpd-event-cell cpd-casino-cell">
              <span className="cpd-event-code">{getEventCode(text)}</span>
              <Link className="gx-text-blue">
                {text} {record?.casinoId && `(${record?.date})`}
              </Link>
            </div>
          );
        },
      },
      {
        title: "Date & Time",
        dataIndex: "date",
        key: "date",
        onCell: () => ({ "data-label": "Date & Time" }),
        render: (value, record) => {
          if (record?.isTotal) return <span className="cpd-muted">—</span>;
          if (!record?.casinoId)
            return <span className="cpd-summary-label">Daily Summary</span>;
          return <span className="cpd-date-value">{value}</span>;
        },
      },
      {
        title: "P/L",
        dataIndex: "pnl",
        key: "pnl",
        onCell: () => ({ "data-label": "P/L" }),
        render: (value, record) => {
          const tone = getPnlTone(value);

          return (
            <div className="cpd-pnl-cell">
              <span className={`cpd-pnl-value cpd-pnl-${tone}`}>
                {formatAmount(value)}
              </span>
              {(record?.isTotal || record?.casinoId) && (
                <span className={`cpd-pnl-badge cpd-pnl-badge-${tone}`}>
                  {tone === "positive"
                    ? "Profit"
                    : tone === "negative"
                      ? "Loss"
                      : "Flat"}
                </span>
              )}
            </div>
          );
        },
      },
      {
        title: "Actions",
        key: "action",
        onCell: () => ({ "data-label": "Actions" }),
        render: (_, record) => {
          return (
            <div className="cpd-action-group">
              {!record?.isTotal ? (
                record.casinoId ? (
                  <>
                    <Button className="cpd-action-btn cpd-action-primary">
                      <Link
                        to={`/Casino/AndarBahar/plus-minus-type/${record?.date}/${record?.casinoId}`}>
                        View P&L
                      </Link>
                    </Button>
                    <Button className="cpd-action-btn cpd-action-secondary">
                      <Link
                        to={`/display-games/${record.casinoId}/${record.eventName}/${record.date}`}>
                        Display Games
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Button className="cpd-action-btn cpd-action-outline">
                    <Link to={`/plusminuscasinodeatils/${record.date}`}>
                      Daily P&L
                    </Link>
                  </Button>
                )
              ) : (
                <span className="cpd-muted">—</span>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  const tableData = useMemo(
    () => [
      {
        eventName: "Total",
        date: "",
        pnl: totalPnl,
        isTotal: true,
      },
      ...(data?.data ? [...data.data].reverse() : []),
    ],
    [data?.data, totalPnl]
  );

  return (
    <div className="match_slip match_ledger main_live_section list_supers admin-details-panel casino-pandl-panel">
      <div className="cpd-command-center">
        <div className="cpd-command-top">
          <div className="admin-details-title-wrap">
            <span className="admin-details-icon cpd-header-icon">
              <ChartNoAxesCombined size={21} strokeWidth={1.8} />
            </span>
            <div>
              <div className="team_name admin-details-title">
                Casino P&L Detail
              </div>
              <p className="admin-details-subtitle">
                Financial performance across casino events
              </p>
            </div>
          </div>
          <button
            type="button"
            className="admin-details-back"
            onClick={() => nav(-1)}>
            <ArrowLeft size={15} strokeWidth={1.8} />
            <span>Back</span>
          </button>
        </div>

        <div className="cpd-period-row">
          <div className="cpd-period-main">
            <span className="cpd-kicker">Reporting Period</span>
            <div className="cpd-filter-row">
              <RangePicker
                className="cpd-range-picker"
                value={dateRange}
                onChange={handleDateChange}
                bordered={false}
                showSecond
              />
              <Button type="primary" className="cpd-apply-btn">
                <Filter size={15} strokeWidth={1.9} />
                Apply
              </Button>
            </div>
          </div>
          <div className="cpd-window-pill">
            <CalendarDays size={15} strokeWidth={1.8} />
            {reportingDays} days reporting window
          </div>
        </div>
      </div>

      <section className="cpd-event-section">
        <div className="cpd-section-header">
          <div>
            <h2>Event Performance</h2>
            <p>Detailed profit and loss across casino events</p>
          </div>
          <span className="cpd-section-tool">
            <Grid2X2 size={16} strokeWidth={1.8} />
          </span>
        </div>

        <div className="table_section statement_tabs_data ant-spin-nested-loading cpd-table-shell">
          <Table
            className="cpd-ledger-table"
            columns={columns}
            dataSource={tableData}
            rowKey={(record, index) => index}
            rowClassName={(record) =>
              record?.isTotal
                ? "cpd-row-total"
                : record?.casinoId
                  ? "cpd-row-event"
                  : "cpd-row-date"
            }
            loading={{
              spinning: isLoading || isFetching,
              indicator: <CustomLoading />,
            }}
            pagination={{ pageSize: 20 }}
          />
        </div>
      </section>
    </div>
  );
};

export default CasinoPandLDetail;
