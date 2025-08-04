import { Card, Col, Empty, Modal, Row } from "antd";
import "./Settings.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import ChangePassword from "../../common/ChangePassword/ChangePassword";
import moment from "moment";
import AccountStatement from "./AccountStatement/AccountStatement";
import SettingTable from "./SettingTable";

const data = [];

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className="setting_main">
      <div>
        <Row gutter={[8]}>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <div className="setting_data1">
              <Link to="/searchUser">Search User</Link>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <div className="setting_data1">
              <Link to="/account-statement">Statements</Link>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <div className="setting_data mob_setting">
              <Link to="/account-operation">A/c operations</Link>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <div className="setting_data">
              <Link to="/Events/matchledger">Profit & Loss</Link>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <div className="setting_data mob_setting">
              <Link to="/casinoprofitandloss">Casino Profit & Loss</Link>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <div className="setting_data" onClick={() => setIsModalOpen(true)}>
              <p>Change Password</p>
            </div>
          </Col>
        </Row>

        {/* <Card className=""> */}
        <SettingTable />
        {/* </Card> */}
      </div>

      <Modal
        className="change_pass"
        title="Change Password"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}>
        <div className="ch_pass">
          <ChangePassword setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
    </Card>
  );
};

export default Settings;
