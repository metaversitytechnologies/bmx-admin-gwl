import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useChangePasswordMutation,
  useChangePasswordSelfMutation,
} from "../../../store/service/supermasteAccountStatementServices";

const ChangePassword = ({ setIsModalOpen }) => {
  const [trigger, { data: chnagePassdata, error, isLoading }] =
    useChangePasswordMutation();
  const [
    newTrigger,
    { data: newchnagePassdata, isLoading: newIsLoading, error: newError },
  ] = useChangePasswordSelfMutation();

  const nav = useNavigate();

  const pType = localStorage.getItem("passType");
  const uType = localStorage.getItem("userType");

  console.log(pType, uType, "fsdfsfds");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const onFinish = (values) => {
    const chnagePassdata = {
      currentPassword: values?.password,
      newPassword: values?.newpassword,
      password: values?.newpassword,
    };

    const firstTimeLogin = {
      oldPassword: values?.password,
      newPassword: values?.newpassword,
      password: values?.newpassword,
      userid: userId,
      token: token,
    };
    if ((pType == "old" || pType == "Old") && uType == "5") {
      newTrigger(firstTimeLogin);
    } else {
      trigger(chnagePassdata);
    }
  };

  useEffect(() => {
    if (chnagePassdata?.status === true) {
      message.success(chnagePassdata?.message || newchnagePassdata?.message);
      localStorage.clear();
      setIsModalOpen(false);
      nav("/");
    } else if (chnagePassdata?.status === false || error?.status === 400) {
      message.error(chnagePassdata?.message || error?.data?.message);
    }
  }, [chnagePassdata, error]);

  useEffect(() => {
    if (newchnagePassdata?.status === true) {
      message.success(newchnagePassdata?.message);
      localStorage.clear();
      setIsModalOpen(false);
      nav("/");
    } else if (newchnagePassdata?.status == false || newError?.status === 400) {
      message.error(newError?.data?.message || newchnagePassdata?.message);
    }
  }, [newchnagePassdata, newError]);

  const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,15}$/;

  return (
    <>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          remember: true,
        }}>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password placeholder="Enter Old Password" />
        </Form.Item>

        <Form.Item
          name="newpassword"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
            // {
            //   pattern: passw,
            //   message: "Minimun 6 character, must contain letters and numbers",
            // },
          ]}>
          <Input.Password placeholder="Enter New Password" />
        </Form.Item>

        <Form.Item
          name="newpassword"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
            // {
            //   pattern: passw,
            //   message: "Minimun 6 character, must contain letters and numbers",
            // },
          ]}>
          <Input.Password placeholder="Enter Confirm  Password" />
        </Form.Item>

        <div className="change_button">
          <Form.Item>
            <Button
              onClick={() =>
                (pType != "old" || pType != "Old") &&
                uType != "5" &&
                setIsModalOpen(false)
              }
              className="return"
              type="primary">
              Return
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading || newIsLoading}
              type="primary"
              htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default ChangePassword;
