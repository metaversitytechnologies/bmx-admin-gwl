import { Button, Modal, message } from "antd";
import { useGetUpdatePasswordMutation } from "../../store/service/userlistService";
import { useParams } from "react-router-dom";
import { convertCode } from "../../store/constant";

const ResetPassword = ({
  isDepositeModalOpen,
  setOpenResetPass,
  data,
  userId,
  userType,
}) => {
  const subdomain = window.location.hostname.split(".")[1];
  const sub = window.location.hostname.split(".")[2];
  const domainLink = {
    1: `${subdomain}.${sub}`,
    2: `agent.${subdomain}.${sub}`,
    3: `super.${subdomain}.${sub}`,
    4: `master.${subdomain}.${sub}`,
    5: `madmin.${subdomain}.${sub}`,
    6: `admin.${subdomain}.${sub}`,
  };

  const [trigger, { isLoading }] = useGetUpdatePasswordMutation();
  const { userTyep } = useParams(); // Not used, but kept if you need later

  const handleDepositeCancel = () => {
    setOpenResetPass(false);
  };

  // Fallback for iOS / Safari
  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // avoid scrolling to bottom
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
      message.success("Copied using fallback method!");
    } catch (err) {
      message.error("Copy not supported on this browser.");
    }
    document.body.removeChild(textarea);
  };

  const handleDepositeOk = async () => {
    const payload = {
      userId,
      newPassword: data?.password,
      otp: data?.otp,
    };

    let passwordText = `New Password
LINK : ${domainLink[Number(userType)]}
ID   : ${convertCode(userId)}
PW   : ${data?.password}`;

    if (Number(userType) !== 1) {
      passwordText += `\nOTP  : ${data?.otp}`;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(passwordText);
      } else {
        fallbackCopy(passwordText);
      }
      message.success("Copied to clipboard!");
    } catch (err) {
      console.error("Clipboard error:", err);
      fallbackCopy(passwordText);
    }

    // Call API after copy
    try {
      const res = await trigger(payload).unwrap();
      if (res?.status) {
        // message.success("Password updated!");
        setOpenResetPass(false);
      } else {
        message.error(res?.message || "Failed to update password");
      }
    } catch (err) {
      console.error("API error:", err);
      message.error("Something went wrong while updating password.");
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
        style={{ width: "100%", fontSize: "14px" }}
        rows={Number(userType) !== 1 ? 7 : 5}
        readOnly
        className="ant-input"
        value={`New Password
LINK : ${domainLink[Number(userType)]}
ID   : ${convertCode(userId)}
PW   : ${data?.password}${
          Number(userType) !== 1 ? `\nOTP  : ${data?.otp}` : ""
        }`}
      />
    </Modal>
  );
};

export default ResetPassword;
