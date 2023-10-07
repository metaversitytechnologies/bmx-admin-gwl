import { Col, Form, Input, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import './SelectUpline.scss'

const SelectUpline = ({data, handleChange, handleSelect}) => {
  const nav = useNavigate();


 

  return (
    <>
      <div className="main_live_section">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              Select Upline
            </div>
            <div className="show_btn">
              <button onClick={() => nav(-1)}>Back</button>
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
                          label: i,
                          value: i,
                        })) || []
                      }
                      showSearch
                      allowClear
                      onSelect={handleSelect}
                      onSearch={handleChange}
                    >
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
