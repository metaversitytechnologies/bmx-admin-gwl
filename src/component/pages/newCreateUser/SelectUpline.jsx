import { Col, Form, Input, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import "./SelectUpline.scss";
import { convertCode } from "../../../store/constant";

const SelectUpline = ({ data, handleChange, handleSelect }) => {
  const nav = useNavigate();

  return (
    <>
      <div
        className="main_live_section"
        style={{
          boxShadow: "0 0 5px 5px rgba(0, 0, 0, .03)",
        }}>
        <div className="_match">
          <div className="sub_live_section live_report select_upline">
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              Select Upline
            </div>
          </div>
        </div>
        <div className="ant-spin-nested-loading">
          <Form
            className="form_data upline_user"
            name="basic"
            // onFinish={onFinish}
            autoComplete="off">
            <div>
              <Form.Item name="selectuser" required>
                <Select
                  placeholder="Select Parent"
                  options={
                    data?.map((i) => ({
                      label: `${convertCode(i?.userId)} (${i?.userName})`,
                      value: convertCode(i?.userId),
                    })) || []
                  }
                  showSearch
                  allowClear
                  onSelect={handleSelect}
                  onSearch={handleChange}>
                  {/* <Option value="sumana6748">sumana6748</Option> */}
                </Select>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SelectUpline;
