import "./Signin.scss";
import { Button, Form, Input, message } from "antd";
import { useLoginMutation } from "../../../store/service/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = ({ logo }) => {
  const [trigger, { data: authData, error, isLoading }] = useLoginMutation();
  const nav = useNavigate();

  const [showOtp, setShowOtp] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  console.log(authData?.token, "authDataauthData");

  useEffect(() => {
    if (authData?.status === false || error?.data?.message) {
      message.error(authData?.message || error.data?.message);
    } else if (authData?.token) {
      setShowOtp(true);
      localStorage.setItem("token", authData?.token);
      localStorage.setItem("rulesStatus", true);
      localStorage.setItem("userId", authData?.userId);
      localStorage.setItem("userType", authData?.userTypeInfo);
      localStorage.setItem("username", authData?.username);

    }
  }, [authData, error, otpValue]);

  const onFinish = (values) => {
    if (!showOtp) {
      const authPayload = {
        userId: values?.username?.trim(),
        password: values?.password?.trim(),
        url: "superadmin.fastbet365.in",
      };
      trigger(authPayload);

    } else {
      if (!values?.OTP || values.OTP.toString().length < 4) {
        console.log(values, "valuesvalues")
        nav("/dashboard");
        return;
      }
      setOtpValue(values.OTP);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      nav("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            {isLoading ? (
              <>
                <div className="main_loading_section"> </div>
                <div className="loading_image">
                  <img src="/Images/loaderfast.svg" alt="helllo" />
                </div>
              </>
            ) : null}

            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg" />
              <div className="gx-app-logo-wid">
                <h1>
                  <span>Sign In</span>
                </h1>
                <p>
                  <span>
                    By Signing Up, you can avail full features of our services.
                  </span>
                </p>
              </div>
              <div className="gx-app-logo">
                <img
                  alt="example"
                  src={"https://master.antpro99.pro/assets/images/antpro.png"}
                />
              </div>
            </div>

            <div className="gx-app-login-content">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "The input is not valid user ID!",
                    },
                  ]}>
                  <Input
                    onChange={onFinishFailed}
                    onFocus={onFinishFailed}
                    onMouseEnter={onFinishFailed}
                    placeholder="User ID"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}>
                  <Input
                    type="password"
                    onMouseLeave={onFinishFailed}
                    onFocus={onFinishFailed}
                    onChange={onFinishFailed}
                    placeholder="Password"
                  />
                </Form.Item>

                {showOtp && (
                  <Form.Item
                    name="OTP"
                    rules={[
                      {
                        required: true,
                        message: "Please input Otp!",
                      },
                    ]}>
                    <Input
                      type="number"
                      placeholder="OTP"
                      onChange={onFinishFailed}
                      onFocus={onFinishFailed}
                      onMouseLeave={onFinishFailed}
                    />
                  </Form.Item>
                )}

                <Form.Item className="sign_btn">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginBottom: "0px" }}>
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>

          <div className="gx-text-center gx-py-2 gx-font-weight-bold gx-fs-lg gx-text-white">
            Note- This Website Is Not For Indian Territory
          </div>
          <div
            className="gx-text-red gx-text-center gx-fs-xl gx-font-weight-bold"
            style={{ marginTop: "12px" }}>
            18+ Only
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
