import React from "react";
import Marquee from "react-fast-marquee";

const getDisplayMessage = (message) =>
  message && message !== "null" ? message : "";

const Bookmaker = ({
  data,
  pnl,
  oddsPnlMy,
  handleTtlBook,
  handleOddBook,
  setShowTtlBook,
  showTtlBook,
}) => {
  const bookmakerRows = data?.Bookmaker?.filter(
    (item) => item?.t?.toLowerCase() === "bookmaker"
  );
  const tossRows = data?.Bookmaker?.filter(
    (item) =>
      item?.t?.toLowerCase() === "toss" &&
      item?.gstatus?.toLowerCase() !== "suspended"
  );

  const renderRows = (rows = []) =>
    rows?.map((runner) => {
      const pnlsOdds = pnl?.find((element) => element?.marketId == runner?.mid);
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
        ? plnOddsArray?.find((element) => element?.selectionId == runner?.sid)
            ?.pnl || 0
        : plnOddsArrayMy?.find((element) => element?.selectionId == runner?.sid)
            ?.pnl || 0;

      return (
        <tr
          key={`${runner?.mid}-${runner?.sid}`}
          data-row-key={0}
          className="ant-table-row ant-table-row-level-0">
          <td className="ant-table-cell matchdtailsBlackBackground">
            <div className="">
              <div className=" gx-font-weight-semi-bold gx-text-uppercase">
                {runner?.nation}
              </div>
              <div
                className={
                  pnlOdds > 0 ? "gx-text-success" : "gx-text-danger"
                }>
                {pnlOdds?.toFixed(2)}
              </div>
            </div>
          </td>
          <td
            className="ant-table-cell matchdtailsYesBackground"
            style={{ textAlign: "center" }}>
            <div className="gx-font-weight-semi-bold">{runner?.b1}</div>
          </td>
          <td
            className="ant-table-cell matchdtailsNoBackground"
            style={{ textAlign: "center" }}>
            <div className="gx-font-weight-semi-bold">{runner?.l1}</div>
          </td>
        </tr>
      );
    });

  const renderMarketTable = (rows = [], title = "BOOKMAKER") => {
    if (!rows?.length) return null;

    const displayMessage = Array.from(
      new Set(rows.map((item) => getDisplayMessage(item?.display_message)))
    )
      .filter(Boolean)
      .join(" | ");

    return (
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
                            <div className="gx-font-weight-semi-bold gx-text-uppercase">
                              {title}
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
                      {renderRows(rows)}
                      {displayMessage && (
                        <tr>
                          <td colSpan={3} className="market-display-message">
                            <Marquee speed={50} pauseOnHover>
                              {displayMessage}
                            </Marquee>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderMarketTable(bookmakerRows, "BOOKMAKER")}
      {renderMarketTable(tossRows, "TOSS")}
    </>
  );
};

export default Bookmaker;
