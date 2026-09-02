import { Empty, Pagination, Select } from "antd";
import { ChevronDown, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSessionBetMutation } from "../../../store/service/SportDetailServices";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const getPnlTone = (value) => {
  const amount = Number(value || 0);
  if (amount > 0) return "is-profit";
  if (amount < 0) return "is-loss";
  return "is-neutral";
};

const EventProfitLossList = () => {
  const nav = useNavigate();
  const { id, fancyId } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [triggerSessionBets, { data: sessionData }] =
    useGetSessionBetMutation();

  useEffect(() => {
    if (fancyId) {
      triggerSessionBets({
        matchId: id,
        userId: "",
        marketId: fancyId,
        matchCompleted: true,
      });
    }
  }, [fancyId, id, triggerSessionBets]);

  const rows = useMemo(() => sessionData?.data || [], [sessionData?.data]);
  const pagedRows = useMemo(
    () => rows.slice((page - 1) * pageSize, page * pageSize),
    [rows, page, pageSize],
  );
  const pageStart = rows.length ? (page - 1) * pageSize + 1 : 0;
  const pageEnd = Math.min(page * pageSize, rows.length);

  return (
    <div className="main_live_section list_supers admin-details-panel game-event-profit-loss-panel">
      <AppPageHeader
        icon={<TrendingUp size={20} strokeWidth={1.8} />}
        title="Event Profit And Loss"
        subtitle="Review session bet profit and loss for this event"
        onBack={() => nav(-1)}
      />

      <section className="event-pl-card">
        
        <div className="event-pl-table-scroll">
          <table className="event-pl-table">
            <colgroup>
              <col className="event-pl-col-user" />
              <col className="event-pl-col-date" />
              <col className="event-pl-col-selection" />
              <col className="event-pl-col-result" />
              <col className="event-pl-col-mode" />
              <col className="event-pl-col-value" />
              <col className="event-pl-col-volume" />
              <col className="event-pl-col-stake" />
              <col className="event-pl-col-pnl" />
            </colgroup>
            <thead>
              <tr>
                <th>Username</th>
                <th>Date</th>
                <th>Selection</th>
                <th className="event-pl-center">Result</th>
                <th>Back/Lay</th>
                <th className="event-pl-num">Value</th>
                <th className="event-pl-num">Volume</th>
                <th className="event-pl-num">Stake</th>
                <th className="event-pl-num">PnL</th>
              </tr>
            </thead>
            <tbody>
              {pagedRows.length > 0 ? (
                pagedRows.map((res, index) => {
                  const tone = getPnlTone(res?.netPnl);
                  const isBack = String(res?.mode).toUpperCase() === "YES";

                  return (
                    <tr
                      key={`${res?.userId}-${res?.time}-${index}`}
                      className={`event-pl-row ${tone}`}>
                      <td className="event-pl-user">
                        {res?.username} ({res?.userId})
                      </td>
                      <td className="event-pl-date">{res?.time}</td>
                      <td className="event-pl-selection">{res?.selectionName}</td>
                      <td className="event-pl-center">{res?.declared}</td>
                      <td>
                        <span
                          className={`event-pl-mode ${
                            isBack ? "is-back" : "is-lay"
                          }`}>
                          {res?.mode}
                        </span>
                      </td>
                      <td className="event-pl-num">{res?.rate}</td>
                      <td className="event-pl-num">{res?.run}</td>
                      <td className="event-pl-num">{res?.amount}</td>
                      <td className={`event-pl-num event-pl-pnl ${tone}`}>
                        {res?.netPnl}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="event-pl-empty-cell">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <span>
                          <strong>No profit &amp; loss records found</strong>
                          <small>No betting activity is available for this event.</small>
                        </span>
                      }
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="event-pl-pagination">
          <p>
            Showing <b>{pageStart}</b> to <b>{pageEnd}</b> of <b>{rows.length}</b>{" "}
            entries
          </p>
          <div className="event-pl-pagination-controls">
            <Select
              className="event-pl-page-size"
              value={pageSize}
              suffixIcon={<ChevronDown size={15} strokeWidth={2} />}
              options={[10, 25, 50].map((value) => ({
                value,
                label: `${value} / page`,
              }))}
              onChange={(value) => {
                setPageSize(value);
                setPage(1);
              }}
            />
            <Pagination
              current={page}
              pageSize={pageSize}
              total={rows.length}
              showSizeChanger={false}
              onChange={setPage}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventProfitLossList;
