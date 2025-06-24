import { Col, Row } from "antd";
import "./Gamedetails.scss";
import CompeleteFancy from "../sportsdetails/livereport/compeleteFancy/CompeleteFancy";

const GameDeatis = () => {
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
                <span className="gx-bg-white gx-px-2 gx-py-1 gx-mr-2">FS</span>
                <img
                  src="/Images/tv_icon.png"
                  alt="tv.png"
                  className="gx-bg-white gx-py-1 gx-mr-2"
                  style={{ width: 25 }}
                />
              </Row>

              <div className="ant-row" />
              <div className="ant-row" style={{ height: 110 }}>
                <iframe
                  src="https://score.trovetown.co/socket-iframe-1/crickexpo/34417715"
                  title="Score-I-frame"
                  className=""
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              </div>
              <Row className="gx-px-0 gx-py-0 main_game_details">
                <Col md={18} xs={24}>
                  <div
                    className="ant-table-wrapper gx-w-100 gx-mx-0 gx-my-0"
                    style={{ marginTop: 16 }}>
                    <div className="ant-spin-nested-loading">
                      <div className="ant-spin-container">
                        <div className="ant-table ant-table-small ant-table-bordered">
                          <div className="ant-table-container">
                            <div className="ant-table-content">
                              <table style={{ tableLayout: "auto" }}>
                                <colgroup>
                                  <col style={{ width: "60%" }} />
                                  <col style={{ width: "20%" }} />
                                  <col style={{ width: "20%" }} />
                                </colgroup>
                                <thead className="ant-table-thead">
                                  <tr>
                                    <th
                                      className="ant-table-cell matchdtailsBlackBackground"
                                      style={{
                                        background:
                                          "linear-gradient(to right, rgb(239, 131, 155), rgb(99, 183, 247))",
                                      }}>
                                      <div className="gx-bg-flex gx-justify-content-between gx-align-items-center minMax">
                                        <div style={{ display: "flex" }}>
                                          <div
                                            style={{
                                              padding: "6px 8px",
                                              cursor: "pointer",
                                              backgroundColor:
                                                "rgb(235, 109, 136)",
                                              color: "white",
                                              fontWeight: 500,
                                            }}>
                                            Ttl Book
                                          </div>
                                          <div
                                            style={{
                                              padding: "6px 8px",
                                              cursor: "pointer",
                                              backgroundColor:
                                                "rgb(255, 255, 255)",
                                              color: "black",
                                              fontWeight: 500,
                                            }}>
                                            My Book
                                          </div>
                                        </div>
                                      </div>
                                    </th>
                                    <th
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{
                                        backgroundColor: "rgb(99, 183, 247)",
                                        textAlign: "center",
                                        fontWeight: 500,
                                      }}>
                                      Lagai
                                    </th>
                                    <th
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{
                                        backgroundColor: "rgb(239, 131, 155)",
                                        textAlign: "center",
                                        fontWeight: 500,
                                      }}>
                                      Khai
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="ant-table-tbody">
                                  <tr
                                    data-row-key={0}
                                    className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell matchdtailsBlackBackground">
                                      <div className="">
                                        <div className=" gx-font-weight-semi-bold gx-text-uppercase">
                                          ENGLAND
                                        </div>
                                        <div className="gx-text-primary ">
                                          0
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold">
                                        0
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold">
                                        0
                                      </div>
                                    </td>
                                  </tr>
                                  <tr
                                    data-row-key={1}
                                    className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell matchdtailsBlackBackground">
                                      <div className="">
                                        <div className=" gx-font-weight-semi-bold gx-text-uppercase">
                                          INDIA
                                        </div>
                                        <div className="gx-text-primary ">
                                          0
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold">
                                        90
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold">
                                        95
                                      </div>
                                    </td>
                                  </tr>
                                  <tr
                                    data-row-key={2}
                                    className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell matchdtailsBlackBackground">
                                      <div className="">
                                        <div className=" gx-font-weight-semi-bold gx-text-uppercase">
                                          THE DRAW
                                        </div>
                                        <div className="gx-text-primary ">
                                          0
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold">
                                        0
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold">
                                        0
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ant-table-wrapper gx-w-100 gx-mx-0 gx-my-0"
                    style={{ marginTop: 16 }}>
                    <div className="ant-spin-nested-loading">
                      <div className="ant-spin-container">
                        <div className="ant-table ant-table-small ant-table-bordered">
                          <div className="ant-table-container">
                            <div className="ant-table-content">
                              <table style={{ tableLayout: "auto" }}>
                                <colgroup>
                                  <col style={{ width: "60%" }} />
                                  <col style={{ width: "20%" }} />
                                  <col style={{ width: "20%" }} />
                                </colgroup>
                                <thead className="ant-table-thead">
                                  <tr>
                                    <th
                                      className="ant-table-cell matchdtailsBlackBackground"
                                      style={{
                                        background:
                                          "linear-gradient(to right, rgb(239, 131, 155), rgb(99, 183, 247))",
                                      }}>
                                      <div
                                        className="gx-bg-flex gx-justify-content-between minMax"
                                        style={{ display: "flex" }}>
                                        <div className="gx-bg-flex gx-justify-content-between gx-align-items-center minMax">
                                          <div style={{ display: "flex" }}>
                                            <div
                                              style={{
                                                padding: "6px 8px",
                                                cursor: "pointer",
                                                backgroundColor:
                                                  "rgb(235, 109, 136)",
                                                color: "white",
                                              }}>
                                              Ttl Book
                                            </div>
                                            <div
                                              style={{
                                                padding: "6px 8px",
                                                cursor: "pointer",
                                                backgroundColor:
                                                  "rgb(255, 255, 255)",
                                                color: "black",
                                              }}>
                                              My Book
                                            </div>
                                          </div>
                                        </div>
                                        <div>
                                          <div style={{ textWrap: "nowrap" }}>
                                            Min: 100 Max: 200000
                                          </div>
                                          <div className="gx-text-center">
                                            Match Odds
                                          </div>
                                        </div>
                                      </div>
                                    </th>
                                    <th
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{
                                        backgroundColor: "rgb(99, 183, 247)",
                                        textAlign: "center",
                                      }}>
                                      Lagai
                                    </th>
                                    <th
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{
                                        backgroundColor: "rgb(239, 131, 155)",
                                        textAlign: "center",
                                      }}>
                                      Khai
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="ant-table-tbody">
                                  <tr
                                    data-row-key={0}
                                    className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell matchdtailsBlackBackground">
                                      <div className="">
                                        <div className=" gx-font-weight-semi-bold gx-text-uppercase">
                                          England
                                        </div>
                                        <div className="gx-font-weight-semi-bold gx-text-primary">
                                          0
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
                                        <span>2.1</span>
                                        <span className="gx-fs-xs">37.43</span>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
                                        <span>2.12</span>
                                        <span className="gx-fs-xs">111.41</span>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr
                                    data-row-key={1}
                                    className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell matchdtailsBlackBackground">
                                      <div className="">
                                        <div className=" gx-font-weight-semi-bold gx-text-uppercase">
                                          India
                                        </div>
                                        <div className="gx-font-weight-semi-bold gx-text-primary">
                                          0
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
                                        <span>2.44</span>
                                        <span className="gx-fs-xs">
                                          3703.83
                                        </span>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
                                        <span>2.46</span>
                                        <span className="gx-fs-xs">294.12</span>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr
                                    data-row-key={2}
                                    className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell matchdtailsBlackBackground">
                                      <div className="">
                                        <div className=" gx-font-weight-semi-bold gx-text-uppercase">
                                          The Draw
                                        </div>
                                        <div className="gx-font-weight-semi-bold gx-text-primary">
                                          0
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
                                        <span>8.2</span>
                                        <span className="gx-fs-xs">28.80</span>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{ textAlign: "center" }}>
                                      <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
                                        <span>8.4</span>
                                        <span className="gx-fs-xs">7.67</span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ant-table-wrapper gx-w-100 gx-mx-0 gx-my-0 gx-table-responsive"
                    style={{ marginTop: 16 }}>
                    <div className="ant-spin-nested-loading">
                      <div className="ant-spin-container">
                        <div className="ant-table ant-table-small ant-table-bordered">
                          <div className="ant-table-container">
                            <div className="ant-table-content">
                              <table style={{ tableLayout: "auto" }}>
                                <colgroup>
                                  <col style={{ width: "60%" }} />
                                  <col style={{ width: "20%" }} />
                                  <col style={{ width: "20%" }} />
                                </colgroup>
                                <thead className="ant-table-thead">
                                  <tr>
                                    <th
                                      className="ant-table-cell"
                                      style={{
                                        background:
                                          "linear-gradient(to right, rgb(239, 131, 155), rgb(99, 183, 247))",
                                      }}>
                                      <div className="gx-bg-flex gx-justify-content-between gx-align-items-center gx-px-1">
                                        <span className="gx-px-3 gx-py-1 gx-bg-primary">
                                          Fancy
                                        </span>
                                        <span style={{ whiteSpace: "nowrap" }}>
                                          Min: 100
                                          <br />
                                          Max: 200000
                                        </span>
                                      </div>
                                    </th>
                                    <th
                                      className="ant-table-cell"
                                      style={{
                                        backgroundColor: "rgb(239, 131, 155)",
                                        textAlign: "center",
                                      }}>
                                      No
                                    </th>
                                    <th
                                      className="ant-table-cell"
                                      style={{
                                        backgroundColor: "rgb(99, 183, 247)",
                                        textAlign: "center",
                                      }}>
                                      YES
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="ant-table-tbody">
                                  <tr className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell">
                                      <div className="gx-bg-flex gx-flex-column">
                                        <div className="gx-bg-flex gx-my-0">
                                          <div className="gx-font-weight-semi-bold text-white">
                                            60 OVER RUN IND 2
                                          </div>
                                          <button
                                            type="button"
                                            className="ant-btn ant-btn-default gx-my-0"
                                            style={{
                                              height: 30,
                                              backgroundColor:
                                                "rgb(152, 215, 127)",
                                              color: "white",
                                            }}>
                                            <span>Book</span>
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{ textAlign: "center" }}>
                                      <div style={{}}>
                                        <div className="gx-font-weight-semi-bold">
                                          219
                                        </div>
                                        <div className="gx-font-weight-semi-bold">
                                          100
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{ textAlign: "center" }}>
                                      <div style={{}}>
                                        <div className="gx-font-weight-semi-bold">
                                          220
                                        </div>
                                        <div className="gx-font-weight-semi-bold">
                                          100
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell">
                                      <div className="gx-bg-flex gx-flex-column">
                                        <div className="gx-bg-flex gx-my-0">
                                          <div className="gx-font-weight-semi-bold text-white">
                                            FALL OF 4TH WKT IND 2
                                          </div>
                                          <button
                                            type="button"
                                            className="ant-btn ant-btn-default gx-my-0"
                                            style={{
                                              height: 30,
                                              backgroundColor:
                                                "rgb(152, 215, 127)",
                                              color: "white",
                                            }}>
                                            <span>Book</span>
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{ textAlign: "center" }}>
                                      <div style={{}}>
                                        <div className="gx-font-weight-semi-bold">
                                          253
                                        </div>
                                        <div className="gx-font-weight-semi-bold">
                                          100
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{ textAlign: "center" }}>
                                      <div style={{}}>
                                        <div className="gx-font-weight-semi-bold">
                                          253
                                        </div>
                                        <div className="gx-font-weight-semi-bold">
                                          80
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr className="ant-table-expanded-row ant-table-expanded-row-level-1">
                                    <td colSpan={4} className="ant-table-cell">
                                      <div className="gx-font-weight-semi-bold gx-text-red">
                                        <span>
                                          **England A Women v New Zealand A
                                          Women match bets started In our
                                          Exchange**
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell">
                                      <div className="gx-bg-flex gx-flex-column">
                                        <div className="gx-bg-flex gx-my-0">
                                          <div className="gx-font-weight-semi-bold text-white">
                                            KL RAHUL RUN 2
                                          </div>
                                          <button
                                            type="button"
                                            className="ant-btn ant-btn-default gx-my-0"
                                            style={{
                                              height: 30,
                                              backgroundColor:
                                                "rgb(152, 215, 127)",
                                              color: "white",
                                            }}>
                                            <span>Book</span>
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{ textAlign: "center" }}>
                                      <div style={{}}>
                                        <div className="gx-font-weight-semi-bold">
                                          0
                                        </div>
                                        <div className="gx-font-weight-semi-bold">
                                          0
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{ textAlign: "center" }}>
                                      <div style={{}}>
                                        <div className="gx-font-weight-semi-bold">
                                          0
                                        </div>
                                        <div className="gx-font-weight-semi-bold">
                                          0
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell">
                                      <div className="gx-bg-flex gx-flex-column">
                                        <div className="gx-bg-flex gx-my-0">
                                          <div className="gx-font-weight-semi-bold text-white">
                                            R PANT RUN 2
                                          </div>
                                          <button
                                            type="button"
                                            className="ant-btn ant-btn-default gx-my-0"
                                            style={{
                                              height: 30,
                                              backgroundColor:
                                                "rgb(152, 215, 127)",
                                              color: "white",
                                            }}>
                                            <span>Book</span>
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{ textAlign: "center" }}>
                                      <div style={{}}>
                                        <div className="gx-font-weight-semi-bold">
                                          104
                                        </div>
                                        <div className="gx-font-weight-semi-bold">
                                          110
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{ textAlign: "center" }}>
                                      <div style={{}}>
                                        <div className="gx-font-weight-semi-bold">
                                          104
                                        </div>
                                        <div className="gx-font-weight-semi-bold">
                                          90
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell">
                                      <div className="gx-bg-flex gx-flex-column">
                                        <div className="gx-bg-flex gx-my-0">
                                          <div className="gx-font-weight-semi-bold text-white">
                                            4TH WKT PSHIP BOUNDARIES IND 2
                                          </div>
                                          <button
                                            type="button"
                                            className="ant-btn ant-btn-default gx-my-0"
                                            style={{
                                              height: 30,
                                              backgroundColor:
                                                "rgb(152, 215, 127)",
                                              color: "white",
                                            }}>
                                            <span>Book</span>
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsSuspendBackground"
                                      style={{ textAlign: "center" }}>
                                      <div
                                        style={{ fontSize: 8 }}
                                        className="gx-font-weight-light gx-py-1">
                                        SUSPENDED
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsSuspendBackground"
                                      style={{ textAlign: "center" }}>
                                      <div
                                        style={{ fontSize: 8 }}
                                        className="gx-fs-xs gx-py-1">
                                        SUSPENDED
                                      </div>
                                    </td>
                                  </tr>
                                  <tr className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell">
                                      <div className="gx-bg-flex gx-flex-column">
                                        <div className="gx-bg-flex gx-my-0">
                                          <div className="gx-font-weight-semi-bold text-white">
                                            KL RAHUL BOUNDARIES 2
                                          </div>
                                          <button
                                            type="button"
                                            className="ant-btn ant-btn-default gx-my-0"
                                            style={{
                                              height: 30,
                                              backgroundColor:
                                                "rgb(152, 215, 127)",
                                              color: "white",
                                            }}>
                                            <span>Book</span>
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsNoBackground"
                                      style={{ textAlign: "center" }}>
                                      <div style={{}}>
                                        <div className="gx-font-weight-semi-bold">
                                          0
                                        </div>
                                        <div className="gx-font-weight-semi-bold">
                                          0
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsYesBackground"
                                      style={{ textAlign: "center" }}>
                                      <div style={{}}>
                                        <div className="gx-font-weight-semi-bold">
                                          0
                                        </div>
                                        <div className="gx-font-weight-semi-bold">
                                          0
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr className="ant-table-row ant-table-row-level-0">
                                    <td className="ant-table-cell">
                                      <div className="gx-bg-flex gx-flex-column">
                                        <div className="gx-bg-flex gx-my-0">
                                          <div className="gx-font-weight-semi-bold text-white">
                                            R PANT BOUNDARIES 2
                                          </div>
                                          <button
                                            type="button"
                                            className="ant-btn ant-btn-default gx-my-0"
                                            style={{
                                              height: 30,
                                              backgroundColor:
                                                "rgb(152, 215, 127)",
                                              color: "white",
                                            }}>
                                            <span>Book</span>
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsSuspendBackground"
                                      style={{ textAlign: "center" }}>
                                      <div
                                        style={{ fontSize: 8 }}
                                        className="gx-font-weight-light gx-py-1">
                                        SUSPENDED
                                      </div>
                                    </td>
                                    <td
                                      className="ant-table-cell matchdtailsSuspendBackground"
                                      style={{ textAlign: "center" }}>
                                      <div
                                        style={{ fontSize: 8 }}
                                        className="gx-fs-xs gx-py-1">
                                        SUSPENDED
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <CompeleteFancy />

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
