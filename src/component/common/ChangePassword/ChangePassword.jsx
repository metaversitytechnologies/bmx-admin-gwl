import { Button, Form, Input, message } from "antd";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../store/service/supermasteAccountStatementServices";

const ChangePassword = ({ setIsModalOpen }) => {
  const [trigger, { data: chnagePassdata, error, isLoading }] =
    useChangePasswordMutation();

  const nav = useNavigate();

  const renderPasswordIcon = (visible) => (
    <span
      className="change-password-eye"
      role="button"
      tabIndex={-1}
      aria-label={visible ? "Hide password" : "Show password"}>
      {visible ? (
        <EyeOff size={17} strokeWidth={1.9} />
      ) : (
        <Eye size={17} strokeWidth={1.9} />
      )}
    </span>
  );

  const onFinish = (values) => {
    if (values?.newpassword !== values?.confirmpassword) {
      message.error("Confirm Password do not match!");
      return;
    }
    const chnagePassdata = {
      currentPassword: values?.password,
      newPassword: values?.newpassword,
    };

    trigger(chnagePassdata);
  };

  useEffect(() => {
    if (chnagePassdata?.status) {
      message.success(chnagePassdata?.message);
      localStorage.clear();
      setIsModalOpen(false);
      nav("/");
    } else if (chnagePassdata?.status === false || error?.status === 400) {
      message.error(chnagePassdata?.message || error?.data?.message);
    }
  }, [chnagePassdata, error, nav, setIsModalOpen]);

  return (
    <div className="change-password-shell">
      <header className="change-password-header">
        <span className="change-password-header-icon">
          <LockKeyhole size={20} strokeWidth={1.9} />
        </span>
        <div>
          <h2>Change Password</h2>
          <p>Update your account password</p>
        </div>
      </header>

      <Form
        className="change-password-form"
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          remember: true,
        }}>
        <Form.Item
          label="Current Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password
            className="change-password-input"
            placeholder="Enter current password"
            prefix={<LockKeyhole size={17} strokeWidth={1.9} />}
            iconRender={renderPasswordIcon}
          />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newpassword"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}>
          <Input.Password
            className="change-password-input"
            placeholder="Enter new password"
            prefix={<LockKeyhole size={17} strokeWidth={1.9} />}
            iconRender={renderPasswordIcon}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmpassword"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}>
          <Input.Password
            className="change-password-input"
            placeholder="Confirm new password"
            prefix={<LockKeyhole size={17} strokeWidth={1.9} />}
            iconRender={renderPasswordIcon}
          />
        </Form.Item>

        <div className="change_button">
          <Form.Item>
            <Button
              onClick={() => setIsModalOpen(false)}
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
  );
};

ChangePassword.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};

export default ChangePassword;
