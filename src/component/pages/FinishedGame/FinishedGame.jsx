import {
  Card,
  Col,
  DatePicker,
  Divider,
  Empty,
  Pagination,
  Row,
  Select,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import { useGetCompletedSportQuery } from "../../../store/service/SportDetailServices";

const { RangePicker } = DatePicker;

const FinishedGame = () => {
  const timeBefore = moment().subtract(14, "days").format("YYYY-MM-DD");
  const time = moment().format("YYYY-MM-DD");
  const [dateData, setDateData] = useState([timeBefore, time]);
  const [matchId, setMatchId] = useState(0);
  const [InPlay, setInPlay] = useState();
  const [paginationTotal, setPaginationTotal] = useState(50);
  const [indexData, setIndexData] = useState(0);
  const [dataNameee, setDataNameee] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState([]);
  const [layoutOpen, setLayoutOpen] = useState(false);
  const [statusStr, setStatusStr] = useState("");
  const [activeTabData, setActtiveTabData] = useState(4);

  const nav = useNavigate();

  const { data } = useGetCompletedSportQuery({
    index: indexData,
    noOfRecords: 100,
  });

  const getMatchId = (matchId, inPlay, sportName, statusStraVal) => {
    console.log(matchId, "matchIdmatchIdmatchId");
    setMatchId(matchId);
    setDataNameee(sportName);
    setInPlay(inPlay);
    setStatusStr(statusStraVal);
  };

  const handlePlusMinus = (matchId) => {
    setDropdownStates(false);
    nav(`/plus-minus-report/${matchId}/0`, { state: { dataNameee } });
  };

  const items = [
    {
      label: (
        <p className="title_section" onClick={() => handlePlusMinus(matchId)}>
          Match and Session Plus Minus
        </p>
      ),
      key: "1",
    },
    {
      label: (
        <p
          className="title_section"
          // onClick={() => nav("/matchplusminus/1212")}
          onClick={() => nav(`/matchplusminus/${matchId}/${dataNameee}`)}>
          Match and Session Plus Minus 2
        </p>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/match-slips/${matchId}/0`}>
          Display Match Bets
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/fancy-slips/${matchId}/0`}>
          Display Session Bets
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/matchsessionbet/${matchId}/0`}>
          Match And Session Bet
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/completed-fancy-slips/${matchId}`}>
          Completed Fancies
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/agent-list/${matchId}`}>
          Agent Plus Minus
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link
          onClick={() => setDropdownStates(false)}
          className="title_section"
          to={`/rejectedBetsByEvent/${matchId}`}>
          Rejected Bet
        </Link>
      ),
      key: "5",
    },
  ];

  const handleBackbtn = () => {
    nav(-1);
  };

  const onChange = (data, dateString) => {
    setDateData(dateString);
  };

  const sportData = [
    { sportId: 4, sportName: "Cricket" },
    { sportId: 1, sportName: "Football" },
    { sportId: 2, sportName: "Tennis" },
  ];

  const sportDetail = {
    data: {
      totalPages: 1,
      data: [
        {
          key: 1,
          eventId: 101,
          eventName: "India vs Australia",
          statusStr: "In Play",
          eventDate: moment().subtract(1, "days").toISOString(),
          isLedgerCreated: true,
          winner: "India",
          plusMinus: 1200,
          upLineAmount: -300,
          inPlay: true,
        },
        {
          key: 2,
          eventId: 102,
          eventName: "England vs Pakistan",
          statusStr: "Completed",
          eventDate: moment().subtract(3, "days").toISOString(),
          isLedgerCreated: true,
          winner: "England",
          plusMinus: -500,
          upLineAmount: 100,
          inPlay: false,
        },
      ],
    },
  };

  useEffect(() => {
    const initialStates = new Array(sportDetail?.data?.data?.length).fill(
      false
    );
    setDropdownStates(initialStates);
  }, [activeTabData]);

  const handleScroll = () => {
    const updatedDropdownStates = dropdownStates.map(() => false);
    setDropdownStates(updatedDropdownStates);
    setIsDropdownOpen(false);
    setLayoutOpen(false);
  };

  const toggleDropdown = (index) => {
    setLayoutOpen(false);
    const updatedDropdownStates = [...dropdownStates];
    updatedDropdownStates[index] = !updatedDropdownStates[index];
    setDropdownStates(updatedDropdownStates);
  };

  const myElementRef = useRef(null);

  useEffect(() => {
    const element = myElementRef.current;
    if (!isDropdownOpen) {
      window.addEventListener("scroll", handleScroll);
      element?.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      element?.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen]);

  const handleSportId = (id) => {
    setActtiveTabData(id);
  };

  return (
    <>
      <Card
        className="sport_detail finished_game"
        title="Completed Games Detail"
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <Row
          className="date_picker"
          align="middle"
          justify="start"
          style={{ padding: "6px 10px 0px" }}>
          <Col xl={6} lg={6} md={12} xs={12} className="datepicker_sport">
            <RangePicker
              style={{ marginBottom: "10px" }}
              defaultValue={[dayjs(timeBefore), dayjs(time)]}
              onChange={onChange}
              bordered={false}
            />
          </Col>
          <Col xl={6} lg={6} md={12} xs={12}>
            <Select
              placeholder="Select Game Type"
              options={[]}
              showSearch
              allowClear
            />
          </Col>
        </Row>
        <div ref={myElementRef} className="table_section">
          <table className="ant-spin-nested-loading">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Time</th>
                <th>Declared Date</th>
                <th>Competition</th>
                <th>Won By</th>
                <th>P/L</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.completedMatchList.map((res, id) => (
                <tr key={res.key}>
                  <td style={{ cursor: "pointer", width: "3%" }}>
                    <Dropdown
                      className="table_dropdown sport_droupdown"
                      open={dropdownStates[id]}
                      onOpenChange={() => toggleDropdown(id)}
                      menu={{
                        items,
                        className: "sport_list",
                      }}
                      trigger={["click", "contextMenu"]}>
                      <p
                        onClick={(e) => {
                          e.preventDefault();
                          getMatchId(
                            res.matchId,
                            false,
                            res.eventName,
                            res.statusStr
                          );
                        }}>
                        <Space>
                          <CaretDownOutlined />
                        </Space>
                      </p>
                    </Dropdown>
                  </td>
                  <td>{res.eventName}</td>
                  <td>{moment(res.createdOn).format("YYYY-MM-DD, h:mm A")}</td>
                  <td>{moment(res.createdOn).format("YYYY-MM-DD, h:mm A")}</td>
                  <td>T20</td>

                  <td>{res?.winner}</td>
                  <td style={{ color: res?.pnl > 0 ? "green" : "red" }}>
                    {res?.pnl}
                  </td>
                </tr>
              ))}
              {sportDetail.data.data.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Divider />
        <Pagination
          style={{ marginBottom: "12px" }}
          className="pagination_main ledger_pagination pagination_main"
          onShowSizeChange={(c, s) => setPaginationTotal(s)}
          total={data?.data.totalPages * paginationTotal}
          defaultPageSize={50}
          pageSizeOptions={[50, 100, 150, 200, 250]}
          onChange={(e) => setIndexData(e - 1)}
        />
      </Card>
    </>
  );
};

export default FinishedGame;
