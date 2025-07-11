import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, Modal, Spin } from "antd";
import "./Deposit.scss";
import {
  useDepositAndWithdrawQuery,
  useWithdrawMutation,
} from "../../store/service/userlistService";
import { openNotification, openNotificationError } from "../../App";

const Withdraw = ({
  data: datadeposit,
  handleClose,
  setClientDataState,
  userIdData,
  WithdrawnModal,
  handleDepositeOk,
  handleDepositeCancel,
}) => {
  const [form] = Form.useForm();

  const [trigger, { data, error, isLoading }] = useWithdrawMutation();
  const { data: depositeWithdraw } = useDepositAndWithdrawQuery({
    userId: datadeposit,
  });

  const onFinish = (values) => {
    const withdrawData = {
      amount: Number(values?.number),
      remark: "credit withdraw",
      lupassword: values?.password,
      userId: userIdData,
    };
    trigger(withdrawData);
    form?.resetFields();
  };

  useEffect(() => {
    if (data?.status === true) {
      openNotification(data?.message);
      setClientDataState(true);
      form?.resetFields();
      handleClose();
    } else if (data?.status === false || error?.data?.message) {
      openNotificationError(data?.message || error?.data?.message);
      handleClose();
    }
  }, [data?.data, error]);

  return (
    <>
      <Modal
        className="modal_deposit"
        destroyOnClose
        title={
          <h1>
            <span>Withdraw </span>
          </h1>
        }
        open={WithdrawnModal}
        onOk={handleDepositeOk}
        onCancel={() => SetWithdrawnModal(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}>
        <div className="ant-spin-nested-loading">
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
                  depositeWithdraw?.data?.childUplineAmount < 0
                    ? "text_danger"
                    : "text_success"
                }>
                {depositeWithdraw?.data?.childUplineAmount}
              </span>
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
                  min={0}
                  step={1}
                  placeholder="Enter Coins"
                />
              </Form.Item>

              <div className="deposit_btn">
                <Form.Item>
                  <Button onClick={() => handleClose()} type="primary">
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
    </>
  );
};

export default Withdraw;
