import { Col, Row } from "antd";
import "./Gamedetails.scss";
import FancyBets from "../sportsdetails/livereport/fancyBets/FancyBets";
import CompletedFancy from "./CompletedFancy";
import { useEffect, useState } from "react";
import { useEventDetailQuery } from "../../../store/service/eventDetailServices";
import FancyData from "./FancyData";
import MatchOdds from "./MatchOdds";
import {
  useLazyOddsQuPnlMyQuery,
  useLazyOddsQuPnlQuery,
} from "../../../store/service/OddsPnlServices";
import Bookmaker from "./Bookmaker";
import { use } from "react";
import { useParams } from "react-router-dom";

const GameDeatis = () => {
  const [showFullScore, setShowFullScore] = useState();
  const [showTtlBook, setShowTtlBook] = useState(true);
  const { id } = useParams();
  const { data } = useEventDetailQuery(id ?? "", { pollingInterval: 1000 });
  const [trigger, { data: oddsPnl }] = useLazyOddsQuPnlQuery();
  const [triggerMy, { data: oddsPnlMy }] = useLazyOddsQuPnlMyQuery();
  const [fancyId, setFancyId] = useState("");
    const [showMatchBet, setShowMatchBet] = useState(true);

  // useEffect(() => {
  //   trigger({
  //     matchId: id ?? "",
  //     matchCompleted: false,
  //     userId: "",
  //   });
  //   triggerMy({
  //     matchId: id ?? "",
  //     matchCompleted: false,
  //     userId: "",
  //   });
  // }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (showTtlBook) {
        trigger({
          matchId: id ?? "",
          matchCompleted: false,
          userId: "",
        });
      } else {
        triggerMy({
          matchId: id ?? "",
          matchCompleted: false,
          userId: "",
        });
      }
    }, 1000); // 1000ms = 1 second

    return () => clearInterval(interval);
  }, [id, showTtlBook]);

  const handleTtlBook = () => {
    setShowTtlBook(true);
    triggerMy({
      matchId: id ?? "",
      matchCompleted: false,
      userId: "",
    });
  };

  const handleOddBook = () => {
    setShowTtlBook(false);
    trigger({
      matchId: id ?? "",
      matchCompleted: false,
      userId: "",
    });
  };

  return (
    <Row justify="center" className="main_details_page">
      <Col xs={24} lg={24}>
        <Row justify="center">
          <Col xs={24} lg={24}>
            <div className="gx-px-1 gx-mb-5 gx-w-100 ">
              <Row
                justify="start"
                align="middle"
                className="gx-px-2 gx-py-1"
                style={{ backgroundColor: "rgb(115, 118, 111)" }}>
                <span
                  className="gx-bg-white gx-px-2 gx-py-1 gx-mr-2"
                  onClick={() => setShowFullScore(!showFullScore)}>
                  FS
                </span>
                <img
                  src="/Images/tv_icon.png"
                  alt="tv.png"
                  className="gx-bg-white gx-py-1 gx-mr-2"
                  style={{ width: 25 }}
                />
              </Row>

              <div className="ant-row" />
              <div
                className="ant-row"
                style={{ height: !showFullScore ? 110 : 220 }}>
                <iframe
                  src={`https://score.trovetown.co/socket-iframe-1/crickexpo/${id}`}
                  title="Score-I-frame"
                  className=""
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              </div>
              <Row className="gx-px-0 gx-py-0 main_game_details">
                <Col md={18} xs={24}>
                  {/* <MatchOdds data={data} pnl={oddsPnl?.data} /> */}
                  <Bookmaker
                    data={data}
                    pnl={oddsPnl?.data}
                    oddsPnlMy={oddsPnlMy?.data}
                    handleTtlBook={handleTtlBook}
                    handleOddBook={handleOddBook}
                    setShowTtlBook={setShowTtlBook}
                    showTtlBook={showTtlBook}
                  />
                  <FancyData
                    data={data}
                    setFancyId={setFancyId}
                    fancyId={fancyId}
                    setShowMatchBet={setShowMatchBet}
                  />
                </Col>
              </Row>
              <FancyBets showMatchBet={showMatchBet} setShowMatchBet={setShowMatchBet} setFancyId={setFancyId} fancyId={fancyId} />
              <CompletedFancy />
              <Row justify="center" className="gx-px-0 gx-py-0 gx-my-1">
                <button
                  type="button"
                  className="ant-btn ant-btn-default gx-my-0  gx-bg-grey gx-text-white gx-font-weight-semi-bold ">
                  <span>All Matches</span>
                </button>
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default GameDeatis;
