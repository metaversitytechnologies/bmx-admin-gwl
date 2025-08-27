import { useNavigate, useParams } from "react-router-dom";
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
import { useEffect, useState } from "react";

import {
  useGetCreateUserMutation,
  useGetUserDetailsQuery,
  useUserIdForSearchQuery,
} from "../../../store/service/supermasteAccountStatementServices";
import MatchCommission from "./MatchCommission";
import CasinoCommission from "./CasinoCommission";
import SelectUpline from "./SelectUpline";
import { convertCodeReverse } from "../../../store/constant";
import { useAppDetailsQuery } from "../../../store/service/userlistService";

const createName = {
  7: "Admin",
  6: "madmin",
  5: "Master",
  4: "Super",
  3: "Agent",
  2: "Client",
};

const NewCreateUser = () => {
  const [userData, setUserData] = useState({});
  const [commiType, setCommiType] = useState("nocomm");
  const [api, contextHolder] = notification.useNotification();
  const [parentId, setParentId] = useState(null);
  const [form] = Form.useForm();

  const commissionType = (value) => {
    setCommiType(value);
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

  const { id } = useParams();
  const handleChange = (value) => {};
  const handleSelect = (value) => {
    setParentId(value);
  };

  const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,15}$/;
  var mobileNum = /^[6-9][0-9]{9}$/;

  const { data: appDeatis } = useAppDetailsQuery();

  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const { data: userDetails } = useGetUserDetailsQuery({
    userId: parentId ? convertCodeReverse(parentId) : userId,
  });
  const { data: downlineData } = useUserIdForSearchQuery({ userType: id });

  const [createUser, { data: UserList, error, isLoading }] =
    useGetCreateUserMutation();

  const onFinish = (values) => {
    const {
      Name,
      reference,
      password,
      mobile,
      matchShare,
      cassino_Share,
      cassino_Comm,
      sess_comm,
      Match_comm,
      Coins,
      appId,
    } = values;
    const userData = {
      username: Name,
      reference: reference,
      password: password,
      contact: mobile,
      mobileAppCharge: "0",
      partnership: id === "2" ? userDetails?.data?.myPartnership : matchShare,
      casinoPartnership:
        id === "2" ? userDetails?.data?.myCasinoPartnership : cassino_Share,
      internationalCasinoPartnership: 0,
      commissionType: commiType === "bbb" ? "2" : "1",
      matchCommission: commiType === "bbb" ? Match_comm : 0,
      sessionCommission: commiType === "bbb" ? sess_comm : 0,
      casinoCommission: commiType === "bbb" ? cassino_Comm : 0,
      limit: Coins,
      parentIdForUserCreation: convertCodeReverse(parentId),
      ...(Number(id) === 7 && { appId: appId }),
    };
    createUser(userData);
  };

  useEffect(() => {
    if (UserList?.status) {
      openNotification(UserList?.message);
      form?.resetFields();
      nav(-1);
    } else if (UserList?.status === false || error?.data?.message) {
      openNotificationError(UserList?.message || error?.data?.message);
    }
  }, [UserList, error]);

  const nav = useNavigate();

  console.log("appDeatis", appDeatis?.data);

  return (
    <div className="create_user_section">
      {contextHolder}
      {Number(userType) != Number(id) && (
        <SelectUpline
          data={downlineData?.data}
          handleChange={handleChange}
          handleSelect={handleSelect}
        />
      )}
      {(parentId?.length > 0 || Number(userType) == Number(id)) && (
        <div className="main_live_section">
          <div className="_match">
            <div className="sub_live_section live_report">
              <div
                style={{ padding: "5px 8px", fontSize: "22px" }}
                className="team_name">
                Create {createName?.[id] ?? "User"}
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
              className="form_data create_user_form"
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              // initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              fields={[
                {
                  name: "My Coins",
                  value: userDetails?.data?.balance,
                },
                {
                  name: "code",
                  value: "d0001",
                },
                {
                  name: "MyMatchShare",
                  value: userDetails?.data?.myPartnership,
                },
                {
                  name: "cassinoShare",
                  value: userDetails?.data?.myCasinoPartnership,
                },
                {
                  name: "MyCommtype",
                  value:
                    userDetails?.data?.myPartnership > 0 ||
                    userDetails?.data?.myCasinoPartnership > 0
                      ? "BetByBet"
                      : "NoComm",
                },
                {
                  name: "cassinoComm",
                  value: userDetails?.data?.myCasinoCommission,
                },
                {
                  name: "My_Match_comm",
                  value: userDetails?.data?.myMatchCommission,
                },
                {
                  name: "My_sess_comm",
                  value: userDetails?.data?.mySessionCommision,
                },
                {
                  name: "cassino_Comm",
                  value: commiType !== "bbb" ? 0 : "",
                },
                {
                  name: "shareType",
                  value: "Fixed",
                },
              ]}>
              <div>
                <Row className="super_agent">
                  <Col xl={12} lg={12} md={24} xs={24}>
                    <Form.Item
                      label="Name"
                      name="Name"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}>
                      <Input
                        type="text"
                        placeholder="Enter full name"
                        onKeyDown={(e) => {
                          if (
                            !e.key.match(/^[a-zA-Z ]$/) &&
                            e.key.length === 1
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xl={12} lg={12} md={24} xs={24}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your reference!",
                        },
                      ]}
                      label="Reference"
                      name="reference">
                      <Input type="text" placeholder="Enter Reference" />
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input your reference!",
                        },
                      ]}
                      label="My Coins"
                      name="My Coins">
                      <Input type="number" disabled />
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label="Coins"
                      name="Coins"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Please input your coins!",
                        },
                        {
                          validator: async (_, values) => {
                            if (
                              userDetails?.data?.balance < values &&
                              values != "" &&
                              values != null
                            ) {
                              return Promise.reject(
                                new Error(
                                  `Coins must be less than ${userDetails?.data?.balance}`
                                )
                              );
                            }
                          },
                        },
                      ]}>
                      <InputNumber
                        className="number_field"
                        min={0}
                        type="number"
                        placeholder="Enter Coins"
                        onKeyDown={(e) => {
                          if (e.key == ".") {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label="Contact No."
                      name="mobile"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Contact Number",
                        },
                        {
                          validator: async (_, names) => {
                            if (
                              !mobileNum.test(names) &&
                              names != "" &&
                              names != null
                            ) {
                              return Promise.reject(
                                new Error("Please Enter Valid Mobile Number")
                              );
                            }
                          },
                        },
                      ]}>
                      <InputNumber
                        className="number_field"
                        min={0}
                        type="number"
                        onKeyDown={(e) => {
                          if (!e.key.match(/^[0-9]$/) && e.key.length === 1) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={24}>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password",
                        },
                      ]}>
                      <Input type="password" placeholder="Password" />
                    </Form.Item>
                  </Col>
                  {id !== "2" && (
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="Share Type"
                        name="shareType"
                        placeholder="Select share type"
                        rules={[
                          {
                            required: true,
                            message: "Please select your share type!",
                          },
                        ]}>
                        <Select
                          defaultValue={"Fixed"}
                          options={[
                            {
                              value: "Fixed",
                              label: "Fixed",
                            },
                            {
                              value: "Change",
                              label: "Change",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  )}
                  {Number(id) === 7 && (
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="App Url"
                        name="appId"
                        placeholder="Select App Deatis"
                        rules={[
                          {
                            required: true,
                            message: "Please select your app details!",
                          },
                        ]}>
                        <Select
                          options={appDeatis?.data?.map((item) => ({
                            value: item.id,
                            label: item.appName,
                          }))}
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
                <MatchCommission
                  createName={createName[id]}
                  commissionType={commissionType}
                  commiType={commiType}
                  data={userDetails?.data}
                  userData={userData}
                />
                <CasinoCommission
                  createName={createName[id]}
                  commiType={commiType}
                />

                <Row className="super_agent sub_super">
                  <Col lg={12} xs={24}></Col>
                  <Col lg={12} xs={24}>
                    <Form.Item wrapperCol={{ offset: 19, span: 24 }}>
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
      )}
    </div>
  );
};

export default NewCreateUser;
