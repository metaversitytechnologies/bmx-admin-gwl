import { Button, Card, Empty, Pagination } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dice5 } from "lucide-react";
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
        className="sport_detail team_name">
        <div className="table_section statement_tabs_data" style={{ padding: "20px" }}>
          {errorMessage && (
            <div
              style={{
                marginBottom: "12px",
                padding: "10px 12px",
                background: "#fff1f0",
                color: "#cf1322",
                border: "1px solid #ffa39e",
                borderRadius: "6px",
              }}>
              {errorMessage}
            </div>
          )}

          {isBusy ? (
            <div style={{ padding: "30px 0", position: "relative" }}>
              <CustomLoading />
            </div>
          ) : (
            <>

            <table className="live_table login_data_table">
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>NAME</th>
                    <th style={{ width: "60%" }}>DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => {
                    const matchId = getMatchId(item, index);
                    const matchName = getMatchName(item);
                    return (
                      <tr key={matchId}>
                        <td>{matchName || "Match"}</td>
                        <td>
                          <div
                            className="gx-justify-content-start"
                            style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Link
                              to={`/matka/inplay/${matchId}/${String(
                                matchName
                              ).toLowerCase()}`}
                            >
                              <Button size="small" icon={<EyeOutlined />}>
                                View
                              </Button>
                            </Link>
                            <Link
                              to={`/matka/all-bets/${matchId}`}
                            >
                              <Button
                                size="small"
                                icon={<EyeOutlined />}
                                className="Display_Games">
                                All Bets
                              </Button>
                            </Link>
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
            </>
          )}
        </div>
        <Pagination
          style={{ marginBottom: "12px" }}
          className="pagination_main ledger_pagination"
          total={matkaMatches.length}
          pageSize={pageSize}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </Card>
    </div>
  );
};

export default InplayMatka;
