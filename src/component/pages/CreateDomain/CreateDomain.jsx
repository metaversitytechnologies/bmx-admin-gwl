import { useNavigate } from "react-router-dom";
import UpdateDomian from "./UpdateDomian";
import { Button, Col, Form, Input, Row, Checkbox, message, Table } from "antd";
import {
  useAppDetailsQuery,
  useGetCreateAppMutation,
} from "../../../store/service/userlistService";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import { useState } from "react";

const CreateDomain = () => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [createApp, { isLoading }] = useGetCreateAppMutation();
  const { data: appDetails, refetch } = useAppDetailsQuery();
  const nav = useNavigate();

  const [updateData, setUpdateData] = useState({
    isDemoIdLoginAllowed: false,
    multipleSubDomainAllowed: false,
    isSelfAllowed: false,
    transactionCode: "",
    appId: 0,
  });

  const options = [
    {
      label: "Demo Id Allowed",
      value: "isDemoIdLoginAllowed",
      className: "label-1",
    },
    { label: "Self Allowed", value: "isSelfAllowed", className: "label-2" },
    {
      label: "Multiple Domain Allowed",
      value: "multipleSubDomainAllowed",
      className: "label-3",
    },
  ];

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      formData.append("appname", values.appname);
      formData.append("appurl", values.appurl);

      formData.append(
        "isDemoIdLoginAllowed",
        values.permissions?.includes("isDemoIdLoginAllowed")
      );
      formData.append(
        "multipleSubDomainAllowed",
        values.permissions?.includes("multipleSubDomainAllowed")
      );
      formData.append(
        "isSelfAllowed",
        values.permissions?.includes("isSelfAllowed")
      );

      const res = await createApp(formData).unwrap();

      if (res?.status) {
        refetch();
        message.success("Domain created successfully!");
        setUpdateData({
          isDemoIdLoginAllowed: false,
          multipleSubDomainAllowed: false,
          isSelfAllowed: false,
          transactionCode: "",
        });
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  const column = [
    {
      title: "App Name",
      dataIndex: "appName",
      key: "appName",
    },
    {
      title: "App Url",
      dataIndex: "appUrl",
      key: "appUrl",
    },
    {
      title: "App Id",
      dataIndex: "appId",
      key: "appId",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (text, record) => (
        <button
          type="button"
          onClick={() => handleOpenModal(record)}
          className="ant-btn css-dev-only-do-not-override-12jzuas ant-btn-primary in_play_btn">
          <span>Update</span>
        </button>
      ),
    },
  ];

  const handleClose = () => {
    setOpenUpdateModal(!openUpdateModal);
  };
  const handleOpenModal = (items) => {
    setOpenUpdateModal(!openUpdateModal);
    setUpdateData({
      appId: items?.appId || 0,
      isDemoIdLoginAllowed: items?.isDemoIdLoginAllowed || false,
      multipleSubDomainAllowed: items?.multipleSubDomainAllowed || false,
      isSelfAllowed: items?.selfAllowed || false,
      transactionCode: "",
    });
  };

  return (
    <div className="">
      <div className="main_live_section">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              Create Domain
            </div>
            <div className="show_btn">
              <button onClick={() => nav(-1)}>Back</button>
            </div>
          </div>
        </div>

        <div className="ant-spin-nested-loading">
          <Row gutter={24}>
            <Col lg={12} xs={24}>
              <Form
                className="form_data create_user_form"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{
                  permissions: [
                    "isDemoIdLoginAllowed",
                    "isSelfAllowed",
                    "multipleSubDomainAllowed",
                  ], // ✅ default all true
                }}>
                <div style={{ border: "1px solid #ddd", padding: "12px" }}>
                  <Row className="super_agent">
                    <Col md={24} xs={24}>
                      <Form.Item
                        label="App Name"
                        name="appname"
                        rules={[
                          {
                            required: true,
                            message: "App Name is required!",
                          },
                        ]}>
                        <Input placeholder="Enter App Name" />
                      </Form.Item>
                    </Col>

                    <Col md={24} xs={24}>
                      <Form.Item
                        label="App Url"
                        name="appurl"
                        rules={[
                          {
                            required: true,
                            message: "App Url is required!",
                          },
                        ]}>
                        <Input placeholder="Enter App Url" />
                      </Form.Item>
                    </Col>
                    <Col md={24} xs={24}>
                      <Form.Item
                        name="permissions"
                        label="Permissions"
                        valuePropName="checked">
                        <Checkbox.Group options={options} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Col xs={24}>
                    <Row justify={"end"} className="super_agent sub_super">
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={isLoading}>
                          Submit
                        </Button>
                      </Form.Item>
                    </Row>
                  </Col>
                </div>
              </Form>
            </Col>
            <Col lg={12} xs={24} className="app_urldata">
              <div
                className="table_section exposure"
                style={{
                  marginBottom: "100px",
                  maxHeight: "70vh",
                  overflow: "scroll",
                  paddingBottom: "10px",
                }}>
                <Table
                  columns={column}
                  dataSource={appDetails?.data || []}
                  pagination={false}
                  scroll={{ y: 500 }}
                  loading={{
                    spinning: isLoading,
                    indicator: <CustomLoading />,
                  }}
                />
                <br />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <UpdateDomian
        openUpdateModal={openUpdateModal}
        setUpdateData={setUpdateData}
        updateData={updateData}
        handleClose={handleClose}
        refetch={refetch}
      />
    </div>
  );
};

export default CreateDomain;
