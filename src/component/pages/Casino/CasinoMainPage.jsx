import { Card, Col, Row } from "antd";
import VideoSection from "./VideoSection";
import LastResult from "./LastResult";
import "./style.scss";
import { useOdds } from "./UseOdds";
import { tableIdtoUrl, titleById } from "./Constant";
import { useNavigate, useParams } from "react-router-dom";
import TeenPatti from "./TeenPatti";
import AAA from "./AAA";
import DT20 from "./DT20";
import Lucky7B from "./Lucky7B";
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
                {id === "52" && <DT20 odds={odds?.t2} />}
                {id === "53" && <Lucky7B odds={odds?.t2} />}
                {/* <div className="ant-table-wrapper gx-table-no-bordered">
                  <div className="ant-spin-nested-loading">
                    <div className="ant-spin-container">
                      <div className="ant-table ant-table-small ant-table-bordered">
                        <div className="ant-table-container">
                          <div className="ant-table-content">
                            <table style={{ tableLayout: "auto" }}>
                              <colgroup />
                              <thead className="ant-table-thead">
                                <tr>
                                  <th className="ant-table-cell">
                                    Player Name
                                  </th>
                                  <th className="ant-table-cell">Rate</th>
                                </tr>
                              </thead>
                              <tbody className="ant-table-tbody">
                                <tr
                                  data-row-key={1}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div> Amar</div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={2}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div> Akbar</div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={3}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div> Anthony</div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={21}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div> Red</div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={5}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div> Black</div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={6}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/1.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={7}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/2.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={8}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/3.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={9}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/4.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={10}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/5.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={11}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/6.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={12}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/7.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={13}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/8.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={14}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/9.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={15}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/10.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={16}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/11.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={17}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/12.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                                <tr
                                  data-row-key={18}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell">
                                    <div>
                                      <div>
                                        {" "}
                                        <img
                                          src="/images/cards/13.jpg"
                                          alt="card"
                                          className="h-full w-full"
                                          width={30}
                                          height={40}
                                        />
                                      </div>
                                      <div className="gx-fs-md gx-font-weight-bold gx-text-black">
                                        0
                                      </div>
                                    </div>
                                  </td>
                                  <td className="ant-table-cell">
                                    <span className="">0</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
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
