import { Card, Modal } from "antd";
import {
  Calculator,
  ChevronRight,
  FileText,
  LockKeyhole,
  Search,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import ChangePassword from "../../common/ChangePassword/ChangePassword";
import SettingTable from "./SettingTable";

const SettingsActionCard = ({ icon, title, description, to, onClick }) => {
  const content = (
    <>
      <span className="settings-dashboard-action-icon">{icon}</span>
      <span className="settings-dashboard-action-copy">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <ChevronRight size={18} strokeWidth={2.2} />
    </>
  );

  if (to) {
    return (
      <Link className="settings-dashboard-action" to={to}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className="settings-dashboard-action"
      type="button"
      onClick={onClick}>
      {content}
    </button>
  );
};

SettingsActionCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const actions = [
    {
      title: "Search User",
      description: "Find user details",
      icon: <Search size={20} strokeWidth={2} />,
      to: "/searchUser",
    },
    {
      title: "Statements",
      description: "View statements",
      icon: <FileText size={20} strokeWidth={2} />,
      to: "/account-statement",
    },
    {
      title: "A/c Operations",
      description: "Account operations",
      icon: <Calculator size={20} strokeWidth={2} />,
      to: "/account-operation",
    },
    {
      title: "Profit & Loss",
      description: "View P&L report",
      icon: <TrendingUp size={20} strokeWidth={2} />,
      to: "/Events/matchledger",
    },
    {
      title: "Casino P&L",
      description: "Casino report",
      icon: <WalletCards size={20} strokeWidth={2} />,
      to: "/casinoprofitandloss",
    },
    {
      title: "Change Password",
      description: "Update password",
      icon: <LockKeyhole size={20} strokeWidth={2} />,
      onClick: () => setIsModalOpen(true),
    },
  ];

  return (
    <Card className="setting_main settings-dashboard">
     

      <nav className="settings-dashboard-actions" aria-label="Settings actions">
        {actions.map((action) => (
          <SettingsActionCard key={action.title} {...action} />
        ))}
      </nav>

      <SettingTable />

      <Modal
        className="change_pass"
        rootClassName="change-password-modal-root"
        title="Change Password"
        open={isModalOpen}
        width={600}
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
