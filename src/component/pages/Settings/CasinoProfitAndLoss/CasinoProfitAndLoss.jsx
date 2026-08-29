import { useState } from "react";
import { DatePicker, Empty, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  CalendarDays,
  Eye,
  Gamepad2,
  Layers3,
  TrendingUp,
  UserRound,
  Wallet,
} from "lucide-react";
import { useGetCasinoPnlByDateQuery } from "../../../../store/service/CasinoServices";
import dayjs from "dayjs";
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

const CasinoProfitAndLoss = () => {
  const nav = useNavigate();
  const today = dayjs().format("YYYY-MM-DD");

  const [dates, setDates] = useState({
    fromDate: today,
    toDate: today,
  });

  const { data, refetch, isLoading, isFetching } =
    useGetCasinoPnlByDateQuery(dates);

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
    refetch();
  };

  const tableRows = data?.data?.[0]?.dataList ?? [];

  return (
    <div className="match_slip casino_diamond main_live_section list_supers admin-details-panel casino-pnl-panel">
      <AppPageHeader
        icon={<BarChart3 size={20} strokeWidth={1.8} />}
        title="Diamond Casino Details"
        subtitle="Review casino profit and loss by date range"
        onBack={handleBackClick}
      />

      <div className="cpnl-content">
        <section className="cpnl-command-toolbar">
          <div className="cpnl-command-copy">
            <span className="cpnl-kicker">Reporting Period</span>
            <div className="cpnl-filter-row">
              <RangePicker
                className="cpnl-range-picker"
                onChange={handleRangeChange}
              />
              <div className="cpnl-command-actions">
                <button
                  className="admin-details-primary-action cpnl-apply-btn"
                  onClick={() => refetch()}
                  type="button">
                  Apply
                </button>
                <button
                  className="admin-details-secondary-action cpnl-today-btn"
                  onClick={handleTodayClick}
                  type="button">
                  Today P/L
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="cpnl-table-card">
          <div className="cpnl-table-header">
            <div>
              <h2>Casino Financial Ledger</h2>
              <p>Compact profit and loss view by casino game</p>
            </div>
            <span className="cpnl-record-pill">
              {tableRows.length} entries
            </span>
          </div>

          <div className="table_section statement_tabs_data cpnl-table-section">
            {(isLoading || isFetching) && (
              <div className="cpnl-loading">
                <CustomLoading />
              </div>
            )}
            <div className="cpnl-table-scroll">
              <table className="cpnl-table">
                {/* <colgroup>
                  <col className="cpnl-col-game" />
                  <col className="cpnl-col-type" />
                  <col className="cpnl-col-exposure" />
                  <col className="cpnl-col-pl" />
                  <col className="cpnl-col-client" />
                  <col className="cpnl-col-action" />
                </colgroup> */}
                <thead>
                  <tr>
                    <th>
                      <span>
                        <Gamepad2 size={13} strokeWidth={1.8} />
                        Game Id
                      </span>
                    </th>
                    <th>
                      <span>
                        <Layers3 size={13} strokeWidth={1.8} />
                        Type
                      </span>
                    </th>
                    <th>
                      <span>
                        <Wallet size={13} strokeWidth={1.8} />
                        Exposer
                      </span>
                    </th>
                    <th>
                      <span>
                        <TrendingUp size={13} strokeWidth={1.8} />
                        P/L
                      </span>
                    </th>
                    <th>
                      <span>
                        <UserRound size={13} strokeWidth={1.8} />
                        Client P/L
                      </span>
                    </th>
                    <th>
                      <span>
                        <Eye size={13} strokeWidth={1.8} />
                        Action
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((res) => (
                    <tr key={res?.key}>
                      <td data-label="Game Id">
                        <span className="cpnl-game-badge">{res?.tableId}</span>
                      </td>
                      <td data-label="Type">
                        <span className="cpnl-game-type">
                          <CalendarDays size={14} strokeWidth={1.8} />
                          {res?.eventName}
                        </span>
                      </td>
                      <td data-label="Exposer" className="cpnl-number-cell">
                        {formatAmount(res?.exposure)}
                      </td>
                      <td data-label="P/L" className="cpnl-number-cell">
                        <span
                          className={`cpnl-amount cpnl-amount-${getAmountTone(
                            res?.clientpnl
                          )}`}>
                          {formatAmount(res?.clientpnl)}
                        </span>
                      </td>
                      <td data-label="Client P/L" className="cpnl-number-cell">
                        <span
                          className={`cpnl-amount cpnl-amount-${getAmountTone(
                            res?.pnl
                          )}`}>
                          {formatAmount(res?.pnl)}
                        </span>
                      </td>
                      <td data-label="Action">
                        <button
                          className="admin-details-primary-action cpnl-view-btn"
                          onClick={() =>
                            nav(`/casinoprofitandloss/${res?.marketId}`)
                          }
                          type="button">
                          <Eye size={13} strokeWidth={1.9} />
                          Show View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data?.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <div className="cpnl-table-footer">
                <span className="cpnl-showing-text">
                  Showing {tableRows.length ? 1 : 0} to {tableRows.length} of{" "}
                  {tableRows.length} entries
                </span>
                <Pagination
                  className="pagination_main ledger_pagination cpnl-pagination"
                  defaultCurrent={1}
                  total={5}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CasinoProfitAndLoss;
