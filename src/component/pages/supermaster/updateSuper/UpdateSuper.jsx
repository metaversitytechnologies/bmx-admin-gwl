import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  notification,
} from "antd";
import "./UpdateSuper.scss";
import {
  useLazyGetUserQuery,
  useUpdateUserMutation,
} from "../../../../store/service/createUserServices";
import { useParams } from "react-router-dom";

const UpdateSuper = ({ updateName }) => {
  const [api, contextHolder] = notification.useNotification();
  const [commType, setCommType] = useState("");

  const [form] = Form.useForm();
  const [data, setData] = useState();

  const { id } = useParams();
  const [trigger, { data: updateData, isLoading, error }] =
    useUpdateUserMutation();

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

  const mobileNum = /^[6-9][0-9]{9}$/;
  const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/;

  const onFinish = (values) => {
    const userData = {
      userId: id,
      userName: values?.name,
      phoneNumber: values?.number,
      password: values?.password,
      luPassword: values?.lupassword,
      status: values?.status == "inActive" ? false : true,
      commType: values?.comm_type == "bbb" ? "bbb" : "no-comm",
      matchComm: values?.Supermatchcomm || 0,
      sessionComm: values?.sess_comm || 0,
      casinoComm: values?.Supercasinocomm || 0,
      reference: values?.reference,
    };

    trigger(userData);
    form?.resetFields();
  };
  useEffect(() => {
    if (updateData?.status === true) {
      getData({
        userId: id,
      });
      openNotification(updateData?.message);
      form?.resetFields();
    } else if (updateData?.status === false || error?.data?.message) {
      openNotificationError(updateData?.message || error?.data?.message);
    }
  }, [updateData, error]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;

  const [getData, resuilt] = useLazyGetUserQuery();

  useEffect(() => {
    getData({
      userId: id,
    });
  }, [resuilt?.data, id]);

  useEffect(() => {
    if (resuilt?.data?.status === true) setData(resuilt?.data?.data);
    setCommType(Number(resuilt?.data?.data?.matchComm) == 0 || Number(resuilt?.data?.data?.sessionComm) == 0? "no-comm": "bbb");
  }, [resuilt?.data?.data]);


  console.log(commType, "dfsdzzf")

  const onCommissionType = (e) => {
    setCommType(e);
  };

  // console.log(commType, "Fsfdfdsfs")


  return (
    <>
      {contextHolder}
      <div className="main_live_section">
        <div className="_match">
          <div
            className="sub_live_section live_report"
            // style={{ marginTop: "35px" }}
          >
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              Update {updateName}
            </div>
          </div>
        </div>
        <div className="ant-spin-nested-loading">
          {isLoading ? (
            <div className="spin_icon">
              <Spin size="large" />
            </div>
          ) : (
            ""
          )}
          <Form
            form={form}
            className="form_data"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onFocus={onFinishFailed}
            fields={[
              {
                name: "name",
                value: resuilt?.data?.data.userName,
              },
              {
                name: "number",
                value: resuilt?.data?.data.mobileNumber,
              },
              {
                name: "password",
                value: resuilt?.data?.data.password,
              },
              {
                name: "status",
                value: resuilt?.data?.data.status ? "active" : "inActive",
              },
              // {
              //   name: "Supermatchcomm",
              //   value: resuilt?.data?.data.matchCommission,
              // },
              {
                name: "sess_comm",
                value: resuilt?.data?.data.sessionComm,
              },
              {
                name: "matchcomm",
                value: resuilt?.data?.data.parentMatchComm,
              },
              {
                name: "sesscomm",
                value: resuilt?.data?.data.parentSessionComm,
              },
              {
                name: "casinoshare",
                value: resuilt?.data?.data.parentCasinoShare,
              },
              {
                name: "casinoComm",
                value: resuilt?.data?.data.parentCasinoComm,
              },
              {
                name: "reference",
                value: resuilt?.data?.data.reference,
              },
              {
                name: "Supermatchcomm",
                value: resuilt?.data?.data.matchComm,
              },
              {
                name: "sess_comm",
                value: resuilt?.data?.data.sessionComm,
              },
              {
                name: "supercasinoShare",
                value: resuilt?.data?.data.casinoShare,
              },
              {
                name: "Supercasinocomm",
                value: resuilt?.data?.data.casinoComm,
              },
              {
                name: "commType",
                value:
                  data?.data?.parentMatchComm == 0 ||
                  data?.data?.parentSessionComm == 0
                    ? "no-comm"
                    : "bbb",
              },
              {
                name: "comm_type",
                value: commType,
              },
              {
                name: "status",
                value: resuilt?.data?.data.status ? "active" : "inActive",
              },
            ]}>
            <div>
              <Row className="super_agent  update_agent">
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="Name"
                    name="name"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}>
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label="Reference"
                    name="reference"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please specify reference!",
                      },
                    ]}>
                    <Input placeholder="Enter Reference" />
                  </Form.Item>
                  <Form.Item
                    label="Contact No."
                    name="number"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Invalid Contact NO!",
                      },
                      { pattern: mobileNum, message: "Invalid Contact NO!" },
                    ]}>
                    <InputNumber
                      className="number_field"
                      min={0}
                      width={"100%"}
                      type="number"
                      placeholder="Enter Reference"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Password!",
                      },
                      {
                        pattern: passw,
                        message:
                          "Minimun 6 charecter, must contain letters and numbers!",
                      },
                    ]}>
                    <Input type="password" placeholder="Password" />
                  </Form.Item>

                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}>
                    <Select
                      // placeholder="Select a option and change input text above"
                      // onChange={onGenderChange}
                      value={data?.data?.status ? "active" : "inActive"}
                      allowClear>
                      <Option value={"active"}>Active</Option>
                      <Option value={"inActive"}>InActive</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}></Col>
              </Row>
              <div>
                <h2 style={{ marginLeft: "0px" }} className="update_agent_text">
                  Match Share and Comm
                </h2>
              </div>
              <Row className="super_agent  update_agent">
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="MASTER Comm type"
                    name="commType"
                    required={false}>
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    name="comm_type"
                    label="SUPER comm type"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}>
                    <Select
                      // placeholder="Select a option and change input text above"
                      onChange={(e) => onCommissionType(e)}
                      value={commType}>
                      <Option value="no-comm">No Comm</Option>
                      <Option value="bbb">Bet by bet</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {commType == "bbb" ? (
                  <>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="MASTER match comm(%)"
                        name="matchcomm"
                        required={false}>
                        <Input type="number" disabled />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="SUPER match comm(%)"
                        name="Supermatchcomm"
                        required
                        rules={[
                          {
                            required: true,
                            message: "Please enter odds commission",
                          },
                          {
                            validator: async (_, values) => {
                              if (
                                values > 3 && values < 0 &&
                                values != "" &&
                                values != null
                              ) {
                                return Promise.reject(
                                  new Error("Please enter odds commission")
                                );
                              }
                            },
                          },
                        ]}>
                        <InputNumber
                          className="number_field"
                          type="number"
                          min={0}
                          step="0.1"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="MASTER sess comm(%)"
                        name="sesscomm"
                        required={false}>
                        <Input type="number" disabled />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="SUPER sess comm(%)"
                        name="sess_comm"
                        required
                        rules={[
                          {
                            required: true,
                            message: "Please enter session commission",
                          },
                          {
                            validator: async (_, values) => {
                              if (
                                values > 3 && values < 0 &&
                                values != "" &&
                                values != null
                              ) {
                                return Promise.reject(
                                  new Error("Please enter session commission")
                                );
                              }
                            },
                          },
                        ]}>
                        <InputNumber
                          type="number"
                          className="number_field"
                          min={0}
                          step="0.1"
                        />
                      </Form.Item>
                    </Col>
                  </>
                ) : (
                  ""
                )}


                <Col lg={12} xs={24}>
                <Form.Item
                  label="Transaction Password"
                  name="lupassword"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Transaction Password!",
                    },
                  ]}>
                  <Input
                    type="password"
                    autoComplete="off"
                    placeholder="Transaction Password"
                  />
                </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    wrapperCol={{
                      offset: 19,
                      span: 24,
                    }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              {/* <div>
                <h2 className="update_agent_text">
                  Casino Share and Commission
                </h2>
              </div>
              <Row className="super_agent  update_agent">
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="MASTER casino Share(%)"
                    name="casinoshare"
                    required={false}>
                    <Input type="number" disabled />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="SUPER casino Share(%)"
                    name="supercasinoShare"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Invalid Casino Share",
                      },
                    ]}>
                    <InputNumber className="number_field" min={0} step="0.1" />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="MASTER casino comm(%)"
                    name="casinoComm"
                    required={false}>
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="SUPER casino comm(%)"
                    name="Supercasinocomm"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter valid Casino commission",
                      },
                    ]}>
                    <InputNumber className="number_field" min={0} step="0.1" />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 20,
                      span: 24,
                    }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row> */}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateSuper;
