import { Button, Modal, message } from "antd";
import { useGetUpdatePasswordMutation } from "../../store/service/userlistService";
import { useParams } from "react-router-dom";

const ResetPassword = ({
  isDepositeModalOpen,
  setOpenResetPass,
  data,
  userId,
}) => {
  const subdomain = window.location.hostname.split(".")[1];
  const sub = window.location.hostname.split(".")[2];
  const domainLink = {
    1: `https://${subdomain}.${sub}`,
    2: `https://agent.${subdomain}.${sub}`,
    3: `https://super.${subdomain}.${sub}`,
    4: `https://master.${subdomain}.${sub}`,
    5: `https://madmin.${subdomain}.${sub}`,
    6: `https://admin.${subdomain}.${sub}`,
  };
  const [trigger, { isLoading }] = useGetUpdatePasswordMutation();

  const { userTyep } = useParams();

  const handleDepositeCancel = () => {
    setOpenResetPass(false);
  };

  const handleDepositeOk = async () => {
    const payload = {
      userId,
      newPassword: data?.password,
      otp: data?.otp,
    };

    try {
      await trigger(payload).unwrap();

      const passwordText = `New Password
LINK : ${domainLink[Number(userTyep)]}
ID   : ${userId}
PW   : ${data?.password}
OTP  : ${data?.otp}`;

      await navigator.clipboard.writeText(passwordText);

      message.success("Password updated and copied to clipboard!");
      setOpenResetPass(false);
    } catch (error) {
      console.error("Error updating password:", error);
      message.error("Failed to update password.");
    }
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
      confirmLoading={isLoading}
      footer={[
        <Button
          key="ok"
          className="pri_button"
          type="primary"
          onClick={handleDepositeOk}
          loading={isLoading}>
          Save & Copy
        </Button>,
        <Button
          key="cancel"
          className="pri_button gx-bg-grey"
          onClick={handleDepositeCancel}>
          Cancel
        </Button>,
      ]}>
      <textarea
        style={{ width: "100%" }}
        rows={7}
        readOnly
        className="ant-input"
        value={`New Password
LINK : super.antpro99.pro
ID   : ${userId}
PW   : ${data?.password}
OTP  : ${data?.otp}`}
      />
    </Modal>
  );
};

export default ResetPassword;
