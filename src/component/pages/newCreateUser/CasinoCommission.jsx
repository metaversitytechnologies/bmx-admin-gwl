import { Col, Form, Input, Row } from "antd";
import { Dices } from "lucide-react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const CasinoCommission = ({ createName, commiType }) => {
  const { id } = useParams();
  return (
    <section className="create-admin-card create-admin-commission-card">
      <div className="create-admin-section-heading">
        <span className="create-admin-section-icon">
          <Dices size={16} strokeWidth={1.9} />
        </span>
        <div>
          <h2>{createName} Casino Share And Commission</h2>
          <p>Configure casino sharing and commission rules</p>
        </div>
      </div>

      <Row className="super_agent sub_super create-admin-grid">
        {id !== "2" && (
          <Col lg={12} xs={24}>
            <Form.Item
              label="My Casino Share (%)"
              name="cassinoShare"
              required={false}>
              <Input type="number" value={2} disabled />
            </Form.Item>
          </Col>
        )}
        {id !== "2" && (
          <Col lg={12} xs={24}>
            <Form.Item
              label="Casino Share (%)"
              name="cassino_Share"
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
        )}
        <Col lg={12} xs={24}>
          <Form.Item
            label="My Casino comm(%)"
            name="cassinoComm"
            required={false}>
            <Input type="number" value={2} disabled />
          </Form.Item>
        </Col>
        <Col lg={12} xs={24}>
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
            <Input
              placeholder="casino commition"
              disabled={commiType !== "bbb"}
            />
          </Form.Item>
        </Col>
      </Row>
    </section>
  );
};

CasinoCommission.propTypes = {
  createName: PropTypes.string,
  commiType: PropTypes.string,
};

export default CasinoCommission;
