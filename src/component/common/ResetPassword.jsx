import { Button, Modal, message } from "antd";
import {
  BadgeCheck,
  Globe2,
  LockKeyhole,
  RotateCcwKey,
  ShieldCheck,
  Undo2,
  Save,
  X,
} from "lucide-react";
import PropTypes from "prop-types";
import { useGetUpdatePasswordMutation } from "../../store/service/userlistService";
import { convertCode } from "../../store/constant";
import CredentialRow from "./CredentialRow";

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
    let succeeded = false;
    try {
      document.execCommand("copy");
      succeeded = true;
    } catch (err) {
      succeeded = false;
    }
    document.body.removeChild(textarea);
    return succeeded;
  };

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      return fallbackCopy(text);
    } catch (err) {
      return fallbackCopy(text);
    }
  };

  // Presentation-only guard: the link is built from window.location.hostname
  // exactly as before. When the hostname doesn't have enough dot-separated
  // segments (e.g. localhost, an IP, or a bare domain), the pieces come back
  // undefined and used to render literally as "admin.undefined.undefined".
  // No alternate link field exists anywhere in the API response, so rather
  // than invent a domain we fall back to a safe message — same underlying
  // construction, just guarded before use.
  const rawLink = domainLink[Number(userType)];
  const linkValue =
    subdomain && sub && rawLink && !rawLink.includes("undefined")
      ? rawLink
      : "";
  const linkDisplay = linkValue || "Link unavailable";

  const idValue = convertCode(userId);
  const showOtp = Number(userType) !== 1;

  const handleDepositeOk = async () => {
    const payload = {
      userId,
      newPassword: data?.password,
      otp: data?.otp,
    };

    let passwordText = `New Password
LINK : ${linkDisplay}
ID   : ${idValue}
PW   : ${data?.password}`;

    if (showOtp) {
      passwordText += `\nOTP  : ${data?.otp}`;
    }

    const copied = await copyText(passwordText);
    if (copied) {
      message.success("Copied to clipboard!");
    } else {
      message.error("Copy not supported on this browser.");
    }

    // Call API after copy
    try {
      const res = await trigger(payload).unwrap();
      if (res?.status) {
        setOpenResetPass(false);
      } else {
        message.error(res?.message || "Failed to update password");
      }
    } catch (err) {
      message.error("Something went wrong while updating password.");
    }
  };

  const isPending = isDepositeModalOpen && !data;

  const rows = [
    {
      key: "link",
      label: "LINK",
      value: linkDisplay,
      icon: Globe2,
      ariaLabel: "Copy link",
    },
    {
      key: "id",
      label: "ID",
      value: idValue || "—",
      icon: BadgeCheck,
      ariaLabel: "Copy user ID",
    },
    {
      key: "pw",
      label: "PW",
      value: data?.password || "—",
      icon: LockKeyhole,
      ariaLabel: "Copy password",
    },
  ];
  if (showOtp) {
    rows.push({
      key: "otp",
      label: "OTP",
      value: data?.otp || "—",
      icon: ShieldCheck,
      ariaLabel: "Copy OTP",
    });
  }

  return (
    <Modal
      className="approved-deposit-modal approved-reset-modal"
      width={550}
      destroyOnClose
      title={
        <div className="approved-deposit-header">
          <span className="approved-deposit-header-icon">
            <RotateCcwKey size={22} strokeWidth={1.8} />
          </span>
          <div>
            <h2>Reset Password</h2>
            <p>Here are the new credentials for the user</p>
          </div>
        </div>
      }
      open={isDepositeModalOpen}
      onCancel={handleDepositeCancel}
      closeIcon={<X size={19} strokeWidth={1.8} />}
      footer={null}>
      <div className="approved-deposit-content approved-reset-content">
        <div className="approved-credential-panel">
          <div className="approved-credential-heading">
            <LockKeyhole size={13} strokeWidth={2} />
            New Credentials
          </div>

          <div className="approved-credential-rows">
            {isPending
              ? Array.from({ length: showOtp ? 4 : 3 }).map((_, index) => (
                  <div
                    className="approved-credential-row is-skeleton"
                    key={index}>
                    <span className="approved-credential-skeleton-icon" />
                    <span className="approved-credential-skeleton-line" />
                  </div>
                ))
              : rows.map((row) => (
                  <CredentialRow
                    key={row.key}
                    icon={row.icon}
                    label={row.label}
                    value={row.value}
                    ariaLabel={row.ariaLabel}
                    onCopy={copyText}
                  />
                ))}
          </div>
        </div>

        <div className="deposit_btn">
          <Button
            className="gx-bg-grey approved-deposit-return"
            onClick={handleDepositeCancel}>
            <Undo2 size={15} strokeWidth={1.8} />
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleDepositeOk}
            loading={isLoading}
            className="approved-deposit-submit">
            <Save size={15} strokeWidth={1.9} />
            Save &amp; Copy
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ResetPassword.propTypes = {
  isDepositeModalOpen: PropTypes.bool.isRequired,
  setOpenResetPass: PropTypes.func.isRequired,
  data: PropTypes.shape({
    password: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    otp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ResetPassword;
