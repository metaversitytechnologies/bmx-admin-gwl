import { Card, Empty, Spin } from "antd";
import { useActiveMatchQuery } from "../../../store/service/ActiveMatcheService";
import "./ActiveMatch.scss";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ArrowLeft, ArrowRightIcon, PlayCircle, Trophy } from "lucide-react";

const ActiveMatch = () => {
  const nav = useNavigate();

  const handleDetails = (id) => {
    nav(`/Events/${id}/4/live-report`);
  };

  const { data, isLoading, isFetching } = useActiveMatchQuery(4, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div
      className="active_slip login_report modern-active-match"
      style={{ marginBottom: "12px" }}>
      <Card
        style={{
          margin: "0px",
          width: "100%",
        }}
        className="sport_detail active_match_name"
        title={
          <span className="active-match-heading">
            <Trophy size={20} strokeWidth={1.8} />
            Active Matches
          </span>
        }>
        {isLoading || isFetching ? (
          <Spin className="loading_active" tip="Loading..." size="large">
            <div className="content" />
          </Spin>
        ) : (
          <div className="table_section statement_tabs_data active_match_table">
            <table className="">
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Open Date</th>

                <th>Inplay</th>
                <th>Details</th>
              </tr>
              {data?.data?.map((res, id) => {
                return (
                  <tr key={id} style={{ cursor: "pointer" }}>
                    <td>{id + 1}</td>
                    <td>{res?.matchName}</td>
                    <td>
                      {moment(res?.openDate).format("DD-MM-YYYY  HH:mm:ss")}
                    </td>
                    {/* <td>??</td> */}
                    <td>
                      {res?.inPlay ? (
                        <button className="match-status live">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="12" cy="12" r="2" />
                            <path d="M16.24 7.76a6 6 0 0 1 0 8.48" />
                            <path d="M7.76 16.24a6 6 0 0 1 0-8.48" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                            <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
                          </svg>{" "}
                          Live Now
                        </button>
                      ) : (
                        <button className="match-status upcoming">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 2" />
                          </svg>{" "}
                          Upcoming
                        </button>
                      )}
                    </td>
                    <td>
                      <p
                        className="active-match-details"
                        onClick={() => handleDetails(res?.matchId)}>
                        Details
                        <ArrowRightIcon size={16} strokeWidth={1.8} />
                      </p>
                    </td>
                  </tr>
                );
              })}
            </table>
            {data?.data?.length == 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              ""
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ActiveMatch;
