import { Card, Col, Row } from "antd";
import VideoSection from "./VideoSection";
import LastResult from "./LastResult";
import { useOdds } from "./UseOdds";
import { tableIdtoUrl, titleById } from "./Constant";
import { useNavigate, useParams } from "react-router-dom";
import TeenPatti from "./TeenPatti";
import AAA from "./AAA";
import DT20 from "./DT20";
import Lucky7B from "./Lucky7B";
import TeenPattiOneDay from "./TeenPattiOneDay";
import NonDeclare from "./NonDeclare";
import Result from "./Result";

const CasinoMainPage = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { odds } = useOdds(tableIdtoUrl[id]);

  return (
    <div className="match_slip match_ledger casino_oddsss">
      <Card
        className="sport_detail team_name"
        title={titleById[id]}
        extra={<button onClick={() => nav(-1)}>Back</button>}
        style={{ margin: 0, width: "100%" }}>
        <Card bordered className="gx-card-widget">
          <Row className="gx-px-4" gutter={[32, 32]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={14}>
              <div className="gx-news-itemgnn">
                <div className="gx-news-contenttt">
                  <div className="gx-bg-flex gx-justify-content-between gx-bg-grey gx-px-2 gx-py-2">
                    <span className="gx-text-white">
                      Match ID: {odds?.t1?.[0]?.mid}
                    </span>
                    <span className="gx-text-white">
                      {odds?.t1?.[0]?.autotime}
                    </span>
                  </div>
                  <VideoSection
                    t3={odds && odds?.length !== 0 && odds.t3}
                    t1={odds && odds?.length !== 0 && odds?.t1?.[0]}
                    t2={odds && odds?.t1}
                    time={odds?.time}
                  />
                  <LastResult />
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={10}>
              <div className="gx-table-responsive">
                {id === "51" && <TeenPatti odds={odds?.t2} id="51" />}
                {id === "57" && <TeenPatti odds={odds?.t1} id="57" />}
                {id === "56" && <AAA odds={odds?.t2} />}
                {id === "52" || (id === "62" && <DT20 odds={odds?.t2} />)}
                {id === "53" && <Lucky7B odds={odds?.t2} />}
                {id === "61" && <TeenPattiOneDay odds={odds} />}
              </div>
            </Col>
          </Row>
        </Card>
        <NonDeclare />
        <Result name={titleById[id]} />
      </Card>
    </div>
  );
};

export default CasinoMainPage;
