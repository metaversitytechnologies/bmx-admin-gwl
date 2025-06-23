import { Button, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";

import {
  useAddLimitMutation,
  useDepositMutation,
  useLazyUpDateLimitesQuery,
} from "../../../../store/service/userlistService";
import { useLocation, useParams } from "react-router-dom";

const AddSuperLimites = () => {
  const [addTotal, setAddTotal] = useState(0);
  const [chipsValue, setChipsValue] = useState();
  const [passWord, setPassword] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const { state } = useLocation();

  const { id } = useParams();

  const handelAddLimit = (e) => {
    setChipsValue(e.target.value);
    setAddTotal(
      Number(e.target.value) + Number(updateLimite?.data?.childAmount)
    );
  };

  const handelPassword = (e) => {
    setPassword(e.target.value);
  };

  const openNotification = (mess) => {
    api.success({
      message: mess,
      description: "Success",
      closeIcon: false,
      placement: "top",
    });
  };

  const openNotificationError = (mess) => {
    api.error({
      message: mess,
      closeIcon: false,
      placement: "top",
    });
  };

  const [trigger, { data: addData, error, isLoading }] = useAddLimitMutation();
  const [updateLimites, { data: updateLimite }] = useLazyUpDateLimitesQuery();

  useEffect(() => {
    updateLimites({
      userId: id,
    });
  }, [id]);

  const onFinish = (values) => {
    const addList = {
      amount: Number(values?.amount),
      remark: "Updated Limit",
      lupassword: values?.pass,
      userId: id,
    };
    trigger(addList);
  };

  useEffect(() => {
    if (addData?.status === true) {
      updateLimites({
        userId: id,
      });
      setAddTotal(0);
      openNotification(addData?.message);
      form?.resetFields();
    } else if (addData?.status === false || error?.data?.message) {
      openNotificationError(addData?.message || error?.data?.message);
    }
  }, [addData?.data, error]);

  return (
    <>
      {contextHolder}
      <div
        className="table_section mwt sport_detail"
        style={{ paddingBottom: "12px" }}>
        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          <Form
            onFinish={onFinish}
            form={form}
            // onFinishFailed={onFinishFailed}
            autoComplete="off">
            <table className="live_table  limit_update">
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>C. Chips</th>
                <th>Add limit </th>
                <th>Action</th>
              </tr>

              <tr>
                <td>A10285</td>
                <td>agemas</td>
                <td>0.00</td>

                <td>
                  <div>
                    <Form.Item
                      name="amount"
                      required
                      rules={[
                        { required: true, message: "Please Enter Chips!" },
                      ]}>
                      <Input
                        style={{
                          width: "110px",
                          padding: "6px",
                          background: "#fff",
                        }}
                        onChange={(e) => handelAddLimit(e)}
                        type="number"
                      />
                    </Form.Item>
                  </div>
                </td>

                <td>
                  <div className="minus_btn">
                    <Button
                      style={{ height: "unset" }}
                      className="add"
                      loading={isLoading}
                      htmlType="submit">
                      Add
                    </Button>
                    <Button
                      style={{ height: "unset" }}
                      className="minus"
                      loading={isLoading}
                      htmlType="submit">
                      Minus
                    </Button>
                  </div>
                </td>
              </tr>
            </table>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddSuperLimites;
