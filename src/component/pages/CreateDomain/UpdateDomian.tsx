import { useEffect } from "react";
import { Button, Form, Modal, Switch, message } from "antd";
import { ArrowLeft, Check, Globe, ShieldCheck, UserCheck, Users, X } from "lucide-react";
import PropTypes from "prop-types";
import { useGetUpdateAppMutation } from "../../../store/service/userlistService";

// Same field names/labels the modal has always sent — presentation
// metadata (icon/description) only, backend keys are untouched.
const PERMISSION_ROWS = [
  {
    name: "isDemoIdLoginAllowed",
    label: "Demo Id Allowed",
    description: "Allow demo id for this domain",
    icon: Users,
  },
  {
    name: "isSelfAllowed",
    label: "Self Allowed",
    description: "Allow self registration",
    icon: UserCheck,
  },
  {
    name: "multipleSubDomainAllowed",
    label: "Multiple Domain Allowed",
    description: "Allow access across multiple domains",
    icon: Globe,
  },
];

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
      className="modal_deposit approved-deposit-modal approved-permission-modal"
      width={550}
      destroyOnClose
      title={
        <div className="approved-deposit-header">
          <span className="approved-deposit-header-icon">
            <ShieldCheck size={22} strokeWidth={1.8} />
          </span>
          <div>
            <h2>Update Domain Permission</h2>
            <p>Manage permissions for this domain</p>
          </div>
        </div>
      }
      open={openUpdateModal}
      onCancel={handleClose}
      closeIcon={<X size={20} strokeWidth={1.8} />}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      footer={null}>
      <div className="approved-deposit-content approved-permission-content">
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <div className="approved-permission-group">
            {PERMISSION_ROWS.map((row) => {
              const Icon = row.icon;
              return (
                <div className="approved-permission-row" key={row.name}>
                  <span className="approved-permission-icon">
                    <Icon size={16} strokeWidth={1.8} />
                  </span>
                  <span className="approved-permission-text">
                    <span className="approved-permission-label">
                      {row.label}
                    </span>
                    <span className="approved-permission-desc">
                      {row.description}
                    </span>
                  </span>
                  <Form.Item name={row.name} valuePropName="checked" noStyle>
                    <Switch
                      checkedChildren="ON"
                      unCheckedChildren="OFF"
                      onChange={(val) =>
                        setUpdateData((prev) => ({ ...prev, [row.name]: val }))
                      }
                    />
                  </Form.Item>
                </div>
              );
            })}
          </div>

          <div className="deposit_btn">
            <Form.Item>
              <Button
                className="gx-bg-grey approved-deposit-return"
                onClick={handleClose}
                type="primary">
                <ArrowLeft size={16} strokeWidth={1.8} />
                Return
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="approved-deposit-submit">
                <Check size={16} strokeWidth={1.9} />
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

UpdateDomian.propTypes = {
  handleClose: PropTypes.func.isRequired,
  openUpdateModal: PropTypes.bool.isRequired,
  setUpdateData: PropTypes.func.isRequired,
  updateData: PropTypes.shape({
    appId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    transactionCode: PropTypes.string,
    isDemoIdLoginAllowed: PropTypes.bool,
    isSelfAllowed: PropTypes.bool,
    multipleSubDomainAllowed: PropTypes.bool,
  }),
  refetch: PropTypes.func.isRequired,
};

export default UpdateDomian;
