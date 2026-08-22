import { Form, Input } from "antd";
import { Search, SlidersHorizontal } from "lucide-react";
import PropTypes from "prop-types";

const LimitToolbar = ({ form, onSearch, onClear }) => (
  <div className="admin-details-toolbar update-limit-toolbar">
    <div className="admin-details-toolbar-left">
      <Form
        form={form}
        onFinish={onSearch}
        className="admin-details-search-form"
        autoComplete="off">
        <Form.Item name="username">
          <Input
            prefix={<Search size={15} strokeWidth={1.8} />}
            placeholder="Search by code or name..."
            allowClear
            onChange={(e) => {
              if (!e.target.value) {
                onClear();
              }
            }}
          />
        </Form.Item>

        <button
          type="submit"
          className="admin-details-tool-button update-limit-add">
          <Search size={15} color="#ffffff" />
          Search
        </button>
      </Form>
    </div>
  </div>
);

LimitToolbar.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default LimitToolbar;
