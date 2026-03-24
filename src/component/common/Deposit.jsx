import { useEffect } from "react";
import { Button, Form, InputNumber, Modal, Spin } from "antd";
import "./Deposit.scss";
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

  useEffect(() => {
    if (!isDepositeModalOpen) {
      form.resetFields();
    }
  }, [isDepositeModalOpen, form]);

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
        className="modal_deposit"
        destroyOnClose
        title={
          <h1>
            <span>{datadeposit?.isDeposit ? "Deposit" : "Withdraw"}</span>
          </h1>
        }
        open={isDepositeModalOpen}
        onOk={handleDepositeOk}
        onCancel={handleDepositeCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}>
        <div>
          {isLoading && (
            <>
              <Spin className="spin_icon comp_spin" size="large"></Spin>
            </>
          )}

          <div>
            <p style={{ fontSize: "28px" }}>
              Curr Coins :{" "}
              <span
                className={
                  datadeposit?.balance < 0 ? "text_danger" : "text_success"
                }>
                {userType == 1
                  ? (
                      Number(datadeposit?.balance) +
                      Number(datadeposit?.balanceWithPnl) -
                      Number(datadeposit?.liability?.toFixed(2) || 0)
                    )?.toFixed()
                  : (
                      Number(datadeposit?.balance) +
                      Number(datadeposit?.balanceWithPnl)
                    )?.toFixed()}
              </span>{" "}
            </p>
          </div>
          <div className="form_modals">
            <Form onFinish={onFinish} form={form} autoComplete="off">
              <Form.Item
                required
                name="number"
                rules={[
                  {
                    required: true,
                    message: "Please enter valid Coins",
                  },
                ]}>
                <InputNumber
                  type="number"
                  className="number_field"
                  style={{ width: "100%", background: "#fff" }}
                  placeholder="Enter Coins"
                  min={0}
                  step={1}
                />
              </Form.Item>

              <div className="deposit_btn">
                <Form.Item>
                  <Button
                    className="gx-bg-grey"
                    onClick={() => handleClose()}
                    type="primary">
                    Return
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
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

export default Deposit;
