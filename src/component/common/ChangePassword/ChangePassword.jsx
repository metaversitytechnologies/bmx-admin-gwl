import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../store/service/supermasteAccountStatementServices";

const ChangePassword = ({ setIsModalOpen }) => {
  const [trigger, { data: chnagePassdata, error, isLoading }] =
    useChangePasswordMutation();

  const nav = useNavigate();

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
  }, [chnagePassdata, error]);

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
          ]}>
          <Input.Password placeholder="Enter New Password" />
        </Form.Item>

        <Form.Item
          name="confirmpassword"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}>
          <Input.Password placeholder="Enter Confirm  Password" />
        </Form.Item>

        <div className="change_button">
          <Form.Item>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="return"
              type="primary">
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
    </>
  );
};

export default ChangePassword;
