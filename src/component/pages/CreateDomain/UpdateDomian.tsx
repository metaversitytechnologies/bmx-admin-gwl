import { useEffect } from "react";
import { Button, Form, Modal, Spin, Switch, message } from "antd";
import { useGetUpdateAppMutation } from "../../../store/service/userlistService";

const UpdateDomian = ({
  handleClose,
  openUpdateModal,
  setUpdateData,
  updateData,
  refetch,
}) => {
  const [form] = Form.useForm();

  const [trigger, { isLoading }] = useGetUpdateAppMutation();

  useEffect(() => {
    if (updateData) {
      form.setFieldsValue(updateData);
    }
  }, [updateData, form]);

  // 🔹 Handle submit
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("appId", updateData?.appId || 0);
      formData.append("isDemoIdLoginAllowed", values.isDemoIdLoginAllowed);
      formData.append(
        "multipleSubDomainAllowed",
        values.multipleSubDomainAllowed
      );
      formData.append("isSelfAllowed", values.isSelfAllowed);
      formData.append("transactionCode", updateData?.transactionCode || "");

      const res = await trigger(formData).unwrap();

      if (res?.status) {
        message.success("Domain updated successfully!");
        handleClose();
        refetch();
      } else {
        message.error(res?.message || "Failed to update domain");
      }
    } catch (err) {
      message.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal
      className="modal_deposit"
      destroyOnClose
      title={
        <h1>
          <span>Update Domain Permission</span>
        </h1>
      }
      open={openUpdateModal}
      onCancel={handleClose}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      footer={null}>
      <div className="form_modals self_allow">
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Demo Id Allowed"
            name="isDemoIdLoginAllowed"
            valuePropName="checked">
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              onChange={(val) =>
                setUpdateData((prev) => ({
                  ...prev,
                  isDemoIdLoginAllowed: val,
                }))
              }
            />
          </Form.Item>

          <Form.Item
            label="Self Allowed"
            name="isSelfAllowed"
            valuePropName="checked">
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              onChange={(val) =>
                setUpdateData((prev) => ({ ...prev, isSelfAllowed: val }))
              }
            />
          </Form.Item>

          <Form.Item
            label="Multiple Domain Allowed"
            name="multipleSubDomainAllowed"
            valuePropName="checked">
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              onChange={(val) =>
                setUpdateData((prev) => ({
                  ...prev,
                  multipleSubDomainAllowed: val,
                }))
              }
            />
          </Form.Item>

          <div className="deposit_btn">
            <Form.Item>
              <Button
                className="gx-bg-grey"
                onClick={handleClose}
                type="primary">
                Return
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateDomian;
