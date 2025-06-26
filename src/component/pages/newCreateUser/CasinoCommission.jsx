import { Col, Form, Input, Row, Select } from "antd";
import React from "react";

const CasinoCommission = ({ createName, commiType }) => {
  return (
    <>
      <div>
        <h2 className="match_share">
          {createName} Casino Share And Commission
        </h2>
      </div>

      <Row className="super_agent sub_super">
        <Col span={12}>
          <Form.Item
            label="My Casino Share (%)"
            name="cassinoComm"
            required={false}>
            <Input type="number" value={2} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Casino Share (%)"
            name="cassino_Comm"
            required
            rules={[
              {
                required: true,
                message: "Please input your casino share!",
              },
            ]}>
            <Input placeholder="casino share" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="My Casino comm(%)"
            name="cassinoComm"
            required={false}>
            <Input type="number" value={2} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Casino comm(%)"
            name="cassino_Comm"
            required
            rules={[
              {
                required: true,
                message: "Please enter valid Casino commission",
              },
            ]}>
            <Input placeholder="casino commition" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default CasinoCommission;
