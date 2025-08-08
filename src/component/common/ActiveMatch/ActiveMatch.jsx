import { Card, Empty, Spin } from "antd";
import { useActiveMatchQuery } from "../../../store/service/ActiveMatcheService";
import "./ActiveMatch.scss";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ActiveMatch = () => {
  const nav = useNavigate();

  const handleDetails = (id) => {
    nav(`/Events/${id}/4/live-report`);
  };

  const { data, isLoading, isFetching } = useActiveMatchQuery(4, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="active_slip login_report" style={{ marginBottom: "12px" }}>
      <Card
        style={{
          margin: "0px",
          width: "100%",
        }}
        className="sport_detail active_match_name"
        title="Active Matches">
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
                      {res?.inPlay && (
                        <button className="inplay">INPLAY</button>
                      )}
                    </td>
                    <td>
                      <p
                        style={{
                          cursor: "pointer",
                          color: "#038fde",
                          fontWeight: 600,
                        }}
                        onClick={() => handleDetails(res?.matchId)}>
                        Details
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
