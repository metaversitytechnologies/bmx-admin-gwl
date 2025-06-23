import { useNavigate } from "react-router-dom";
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
  useCreateUserMutation,
  useLazyCreateUserDataQuery,
  useGetUserIdMutation,
} from "../../../store/service/userlistService";
import {
  useCreateCasinoListQuery,
  useLazyCreateParentListQuery,
} from "../../../store/service/supermasteAccountStatementServices";
import MatchCommission from "./MatchCommission";
import CasinoCommission from "./CasinoCommission";
import CasinoDetailsAllow from "./CasinoDetailsAllow";
import SelectUpline from "./SelectUpline";
import { BiRefresh } from "react-icons/bi";

const NewCreateUser = ({ createName, userTyep, userTypeOrder }) => {
  const [userData, setUserData] = useState({});
  const [commiType, setCommiType] = useState("nocomm");
  const [LuPassword, setLuPassword] = useState("");
  const [createUserId, setCreateUserID] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [parentId, setParentId] = useState("");
  const [loadingSpin, setLoadingSpin] = useState(false);
  const [form] = Form.useForm();

  const commissionType = (value) => {
    setCommiType(value);
  };
  const handleLupassword = (e) => {
    setLuPassword(e.target.value);
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

  const [state, setState] = useState({
    isAuraAllowed: "",
    isSuperNovaAllowed: "",
    isQTechAllowed: "",
    isVirtualAllowed: "",
    isSportBookAllowed: "",
  });
  const { data: casinoDetalisData } = useCreateCasinoListQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    casinoDetalisData?.data?.map((key) => {
      setState((prev) => {
        return {
          ...prev,
          [`is${key.name.replace(" ", "")}Allowed`]: !key.active,
        };
      });
    });
  }, [casinoDetalisData?.data]);

  const passw = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,15}$/;
  var mobileNum = /^[6-9][0-9]{9}$/;

  // const [getData, { data: results }] = useLazyIsUserIdQuery();

  // const [getUserId, { data: userOrderedId }] = useGetUserIdMutation();

  const handelUseId = (e) => {
    setCreateUserID(e.target.value);
  };

  const [createUser, { data: UserList, error, isLoading }] =
    useCreateUserMutation();
  const [trigger, { data }] = useLazyCreateUserDataQuery();

  // useEffect(() => {
  //   getUserId({
  //     userType: userTypeOrder,
  //   });
  // }, [userTypeOrder, error]);

  // useEffect(() => {
  //   getData({
  //     userId: hostname.includes("create-super")
  //       ? "M" + createUserId
  //       : hostname.includes("create-agent")
  //       ? "S" + createUserId
  //       : hostname.includes("create-dealer")
  //       ? "A" + createUserId
  //       : "C" + createUserId,
  //   });
  // }, [createUserId]);

  const hostname = window.location.pathname;

  const handleChange = (value) => {
    searchUserList({
      userType: userTyep,
      userName: value,
    });
  };

  const handleSelect = (value) => {
    setParentId(value);
  };

  useEffect(() => {
    trigger({
      parentId: "" || parentId,
    });
  }, [data?.data, parentId]);

  const handelReloadUserId = () => {
    // setLoadingSpin(true);
    // getUserId({
    //   userType: userTypeOrder,
    // });
  };

  // useEffect(() => {
  //   if (userOrderedId?.status == true) {
  //     setLoadingSpin(false);
  //   }
  // }, [userOrderedId?.status]);

  const onFinish = (values) => {
    setLuPassword("");
    const userData = {
      userId: "demo",
      username: values?.Name,
      mobile: values?.mobile,
      city: "",
      userRole: window.location.pathname.includes("create-client") ? 2 : 1,
      password: values?.password,
      sportPartnership: values?.MyMatchShare - values?.matchShare || 0,
      oddLossCommission: commiType === "nocomm" ? "0" : values?.Match_comm,
      lupassword: values?.lupassword,
      liveCasinoLock: false,
      // casinoPartnership:values?.MyCasinoShare - values?.casinoShare || 0,
      casinoPartnership: values?.casinoShare || 0,
      fancyLossCommission: commiType === "nocomm" ? "0" : values?.sess_comm,
      casinoCommission: values?.cassino_Comm || 0,
      commType: values?.Commtype,
      appId: 1,
      amount: values?.Coins,
      reference: values?.reference,
      isAuraAllowed: state?.isAuraAllowed,
      isSuperNovaAllowed: state?.isSuperNovaAllowed,
      isQTechAllowed: state?.isQTechAllowed,
      isVirtualAllowed: state?.isVirtualAllowed,
      isSportBookAllowed: state?.isSportBookAllowed,
      parentId: parentId,
    };
    createUser(userData);
  };

  useEffect(() => {
    if (UserList?.status === true) {
      openNotification(UserList?.message);
      form?.resetFields();
      trigger({
        parentId: "" || parentId,
      });
      // getUserId({
      //   userType: userTypeOrder,
      // });
    } else if (UserList?.status === false || error?.data?.message) {
      openNotificationError(UserList?.message || error?.data?.message);
    }
  }, [UserList, error]);

  const { Option } = Select;

  const nav = useNavigate();

  useEffect(() => {
    setUserData(data?.data);
  }, [data?.data, UserList?.status]);

  const [searchUserList, { data: resultData }] = useLazyCreateParentListQuery();

  useEffect(() => {
    searchUserList({
      userType: userTyep,
      userName: "",
    });
  }, [userTyep]);

  const userTypeCheck = localStorage.getItem("userType");

  return (
    <div className="create_user_section">
      {/* {contextHolder}
      {userTypeCheck != userTyep && ( */}
      <SelectUpline
        data={resultData?.data}
        handleChange={handleChange}
        handleSelect={handleSelect}
      />
      {/* )} */}
      {/* {(parentId?.length > 0 || userTypeCheck == userTyep) && ( */}
      <div className="main_live_section">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              Create {createName}
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
                value: data?.data?.myBalance,
              },
              {
                name: "code",
                value: "d0001",
              },
              {
                name: "MyMatchShare",
                value: data?.data?.myShare,
              },
              {
                name: "MyCasinoShare",
                value: data?.data?.myCasinoShare,
              },
              {
                name: "MyCommtype",
                value:
                  data?.data?.mySessionCommission === 0 &&
                  data?.data?.myMatchCommission
                    ? "No Comm"
                    : "Bet by Bet",
              },
              {
                name: "cassinoComm",
                value: data?.data?.myCasinoCommission,
              },
              {
                name: "My_Match_comm",
                value: data?.data?.myMatchCommission,
              },
              {
                name: "My_sess_comm",
                value: data?.data?.mySessionCommission,
              },
            ]}>
            <div>
              <Row className="super_agent">
                {/* <Col xl={12} lg={12} md={24} xs={24}>
                  <Form.Item
                    label="User ID"
                    name="code"
                    disabled
                    
                  >
                    <p className="user_id">
                      <Input
                        disabled
                        type="text"
                        value={"d0001"}
                        defaultValue={"d001"}
                        onChange={(e) => handelUseId(e)}
                        
                      />
                      <BiRefresh
                        onClick={handelReloadUserId}
                        className={`loading-icon ${
                          loadingSpin ? "loading-icon-animation" : ""
                        }`}
                      />
                    </p>
                  </Form.Item>
                </Col> */}
                <Col xl={12} lg={12} md={24} xs={24}>
                  <Form.Item
                    label="Name"
                    name="Name"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter name",
                      },
                    ]}>
                    <Input
                      type="text"
                      placeholder="Enter full name"
                      onKeyDown={(e) => {
                        if (!e.key.match(/^[a-zA-Z ]$/) && e.key.length === 1) {
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
                <Col xl={12} lg={12} md={24} xs={24}>
                  <Form.Item label="Reference" name="reference">
                    <Input type="text" placeholder="Enter Reference" />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item label="My Coins" name="My Coins" required={false}>
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
                        message: "Please enter valid Coins",
                      },
                      {
                        validator: async (_, values) => {
                          if (
                            data?.data?.myBalance < values &&
                            values != "" &&
                            values != null
                          ) {
                            return Promise.reject(
                              new Error("Please enter valid Coins")
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
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Password",
                      },
                      // {
                      //   validator: async (_, names) => {
                      //     if (
                      //       !passw.test(names) &&
                      //       names != "" &&
                      //       names != null
                      //     ) {
                      //       return Promise.reject(
                      //         new Error(
                      //           "Minimun 6 character, must contain letters and numbers"
                      //         )
                      //       );
                      //     }
                      //   },
                      // },
                    ]}>
                    <Input type="password" placeholder="Password" />
                  </Form.Item>
                </Col>
              </Row>
              <MatchCommission
                createName={createName}
                commissionType={commissionType}
                commiType={commiType}
                data={data}
                userData={userData}
              />
              {/* <CasinoCommission
                  createName={createName}
                  commiType={commiType}
                /> */}
              <CasinoDetailsAllow casinoDetalisData={casinoDetalisData} />

              <Row className="super_agent sub_super">
                <Col lg={12} xs={24}>
                  <Form.Item
                    label="Transaction Password"
                    name="lupassword"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Transaction Password",
                      },
                    ]}>
                    <Input
                      value={LuPassword}
                      type="password"
                      onChange={(e) => handleLupassword(e)}
                      placeholder="Transaction Password"
                    />
                  </Form.Item>
                </Col>
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
      {/* )} */}
    </div>
  );
};

export default NewCreateUser;
