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
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../../store/service/userlistService";

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
  1: "dealer",
  2: "super",
  3: "master",
  4: "superMaster",
  5: "subAdmin",
  6: "admin",
};

const UpdateSuper = () => {
  const getUserField = (fieldSuffix) =>
    resuilt?.data?.[Responsedata?.[id] + fieldSuffix] || 0;
  const [api, contextHolder] = notification.useNotification();
  const [commType, setCommType] = useState("");
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [data, setData] = useState();

  const { id, userId } = useParams();
  const [trigger, { data: updateData, isLoading }] = useUpdateUserMutation();
  const { data: resuilt } = useGetUserQuery(
    { userId },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (resuilt?.status) {
      setData(resuilt?.data);
      setCommType(
        resuilt?.data?.myCasinoPartnership > 0 ||
          resuilt?.data?.myMatchCommission > 0
          ? "bbb"
          : "no-comm"
      );
    }
  }, [resuilt?.data]);

  console.log(commType, "commTypecommTypecommType");

  // useEffect(() => {
  //   if (updateData?.status) {
  //     api.success({
  //       message: updateData?.message,
  //       description: "Success",
  //       placement: "top",
  //       closeIcon: false,
  //     });
  //     form.resetFields();
  //   } else if (!updateData?.status || error?.data?.message) {
  //     api.error({
  //       message: updateData?.message || error?.data?.message,
  //       placement: "top",
  //       closeIcon: false,
  //     });
  //   }
  // }, [updateData, error]);

  const onFinish = (values) => {
    const isNoComm = values?.comm_type === "no-comm";

    const userData = {
      userId: values?.userId,
      userName: values?.name,
      reference: values?.reference,
      password: resuilt?.data?.password,
      contact: values.number,
      flatShare: false,
      casinoPlay: true,
      mobileAppCharge: 0,
      commissionType: isNoComm ? 1 : 2,
      partnership: values?.share,
      casinoPartnership: values?.supercasinocomm,
      internationalCasinoPartnership: 100,
      matchCommission: isNoComm ? 0 : values?.super_match_comm,
      sessionCommission: isNoComm ? 0 : values?.super_sess_comm,
      casinoCommission: isNoComm ? 0 : values?.sess_comm,
    };

    trigger(userData);
    form.resetFields();
  };

  useEffect(() => {
    if (!updateData) return;

    if (updateData?.status) {
      api.success({
        message: updateData?.message || "User updated successfully",
        placement: "top",
        closeIcon: false,
      });
      form.resetFields();

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
    setCommType(value);
  };

  const { Option } = Select;

  console.log(getUserField("MatchCommission"), "getUserField");

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
            fields={[
              { name: "userId", value: resuilt?.data?.userId },
              { name: "name", value: resuilt?.data?.userName },
              { name: "reference", value: resuilt?.data?.reference },
              { name: "number", value: resuilt?.data?.contact },

              { name: "password", value: "******" },
              {
                name: "comm_type",
                value:
                  resuilt?.data?.myCasinoPartnership > 0 ||
                  resuilt?.data?.myMatchCommission > 0
                    ? "bbb"
                    : "no-comm",
              },
              {
                name: "commType",
                value:
                  resuilt?.data?.myCasinoPartnership > 0 ||
                  resuilt?.data?.myMatchCommission > 0
                    ? "Bet by Bet"
                    : "No Comm",
              },
              { name: "matchcomm", value: getUserField("MatchCommission") },
              {
                name: "super_match_comm",
                value: resuilt?.data?.myMatchCommission,
              },
              { name: "sesscomm", value: getUserField("SessionCommision") },
              {
                name: "super_sess_comm",
                value: resuilt?.data?.mySessionCommision,
              },
              {
                name: "sess_comm",
                value: resuilt?.data?.myCasinoCommission,
              },
              {
                name: "super_casino_share",
                value: getUserField("CasinoPartnership"),
              },
              {
                name: "matchShare",
                value: resuilt?.data?.myPartnership,
              },
              {
                name: "super_casino_comm",
                value: getUserField("CasinoCommission"),
              },
              {
                name: "supercasinocomm",
                value: resuilt?.data?.myCasinoPartnership,
              },
              {
                name: "share",
                value: getUserField("Partnership"),
              },
              { name: "match_share", value: resuilt?.data?.matchShare },
            ]}>
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
                  <Input disabled />
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
