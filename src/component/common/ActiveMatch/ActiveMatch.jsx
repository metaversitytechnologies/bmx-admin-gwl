import { Card, Empty, Pagination, Spin, Tabs } from "antd";
import React, { useState } from "react";
import { useActiveMatchQuery } from "../../../store/service/ActiveMatcheService";
import "./ActiveMatch.scss";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSportListbyIDQuery } from "../../../store/service/supermasteAccountStatementServices";

const ActiveMatch = () => {
  const [activeTabData, setActtiveTabData] = useState(4);

  const { data: activeSportList } = useSportListbyIDQuery();

  const nav = useNavigate();

  const handleDetails = (id) => {
    nav(`/Events/${id}/${activeTabData}/live-report`);
  };

  const handleSportId = (id) => {
    setActtiveTabData(id);
  };
  
  const { data, isLoading, isFetching } = useActiveMatchQuery(activeTabData, {
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
        <div className="active_sport_list">
          <div className="sub_list_sport_list">
            {activeSportList?.data?.map((item, id) => {
              return (
                <div
                  key={id}
                  onClick={() => handleSportId(item?.sportId)}
                  className={`tab_section_active_sport ${
                    activeTabData == item?.sportId ? "activeList" : ""
                  }`}>
                  <p>{item?.sportName}</p>
                </div>
              );
            })}
          </div>
        </div>

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
                {/* <th>Competition</th> */}
                <th>Inplay</th>
                <th>Details</th>
              </tr>
              {data?.data?.map((res, id) => {
                return (
                  <tr
                    key={id}
                    onClick={() => handleDetails(res?.matchId)}
                    style={{ cursor: "pointer" }}>
                    <td>{id + 1}</td>
                    <td>{res?.matchName}</td>
                    <td>
                      {moment(res?.openDate).format("YYYY-MM-DD, h:mm A")}
                    </td>
                    {/* <td>??</td> */}
                    <td>
                      {res?.inPlay && (
                        <button className="inplay">INPLAY</button>
                      )}
                    </td>
                    <td>
                      <p style={{ cursor: "pointer" }}>Details</p>
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
