import { Button, Modal } from "antd";

const ResetPassword = ({ isDepositeModalOpen, setOpenResetPass }) => {
  const handleDepositeOk = () => {};
  const handleDepositeCancel = () => {
    setOpenResetPass(!isDepositeModalOpen);
  };
  return (
    <Modal
      className="modal_reset_pass"
      destroyOnClose
      title={
        <h1>
          <span>Reset Password</span>
        </h1>
      }
      open={isDepositeModalOpen}
      onOk={handleDepositeOk}
      onCancel={handleDepositeCancel}
      footer={[
        <Button key="ok" className="pri_button" type="primary" onClick={handleDepositeOk}>
          Save & Copy
        </Button>,
        <Button key="cancel" className="pri_button gx-bg-grey" onClick={handleDepositeCancel}>
          Cancel
        </Button>,
      ]}>
      <textarea
        style={{
          width: "100%",
        }}
        rows={7}
        readOnly=""
        className="ant-input"
        defaultValue={
          "  New Password\n  LINK : super.antpro99.pro\n  ID : SA6800\n  PW : 9A9K6S\n  OTP: 431031\n  "
        }
      />
    </Modal>
  );
};

export default ResetPassword;
