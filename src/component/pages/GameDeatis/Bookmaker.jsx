import React from "react";

const Bookmaker = ({
  data,
  pnl,
  oddsPnlMy,
  handleTtlBook,
  handleOddBook,
  setShowTtlBook,
  showTtlBook,
  handleBetPlace,
}) => {
  const userType = localStorage.getItem("userType");
  return (
    <>
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
                        <th className="ant-table-cell matchdtailsNoYesBackground">
                          <div className="gx-bg-flex gx-justify-content-between gx-align-items-center minMax">
                            <div style={{ display: "flex" }}>
                              <div
                                style={{
                                  padding: "6px 8px",
                                  cursor: "pointer",
                                  backgroundColor: !showTtlBook
                                    ? "rgb(235, 109, 136)"
                                    : "white",
                                  color: !showTtlBook ? "white" : "black",
                                  fontWeight: 500,
                                }}
                                onClick={() => {
                                  setShowTtlBook(false);
                                  handleTtlBook();
                                }}>
                                Ttl Book
                              </div>
                              <div
                                style={{
                                  padding: "6px 8px",
                                  cursor: "pointer",
                                  backgroundColor: showTtlBook
                                    ? "rgb(235, 109, 136)"
                                    : "white",
                                  color: showTtlBook ? "white" : "black",
                                  fontWeight: 500,
                                }}
                                onClick={() => {
                                  setShowTtlBook(true);
                                  handleOddBook();
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
                      {data?.Bookmaker?.filter(
                        (item) => item?.t === "Bookmaker"
                      )?.map((runner, index) => {
                        const pnlsOdds = pnl?.find(
                          (element) => element?.marketId == runner?.mid
                        );
                        const plnOddsArray = pnlsOdds
                          ? [
                              {
                                pnl: pnlsOdds.pnl1,
                                selectionId: pnlsOdds.selection1,
                              },
                              {
                                pnl: pnlsOdds.pnl2,
                                selectionId: pnlsOdds.selection2,
                              },
                              {
                                pnl: pnlsOdds.pnl3,
                                selectionId: pnlsOdds.selection3,
                              },
                            ]
                          : [];
                        const pnlsOddsMy = oddsPnlMy?.find(
                          (element) => element?.marketId == runner?.mid
                        );
                        const plnOddsArrayMy = pnlsOddsMy
                          ? [
                              {
                                pnl: pnlsOddsMy.pnl1,
                                selectionId: pnlsOddsMy.selection1,
                              },
                              {
                                pnl: pnlsOddsMy.pnl2,
                                selectionId: pnlsOddsMy.selection2,
                              },
                              {
                                pnl: pnlsOddsMy.pnl3,
                                selectionId: pnlsOddsMy.selection3,
                              },
                            ]
                          : [];

                        const pnlOdds = showTtlBook
                          ? plnOddsArray?.find(
                              (element) => element?.selectionId == runner?.sid
                            )?.pnl || 0
                          : plnOddsArrayMy?.find(
                              (element) => element?.selectionId == runner?.sid
                            )?.pnl || 0;

                        return (
                          <tr
                            key={runner?.selectionId}
                            data-row-key={0}
                            className="ant-table-row ant-table-row-level-0">
                            <td className="ant-table-cell matchdtailsBlackBackground">
                              <div className="">
                                <div className=" gx-font-weight-semi-bold gx-text-uppercase">
                                  {runner?.nation}
                                </div>
                                <div
                                  className={
                                    pnlOdds > 0
                                      ? "gx-text-success"
                                      : "gx-text-danger"
                                  }>
                                  {pnlOdds?.toFixed(2)}
                                </div>
                              </div>
                            </td>
                            <td
                              className="ant-table-cell matchdtailsYesBackground"
                              style={{
                                textAlign: "center",
                                cursor:
                                  runner?.l1 != 0 && userType == 7
                                    ? "pointer"
                                    : "default",
                              }}
                              onClick={() =>
                                runner?.b1 != 0 &&
                                userType == 7 &&
                                handleBetPlace(
                                  runner?.b1,
                                  runner?.sid,
                                  runner?.nation,
                                  runner?.mid,
                                  "Lagai",
                                  false
                                )
                              }>
                              <div className="gx-font-weight-semi-bold">
                                {runner?.b1}
                              </div>
                            </td>
                            <td
                              className="ant-table-cell matchdtailsNoBackground"
                              style={{
                                textAlign: "center",
                                cursor:
                                  runner?.l1 != 0 && userType == 7
                                    ? "pointer"
                                    : "default",
                              }}
                              onClick={() =>
                                runner?.l1 != 0 &&
                                userType == 7 &&
                                handleBetPlace(
                                  runner?.l1,
                                  runner?.sid,
                                  runner?.nation,
                                  runner?.mid,
                                  "Khai",
                                  false
                                )
                              }>
                              <div className="gx-font-weight-semi-bold">
                                {runner?.l1}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmaker;
