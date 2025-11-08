import { Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import { useCreateLedgerMutation } from "../../../../store/service/supermasteAccountStatementServices";
import { convertCode, convertCodeReverse } from "../../../../store/constant";
import { useEffect } from "react";
import { openNotification, openNotificationError } from "../../../../App";

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
        className="modal_deposit"
        destroyOnClose
        title={
          <h1>
            <span>Settlement</span>
          </h1>
        }
        width={800}
        open={isDepositeModalOpen}
        onOk={handleDepositeOk}
        onCancel={() => {
          handleClose();
          form.resetFields();
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}>
        <div>
          <div className="form_modals">
            <Form
              onFinish={onFinish}
              form={form}
              autoComplete="off"
              initialValues={{
                userId: convertCode(reportData?.userId),
                closingBalance: reportData?.closinBalane,
                settledAmount: reportData?.settledAmount,
                remark: reportData?.remark,
              }}>
              <Row gutter={[16]}>
                <Col xs={24} md={12}>
                  <div>
                    <p style={{ fontSize: "14px" }}>Account</p>
                  </div>
                  <Form.Item name="userId">
                    <Input
                      type="text"
                      className="number_field"
                      style={{ width: "100%", background: "#fff" }}
                      placeholder="Enter Coins"
                      readOnly
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <p style={{ margin: "0", fontSize: "14px" }}>Amount</p>
                    <Button
                      className="gx-bg-grey"
                      style={{
                        padding: "0px 12px",
                        height: "30px",
                        marginBottom: "5px",
                        background:
                          reportData?.itemName === "Lena" ? "green" : "red",
                      }}
                      onClick={() =>
                        handleLenaDena(
                          reportData?.itemName === "Lena" ? "Dena" : "Lena"
                        )
                      }>
                      {reportData?.itemName === "Lena"
                        ? " Credit(Lena)"
                        : "Debit(Dena)"}
                    </Button>
                  </div>
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
                      type="number"
                      className="number_field"
                      style={{ width: "100%", background: "#fff" }}
                      placeholder="Enter Coins"
                      min={0}
                      step={1}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <p style={{ margin: "0", fontSize: "14px" }}>
                      Settled Amount
                    </p>
                    <Button
                      className="gx-bg-grey"
                      style={{
                        padding: "0px 12px",
                        height: "30px",
                        marginBottom: "5px",
                        background:
                          reportData?.itemName === "Lena" ? "green" : "red",
                      }}
                      onClick={() =>
                        handleLenaDena(
                          reportData?.itemName === "Lena" ? "Dena" : "Lena"
                        )
                      }>
                      {reportData?.itemName === "Lena"
                        ? " Credit(Lena)"
                        : "Debit(Dena)"}
                    </Button>
                  </div>
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
                      type="number"
                      className="number_field"
                      style={{ width: "100%", background: "#fff" }}
                      placeholder="Enter Coins"
                      min={0}
                      step={1}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <div>
                    <p style={{ fontSize: "14px" }}>Remark</p>
                  </div>

                  <Form.Item
                    required
                    name="remark"
                    rules={[
                      {
                        required: true,
                        message: "Please enter valid Coins",
                      },
                    ]}>
                    <Input
                      type="text"
                      className="number_field"
                      style={{ width: "100%", background: "#fff" }}
                      placeholder="Enter Remark"
                    />
                  </Form.Item>
                </Col>
              </Row>

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
                  <Button loading={isLoading} type="primary" htmlType="submit">
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

export default SettlementModal;
