import { Button, Card, Empty, Pagination } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  CircleDot,
  Dice5,
  Eye,
  Layers3,
  ReceiptText,
} from "lucide-react";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import { useGetMatkaListQuery } from "../../../store/service/MatkaServices";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const InplayMatka = () => {
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isFetching, error } = useGetMatkaListQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const matkaMatches = Array.isArray(data?.data) ? data.data : [];
  const responseError = data?.status === false ? data?.message : null;
  const errorMessage = responseError || error?.data?.message;
  const isBusy = isLoading || isFetching;

  const paginatedData = matkaMatches.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getMatchId = (match, fallback) =>
    match?.eventId || match?.id || match?.matchId || match?.event_id || fallback;
  const getMatchName = (match) =>
    match?.name || match?.eventName || match?.title || "";
  const getMatchDate = (match, matchName) => {
    const rawDate =
      match?.date || match?.openDate || match?.eventDate || match?.createdAt;

    if (rawDate) {
      const parsed = new Date(rawDate);
      return Number.isNaN(parsed.getTime())
        ? String(rawDate)
        : parsed.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
    }

    const trailingDate = String(matchName || "").match(
      /(?:^|-)(\d{2})-(\d{2})-(\d{4})$/
    );

    if (!trailingDate) return "";

    const [, day, month, year] = trailingDate;
    const parsed = new Date(`${year}-${month}-${day}T00:00:00`);

    return Number.isNaN(parsed.getTime())
      ? ""
      : parsed.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };
  const startEntry = matkaMatches.length ? (currentPage - 1) * pageSize + 1 : 0;
  const endEntry = Math.min(currentPage * pageSize, matkaMatches.length);

  return (
    <div className="match_slip inplay_casino main_live_section list_supers admin-details-panel inplay-matka-panel">
      <AppPageHeader
        icon={<Dice5 size={20} strokeWidth={1.8} />}
        title="Matka Games"
        subtitle="View in-play Matka games and manage bets"
        onBack={() => nav(-1)}
      />
      <Card
        style={{ margin: 0, width: "100%" }}
        className="sport_detail team_name matka-games-content">
        <section className="matka-info-strip">
          <div className="matka-info-item">
            <span className="matka-info-icon matka-info-purple">
              <Layers3 size={17} strokeWidth={1.8} />
            </span>
            <span>
              <small>Total Games</small>
              <strong>{matkaMatches.length}</strong>
              <em>Active Matka Games</em>
            </span>
          </div>
          <div className="matka-info-item">
            <span className="matka-info-icon matka-info-violet">
              <CalendarDays size={17} strokeWidth={1.8} />
            </span>
            <span>
              <small>In-Play Games</small>
              <strong>{matkaMatches.length}</strong>
              <em>Running Now</em>
            </span>
          </div>
          <div className="matka-info-item">
            <span className="matka-info-icon matka-info-amber">
              <ReceiptText size={17} strokeWidth={1.8} />
            </span>
            <span>
              <small>Visible Rows</small>
              <strong>{paginatedData.length}</strong>
              <em>Current Page</em>
            </span>
          </div>
          <div className="matka-info-item">
            <span className="matka-info-icon matka-info-green">
              <CircleDot size={17} strokeWidth={1.8} />
            </span>
            <span>
              <small>Page Size</small>
              <strong>{pageSize}</strong>
              <em>Rows Per Page</em>
            </span>
          </div>
        </section>

        <div className="table_section statement_tabs_data matka-games-table-section">
          {errorMessage && (
            <div className="matka-error-message">
              {errorMessage}
            </div>
          )}

          {isBusy ? (
            <div className="matka-loading-state">
              <CustomLoading />
            </div>
          ) : (
            <>
              <div className="matka-games-table-scroll">
                <table className="live_table login_data_table matka-games-table">
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => {
                      const matchId = getMatchId(item, index);
                      const matchName = getMatchName(item);
                      const matchDate = getMatchDate(item, matchName);
                      const rowNumber = String(
                        (currentPage - 1) * pageSize + index + 1
                      ).padStart(2, "0");
                      return (
                        <tr key={matchId}>
                          <td data-label="Name">
                            <div className="matka-name-cell">
                              <span className="matka-row-index">
                                {rowNumber}
                              </span>
                              <span className="matka-name-stack">
                                <span className="matka-title-row">
                                  <strong>{matchName || "Match"}</strong>
                                  <em>In-Play</em>
                                </span>
                                {matchDate && (
                                  <small>
                                    <CalendarDays
                                      size={13}
                                      strokeWidth={1.8}
                                    />
                                    {matchDate}
                                  </small>
                                )}
                              </span>
                            </div>
                          </td>
                          <td data-label="Details">
                            <div className="matka-details-cell">
                              <div className="matka-action-group">
                                <Link
                                  to={`/matka/inplay/${matchId}/${String(
                                    matchName
                                  ).toLowerCase()}`}>
                                  <Button
                                    className="matka-view-btn"
                                    size="small"
                                    icon={<Eye size={15} strokeWidth={1.9} />}>
                                    View
                                  </Button>
                                </Link>
                                <Link to={`/matka/all-bets/${matchId}`}>
                                  <Button
                                    size="small"
                                    icon={
                                      <ReceiptText
                                        size={15}
                                        strokeWidth={1.9}
                                      />
                                    }
                                    className="Display_Games matka-all-bets-btn">
                                    All Bets
                                  </Button>
                                </Link>
                              </div>
                              <ChevronRight
                                className="matka-row-chevron"
                                size={18}
                                strokeWidth={1.9}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {paginatedData.length === 0 && (
                      <tr>
                        <td colSpan={2}>
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <div className="matka-table-footer">
          <span className="matka-showing-text">
            Showing {startEntry} to {endEntry} of {matkaMatches.length} entries
          </span>
          <Pagination
            className="pagination_main ledger_pagination matka-pagination"
            total={matkaMatches.length}
            pageSize={pageSize}
            current={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      </Card>
    </div>
  );
};

export default InplayMatka;
