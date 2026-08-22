import "./Signin.scss";
import { Button, Checkbox, Form, Input, message } from "antd";
import {
  useLoginMutation,
  useLoginWithOtpMutation,
} from "../../../store/service/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertCodeReverse, imgUrl, isNsg } from "../../../store/constant";
import { AiOutlineUser } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Headphones,
  ShieldCheck,
  UserRound,
  Zap,
  LockKeyhole,
} from "lucide-react";

const Signin = () => {
  const [trigger] = useLoginMutation();
  const [triggerWotp, { isLoading, data: logindata, error }] =
    useLoginWithOtpMutation();
  const nav = useNavigate();

  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    OTP: "",
  });

  const onFinish = async (values) => {
    const authPayload = {
      userId: convertCodeReverse(values?.username?.trim()),
      password: values?.password?.trim(),
      // url,
      url: "superadmin.antpro.co",
      // url: "superadmin.10wicket.co",
    };

    if (values?.OTP) {
      const res = await triggerWotp({ ...authPayload, otp: values?.OTP });
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
      console.log("res", res);
      if (res?.token) {
        nav("/dashboard");
        localStorage.setItem("token", res?.token);
        localStorage.setItem("rulesStatus", true);
        localStorage.setItem("userId", res?.userId);
        localStorage.setItem("userType", res?.userTypeInfo);
        localStorage.setItem("username", res?.username);
        localStorage.setItem("ps", res?.ps);
      } else {
        if (res.status) {
          setShowOtp(true);
        } else {
          message.error(res?.message);
        }
      }
    }
  };

  // for Antd
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // for plain UI
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    onFinish(formData); // reuse same logic
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      nav("/dashboard");
    }
  }, [nav]);

  useEffect(() => {
    if (error && !error?.data?.status) {
      message.error(error?.data?.message);
    }
    if (!logindata?.status && logindata?.message) {
      message.error(logindata?.message);
    }
  }, [error, logindata]);

  const hostName = window.location.host;

  return (
    <div className="gx-app-login-wrap">
      {isNsg ? (
        <div className="login-container-main">
          <div className="logo">
            <img
              src={
                hostName.includes("mumbaiexchange9")
                  ? "/img/mum-img.png"
                  : "/img/logo-nsg.png"
              }
              alt="logo"
              className="login-logo-img"
              height={50}
            />
          </div>

          <div className="login-box">
            <div className="input-group">
              <AiOutlineUser className="input-icon" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Enter Username"
              />
            </div>
            <div className="input-group">
              <CiLock className="input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>

            {showOtp && (
              <div className="input-group">
                <CiLock className="input-icon" />
                <input
                  type="number"
                  name="OTP"
                  value={formData.OTP}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                />
              </div>
            )}

            <button onClick={handleLogin} className="login-btn">
              {showOtp ? "Verify OTP" : "Login Now"}
            </button>

            <div className="footer-note">
              ©️ 2025 nsgpro99 | Not for restricted territories
            </div>
          </div>
        </div>
      ) : (
        <div className="gx-app-login-container antpro-login">
          <div className="gx-app-login-main-content antpro-login-card">
            {isLoading && (
              <>
                <div className="main_loading_section"> </div>
                <div className="loading_image">
                  <img src="/Images/loaderfast.svg" alt="helllo" />
                </div>
              </>
            )}

            <div className="gx-app-logo-content antpro-login-brand">
              <div className="gx-app-logo antpro-login-logo">
                <img alt="antpro" src={imgUrl} />
              </div>

              <div className="antpro-login-copy">
                <h1>Welcome Back! 👋</h1>
                <p>
                  Sign in to continue to AntPro
                  <br />
                  Dashboard.
                </p>
              </div>

              <div className="auth-feature-strip">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Secure",
                    desc: "Protected access",
                  },
                  {
                    icon: Zap,
                    title: "Fast",
                    desc: "Quick login",
                  },
                  {
                    icon: Headphones,
                    title: "24/7 Support",
                    desc: "Always available",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div className="auth-feature-item" key={title}>
                    <span className="auth-feature-icon">
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <strong>{title}</strong>
                    <small className="auth-feature-description">{desc}</small>
                  </div>
                ))}
              </div>

              <div className="auth-trust-line">
                <ShieldCheck size={12} strokeWidth={1.8} />
                <span>Secure access • Protected session</span>
              </div>
            </div>
            <div className="gx-app-login-content antpro-login-form-panel">
              <div className="antpro-form-heading">
                <span className="antpro-form-icon">
                  <UserRound size={28} strokeWidth={1.8} />
                </span>
                <div>
                  <h2>Sign In</h2>
                  <p>Enter your credentials to access your account</p>
                </div>
              </div>

              <Form
                name="basic"
                layout="vertical"
                className="antpro-signin-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "The input is not valid user ID!",
                    },
                  ]}>
                  <Input
                    prefix={<UserRound size={18} strokeWidth={1.8} />}
                    placeholder="Username"
                    autoComplete="username"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}>
                  <Input.Password
                    prefix={<LockKeyhole size={18} strokeWidth={1.8} />}
                    placeholder="Password"
                    autoComplete="current-password"
                    iconRender={(visible) =>
                      visible ? (
                        <Eye size={19} strokeWidth={1.8} />
                      ) : (
                        <EyeOff size={19} strokeWidth={1.8} />
                      )
                    }
                  />
                </Form.Item>

                {showOtp && (
                  <Form.Item
                    label="OTP"
                    name="OTP"
                    rules={[{ required: true, message: "Please input Otp!" }]}>
                    <Input
                      type="number"
                      prefix={<LockKeyhole size={18} strokeWidth={1.8} />}
                      placeholder="OTP"
                    />
                  </Form.Item>
                )}

                <div className="antpro-form-options">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <span className="antpro-forgot">Forgot Password?</span>
                </div>

                <Form.Item className="sign_btn">
                  <Button type="primary" htmlType="submit">
                    <span>{showOtp ? "Verify OTP" : "Sign in"}</span>
                    <ArrowRight size={24} strokeWidth={1.8} />
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>

          <div className="antpro-login-notice">
            <span className="antpro-notice-main">
              <ShieldCheck size={24} strokeWidth={1.7} />
              Note: This Website Is Not For Indian Territory
            </span>
            <span className="antpro-notice-divider" />
            <span className="antpro-notice-age">18+ Only</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
