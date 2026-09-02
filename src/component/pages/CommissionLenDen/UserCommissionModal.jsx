import { Button, Empty, Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  CircleX,
  HandCoins,
  PieChart,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import PropTypes from "prop-types";
import CustomLoading from "../../common/CustomLoading/CustomLoading";

const INITIAL_TOTALS = {
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

const UserCommissionModal = ({
  openModal,
  setOpenModals,
  commissionDate,
  loading,
}) => {
  const [totals, setTotals] = useState(INITIAL_TOTALS);

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
        { ...INITIAL_TOTALS },
      );
      setTotals(calc);
    } else {
      setTotals(INITIAL_TOTALS);
    }
  }, [commissionDate]);

  const mTotalData = totals.mMatch + totals.mSession + totals.mCasino;
  const dTotalData = totals.dMatch + totals.dSession + totals.dCasino;
  const balanceTotal = mTotalData - dTotalData;

  return (
    <Modal
      width="min(1180px, calc(100vw - 48px))"
      open={openModal}
      onCancel={() => setOpenModals(false)}
      className="modal_deposit commission-modal-shell commission-detail-modal"
      rootClassName="commission-modal-root"
      maskStyle={{ backdropFilter: "blur(3px)" }}
      title={
        <div className="commission-modal-titlebar">
          <span className="commission-modal-icon">
            <HandCoins size={24} strokeWidth={2} />
          </span>
          <div>
            <h2>Commission Details</h2>
            <p>Review commission lena / dena breakdown</p>
          </div>
        </div>
      }
      footer={
        <div className="commission-modal-footer">
          <span className="commission-modal-note">
            All commission fields remain available on smaller screens.
          </span>
          <Button
            onClick={() => setOpenModals(false)}
            className="approved-primary-button commission-modal-close">
            <CircleX size={16} strokeWidth={2} />
            Close
          </Button>
        </div>
      }
      closeIcon={<X aria-label="Close" size={22} strokeWidth={1.8} />}>
      {loading && <CustomLoading />}
      <div className="commission-modal-body">
        {commissionDate?.length > 0 && (
          <div className="commission-detail-summary">
            <div>
              <span className="summary-icon is-mila">
                <TrendingUp size={18} strokeWidth={2.1} />
              </span>
              <p>Mila Hai</p>
              <strong className="commission-value-success">
                {mTotalData.toFixed(2)}
              </strong>
            </div>
            <div>
              <span className="summary-icon is-dena">
                <TrendingDown size={18} strokeWidth={2.1} />
              </span>
              <p>Dena Hai</p>
              <strong className="commission-value-danger">
                {dTotalData.toFixed(2)}
              </strong>
            </div>
            <div>
              <span className="summary-icon is-bacha">
                <PieChart size={18} strokeWidth={2.1} />
              </span>
              <p>Bacha Hai</p>
              <strong
                className={
                  balanceTotal < 0
                    ? "commission-value-danger"
                    : "commission-value-bacha"
                }>
                {balanceTotal.toFixed(2)}
              </strong>
            </div>
          </div>
        )}

        <div className="commission-modal-table-card">
          <div className="commission-modal-table-scroll">
            <table className="live_table login_data_table commission-table commission-modal-grouped-table">
              <thead>
                <tr className="commission-group-row">
                  <th className=" commission-group-name"></th>
                  <th
                    className="text-center commission-group-label"
                    colSpan={5}>
                    Mila Hai
                  </th>
                  <th
                    className="text-center commission-group-label commission-group-dena"
                    colSpan={4}>
                    Dena Hai
                  </th>
                  <th className="text-center commission-group-label commission-group-bacha">
                    Bacha Hai
                  </th>
                </tr>
                <tr>
                  <th className=" commission-name-head">Name</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">M.Comm.</th>
                  <th className="text-center">S.Comm.</th>
                  <th className="text-center">C.Comm.</th>
                  <th className="text-center">T.Comm.</th>
                  <th className="text-center">M.Comm.</th>
                  <th className="text-center">S.Comm.</th>
                  <th className="text-center">C.Comm.</th>
                  <th className="text-center">T.Comm.</th>
                  <th className="text-center">Comm.</th>
                </tr>
              </thead>

              <tbody>
                {commissionDate?.length > 0 && (
                  <tr className="commission-total-row">
                    <td className=" commission-name-cell">Total</td>
                    <td></td>
                    <td className="commission-value commission-value-success">
                      {totals.mMatch.toFixed(2)}
                    </td>
                    <td className="commission-value commission-value-success">
                      {totals.mSession.toFixed(2)}
                    </td>
                    <td className="commission-value commission-value-success">
                      {totals.mCasino.toFixed(2)}
                    </td>
                    <td className="commission-value commission-value-success">
                      {mTotalData.toFixed(2)}
                    </td>
                    <td className="commission-value commission-value-danger">
                      {totals.dMatch.toFixed(2)}
                    </td>
                    <td className="commission-value commission-value-danger">
                      {totals.dSession.toFixed(2)}
                    </td>
                    <td className="commission-value commission-value-danger">
                      {totals.dCasino.toFixed(2)}
                    </td>
                    <td className="commission-value commission-value-danger">
                      {dTotalData.toFixed(2)}
                    </td>
                    <td
                      className={`commission-value ${
                        balanceTotal < 0
                          ? "commission-value-danger"
                          : "commission-value-bacha"
                      }`}>
                      {balanceTotal.toFixed(2)}
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
                        <td className="commission-sticky-cell commission-name-cell">
                          {item.matchName}
                        </td>
                        <td className="commission-date-cell">
                          {item.date
                            ? moment(new Date(item.date)).format(
                                "DD-MM-YYYY hh:mm A",
                              )
                            : "--"}
                        </td>
                        <td className="commission-value commission-value-success">
                          {item.matchCommMila?.toFixed(2)}
                        </td>
                        <td className="commission-value commission-value-success">
                          {item.sessionCommMila?.toFixed(2)}
                        </td>
                        <td className="commission-value commission-value-success">
                          {item.casinoCommMila?.toFixed(2)}
                        </td>
                        <td className="commission-value commission-value-success">
                          {matchTotal.toFixed(2)}
                        </td>
                        <td className="commission-value commission-value-danger">
                          {item.matchCommDena?.toFixed(2)}
                        </td>
                        <td className="commission-value commission-value-danger">
                          {item.sessionCommDena?.toFixed(2)}
                        </td>
                        <td className="commission-value commission-value-danger">
                          {item.casinoCommDena?.toFixed(2)}
                        </td>
                        <td className="commission-value commission-value-danger">
                          {denaTotal.toFixed(2)}
                        </td>
                        <td
                          className={`commission-value ${
                            commB < 0
                              ? "commission-value-danger"
                              : "commission-value-bacha"
                          }`}>
                          {commB.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="commission-empty-cell" colSpan={11}>
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                          <span>
                            <strong>No commission details found</strong>
                            <small>
                              There are no commission records available for this
                              selection.
                            </small>
                          </span>
                        }
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

UserCommissionModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModals: PropTypes.func.isRequired,
  commissionDate: PropTypes.array,
  loading: PropTypes.bool,
};

export default UserCommissionModal;
