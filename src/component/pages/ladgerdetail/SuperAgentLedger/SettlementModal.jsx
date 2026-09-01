import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useCreateLedgerMutation } from "../../../../store/service/supermasteAccountStatementServices";
import { convertCode } from "../../../../store/constant";
import { useEffect } from "react";
import { openNotification, openNotificationError } from "../../../../App";
import {
  Banknote,
  Coins,
  FileText,
  HandCoins,
  Send,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import PropTypes from "prop-types";

const SettlementModal = ({
  handleClose,
  isDepositeModalOpen,
  handleDepositeOk,
  reportData,
  setReportData,
  refetch,
}) => {
  const [form] = Form.useForm();
  const [createTran, { data: createTranstions, error, isLoading }] =
    useCreateLedgerMutation();

  const handleLenaDena = (type) => {
    setReportData((prev) => ({
      ...prev,
      remark: "",
      itemName: type,
    }));
  };

  const handleModalClose = () => {
    handleClose();
    form.resetFields();
  };

  const handleToggleLedgerType = () => {
    handleLenaDena(reportData?.itemName === "Lena" ? "Dena" : "Lena");
  };

  const isLena = reportData?.itemName === "Lena";
  const settlementLabel = isLena ? "Credit (Lena)" : "Debit (Dena)";

  const onFinish = async (values) => {
    const payload = {
      userId: reportData?.userId,
      collection: "CA1 CASH",
      amount: Number(values?.settledAmount),
      paymentType:
        reportData?.itemName === "Lena" ? "payment - lena" : "payment - dena",
      remark: values?.remark,
    };

    createTran(payload);
  };

  useEffect(() => {
    if (createTranstions?.status) {
      openNotification(createTranstions?.message);
      refetch();
      handleClose();
      form.resetFields();
    } else if (createTranstions?.status === false || error?.data?.message) {
      openNotificationError(createTranstions?.message || error?.data?.message);
    }
  }, [createTranstions, error, form]);

  // ✅ Added effect to update form values when reportData changes
  useEffect(() => {
    if (reportData) {
      form.setFieldsValue({
        userId: convertCode(reportData?.userId),
        closingBalance: reportData?.closinBalane,
        settledAmount: reportData?.settledAmount,
        remark: reportData?.remark,
      });
    }
  }, [reportData, form]);

  return (
    <>
      <Modal
        className="modal_deposit settlement-modal"
        rootClassName="settlement-modal-root"
        destroyOnClose
        title={null}
        closeIcon={null}
        width={840}
        style={{ maxWidth: "calc(100vw - 32px)" }}
        open={isDepositeModalOpen}
        onOk={handleDepositeOk}
        onCancel={handleModalClose}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}
        maskStyle={{
          backgroundColor: "rgba(15, 18, 32, 0.54)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}>
        <div className="settlement-modal-shell">
          <div className="settlement-modal-header">
            <div className="settlement-modal-heading">
              <span className="settlement-modal-icon" aria-hidden="true">
                <HandCoins size={28} strokeWidth={2.2} />
              </span>
              <div>
                <h2>Settlement</h2>
                <p>Settle account balance securely</p>
              </div>
            </div>
            {/* <button
              aria-label="Close settlement modal"
              className="settlement-modal-close"
              type="button"
              onClick={handleModalClose}>
              <X size={24} strokeWidth={2} />
            </button> */}
          </div>

          <Form
            onFinish={onFinish}
            form={form}
            autoComplete="off"
            className="settlement-form"
            initialValues={{
              userId: convertCode(reportData?.userId),
              closingBalance: reportData?.closinBalane,
              settledAmount: reportData?.settledAmount,
              remark: reportData?.remark,
            }}>
            <div className="settlement-modal-body">
              <Form.Item name="userId" hidden>
                <Input />
              </Form.Item>

              <section className="settlement-account-panel">
                <span className="settlement-account-avatar" aria-hidden="true">
                  <UserRound size={28} strokeWidth={2.1} />
                </span>
                <div className="settlement-account-copy">
                  <span>Account</span>
                  <strong>{convertCode(reportData?.userId)}</strong>
                </div>
                <span
                  className={`settlement-status-pill ${
                    isLena ? "is-lena" : "is-dena"
                  }`}>
                  <span aria-hidden="true" />
                  {settlementLabel}
                </span>
              </section>

              <div className="settlement-form-grid">
                <div className="settlement-field">
                  <label htmlFor="settlement-closing-balance">
                    Amount <span>*</span>
                  </label>
                  <div className="settlement-input-shell is-disabled">
                    <span className="settlement-input-icon" aria-hidden="true">
                      <Banknote size={20} strokeWidth={2} />
                    </span>
                    <Form.Item
                      required
                      name="closingBalance"
                      rules={[
                        {
                          required: true,
                          message: "Please enter valid Coins",
                        },
                      ]}>
                      <InputNumber
                        id="settlement-closing-balance"
                        type="number"
                        className="settlement-input-number"
                        placeholder="Enter amount"
                        min={0}
                        step={1}
                        disabled
                        controls={false}
                      />
                    </Form.Item>
                    <button
                      className={`settlement-inline-pill ${
                        isLena ? "is-lena" : "is-dena"
                      }`}
                      type="button"
                      onClick={handleToggleLedgerType}>
                      {settlementLabel}
                    </button>
                  </div>
                </div>

                <div className="settlement-field">
                  <label htmlFor="settlement-settled-amount">
                    Settled Amount <span>*</span>
                  </label>
                  <div className="settlement-input-shell">
                    <span className="settlement-input-icon" aria-hidden="true">
                      <Coins size={20} strokeWidth={2} />
                    </span>
                    <Form.Item
                      required
                      name="settledAmount"
                      rules={[
                        {
                          required: true,
                          message: "Please enter valid Coins",
                        },
                      ]}>
                      <InputNumber
                        id="settlement-settled-amount"
                        type="number"
                        className="settlement-input-number"
                        placeholder="Enter amount"
                        min={0}
                        step={1}
                        controls={false}
                      />
                    </Form.Item>
                    <button
                      className={`settlement-inline-pill ${
                        isLena ? "is-lena" : "is-dena"
                      }`}
                      type="button"
                      onClick={handleToggleLedgerType}>
                      {settlementLabel}
                    </button>
                  </div>
                </div>

                <div className="settlement-field">
                  <label htmlFor="settlement-remark">Remark</label>
                  <div className="settlement-textarea-shell">
                    <span className="settlement-textarea-icon" aria-hidden="true">
                      <FileText size={20} strokeWidth={2} />
                    </span>
                    <Form.Item
                      required
                      name="remark"
                      rules={[
                        {
                          required: true,
                          message: "Please enter valid Coins",
                        },
                      ]}>
                      <Input.TextArea
                        id="settlement-remark"
                        className="settlement-textarea"
                        placeholder="Enter remark"
                      />
                    </Form.Item>
                  </div>
                </div>

                <section className="settlement-important-card">
                  <span className="settlement-important-icon" aria-hidden="true">
                    <ShieldCheck size={30} strokeWidth={2.1} />
                  </span>
                  <div>
                    <h3>Important</h3>
                    <p>Please verify the settlement details before submitting.</p>
                  </div>
                </section>
              </div>
            </div>

            <div className="settlement-modal-footer">
              <Button
                className="settlement-return-button"
                onClick={() => handleClose()}>
                Return
              </Button>
              <Button
                className="approved-primary-button settlement-submit-button"
                loading={isLoading}
                type="primary"
                htmlType="submit">
                <Send size={18} strokeWidth={2.2} />
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

SettlementModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isDepositeModalOpen: PropTypes.bool.isRequired,
  handleDepositeOk: PropTypes.func,
  reportData: PropTypes.shape({
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    closinBalane: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    settledAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    remark: PropTypes.string,
    itemName: PropTypes.string,
  }),
  setReportData: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default SettlementModal;
