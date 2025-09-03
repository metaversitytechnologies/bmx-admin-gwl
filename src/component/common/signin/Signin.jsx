import "./Signin.scss";
import { Button, Form, Input, message } from "antd";
import {
  useLoginMutation,
  useLoginWithOtpMutation,
} from "../../../store/service/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertCodeReverse, isAntPro } from "../../../store/constant";

const Signin = () => {
  const [trigger] = useLoginMutation();
  const [triggerWotp, { isLoading, data: logindata, error }] =
    useLoginWithOtpMutation();
  const nav = useNavigate();

  const [showOtp, setShowOtp] = useState(false);

  const hostname = window.location.hostname;

  const url = hostname.includes("madmin")
    ? `sub.${hostname.split(".")[1]}.${hostname.split(".")[2]}`
    : hostname;

  const onFinish = async (values) => {
    const authPayload = {
      userId: convertCodeReverse(values?.username?.trim()),
      password: values?.password?.trim(),
      url: "superadmin.fastbet365.in",
      // url,
    };

    if (values?.OTP) {
      const res = await triggerWotp({
        ...authPayload,
        otp: values?.OTP,
      });

      if (res?.data?.token) {
        nav("/dashboard");
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("rulesStatus", true);
        localStorage.setItem("userId", res?.data?.userId);
        localStorage.setItem("userType", res?.data?.userTypeInfo);
        localStorage.setItem("username", res?.data?.username);
        localStorage.setItem("ps", res?.data?.ps);
      }
    } else {
      const res = await trigger(authPayload).unwrap();
      if (res.status) {
        setShowOtp(true);
      } else {
        message.error(res?.message);
      }
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

  useEffect(() => {
    if (error && !error?.data?.status) {
      message.error(error?.data?.message);
    }
    if (!logindata?.status && logindata?.message) {
      message.error(logindata?.message);
    }
  }, [error, logindata]);

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
              {isAntPro ? (
                <div className="gx-app-logo">
                  <img alt="example" src={"/Images/logo.png"} />
                </div>
              ) : (
                <div className="gx-app-logo">
                  <img alt="example" src={"/img/logo.png"} height={100}/>
                </div>
              )}
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
                    {showOtp ? "Verify OTP" : "Sign in"}
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
