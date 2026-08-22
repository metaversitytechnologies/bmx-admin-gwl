import { Button, Form, InputNumber, Modal, Spin } from "antd";
import {
  ArrowLeft,
  Check,
  CircleDollarSign,
  Coins,
  Wallet,
  X,
} from "lucide-react";
import PropTypes from "prop-types";

import { openNotification, openNotificationError } from "../../App";
import { useLazyDepositAndWithdrawQuery } from "../../store/service/supermasteAccountStatementServices";

const Deposit = ({
  data: datadeposit,
  handleClose,
  isDepositeModalOpen,
  handleDepositeOk,
  handleDepositeCancel,
  fetchData,
  userType,
}) => {
  const [form] = Form.useForm();

  const [trigger, { isLoading }] = useLazyDepositAndWithdrawQuery();
  const currentBalance =
    userType == 1
      ? (
          Number(datadeposit?.balance) +
          Number(datadeposit?.balanceWithPnl) -
          Number(datadeposit?.liability?.toFixed(2) || 0)
        )?.toFixed()
      : (
          Number(datadeposit?.balance) + Number(datadeposit?.balanceWithPnl)
        )?.toFixed();
  const formattedBalance = Number(currentBalance || 0).toLocaleString("en-IN");
  const modalTitle = datadeposit?.isDeposit
    ? "Deposit Coins"
    : "Withdraw Coins";
  const modalSubtitle = datadeposit?.isDeposit
    ? "Add coins to your current balance"
    : "Withdraw coins from your current balance";

  const onFinish = async (values) => {
    const depositData = {
      userId: datadeposit?.userId,
      limit: Number(values?.number),
      limitPlus: datadeposit.isDeposit ? true : false,
      limitInCash: false,
    };

    try {
      const response = await trigger(depositData).unwrap();
      if (response.status) {
        openNotification(response.message);
        form.resetFields();
        handleClose();
        fetchData();
      } else {
        openNotificationError(response.message || "Unexpected Error");
        handleClose();
      }
    } catch (err) {
      openNotificationError(err?.data?.message || "Request failed");
      handleClose();
    }
  };

  return (
    <>
      <Modal
        size="small"
        className={`modal_deposit approved-deposit-modal ${
          datadeposit?.isDeposit ? "" : "approved-withdraw-modal"
        }`}
        destroyOnClose
        title={
          <div className="approved-deposit-header">
            <span className="approved-deposit-header-icon">
              <Coins size={23} strokeWidth={1.8} />
            </span>
            <div>
              <h2>{modalTitle}</h2>
              <p>{modalSubtitle}</p>
            </div>
          </div>
        }
        open={isDepositeModalOpen}
        onOk={handleDepositeOk}
        onCancel={handleDepositeCancel}
        closeIcon={<X size={20} strokeWidth={1.8} />}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}>
        <div className="approved-deposit-content">
          {isLoading && (
            <>
              <Spin className="spin_icon comp_spin" size="large"></Spin>
            </>
          )}

          <div className="approved-deposit-balance-card">
            <div className="approved-deposit-balance-copy">
              <p>Current Balance</p>
              <div className="approved-deposit-balance-row">
                <strong
                  className={
                    datadeposit?.balance < 0 ? "text_danger" : "text_success"
                  }>
                  {formattedBalance}
                </strong>
                <span>COINS</span>
              </div>
            </div>
            <div className="approved-deposit-wallet-visual" aria-hidden="true">
              <span className="approved-deposit-ring approved-deposit-ring-one" />
              <span className="approved-deposit-ring approved-deposit-ring-two" />
              <span className="approved-deposit-spark approved-deposit-spark-one" />
              <span className="approved-deposit-spark approved-deposit-spark-two" />
              <div className="approved-deposit-wallet">
                <Wallet size={30} strokeWidth={1.5} />
                <span className="approved-deposit-coin-dot">
                  <CircleDollarSign size={18} strokeWidth={2} />
                </span>
              </div>
            </div>
          </div>
          <div className="form_modals">
            <Form onFinish={onFinish} form={form} autoComplete="off">
              <label className="approved-deposit-label" htmlFor="deposit-coins">
                {datadeposit?.isDeposit
                  ? "Enter Coins to Deposit"
                  : "Enter Coins to Withdraw"}
              </label>
              <Form.Item
                required
                name="number"
                rules={[
                  {
                    required: true,
                    message: "Please enter valid Coins",
                  },
                ]}>
                <div className="approved-deposit-input-shell">
                  <span className="approved-deposit-input-icon">
                    <CircleDollarSign size={18} strokeWidth={2} />
                  </span>
                  <InputNumber
                    id="deposit-coins"
                    type="number"
                    className="number_field approved-deposit-input"
                    style={{ width: "100%", background: "#fff" }}
                    placeholder="Enter amount"
                    min={0}
                    step={1}
                  />
                  <span className="approved-deposit-input-suffix">COINS</span>
                </div>
              </Form.Item>

              <div className="deposit_btn">
                <Form.Item>
                  <Button
                    className="gx-bg-grey approved-deposit-return"
                    onClick={() => handleClose()}
                    type="primary">
                    <ArrowLeft size={16} strokeWidth={1.8} />
                    Return
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="approved-deposit-submit">
                    <Check size={16} strokeWidth={1.9} />
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
      {/* {contextHolder} */}
    </>
  );
};

Deposit.propTypes = {
  data: PropTypes.shape({
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    balanceWithPnl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    liability: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isDeposit: PropTypes.bool,
  }),
  handleClose: PropTypes.func.isRequired,
  isDepositeModalOpen: PropTypes.bool.isRequired,
  handleDepositeOk: PropTypes.func.isRequired,
  handleDepositeCancel: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  userType: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default Deposit;
