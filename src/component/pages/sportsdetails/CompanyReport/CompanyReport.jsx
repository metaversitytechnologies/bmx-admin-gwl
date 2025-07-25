import { Card, Empty } from "antd";

import { useNavigate, useParams } from "react-router-dom";
import { useGetCompletLedgerQuery } from "../../../../store/service/SportDetailServices";

const CompanyReport = () => {
  const nav = useNavigate();
  const { id, name } = useParams();

  const { data } = useGetCompletLedgerQuery({
    matchId: id,
  });

  const totalValues = data?.data?.reduce(
    (acc, curr) => {
      acc.matchAmount += curr?.matchAmount || 0;
      acc.sessionAmount += curr?.sessionAmount || 0;
      acc.total += curr?.total || 0;
      acc.matchComm += curr?.matchComm || 0;
      acc.sessionComm += curr?.sessionComm || 0;
      acc.totalComm += curr?.totalComm || 0;
      acc.myShare += curr?.myShare || 0;
      acc.mapp += curr?.mapp || 0;
      acc.netAmount += curr?.netAmount || 0;
      return acc;
    },
    {
      matchAmount: 0,
      sessionAmount: 0,
      total: 0,
      matchComm: 0,
      sessionComm: 0,
      totalComm: 0,
      myShare: 0,
      mapp: 0,
      netAmount: 0,
    }
  );

  const getColor = (value) =>
    value > 0 ? "green" : value < 0 ? "red" : "black";

  return (
    <div className="match_slip company_report">
      <Card
        style={{ margin: "0px", width: "100%" }}
        className="sport_detail session_bet"
        title={
          <div>
            Company Report
            <p style={{ fontSize: "16px", marginTop: "-7px" }}>{name}</p>
          </div>
        }
        extra={<button onClick={() => nav(-1)}>Back</button>}>
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
              {data?.data.length > 0 ? (
                data?.data.map((res, id) => (
                  <tr key={id}>
                    <td style={{ fontWeight: 600 }}>{res?.userId}</td>
                    <td style={{ fontWeight: 600 }}>{res?.userName}</td>
                    <td
                      style={{
                        color: res?.matchAmount > 0 ? "green" : "red",
                        fontWeight: 600,
                      }}>
                      {res?.matchAmount?.toFixed(2)}
                    </td>
                    <td
                      style={{
                        color: res?.sessionAmount > 0 ? "green" : "red",
                        fontWeight: 600,
                      }}>
                      {res?.sessionAmount?.toFixed(2)}
                    </td>
                    <td
                      style={{
                        color: res?.total > 0 ? "green" : "red",
                        fontWeight: 600,
                      }}>
                      {res?.total?.toFixed(2)}
                    </td>
                    <td
                      style={{
                        color: res?.matchComm > 0 ? "green" : "red",
                        fontWeight: 600,
                      }}>
                      {res?.matchComm?.toFixed(2)}
                    </td>
                    <td
                      style={{
                        color: res?.sessionComm > 0 ? "green" : "red",
                        fontWeight: 600,
                      }}>
                      {res?.sessionComm.toFixed(2)}
                    </td>
                    <td
                      style={{
                        color: res?.totalComm > 0 ? "green" : "red",
                        fontWeight: 600,
                      }}>
                      {res?.totalComm.toFixed(2)}
                    </td>
                    <td
                      style={{
                        color: res?.myShare > 0 ? "green" : "red",
                        fontWeight: 600,
                      }}>
                      {res?.myShare?.toFixed(2)}
                    </td>
                    <td
                      style={{
                        color: res?.mapp > 0 ? "green" : "red",
                        fontWeight: 600,
                      }}>
                      {res?.mapp?.toFixed(2)}
                    </td>
                    <td
                      style={{
                        color: res?.netAmount > 0 ? "green" : "red",
                        fontWeight: 600,
                      }}>
                      {res?.netAmount?.toFixed(2)}
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
              {data?.data?.length > 0 && (
                <tr style={{ background: "rgb(213, 220, 102)" }}>
                  <td style={{ fontWeight: 600 }}>Total</td>
                  <td></td>
                  <td
                    style={{
                      color: getColor(totalValues.matchAmount),
                      fontWeight: 600,
                    }}>
                    {totalValues.matchAmount.toFixed(2)}
                  </td>
                  <td
                    style={{
                      color: getColor(totalValues.sessionAmount),
                      fontWeight: 600,
                    }}>
                    {totalValues.sessionAmount.toFixed(2)}
                  </td>
                  <td
                    style={{
                      color: getColor(totalValues.total),
                      fontWeight: 600,
                    }}>
                    {totalValues.total.toFixed(2)}
                  </td>
                  <td
                    style={{
                      color: getColor(totalValues.matchComm),
                      fontWeight: 600,
                    }}>
                    {totalValues.matchComm.toFixed(2)}
                  </td>
                  <td
                    style={{
                      color: getColor(totalValues.sessionComm),
                      fontWeight: 600,
                    }}>
                    {totalValues.sessionComm.toFixed(2)}
                  </td>
                  <td
                    style={{
                      color: getColor(totalValues.totalComm),
                      fontWeight: 600,
                    }}>
                    {totalValues.totalComm.toFixed(2)}
                  </td>
                  <td
                    style={{
                      color: getColor(totalValues.myShare),
                      fontWeight: 600,
                    }}>
                    {totalValues.myShare.toFixed(2)}
                  </td>
                  <td
                    style={{
                      color: getColor(totalValues.mapp),
                      fontWeight: 600,
                    }}>
                    {totalValues.mapp.toFixed(2)}
                  </td>
                  <td
                    style={{
                      color: getColor(totalValues.netAmount),
                      fontWeight: 600,
                    }}>
                    {totalValues.netAmount.toFixed(2)}
                  </td>
                </tr>
              )}
            </tfoot>
          </table>
        </div>
        {/* )} */}
      </Card>
    </div>
  );
};

export default CompanyReport;
