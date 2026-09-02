import { Button, Empty, Input, Pagination, Select, Spin } from "antd";
import { ChevronDown, ChevronRight, ChevronUp, RefreshCw, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCompletedFancyMutation } from "../../../store/service/SportDetailServices";

const formatAmount = (value) => Number(value || 0).toFixed(2);

const getAmountTone = (value) => {
  const amount = Number(value || 0);
  if (amount > 0) return "is-positive";
  if (amount < 0) return "is-negative";
  return "is-neutral";
};

const CompletedFancy = () => {
  const [showComp, setShowComp] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedFancyId, setSelectedFancyId] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { id } = useParams();
  const nav = useNavigate();
  const [trigger, { data: fancyData, isLoading }] = useGetCompletedFancyMutation();

  const fetchCompletedFancy = useCallback(() => {
    trigger({
      matchId: id,
    });
  }, [id, trigger]);

  useEffect(() => {
    fetchCompletedFancy();
  }, [fetchCompletedFancy]);

  const rows = useMemo(() => fancyData?.data || [], [fancyData?.data]);

  const fancyOptions = useMemo(() => {
    const unique = new Map();
    rows.forEach((item) => {
      if (item?.fancyId && !unique.has(item.fancyId)) {
        unique.set(item.fancyId, item?.fancyName || item.fancyId);
      }
    });
    return [
      { value: "", label: "All Fancies" },
      ...Array.from(unique, ([value, label]) => ({ value, label })),
    ];
  }, [rows]);

  const filteredRows = useMemo(() => {
    const query = searchTitle.trim().toLowerCase();
    return rows.filter((item) => {
      const matchesTitle = query
        ? item?.fancyName?.toLowerCase().includes(query)
        : true;
      const matchesFancy = selectedFancyId
        ? item?.fancyId === selectedFancyId
        : true;
      return matchesTitle && matchesFancy;
    });
  }, [rows, searchTitle, selectedFancyId]);

  const totalNetPnl =
    filteredRows.reduce((acc, item) => acc + Number(item?.netPnl || 0), 0) || 0;

  const pageStart = filteredRows.length ? (page - 1) * pageSize + 1 : 0;
  const pageEnd = Math.min(page * pageSize, filteredRows.length);
  const pagedRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

  const handleFilterChange = (callback) => (value) => {
    callback(value);
    setPage(1);
  };

  return (
    <section className="completed-fancy-modern">
      <div className="cfm-header">
        <div className="cfm-title-wrap">
          <h2>Completed Fancy</h2>
          <span>{rows.length || 0}</span>
        </div>

        <div className="cfm-actions">
          <Button
            className="cfm-icon-btn"
            aria-label={showComp ? "Collapse completed fancy" : "Expand completed fancy"}
            icon={
              showComp ? (
                <ChevronUp size={18} strokeWidth={2.1} />
              ) : (
                <ChevronDown size={18} strokeWidth={2.1} />
              )
            }
            onClick={() => setShowComp(!showComp)}
          />
          <Button
            className={`cfm-icon-btn cfm-refresh${isLoading ? " is-loading" : ""}`}
            aria-label="Refresh completed fancy"
            icon={<RefreshCw size={17} strokeWidth={2.1} />}
            onClick={fetchCompletedFancy}
          />
        </div>
      </div>

      {showComp && (
        <div className="cfm-content">
          <div className="cfm-toolbar">
            <div className="cfm-filters">
              <Input
                className="cfm-search"
                prefix={<Search size={18} strokeWidth={1.9} />}
                placeholder="Search Title..."
                value={searchTitle}
                onChange={(event) =>
                  handleFilterChange(setSearchTitle)(event.target.value)
                }
              />
              <Select
                className="cfm-select"
                value={selectedFancyId}
                suffixIcon={<ChevronDown size={16} strokeWidth={2} />}
                options={fancyOptions}
                onChange={handleFilterChange(setSelectedFancyId)}
              />
            </div>

            <div
              className={`cfm-total-card ${getAmountTone(totalNetPnl)}`}
              aria-label="Total profit loss">
              <span>Total P/L</span>
              <strong>{formatAmount(totalNetPnl)}</strong>
            </div>
          </div>

          <div className="cfm-table-card">
            <div className="cfm-table-scroll">
              <Spin spinning={isLoading}>
                <table className="cfm-table">
                  <colgroup>
                    <col className="cfm-col-title" />
                    <col className="cfm-col-pnl" />
                    <col className="cfm-col-won" />
                    <col className="cfm-col-net" />
                    <col className="cfm-col-action" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th className="cfm-num">P&amp;L</th>
                      <th className="cfm-center">Won By</th>
                      <th className="cfm-num">Net P&amp;L</th>
                      <th className="cfm-action-col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedRows.length > 0 ? (
                      pagedRows.map((item, index) => (
                        <tr
                          key={`${item?.fancyId}-${index}`}
                          className={`${item?.isBack ? "back" : "lay"} ${
                            item?.isBack ? "cfm-row-back" : "cfm-row-lay"
                          }`}>
                          <td className="cfm-title-cell">{item?.fancyName}</td>
                          <td className={`cfm-num cfm-amount ${getAmountTone(item?.pnl)}`}>
                            {formatAmount(item?.pnl)}
                          </td>
                          <td className="cfm-center cfm-won">{item?.result}</td>
                          <td
                            className={`cfm-num cfm-amount ${getAmountTone(
                              item?.netPnl,
                            )}`}>
                            {formatAmount(item?.netPnl)}
                          </td>
                          <td className="cfm-action-col">
                            <button
                              className="cfm-show-bets"
                              type="button"
                              onClick={() =>
                                nav(`/event-profit-loss/${id}/${item?.fancyId}`)
                              }>
                              <span>Show Bets</span>
                              <ChevronRight size={15} strokeWidth={2.2} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="cfm-empty-cell">
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                              <span>
                                <strong>No completed fancy records found</strong>
                                <small>Try changing your search or filter.</small>
                              </span>
                            }
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </Spin>
            </div>

            <div className="cfm-pagination">
              <p>
                Showing <b>{pageStart}</b> to <b>{pageEnd}</b> of{" "}
                <b>{filteredRows.length}</b> entries
              </p>
              <div className="cfm-pagination-controls">
                <Select
                  className="cfm-page-size"
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
                  total={filteredRows.length}
                  showSizeChanger={false}
                  onChange={setPage}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CompletedFancy;
