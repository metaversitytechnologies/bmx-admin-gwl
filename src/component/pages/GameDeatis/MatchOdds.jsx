import React from 'react'

const MatchOdds = ({ data, pnl }) => {
  return (
    <>
      {data?.Odds?.map((item, index) => {
        const pnlsOdds = pnl?.find(
          (element) => element?.marketId == item?.marketId
        );
        const plnOddsArray = pnlsOdds
          ? [
            { pnl: pnlsOdds.pnl1, selectionId: pnlsOdds.selection1 },
            { pnl: pnlsOdds.pnl2, selectionId: pnlsOdds.selection2 },
            { pnl: pnlsOdds.pnl3, selectionId: pnlsOdds.selection3 },
          ]
          : [];
        return (
          <div
            key={index}
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
                          {
                            item?.runners?.map((runner, index) => {
                              return (
                                <tr
                                  key={runner?.selectionId}
                                  data-row-key={0}
                                  className="ant-table-row ant-table-row-level-0">
                                  <td className="ant-table-cell matchdtailsBlackBackground">
                                    <div className="">
                                      <div className=" gx-font-weight-semi-bold gx-text-uppercase">
                                        {runner?.name}
                                      </div>
                                      <div className="gx-text-primary ">
                                        {plnOddsArray?.find((element) => element?.selectionId == runner?.selectionId)?.pnl || 0}
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className="ant-table-cell matchdtailsYesBackground"
                                    style={{ textAlign: "center" }}>
                                    <div className="gx-font-weight-semi-bold">
                                      {runner?.ex?.availableToBack?.[0]?.price}
                                    </div>
                                  </td>
                                  <td
                                    className="ant-table-cell matchdtailsNoBackground"
                                    style={{ textAlign: "center" }}>
                                    <div className="gx-font-weight-semi-bold">
                                      {runner?.ex?.availableToLay?.[0]?.price}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
      }</>
  )
}

export default MatchOdds