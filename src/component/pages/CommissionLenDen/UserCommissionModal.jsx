import { Button, Card, Empty, Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import CustomLoading from "../../common/CustomLoading/CustomLoading";

const UserCommissionModal = ({
  openModal,
  setOpenModals,
  commissionDate,
  loading,
}) => {
  const initialTotals = {
    mMatch: 0,
    mSession: 0,
    mCasino: 0,
    mTotal: 0,
    dMatch: 0,
    dSession: 0,
    dCasino: 0,
    dTotal: 0,
    left: 0,
  };

  const [totals, setTotals] = useState(initialTotals);

  useEffect(() => {
    if (commissionDate?.length > 0) {
      const calc = commissionDate.reduce(
        (acc, cur) => {
          acc.mMatch += cur.matchCommMila || 0;
          acc.mSession += cur.sessionCommMila || 0;
          acc.mCasino += cur.casinoCommMila || 0;
          acc.mTotal += cur.totalCommMila || 0;

          acc.dMatch += cur.matchCommDena || 0;
          acc.dSession += cur.sessionCommDena || 0;
          acc.dCasino += cur.casinoCommDena || 0;
          acc.dTotal += cur.totalCommDena || 0;

          acc.left += cur.leftCommission || 0;
          return acc;
        },
        { ...initialTotals }
      );
      setTotals(calc);
    } else {
      setTotals(initialTotals);
    }
  }, [commissionDate]);

  const mTotalData = totals.mMatch + totals.mSession + totals.mCasino;
  const dTotalData = totals.dMatch + totals.dSession + totals.dCasino;

  return (
    <Modal
      width={800}
      open={openModal}
      onCancel={() => setOpenModals(false)}
      className="modal_deposit"
      title={
        <h1>
          <span>Commission Modal</span>
        </h1>
      }
      footer={
        <Button
          onClick={() => setOpenModals(false)}
          className="ant-btn gx-bg-grey ant-modal-footer commission_btn ant-btn-default">
          Close
        </Button>
      }
      closable={{ "aria-label": "Custom Close Button" }}>
      {loading && <CustomLoading />}
      <div
        className="match_slip"
        style={{
          position: "relative",
          maxHeight: "400px",
          overflow: "scroll",
        }}>
        <Card
          style={{ margin: "0px", width: "100%" }}
          className="sport_detail team_name">
          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <table className="live_table login_data_table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }} colSpan={6}>
                    Mila Hai
                  </th>
                  <th style={{ textAlign: "center" }} colSpan={4}>
                    Dena Hai
                  </th>
                  <th>Bacha Hai</th>
                </tr>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>M.Comm.</th>
                  <th>S.Comm.</th>
                  <th>C.Comm.</th>
                  <th>T.Comm.</th>
                  <th>M.Comm.</th>
                  <th>S.Comm.</th>
                  <th>C.Comm.</th>
                  <th>T.Comm.</th>
                  <th>Comm.</th>
                </tr>
              </thead>

              <tbody>
                {commissionDate?.length > 0 && (
                  <tr style={{ background: "#000" }}>
                    <td></td>
                    <td></td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {totals.mMatch.toFixed(2)}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {totals.mSession.toFixed(2)}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {totals.mCasino.toFixed(2)}
                    </td>
                    <td style={{ color: "green", fontWeight: 600 }}>
                      {mTotalData.toFixed(2)}
                    </td>
                    <td style={{ color: "red", fontWeight: 600 }}>
                      {totals.dMatch.toFixed(2)}
                    </td>
                    <td style={{ color: "red", fontWeight: 600 }}>
                      {totals.dSession.toFixed(2)}
                    </td>
                    <td style={{ color: "red", fontWeight: 600 }}>
                      {totals.dCasino.toFixed(2)}
                    </td>
                    <td style={{ color: "red", fontWeight: 600 }}>
                      {dTotalData.toFixed(2)}
                    </td>
                    <td
                      style={{
                        color: mTotalData - dTotalData < 0 ? "red" : "green",
                        fontWeight: 600,
                      }}>
                      {(mTotalData - dTotalData).toFixed(2)}
                    </td>
                  </tr>
                )}

                {commissionDate?.length > 0 ? (
                  commissionDate.map((item, idx) => {
                    const matchTotal =
                      (item.matchCommMila || 0) +
                      (item.sessionCommMila || 0) +
                      (item.casinoCommMila || 0);

                    const denaTotal =
                      (item.matchCommDena || 0) +
                      (item.sessionCommDena || 0) +
                      (item.casinoCommDena || 0);

                    const commB = matchTotal - denaTotal;

                    return (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600 }}>{item.matchName}</td>
                        <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                          {item.date
                            ? moment(new Date(item.date)).format(
                                "DD-MM-YYYY hh:mm A"
                              )
                            : "--"}
                        </td>
                        <td style={{ color: "green", fontWeight: 600 }}>
                          {item.matchCommMila?.toFixed(2)}
                        </td>
                        <td style={{ color: "green", fontWeight: 600 }}>
                          {item.sessionCommMila?.toFixed(2)}
                        </td>
                        <td style={{ color: "green", fontWeight: 600 }}>
                          {item.casinoCommMila?.toFixed(2)}
                        </td>
                        <td style={{ color: "green", fontWeight: 600 }}>
                          {matchTotal.toFixed(2)}
                        </td>
                        <td style={{ color: "red", fontWeight: 600 }}>
                          {item.matchCommDena?.toFixed(2)}
                        </td>
                        <td style={{ color: "red", fontWeight: 600 }}>
                          {item.sessionCommDena?.toFixed(2)}
                        </td>
                        <td style={{ color: "red", fontWeight: 600 }}>
                          {item.casinoCommDena?.toFixed(2)}
                        </td>
                        <td style={{ color: "red", fontWeight: 600 }}>
                          {denaTotal.toFixed(2)}
                        </td>
                        <td
                          style={{
                            color: commB < 0 ? "red" : "green",
                            fontWeight: 600,
                          }}>
                          {commB.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={11}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default UserCommissionModal;
