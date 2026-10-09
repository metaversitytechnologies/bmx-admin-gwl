import React from "react";

const Bookmaker = ({
  data,
  pnl,
  oddsPnlMy,
  handleTtlBook,
  handleOddBook,
  setShowTtlBook,
  showTtlBook,
}) => {
  return (
    <>
      <div
        className="ant-table-wrapper gx-w-100 gx-mx-0 gx-my-0 game-details-bookmaker"
        >
        <div className="ant-spin-nested-loading">
          <div className="ant-spin-container">
            <div className="ant-table ant-table-small ant-table-bordered">
              <div className="ant-table-container">
                <div className="ant-table-content">
                    <table style={{ tableLayout: "fixed" }}>
                    <colgroup>
                      <col style={{ width: "51%" }} />
                      <col style={{ width: "22%" }} />
                      <col style={{ width: "27%" }} />
                    </colgroup>
                    <thead className="ant-table-thead">
                      <tr>
                        <th className="ant-table-cell matchdtailsNoYesBackground">
                          <div className="gx-bg-flex gx-justify-content-between gx-align-items-center minMax">
                            <div style={{ display: "flex" }}>
                                  <div
                                    className={`game-details-book-tab ${!showTtlBook ? "is-active" : ""}`}
                                    style={{
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setShowTtlBook(false);
                                  handleTtlBook();
                                }}>
                                Ttl Book
                              </div>
                                  <div
                                    className={`game-details-book-tab ${showTtlBook ? "is-active" : ""}`}
                                    style={{
                                  cursor: "pointer",
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
                        <th className="ant-table-cell matchdtailsYesBackground game-details-lagai-heading">
                          Lagai
                        </th>
                        <th className="ant-table-cell matchdtailsNoBackground game-details-khai-heading">
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
                            <td className="ant-table-cell matchdtailsBlackBackground game-details-team-cell">
                              <div>
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
                            <td className="ant-table-cell matchdtailsYesBackground game-details-odds-cell">
                              <div className="gx-font-weight-semi-bold">
                                {runner?.b1}
                              </div>
                            </td>
                            <td className="ant-table-cell matchdtailsNoBackground game-details-odds-cell">
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
