import { Button, Form, InputNumber, Modal, Spin } from "antd";
import { openNotification, openNotificationError } from "../../../App";
import { useSelfDepositMutation } from "../../../store/service/userlistService";
const SelfDeposit = ({ isDepositeModalOpen, setIsDepositeModalOpen }) => {
  const [form] = Form.useForm();

  const [trigger, { isLoading }] = useSelfDepositMutation();

  const onFinish = async (values) => {
    try {
      const response = await trigger({
        amount: Number(values?.number),
      }).unwrap();
      if (response.status) {
        openNotification(response.message);
        form.resetFields();
        setIsDepositeModalOpen(false);
      } else {
        openNotificationError(response.message || "Unexpected Error");
        setIsDepositeModalOpen(false);
      }
    } catch (err) {
      openNotificationError(err?.data?.message || "Request failed");
    }
  };

  const handleClose = () => {
    setIsDepositeModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        className="modal_deposit"
        destroyOnClose
        title={<h1>Self Deposit</h1>}
        open={isDepositeModalOpen}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null} 
        onCancel={() => handleClose()}>
        <div>
          {isLoading && (
            <>
              <Spin className="spin_icon comp_spin" size="large"></Spin>
            </>
          )}

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
    </>
  );
};

export default SelfDeposit;
