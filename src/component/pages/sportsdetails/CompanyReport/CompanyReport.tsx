import { Card, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyReport = () => {
  const nav = useNavigate();
  const columns = [
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Match Amt", dataIndex: "matchAmt", key: "matchAmt" },
    { title: "Session Amt", dataIndex: "sessionAmt", key: "sessionAmt" },
    { title: "Total", dataIndex: "total", key: "total" },
    { title: "Match Comm+", dataIndex: "matchComm", key: "matchComm" },
    { title: "Session Comm+", dataIndex: "sessionComm", key: "sessionComm" },
    { title: "Total Comm", dataIndex: "totalComm", key: "totalComm" },
    { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
    { title: "My Share", dataIndex: "myShare", key: "myShare" },
    { title: "M.App", dataIndex: "mApp", key: "mApp" },
    { title: "Net Amount", dataIndex: "netAmount", key: "netAmount" },
  ];

  const data = [
    {
      key: "1",
      code: "MA5873",
      name: "King",
      matchAmt: 100.0,
      sessionAmt: 0.0,
      total: 100.0,
      matchComm: 2.0,
      sessionComm: 0.0,
      totalComm: 2.0,
      totalAmount: 98.0,
      myShare: -4.0,
      mApp: 0.0,
      netAmount: 102.0,
    },
  ];
  return (
    <div className="match_slip company_report">
      <Card
        style={{ margin: "0px", width: "100%" }}
        className="sport_detail session_bet"
        title={"Company Repoprt"}
        // extra={<button onClick={handleBackClick}>Back</button>}
      >
        {/* {isLoading ? (
          <Spin className="loading_active" tip="Loading..." size="large">
            <div className="content" />
          </Spin>
        ) : ( */}
        <div className="table_section statement_tabs_data active_match_table">
          <table className="">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Match Amt</th>
                <th>Session Amt</th>
                <th>Total</th>
                <th>Match Comm+</th>
                <th>Session Comm+</th>
                <th>Total Comm</th>
                <th>My Share</th>
                <th>M.App</th>
                <th>Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((res, id) => (
                  <tr key={id}>
                    <td style={{ fontWeight: 600 }}>{res?.code}</td>
                    <td style={{ fontWeight: 600 }}>{res?.name}</td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {res?.matchAmt}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {res?.sessionAmt}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {res?.total}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {res?.matchComm}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {res?.sessionComm}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {res?.totalComm}
                    </td>
                    <td style={{ color: "red", fontWeight: 600 }}>
                      {res?.myShare}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {res?.mApp}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {res?.netAmount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr style={{ background: "rgb(213, 220, 102)" }}>
                <td style={{ fontWeight: 600 }}>Total</td>
                <td style={{ fontWeight: 600 }}></td>
                <td style={{ color: "green", fontWeight: 600 }}>100.00</td>
                <td style={{ color: "green", fontWeight: 600 }}>0.00</td>
                <td style={{ color: "green", fontWeight: 600 }}>100.00</td>
                <td style={{ color: "green", fontWeight: 600 }}>2.00</td>
                <td style={{ color: "green", fontWeight: 600 }}>0.00</td>
                <td style={{ color: "green", fontWeight: 600 }}>2.00</td>
                <td style={{ color: "green", fontWeight: 600 }}>-4.00</td>
                <td style={{ color: "red", fontWeight: 600 }}>0.00</td>
                <td style={{ color: "green", fontWeight: 600 }}>102.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
        {/* )} */}
      </Card>
    </div>
  );
};

export default CompanyReport;
