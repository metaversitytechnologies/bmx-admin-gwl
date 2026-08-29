import { useState } from "react";
import {
  DatePicker,
  Empty,
  Select,
  Table,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Hash,
  Trophy,
  TrendingDown,
  TrendingUp,
  UserRound,
  UsersRound,
  Wallet,
} from "lucide-react";
import { useGetCasinoBetByMarketQuery } from "../../../../store/service/CasinoServices";
import dayjs from "dayjs";
import { useLazyFilterbyClientQuery } from "../../../../store/service/supermasteAccountStatementServices";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";

const { RangePicker } = DatePicker;

const getAmountTone = (value) => {
  const amount = Number(value || 0);

  if (amount > 0) return "positive";
  if (amount < 0) return "negative";
  return "neutral";
};

const formatAmount = (value) => Number(value || 0).toFixed(2);

const formatDateParts = (value) => {
  if (!value) return { date: "-", time: "" };

  const parsed = dayjs(value);

  if (!parsed.isValid()) return { date: value, time: "" };

  return {
    date: parsed.format("YYYY-MM-DD"),
    time: parsed.format("HH:mm:ss"),
  };
};

const CasinoProfitAndLossDetails = () => {
  const [clientId, setClientId] = useState("");
  const nav = useNavigate();
  const today = dayjs().format("YYYY-MM-DD");
  const { id } = useParams();

  const userTyep = localStorage.getItem("userType");

  const [getClient, result] = useLazyFilterbyClientQuery();

  const {
    data: casinoData,
    isLoading,
    isFetching,
  } = useGetCasinoBetByMarketQuery({
    marketId: id,
  });

  const [dates, setDates] = useState({
    fromDate: today,
    toDate: today,
  });

  const handleBackClick = () => {
    nav(-1);
  };

  const handleRangeChange = (value) => {
    if (value) {
      setDates({
        fromDate: value[0].format("YYYY-MM-DD"),
        toDate: value[1].format("YYYY-MM-DD"),
      });
    }
  };

  const handleTodayClick = () => {
    setDates({
      fromDate: today,
      toDate: today,
    });
  };

  const tableRows = casinoData?.data || [];
  const selectedDateRange = [dayjs(dates.fromDate), dayjs(dates.toDate)];
  const totalProfit = tableRows.reduce(
    (acc, item) => acc + Number(item?.profit || 0),
    0
  );
  const totalLoss = tableRows.reduce(
    (acc, item) => acc + Number(item?.loss || 0),
    0
  );
  const netPnl = tableRows.reduce(
    (acc, item) => acc + Number(item?.pnl || 0),
    0
  );
  const totalPlayers = new Set(
    tableRows.map((item) => item?.selectionName).filter(Boolean)
  ).size;
  const totalRounds = new Set(
    tableRows.map((item) => item?.marketId).filter(Boolean)
  ).size;

  const columns = [
    {
      title: (
        <span>
          <CalendarDays size={14} strokeWidth={1.8} />
          Date
        </span>
      ),
      dataIndex: "date",
      key: "date",
      width: "13%",
      onCell: () => ({ "data-label": "Date" }),
      render: (value) => {
        const parts = formatDateParts(value);

        return (
          <span className="cpnld-date-cell">
            <Clock3 size={14} strokeWidth={1.8} />
            <span>
              <strong>{parts.date}</strong>
              {parts.time && <small>{parts.time}</small>}
            </span>
          </span>
        );
      },
    },
    {
      title: (
        <span>
          <UserRound size={14} strokeWidth={1.8} />
          Client
        </span>
      ),
      dataIndex: "userId",
      key: "userId",
      width: "9%",
      onCell: () => ({ "data-label": "Client" }),
      render: (value) => <span className="cpnld-client-badge">{value}</span>,
    },
    {
      title: (
        <span>
          <Hash size={14} strokeWidth={1.8} />
          RoundId
        </span>
      ),
      dataIndex: "marketId",
      key: "marketId",
      width: "16%",
      onCell: () => ({ "data-label": "RoundId" }),
      render: (value) => <span className="cpnld-round-id">{value}</span>,
    },
    {
      title: (
        <span>
          <UserRound size={14} strokeWidth={1.8} />
          Player
        </span>
      ),
      dataIndex: "selectionName",
      key: "selectionName",
      width: "11%",
      onCell: () => ({ "data-label": "Player" }),
      render: (value) => (
        <span className="cpnld-player">
          <span>
            <UserRound size={13} strokeWidth={1.8} />
          </span>
          {value}
        </span>
      ),
    },
    {
      title: (
        <span>
          <Trophy size={14} strokeWidth={1.8} />
          Winner
        </span>
      ),
      dataIndex: "winner",
      key: "winner",
      width: "11%",
      onCell: () => ({ "data-label": "Winner" }),
      render: (value) => (
        <span className="cpnld-winner">
          <Trophy size={13} strokeWidth={1.9} />
          {value}
        </span>
      ),
    },
    {
      title: (
        <span>
          <CircleDollarSign size={14} strokeWidth={1.8} />
          Stake
        </span>
      ),
      dataIndex: "stake",
      key: "stake",
      width: "8%",
      onCell: () => ({ "data-label": "Stake" }),
      render: (value) => <span className="cpnld-number">{value}</span>,
    },
    {
      title: (
        <span>
          <TrendingUp size={14} strokeWidth={1.8} />
          Profit
        </span>
      ),
      dataIndex: "profit",
      key: "profit",
      width: "8%",
      onCell: () => ({ "data-label": "Profit" }),
      render: (value) => (
        <span className="cpnld-number cpnld-positive">{value}</span>
      ),
    },
    {
      title: (
        <span>
          <TrendingDown size={14} strokeWidth={1.8} />
          Loss
        </span>
      ),
      dataIndex: "loss",
      key: "loss",
      width: "8%",
      onCell: () => ({ "data-label": "Loss" }),
      render: (value) => (
        <span className="cpnld-number cpnld-negative">{value}</span>
      ),
    },
    {
      title: (
        <span>
          <Wallet size={14} strokeWidth={1.8} />
          PNL
        </span>
      ),
      dataIndex: "pnl",
      key: "pnl",
      width: "7%",
      onCell: () => ({ "data-label": "PNL" }),
      render: (value) => (
        <span className={`cpnld-number cpnld-${getAmountTone(value)}`}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="match_slip casino_diamond_details main_live_section list_supers admin-details-panel casino-pnl-details-panel">
      <AppPageHeader
        icon={<BarChart3 size={20} strokeWidth={1.8} />}
        title="Diamond Casino Details"
        subtitle="Review bet-level profit and loss for this casino round"
        onBack={handleBackClick}
      />

      <div className="cpnld-content">
        <section className="cpnld-command-bar">
          <div className="cpnld-command-main">
            <label>Date Range</label>
            <div className="cpnld-filter-grid">
              <RangePicker
                className="cpnld-range-picker"
                value={selectedDateRange}
                onChange={handleRangeChange}
              />
            <Select
                className="cpnld-client-select"
              placeholder="Select Client"
              onSearch={(value) => {
                if (value) getClient({ userType: Number(userTyep) - 1 });
              }}
              showSearch
              value={clientId}
              allowClear
              onSelect={(value) => {
                setClientId(value);
                // trigger({
                //   userId: value,
                // });
              }}
              options={
                result?.data?.data?.map((user) => ({
                  label: `${user.userName} (${user.userId})`,
                  value: user.userId,
                })) || []
              }
            />
            </div>
          </div>
          <div className="cpnld-command-actions">
            <button className="cpnld-primary-btn" type="button">
              Apply
            </button>
            <button
              className="cpnld-secondary-btn"
              onClick={handleTodayClick}
              type="button">
              Today P/L
            </button>
          </div>
        </section>

        <section className="cpnld-summary-strip">
          <div className="cpnld-summary-item">
            <span className="cpnld-summary-icon cpnld-purple">
              <CalendarDays size={17} strokeWidth={1.8} />
            </span>
            <span>
              <small>Total Rounds</small>
              <strong>{totalRounds}</strong>
            </span>
          </div>
          <div className="cpnld-summary-item">
            <span className="cpnld-summary-icon cpnld-violet">
              <UsersRound size={17} strokeWidth={1.8} />
            </span>
            <span>
              <small>Total Players</small>
              <strong>{totalPlayers}</strong>
            </span>
          </div>
          <div className="cpnld-summary-item">
            <span className="cpnld-summary-icon cpnld-green">
              <TrendingUp size={17} strokeWidth={1.8} />
            </span>
            <span>
              <small>Total Profit</small>
              <strong className="cpnld-positive">
                {formatAmount(totalProfit)}
              </strong>
            </span>
          </div>
          <div className="cpnld-summary-item">
            <span className="cpnld-summary-icon cpnld-red">
              <TrendingDown size={17} strokeWidth={1.8} />
            </span>
            <span>
              <small>Total Loss</small>
              <strong className="cpnld-negative">{formatAmount(totalLoss)}</strong>
            </span>
          </div>
          <div className="cpnld-summary-item">
            <span className="cpnld-summary-icon cpnld-purple">
              <Wallet size={17} strokeWidth={1.8} />
            </span>
            <span>
              <small>Net PNL</small>
              <strong className={`cpnld-${getAmountTone(netPnl)}`}>
                {formatAmount(netPnl)}
              </strong>
            </span>
          </div>
        </section>

        <section className="cpnld-table-card">
          <Table
            className="cpnld-table"
            rowClassName={(record) =>
              record?.pnl < 0 ? "cpnld-row-negative" : "cpnld-row-positive"
            }
            columns={columns}
            loading={{
              spinning: isLoading || isFetching,
              indicator: <CustomLoading />,
            }}
            dataSource={tableRows}
            pagination={false}
            locale={{ emptyText: null }}
            scroll={{ x: 1120 }}
          />
          {tableRows.length === 0 && !(isLoading || isFetching) && (
            <Empty
              className="cpnld-empty"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No bet details found"
            />
          )}
          <div className="cpnld-table-footer">
            <span>
              Showing {tableRows.length ? 1 : 0} to {tableRows.length} of{" "}
              {tableRows.length} entries
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CasinoProfitAndLossDetails;
