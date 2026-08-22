import { Button, Col, DatePicker, Empty, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { ArrowLeft, ChevronDown, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import { useActiveMatchQuery } from "../../../store/service/ActiveMatcheService";
import CustomLoading from "../../common/CustomLoading/CustomLoading";

const { RangePicker } = DatePicker;

const SportsDetails = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [, setDateData] = useState([timeBefore, time]);
  const [dataNameee, setDataNameee] = useState("");
  const [dropdownStates, setDropdownStates] = useState([]);
  const [activeTabData] = useState(4);

  const nav = useNavigate();

  const {
    data: sportDetail,
    isLoading,
    isFetching,
  } = useActiveMatchQuery(activeTabData);

  const handlePlusMinus = (matchId) => {
    setDropdownStates(false);
    nav(`/plus-minus-report/${matchId}/1`, { state: { dataNameee } });
  };

  const handleBackbtn = () => {
    nav(-1);
  };

  const onChange = (_, dateString) => {
    setDateData(dateString);
  };

  useEffect(() => {
    const initialStates = new Array(sportDetail?.data?.length || 0).fill(false);
    setDropdownStates(initialStates);
  }, [sportDetail]);

  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...dropdownStates].map((_, i) =>
      i === index ? !dropdownStates[i] : false
    );
    setDropdownStates(updatedDropdownStates);
  };

  return (
    <div className="main_live_section list_supers admin-details-panel sports-details-panel">
      <div className="_match">
        <div className="sub_live_section live_report admin-details-header sports-details-header">
          <div className="admin-details-title-wrap sports-details-title-wrap">
            <span className="admin-details-icon sports-details-icon">
              <Trophy size={20} strokeWidth={1.8} />
            </span>
            <div>
              <div className="team_name admin-details-title sports-details-title">
                Sports Detail
              </div>
              <p className="admin-details-subtitle sports-details-subtitle">
                View and manage sports fixtures and their current settings
              </p>
            </div>
          </div>
          <div className="show_btn">
            <button onClick={handleBackbtn} className="admin-details-back sports-details-back">
              <ArrowLeft size={15} strokeWidth={1.8} />
              Back
            </button>
          </div>
        </div>
      </div>
      <div className="table_section sport_detail m-0 admin-details-table-shell sports-details-table-shell">
        <Row className="date_picker admin-details-toolbar sports-details-toolbar" justify="start">
          <Col
            xl={24}
            lg={24}
            md={24}
            xs={24}
            className="datepicker_sport sports-details-date-control">
            <RangePicker
              defaultValue={[dayjs(timeBefore), dayjs(time)]}
              onChange={onChange}
              bordered={false}
            />
          </Col>
        </Row>

        <div className="table_section admin-details-table-scroll sports-details-table-scroll">
          {(isFetching || isLoading) && <CustomLoading />}
          <table className="ant-spin-nested-loading admin-details-table sports-details-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Code</th>
                <th>Name</th>
                <th>Setting</th>
                <th>Time</th>
                <th>Status</th>
                <th>Declare</th>
              </tr>
            </thead>
            <tbody>
              {sportDetail?.data?.length > 0 ? (
                sportDetail.data.map((res, id) => {
                  return (
                    <tr key={res.key || id}>
                      <td data-label="Action">
                        <Dropdown
                          className="table_dropdown sport_droupdown"
                          open={dropdownStates[id]}
                          onOpenChange={() => toggleDropdown(id)}
                          menu={{
                            items: [
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    to={`/Events/${res.matchId}/4/live-report`}
                                    className="title_section">
                                    Match and Session Position
                                  </Link>
                                ),
                                key: "0",
                              },
                              {
                                label: (
                                  <p
                                    className="title_section"
                                    onClick={() => handlePlusMinus(res.matchId)}>
                                    Match and Session Plus Minus
                                  </p>
                                ),
                                key: "1",
                              },
                              {
                                label: (
                                  <p
                                    className="title_section"
                                    onClick={() =>
                                      nav(
                                        `/matchplusminus/${res?.matchId}/${res?.matchName}`
                                      )
                                    }>
                                    Match and Session Plus Minus 2
                                  </p>
                                ),
                                key: "2",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/match-slips/${res.matchId}/1`}>
                                    Display Match Bets
                                  </Link>
                                ),
                                key: "3",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/fancy-slips/${res.matchId}/1`}>
                                    Display Session Bets
                                  </Link>
                                ),
                                key: "4",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/matchsessionbet/${res.matchId}/1`}>
                                    Match And Session Bet
                                  </Link>
                                ),
                                key: "5",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/completed-fancy-slips/${res.matchId}`}>
                                    Completed Fancies
                                  </Link>
                                ),
                                key: "6",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/agent-list/${res.matchId}/${res.matchName}`}>
                                    Agent Plus Minus
                                  </Link>
                                ),
                                key: "7",
                              },
                              {
                                label: (
                                  <Link
                                    onClick={() => setDropdownStates(false)}
                                    className="title_section"
                                    to={`/rejectedBetsByEvent/${res.matchId}/${res?.matchName}`}>
                                    Rejected Bet
                                  </Link>
                                ),
                                key: "8",
                              },
                            ],
                            className: "sport_list",
                          }}
                          trigger={["click", "contextMenu"]}>
                          <p
                            className={`admin-details-row-menu sports-details-action-button ${
                              dropdownStates[id]
                                ? "admin-details-row-menu-open sports-details-action-button-open"
                                : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              setDataNameee(res.matchName);
                            }}>
                            <Space>
                              <ChevronDown size={14} strokeWidth={2} />
                            </Space>
                          </p>
                        </Dropdown>
                      </td>
                      <td data-label="Code" className="admin-details-code sports-details-code">
                        {id + 1}
                      </td>
                      <td data-label="Name" className="sports-details-name">
                        <Link
                          to={`/Events/${res.matchId}/4/live-report`}
                          style={{ color: "#038fde", cursor: "pointer" }}>
                          {res.matchName}
                        </Link>
                      </td>
                      <td data-label="Setting">No Change</td>
                      <td data-label="Time" className="admin-details-number sports-details-time">
                        {moment(res.openDate).format("DD-MM-YYYY HH:mm:ss")}
                      </td>
                      <td data-label="Status">
                        <Button type="primary" className="in_play_btn sports-details-status">
                          Inplay
                        </Button>
                      </td>
                      <td data-label="Declare">No</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SportsDetails;
