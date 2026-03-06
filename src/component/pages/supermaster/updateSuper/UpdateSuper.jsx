import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  Switch,
  notification,
} from "antd";
import "./UpdateSuper.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAppDetailsAllowedForChangeQuery,
  useAppDetailsQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../../store/service/userlistService";
import { convertCode } from "../../../../store/constant";

const updateNameDetails = {
  6: "Super Admin",
  5: "Admin",
  4: "Mini Admin",
  3: "Master",
  2: "Super",
  1: "Agent",
};
const updateName = {
  6: "Admin",
  5: "Mini Admin",
  4: "Master",
  3: "Super",
  2: "Agent",
  1: "Client",
};

const Responsedata = {
  1: "",
  2: "dealer",
  3: "master",
  4: "superMaster",
  5: "subAdmin",
  6: "admin",
};
const ResponsedataUpper = {
  2: "dealer",
  3: "superMaster",
  4: "master",
  5: "subAdmin",
  6: "admin",
  7: "my",
};

const UpdateSuper = () => {
  const { id, userId } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [commType, setCommType] = useState("");
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [data, setData] = useState();

  const [trigger, { data: updateData, isLoading }] = useUpdateUserMutation();
  const { data: resuilt } = useGetUserQuery(
    { userId },
    { refetchOnMountOrArgChange: true }
  );
  const isAdminTarget = Number(id) === 6;
  const isMiniAdminOrMasterTarget = [5, 4].includes(Number(id));
  const appIdChangeAllowedByUpline = Boolean(
    resuilt?.data?.appIdChangeAllowed
  );
  const { data: appDetails } = useAppDetailsQuery(undefined, {
    skip: !isAdminTarget,
  });
  const { data: appDetailsAllowedForChange } =
    useAppDetailsAllowedForChangeQuery(undefined, {
      skip: !isMiniAdminOrMasterTarget,
    });
  const appOptions = isAdminTarget
    ? appDetails?.data
    : appDetailsAllowedForChange?.data;
  const showAppUrl =
    isAdminTarget || (isMiniAdminOrMasterTarget && appIdChangeAllowedByUpline);

  const getUserField = (fieldSuffix) =>
    resuilt?.data?.[Responsedata?.[id] + fieldSuffix] || 0;
  const getUserUpper = (fieldSuffix) =>
    resuilt?.data?.[ResponsedataUpper?.[Number(id) + 1] + fieldSuffix] || 0;

  useEffect(() => {
    if (resuilt?.status) {
      setData(resuilt?.data);
      const userCom =
        resuilt?.data?.matchCommission > 0 ||
        resuilt?.data?.sessionCommision > 0
          ? "bbb"
          : "no-comm";
      const otherCom =
        getUserUpper("SessionCommision") > 0 ||
        getUserUpper("MatchCommission") > 0
          ? "bbb"
          : "no-comm";
      const isComm = id == "1" ? userCom : otherCom;
      setCommType(isComm);

      // ✅ Set form values after API data load
      form.setFieldsValue({
        userId: convertCode(resuilt?.data?.userId),
        name: resuilt?.data?.userName,
        reference: resuilt?.data?.reference,
        number: resuilt?.data?.contact,
        password: "******",
        comm_type: isComm,
        commType:
          getUserUpper("SessionCommision") > 0 ||
          getUserUpper("MatchCommission") > 0
            ? "Bet by Bet"
            : "No Comm",
        matchcomm: getUserUpper("MatchCommission"),
        super_match_comm:
          id === "1"
            ? resuilt?.data?.matchCommission
            : getUserField("MatchCommission"),
        sesscomm: getUserUpper("SessionCommision"),
        super_sess_comm:
          id === "1"
            ? resuilt?.data?.sessionCommision
            : getUserField("SessionCommision"),
        sess_comm:
          id === "1"
            ? resuilt?.data?.casinoCommission
            : getUserField("CasinoCommission"),
        super_casino_share: getUserUpper("CasinoPartnership"),
        matchShare: getUserUpper("Partnership"),
        super_casino_comm:
          id === "1"
            ? resuilt?.data?.casinoCommission
            : getUserField("CasinoCommission"),
        supercasinocomm:
          id === "1"
            ? resuilt?.data?.casinoPartnership
            : getUserField("CasinoPartnership"),
        share:
          id === "1" ? resuilt?.data?.partnership : getUserField("Partnership"),
        match_share: resuilt?.data?.matchShare,
        appId: resuilt?.data?.appId,
        appIdChangeAllowed: Boolean(resuilt?.data?.appIdChangeAllowed),
      });
    }
  }, [resuilt?.data]);

  const onFinish = (values) => {
    const isNoComm = values?.comm_type === "no-comm";

    const userData = {
      userId: userId,
      userName: values?.name,
      reference: values?.reference,
      password: resuilt?.data?.password,
      contact: values.number,
      flatShare: false,
      casinoPlay: true,
      mobileAppCharge: getUserField("MobileAppCharge"),
      commissionType: isNoComm ? 1 : 2,
      partnership: values?.share,
      casinoPartnership: values?.supercasinocomm,
      internationalCasinoPartnership: getUserField("IntlCasinoPartnership"),
      matchCommission: isNoComm ? 0 : values?.super_match_comm,
      sessionCommission: isNoComm ? 0 : values?.super_sess_comm,
      casinoCommission: isNoComm ? 0 : values?.sess_comm,
    };
    if (isAdminTarget && !appIdChangeAllowedByUpline) {
      userData.appId = values?.appId;
    }
    if (
      [6, 5, 4].includes(Number(id)) &&
      appIdChangeAllowedByUpline
    ) {
      userData.appId = values?.appId;
      userData.appIdChangeAllowed = values?.appIdChangeAllowed;
    }
    trigger(userData);
  };

  useEffect(() => {
    if (!updateData) return;

    if (updateData?.status) {
      api.success({
        message: updateData?.message || "User updated successfully",
        placement: "top",
        closeIcon: false,
      });

      setTimeout(() => {
        nav(-1);
      }, 1500);
    } else if (updateData?.message) {
      api.error({
        message: updateData?.message,
        placement: "top",
        closeIcon: false,
      });
    }
  }, [updateData]);

  const onCommissionType = (value) => {
    console.log(value, "valuevalue");
    setCommType(value);
  };

  const { Option } = Select;

  return (
    <>
      {contextHolder}
      <div className="main_live_section update_user">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "25px" }}
              className="team_name">
              Update {updateName?.[id]}
            </div>
            <div className="show_btn">
              <button onClick={() => nav(-1)}>Back</button>
            </div>
          </div>
        </div>

        <div className="ant-spin-nested-loading">
          {isLoading && (
            <div className="spin_icon">
              <Spin size="large" />
            </div>
          )}

          <Form
            form={form}
            className="form_data"
            name="update_super_form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            initialValues={{
              userId: convertCode(resuilt?.data?.userId),
              name: resuilt?.data?.userName,
              reference: resuilt?.data?.reference,
              number: resuilt?.data?.contact,
              password: "******",
              comm_type: commType,
            }}>
            <Row className="super_agent update_agent">
              <Col lg={12} xs={24}>
                <Form.Item
                  label="User ID"
                  name="userId"
                  rules={[{ required: true }]}>
                  <Input disabled />
                </Form.Item>

                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Reference"
                  name="reference"
                  rules={[{ required: true }]}>
                  <Input placeholder="Enter Reference" />
                </Form.Item>
                {showAppUrl && (
                  <Form.Item
                    label="App Url"
                    name="appId"
                    rules={[
                      {
                        required: true,
                        message: "Please select your app details!",
                      },
                    ]}>
                    <Select
                      options={appOptions?.map((item) => ({
                        value: item.id ?? item.appId,
                        label: item.appName,
                      }))}
                    />
                  </Form.Item>
                )}
                {appIdChangeAllowedByUpline && Number(id) === 6 && (
                  <Form.Item
                    label="App Id Change Allowed"
                    name="appIdChangeAllowed"
                    rules={[
                      {
                        required: true,
                        message: "Please select app id change allow status!",
                      },
                    ]}>
                    <Select
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
                )}

                <Form.Item label="Contact No." name="number">
                  <InputNumber
                    className="number_field"
                    placeholder="Enter Contact No."
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}>
                  <Input disabled type="text" placeholder="Password" />
                </Form.Item>

                <Form.Item name="status" label="Status">
                  <Select value={"active"}>
                    <Option value="active">Active</Option>
                    <Option value="inActive">InActive</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="share_change_type" label="Share Change Type">
                  <Select defaultValue="Fixed">
                    <Option value="Fixed">Fixed</Option>
                    <Option value="Change">Change</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Match Share & Commission Section */}
            <h2 className="update_agent_text">Match Share and Comm</h2>

            <Row className="super_agent update_agent">
              {id !== "1" && (
                <>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={`${updateNameDetails?.[id]} Match Share (%)`}
                      name="matchShare">
                      <Input type="number" disabled />
                    </Form.Item>
                  </Col>{" "}
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label="Match Share (%)"
                      name="share"
                      rules={[
                        { required: true, message: "Please enter match comm" },
                      ]}>
                      <Input />
                    </Form.Item>
                  </Col>
                </>
              )}

              <Col lg={12} xs={24}>
                <Form.Item
                  label={`${updateNameDetails?.[id]} Comm Type`}
                  name="commType"
                  rules={[{ required: true }]}>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col lg={12} xs={24}>
                <Form.Item
                  label="Comm Type"
                  name="comm_type"
                  rules={[{ required: true }]}>
                  <Select onChange={onCommissionType} value={commType}>
                    <Option value="no-comm">No Comm</Option>
                    <Option value="bbb">Bet by Bet</Option>
                  </Select>
                </Form.Item>
              </Col>

              {commType === "bbb" && (
                <>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={`${updateNameDetails?.[id]} Match Comm (%)`}
                      name="matchcomm">
                      <Input type="number" disabled />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={24}>
                    <Form.Item
                      label="Match Comm (%)"
                      name="super_match_comm"
                      rules={[
                        { required: true, message: "Please enter match comm" },
                      ]}>
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={`${updateNameDetails?.[id]} Sess Comm (%)`}
                      name="sesscomm">
                      <Input type="number" disabled />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={24}>
                    <Form.Item
                      label="Sess Comm (%)"
                      name="super_sess_comm"
                      rules={[
                        {
                          required: true,
                          message: "Please enter session comm",
                        },
                      ]}>
                      <Input />
                    </Form.Item>
                  </Col>
                </>
              )}
            </Row>

            {/* Casino Section */}
            <h2 className="update_agent_text">Casino Share and Commission</h2>
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              defaultChecked
            />

            <Row className="super_agent update_agent">
              <Col lg={12} xs={24}>
                <Form.Item
                  label={`${updateNameDetails?.[id]} Casino Share (%)`}
                  name="super_casino_share">
                  <Input type="number" disabled />
                </Form.Item>
              </Col>

              <Col lg={12} xs={24}>
                <Form.Item
                  label="Casino Share (%)"
                  name="supercasinocomm"
                  rules={[
                    { required: true, message: "Please enter casino share" },
                  ]}>
                  <Input disabled={id === "1"} />
                </Form.Item>
              </Col>

              <Col lg={12} xs={24}>
                <Form.Item
                  label={`${updateNameDetails?.[id]} Casino Comm (%)`}
                  name="super_casino_comm">
                  <Input type="number" disabled />
                </Form.Item>
              </Col>

              <Col lg={12} xs={24}>
                <Form.Item
                  label="Casino Comm (%)"
                  name="sess_comm"
                  rules={[
                    { required: true, message: "Please enter casino comm" },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            {/* Submit */}
            <Row className="super_agent update_agent">
              <Col lg={12} xs={24}></Col>
              <Col lg={12} xs={24}>
                <Form.Item wrapperCol={{ offset: 19 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateSuper;
