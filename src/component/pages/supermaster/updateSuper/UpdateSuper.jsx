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
import { useNavigate, useParams } from "react-router-dom";
import {
  useLazyGetUserQuery,
  useUpdateUserMutation,
} from "../../../../store/service/userlistService";

const UpdateSuper = ({ updateName }) => {
  // console.log(updateName, "dasdasd")
  const [api, contextHolder] = notification.useNotification();
  const [commType, setCommType] = useState("");
  const nav = useNavigate();

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
  const [getData, resuilt] = useLazyGetUserQuery();

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
      matchShare: Number(values?.match_share) || null
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


  useEffect(() => {
    getData({
      userId: id,
    });
  }, [resuilt?.data, id]);

  useEffect(() => {
    if (resuilt?.data?.status === true) setData(resuilt?.data?.data);
    setCommType(
      Number(resuilt?.data?.data?.matchComm) == 0 ||
        Number(resuilt?.data?.data?.sessionComm) == 0
        ? "no-comm"
        : "bbb"
    );
  }, [resuilt?.data?.data]);

  const onCommissionType = (e) => {
    setCommType(e);
  };
  return (
    <>
      {contextHolder}
      <div className="main_live_section update_user">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "25px" }}
              className="team_name">
              Update {updateName}
            </div>
            <div className="show_btn">
              <button onClick={() => nav(-1)}>Back</button>
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
              {
                name: "sess_comm",
                value: (resuilt?.data?.data.sessionComm)?.toFixed(2),
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
                value: (resuilt?.data?.data.matchComm)?.toFixed(2),
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
              {
                name: "match_share_p",
                value: resuilt?.data?.data.parentMatchShare,
              },
              {
                name: "match_share",
                value: resuilt?.data?.data.matchShare,
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
                        message: "Please enter your username!",
                      },
                    ]}>
                    <Input onKeyDown={(e) => {
                        if (
                          !e.key.match(/^[a-zA-Z ]$/) &&
                          e.key.length === 1
                        ) {
                          e.preventDefault();
                        }
                      }}/>
                  </Form.Item>
                  <Form.Item label="Reference" name="reference">
                    <Input placeholder="Enter Reference" />
                  </Form.Item>
                  <Form.Item
                    label="Contact No."
                    name="number"
                    rules={[
                      { pattern: mobileNum, message: "Invalid Contact NO!" },
                    ]}>
                    <InputNumber
                      className="number_field"
                      min={0}
                      width={"100%"}
                      type="number"
                      placeholder="Enter Contact No."
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
                {
                  updateName !== "Client" && <> <Col lg={12} xs={24}>
                  <Form.Item
                    label={`${updateName} Match Share`}
                    name="match_share_p"
                    required={false}>
                    <Input type="number" disabled />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    name="match_share"
                    label="Match Share"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                      {
                        validator: async (_, values) => {
                          if (
                            resuilt?.data?.data?.parentMatchShare < values &&
                            values != "" &&
                            values != null
                          ) {
                            return Promise.reject(
                              new Error(
                                "Match share can not be more than" +
                                  " " +
                                  `${resuilt?.data?.data?.parentMatchShare}`
                              )
                            );
                          }
                        },
                      },
                    ]}>
                   <Input type="number"/>
                  </Form.Item>
                </Col>
                  </>
                }
          
                <Col lg={12} xs={24}>
                  <Form.Item
                    label={`${updateName} Comm type`}
                    name="commType"
                    required={false}>
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    name="comm_type"
                    label="Comm type"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}>
                    <Select
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
                        label= {`${updateName} match comm(%)`}
                        name="matchcomm"
                        required={false}>
                        <Input type="number" disabled />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="Match comm(%)"
                        name="Supermatchcomm"
                        required
                        rules={[
                          {
                            required: true,
                            message: "Please enter odds commission",
                          }
                        ]}>
                       <Select
                          defaultValue="Select Match comm(%)"
                          options={[
                            {
                              value: "0.00",
                              label: "0.00",
                            },
                            {
                              value: "0.25",
                              label: "0.25",
                            },
                            {
                              value: "0.50",
                              label: "0.50",
                            },
                            {
                              value: "0.75",
                              label: "0.75",
                            },
                            {
                              value: "1.00",
                              label: "1.00",
                            },
                            {
                              value: "1.25",
                              label: "1.25",
                            },
                            {
                              value: "1.50",
                              label: "1.50",
                            },
                            {
                              value: "1.75",
                              label: "1.75",
                            },
                            {
                              value: "2.00",
                              label: "2.00",
                            },
                            {
                              value: '2.25',
                              label: '2.25',
                            },
                            {
                              value: '2.50',
                              label: '2.50',
                            },
                            {
                              value: '2.75',
                              label: '2.75',
                            },
                            {
                              value: '3.00',
                              label: '3.00',
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label={`${updateName} sess comm(%)`}
                        name="sesscomm"
                        required={false}>
                        <Input type="number" disabled />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="Sess comm(%)"
                        name="sess_comm"
                        required
                        rules={[
                          {
                            required: true,
                            message: "Please enter session commission",
                          }
                        ]}>
                          <Select
                          defaultValue="Select Sess Comm(%)"
                          options={[
                            {
                              value: "0.00",
                              label: "0.00",
                            },
                            {
                              value: "0.25",
                              label: "0.25",
                            },
                            {
                              value: "0.50",
                              label: "0.50",
                            },
                            {
                              value: "0.75",
                              label: "0.75",
                            },
                            {
                              value: "1.00",
                              label: "1.00",
                            },
                            {
                              value: "1.25",
                              label: "1.25",
                            },
                            {
                              value: "1.50",
                              label: "1.50",
                            },
                            {
                              value: "1.75",
                              label: "1.75",
                            },
                            {
                              value: "2.00",
                              label: "2.00",
                            },
                            {
                              value: "2.25",
                              label: "2.25",
                            },
                            {
                              value: "2.50",
                              label: "2.50",
                            },
                            {
                              value: "2.75",
                              label: "2.75",
                            },
                            {
                              value: "3.00",
                              label: "3.00",
                            },
                            {
                              value: "3.25",
                              label: "3.25",
                            },
                            {
                              value: "3.50",
                              label: "3.50",
                            },
                            {
                              value: "3.75",
                              label: "3.75",
                            },
                            {
                              value: "4.00",
                              label: "4.00",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </>
                ) : (
                  ""
                )}
              </Row>
              <Row className="super_agent  update_agent">        
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
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateSuper;
