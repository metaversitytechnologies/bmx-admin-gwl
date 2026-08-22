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
import { ArrowLeft, Send, UserPlus, UsersRound } from "lucide-react";
import MatchCommission from "./MatchCommission";
import CasinoCommission from "./CasinoCommission";
import SelectUpline from "./SelectUpline";
import { convertCodeReverse } from "../../../store/constant";
import { useAppDetailsQuery } from "../../../store/service/userlistService";
import { openNotification, openNotificationError } from "../../../App";

const createName = {
  7: "Admin",
  6: "madmin",
  5: "Master",
  4: "Super",
  3: "Agent",
  2: "Client",
};

const NewCreateUser = () => {
  const [userData] = useState({});
  const [commiType, setCommiType] = useState("nocomm");
  const [, contextHolder] = notification.useNotification();
  const [parentId, setParentId] = useState(null);
  const [form] = Form.useForm();

  const commissionType = (value) => {
    setCommiType(value);
  };

  const { id } = useParams();
  const handleChange = () => {};
  const handleSelect = (value) => {
    setParentId(value);
  };

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
      loginOtpDisabled,
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
      ...(Number(id) === 7 && {
        appId: appId,
        loginOtpDisabled: loginOtpDisabled,
      }),
    };
    createUser(userData);
  };

  const nav = useNavigate();

  useEffect(() => {
    if (UserList?.status) {
      openNotification(UserList?.message);
      form?.resetFields();
      nav(-1);
    } else if (UserList?.status === false || error?.data?.message) {
      openNotificationError(UserList?.message || error?.data?.message);
    }
  }, [UserList, error, form, nav]);

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
        <div className="main_live_section create-admin-panel">
          <div className="admin-details-header create-admin-header">
            <div className="admin-details-title-wrap">
              <span className="admin-details-icon create-admin-header-icon">
                <UserPlus size={20} strokeWidth={1.9} />
              </span>
              <div>
                <div className="admin-details-title create-admin-title">
                  Create {createName?.[id] ?? "User"}
                </div>
                <p className="admin-details-subtitle create-admin-subtitle">
                  Create a new admin account and configure access
                </p>
              </div>
            </div>
            <div className="show_btn">
              <button className="admin-details-back" onClick={() => nav(-1)}>
                <ArrowLeft size={15} strokeWidth={1.8} />
                Back
              </button>
            </div>
          </div>
          <div className="ant-spin-nested-loading create-admin-body">
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
                {
                  name: "loginOtpDisabled",
                  value: false,
                },
              ]}>
              <div>
                <section className="create-admin-card create-admin-account-card">
                  <div className="create-admin-section-heading">
                    <span className="create-admin-section-icon">
                      <UsersRound size={16} strokeWidth={1.9} />
                    </span>
                    <div>
                      <h2>Account Details</h2>
                      <p>Enter admin profile, access and account settings</p>
                    </div>
                  </div>
                  <Row className="super_agent create-admin-grid">
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
                                    `Coins must be less than ${userDetails?.data?.balance}`,
                                  ),
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
                                  new Error("Please Enter Valid Mobile Number"),
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
                      <>
                        <Col lg={12} xs={24}>
                          <Form.Item
                            label="App Url"
                            name="appId"
                            placeholder="Select App Details"
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
                        {userDetails?.data?.loginOtpDisabled && (
                          <Col lg={12} xs={24}>
                            <Form.Item
                              label="Login Otp Disabled"
                              name="loginOtpDisabled"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select login OTP status!",
                                },
                              ]}>
                              <Select
                                defaultValue={false}
                                options={[
                                  {
                                    value: true,
                                    label: "Yes",
                                  },
                                  {
                                    value: false,
                                    label: "No",
                                  },
                                ]}
                              />
                            </Form.Item>
                          </Col>
                        )}
                      </>
                    )}
                  </Row>
                </section>
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

                <div className="create-admin-submit-row">
                  <Button
                    className="create-admin-submit"
                    type="primary"
                    htmlType="submit">
                    <Send size={15} strokeWidth={1.9} />
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCreateUser;
