import { useCallback, useEffect, useState } from "react";
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
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../../store/service/userlistService";
import { convertCode } from "../../../../store/constant";

const updateName = {
  admin: "Admin",
  subAdmin: "Mini Admin",
  superMaster: "Master",
  master: "Super",
  dealer: "Agent",
  client: "Client",
  my: "My",
};

const getRoleKeyFromUserId = (value = "") => {
  const userId = value.toUpperCase();

  if (userId.includes("AD")) return "admin";
  if (userId.includes("SUB")) return "subAdmin";
  if (userId.includes("M")) return "superMaster";
  if (userId.includes("SA")) return "master";
  if (userId.includes("A")) return "dealer";

  return "client";
};

const getUpperRoleKey = (roleKey) => {
  switch (roleKey) {
    case "client":
      return "dealer";
    case "dealer":
      return "master";
    case "master":
      return "superMaster";
    case "superMaster":
      return "subAdmin";
    case "subAdmin":
      return "admin";
    case "admin":
      return "my";
    default:
      return "my";
  }
};

const getFieldValue = (data, roleKey, suffix, fallback = 0) => {
  if (!data) return fallback;

  if (!roleKey || roleKey === "client") {
    const baseKey = `${suffix.charAt(0).toLowerCase()}${suffix.slice(1)}`;
    return data?.[baseKey] ?? fallback;
  }

  return data?.[`${roleKey}${suffix}`] ?? fallback;
};

