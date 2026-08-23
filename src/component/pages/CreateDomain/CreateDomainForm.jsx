import { Form, Checkbox, Button } from "antd";
import { AppWindow, ArrowRight, Link2, Users, UserCheck, Globe2 } from "lucide-react";
import PropTypes from "prop-types";
import DomainField from "./DomainField";
import PermissionOption from "./PermissionOption";

// Same values/labels the page has always sent — presentation metadata
// (icon/description) only, backend keys are untouched.
const PERMISSION_OPTIONS = [
  {
    label: "Demo Id Allowed",
    value: "isDemoIdLoginAllowed",
    className: "label-1",
    description: "Allow demo id for this domain",
    icon: Users,
  },
  {
    label: "Self Allowed",
    value: "isSelfAllowed",
    className: "label-2",
    description: "Allow self registration",
    icon: UserCheck,
  },
  {
    label: "Multiple Domain Allowed",
    value: "multipleSubDomainAllowed",
    className: "label-3",
    description: "Allow access across multiple domains",
    icon: Globe2,
  },
];

const CreateDomainForm = ({ form, onFinish, isLoading }) => (
  <div className="create-domain-form-card">
    <div className="create-domain-form-decor" aria-hidden="true">
      <Globe2 size={96} strokeWidth={1} />
    </div>

    <div className="create-domain-form-heading">
      <h2 className="create-domain-form-title">Create New Domain ✨</h2>
      <p className="create-domain-form-subtitle">
        Fill the details below to add a new domain
      </p>
    </div>

    <Form
      form={form}
      className="create-domain-form"
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        permissions: [
          "isDemoIdLoginAllowed",
          "isSelfAllowed",
          "multipleSubDomainAllowed",
        ],
      }}>
      <DomainField
        label="App Name"
        name="appname"
        placeholder="Enter App Name"
        icon={<AppWindow size={15} strokeWidth={1.8} />}
        rules={[{ required: true, message: "App Name is required!" }]}
      />
      <DomainField
        label="App Url"
        name="appurl"
        placeholder="Enter App Url"
        icon={<Link2 size={15} strokeWidth={1.8} />}
        rules={[{ required: true, message: "App Url is required!" }]}
      />

      <div className="create-domain-permissions">
        <div className="create-domain-permissions-heading">
          <span>Permissions</span>
        </div>

        <Form.Item name="permissions" valuePropName="checked" noStyle>
          <Checkbox.Group className="create-domain-permission-group">
            {PERMISSION_OPTIONS.map((option) => (
              <PermissionOption key={option.value} option={option} />
            ))}
          </Checkbox.Group>
        </Form.Item>
      </div>

      <Form.Item className="create-domain-submit-item">
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className="create-domain-submit">
          Create Domain <ArrowRight size={15} strokeWidth={2} />
        </Button>
      </Form.Item>
    </Form>
  </div>
);

CreateDomainForm.propTypes = {
  form: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default CreateDomainForm;
