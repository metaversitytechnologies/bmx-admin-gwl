import { Button, Form, InputNumber, Modal, Spin } from "antd";
import PropTypes from "prop-types";
import { Coins, WalletCards } from "lucide-react";
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
        className="modal_deposit self-deposit-modal"
        rootClassName="self-deposit-modal-root"
        destroyOnClose
        title={null}
        width={580}
        open={isDepositeModalOpen}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}
        onCancel={() => handleClose()}>
        <div className="self-deposit-shell">
          {isLoading && (
            <>
              <Spin className="spin_icon comp_spin" size="large"></Spin>
            </>
          )}

          <header className="self-deposit-header">
            <span className="self-deposit-header-icon">
              <WalletCards size={20} strokeWidth={1.9} />
            </span>
            <div>
              <h2>Self Deposit</h2>
              <p>Enter the coins you want to deposit</p>
            </div>
          </header>

          <div className="form_modals self-deposit-body">
            <Form
              className="self-deposit-form"
              layout="vertical"
              onFinish={onFinish}
              form={form}
              autoComplete="off">
              <Form.Item
                label="Coins"
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
                  className="number_field self-deposit-input"
                  style={{ width: "100%" }}
                  placeholder="Enter Coins"
                  prefix={<Coins size={18} strokeWidth={1.9} />}
                  min={0}
                  step={1}
                />
              </Form.Item>
              <div className="change_button">
                <Form.Item>
                  <Button
                    onClick={() => handleClose()}
                    className="return"
                    htmlType="button">
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

SelfDeposit.propTypes = {
  isDepositeModalOpen: PropTypes.bool.isRequired,
  setIsDepositeModalOpen: PropTypes.func.isRequired,
};

export default SelfDeposit;