const UpdateSuper = () => {
  const { id: routeId, userId: routeUserId } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [commType, setCommType] = useState("");
  const [form] = Form.useForm();
  const nav = useNavigate();
  const targetUserId = routeUserId || routeId || "";
  const currentUserId = localStorage.getItem("userId") || "";
  const currentUserRoleKey = getRoleKeyFromUserId(currentUserId);

  const [trigger, { data: updateData, isLoading }] = useUpdateUserMutation();
  const { data: resuilt } = useGetUserQuery(
    { userId: targetUserId },
    { refetchOnMountOrArgChange: true }
  );

  const editUserId = resuilt?.data?.userId || targetUserId;
  const roleKey = getRoleKeyFromUserId(editUserId);
  const upperRoleKey = getUpperRoleKey(roleKey);
  const isClient = roleKey === "client";
  const isDirectChild = currentUserRoleKey === upperRoleKey;
  const parentLabel = updateName?.[upperRoleKey] || "Parent";
  const userTypeLabel = updateName?.[roleKey] || "User";

  const getUserField = useCallback(
    (fieldSuffix) => getFieldValue(resuilt?.data, roleKey, fieldSuffix, 0),
    [resuilt?.data, roleKey]
  );
  const getUserUpper = useCallback(
    (fieldSuffix) => getFieldValue(resuilt?.data, upperRoleKey, fieldSuffix, 0),
    [resuilt?.data, upperRoleKey]
  );
  const getMyField = useCallback(
    (fieldSuffix, myKey, fallbackKey) => {
      const myValue =
        resuilt?.data?.[myKey] ??
        (fallbackKey ? resuilt?.data?.[fallbackKey] : undefined);

      return isDirectChild ? (myValue ?? 0) : getUserUpper(fieldSuffix);
    },
    [getUserUpper, isDirectChild, resuilt?.data]
  );

  useEffect(() => {
    if (resuilt?.status) {
      const userCom =
        resuilt?.data?.matchCommission > 0 ||
        resuilt?.data?.sessionCommision > 0 ||
        resuilt?.data?.matkaCommission > 0
          ? "bbb"
          : "no-comm";
      const otherCom =
        getUserUpper("SessionCommision") > 0 ||
        getUserUpper("MatchCommission") > 0 ||
        getUserUpper("MatkaCommission") > 0
          ? "bbb"
          : "no-comm";
      const parentCom =
        getMyField("SessionCommision", "mySessionCommision") > 0 ||
        getMyField("MatchCommission", "myMatchCommission") > 0 ||
        getMyField("MatkaCommission", "myMatkaCommission", "myMatkaCommision") >
          0
          ? "bbb"
          : "no-comm";
      const editableCommType = isClient ? userCom : otherCom;

      setCommType(editableCommType);

      form.setFieldsValue({
        userId: convertCode(resuilt?.data?.userId),
        name: resuilt?.data?.userName,
        reference: resuilt?.data?.reference,
        number: resuilt?.data?.contact,
        password: "******",
        comm_type: editableCommType,
        commType: parentCom === "bbb" ? "Bet by Bet" : "No Comm",
        matchcomm: getMyField("MatchCommission", "myMatchCommission"),
        super_match_comm: getUserField("MatchCommission"),
        sesscomm: getMyField("SessionCommision", "mySessionCommision"),
        super_sess_comm: getUserField("SessionCommision"),
        matkacomm: getMyField(
          "MatkaCommission",
          "myMatkaCommission",
          "myMatkaCommision"
        ),
        super_matka_comm: getUserField("MatkaCommission"),
        sess_comm: getUserField("CasinoCommission"),
        super_casino_share: getMyField(
          "CasinoPartnership",
          "myCasinoPartnership"
        ),
        matchShare: getMyField("Partnership", "myPartnership"),
        super_casino_comm: getMyField(
          "CasinoCommission",
          "myCasinoCommission"
        ),
        supercasinocomm: getUserField("CasinoPartnership"),
        share: getUserField("Partnership"),
        match_share: resuilt?.data?.matchShare,
      });
    }
  }, [
    form,
    getMyField,
    getUserField,
    getUserUpper,
    isClient,
    resuilt?.data,
    resuilt?.status,
  ]);

  const onFinish = (values) => {
    const isNoComm = values?.comm_type === "no-comm";
    const updatedShare = values?.share ?? getUserField("Partnership");
    const updatedCasinoShare =
      values?.supercasinocomm ?? getUserField("CasinoPartnership");
    const updatedMatchComm =
      values?.super_match_comm ?? getUserField("MatchCommission");
    const updatedSessionComm =
      values?.super_sess_comm ?? getUserField("SessionCommision");
    const updatedCasinoComm =
      values?.sess_comm ?? getUserField("CasinoCommission");
    const updatedMatkaComm =
      values?.super_matka_comm ?? getUserField("MatkaCommission");

    const userData = {
      userId: editUserId,
      userName: values?.name,
      reference: values?.reference,
      password: resuilt?.data?.password,
      contact: values.number,
      flatShare: false,
      casinoPlay: true,
      mobileAppCharge: getUserField("MobileAppCharge"),
      commissionType: isNoComm ? 1 : 2,
      partnership: updatedShare,
      matkaPartnership: isClient ? getUserField("Partnership") : updatedShare,
      casinoPartnership: isClient
        ? getUserField("CasinoPartnership")
        : updatedCasinoShare,
      internationalCasinoPartnership: getUserField("IntlCasinoPartnership"),
      matchCommission: isNoComm ? 0 : updatedMatchComm,
      sessionCommission: isNoComm ? 0 : updatedSessionComm,
      casinoCommission: isNoComm ? 0 : updatedCasinoComm,
      matkaCommission: isNoComm ? 0 : updatedMatkaComm,
    };
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
  }, [api, nav, updateData]);

  const onCommissionType = (value) => {
    setCommType(value);

    if (value === "no-comm") {
      form.setFieldsValue({
        super_match_comm: 0,
        super_sess_comm: 0,
        sess_comm: 0,
        super_matka_comm: 0,
      });
    }
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
              Update {userTypeLabel}
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
              {!isClient && (
                <>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={`${parentLabel} Match Share (%)`}
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
                  label={`${parentLabel} Comm Type`}
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
                      label={`${parentLabel} Match Comm (%)`}
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
                      label={`${parentLabel} Sess Comm (%)`}
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

                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={`${parentLabel} Matka Comm (%)`}
                      name="matkacomm">
                      <Input type="number" disabled />
                    </Form.Item>
                  </Col>

                  <Col lg={12} xs={24}>
                    <Form.Item
                      label="Matka Comm (%)"
                      name="super_matka_comm"
                      rules={[
                        {
                          required: true,
                          message: "Please enter matka comm",
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
                  label={`${parentLabel} Casino Share (%)`}
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
                  <Input disabled={isClient} />
                </Form.Item>
              </Col>

              <Col lg={12} xs={24}>
                <Form.Item
                  label={`${parentLabel} Casino Comm (%)`}
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
