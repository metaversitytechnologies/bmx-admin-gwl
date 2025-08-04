import "./SportsDetails.scss";
import { Button, Card, Col, DatePicker, Empty, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import { useActiveMatchQuery } from "../../../store/service/ActiveMatcheService";

const { RangePicker } = DatePicker;

const SportsDetails = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [dataNameee, setDataNameee] = useState("");
  const [dropdownStates, setDropdownStates] = useState([]);
  const [activeTabData, setActtiveTabData] = useState(4);

  const nav = useNavigate();

  const { data: sportDetail } = useActiveMatchQuery(activeTabData);

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
    <Card
      className="sport_detail"
      title="Sports Detail"
      extra={<button onClick={handleBackbtn}>Back</button>}>
      <Row className="date_picker" justify="center">
        <Col
          xl={6}
          lg={6}
          md={24}
          xs={24}
          className="datepicker_sport"
          style={{ padding: "6px 10px 0px" }}>
          <RangePicker
            style={{ marginBottom: "10px" }}
            defaultValue={[dayjs(timeBefore), dayjs(time)]}
            onChange={onChange}
            bordered={false}
          />
        </Col>
      </Row>

      <div className="table_section">
        <table className="ant-spin-nested-loading">
          <thead>
            <tr>
              <th></th>
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
                    <td style={{ cursor: "pointer", width: "3%" }}>
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
                                  to={`/agent-list/${res.matchId}`}>
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
                          onClick={(e) => {
                            e.preventDefault();
                            setDataNameee(res.matchName);
                          }}>
                          <Space>
                            <CaretDownOutlined />
                          </Space>
                        </p>
                      </Dropdown>
                    </td>
                    <td>{id + 1}</td>
                    <td>{res.matchName}</td>
                    <td>No Change</td>
                    <td>
                      {moment(res.eventDate).format("YYYY-MM-DD, h:mm A")}
                    </td>
                    <td>
                      <Button type="primary" className="in_play_btn">
                        Inplay
                      </Button>
                    </td>
                    <td>No</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default SportsDetails;
