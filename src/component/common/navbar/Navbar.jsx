/* eslint-disable react/prop-types */
import { Suspense, lazy, useEffect, useState } from "react";
// import { AiOutlineDown } from "react-icons/ai";
import { Dropdown, Space, Modal, Button } from "antd";
import { Bell, ChevronDown, Menu, Wallet, LockKeyhole, LogOut, ChevronRight } from "lucide-react";
import "./Navbar.scss";
import { imgUrl } from "../../../store/constant";
import { useAdminLogout } from "../useAdminLogout";

const ChangePassword = lazy(() => import("../ChangePassword/ChangePassword"));
const SelfDeposit = lazy(() => import("../DepositModal/SelfDeposit"));

const Navbar = ({ action }) => {
  const userData = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositeModalOpen, setIsDepositeModalOpen] = useState(false);
  const handleLogout = useAdminLogout();

  const menuLabel = (label, Icon, tone) => (
    <span className="profile-menu-row">
      <span className={`profile-menu-icon profile-menu-icon--${tone}`}><Icon size={22} strokeWidth={2} aria-hidden="true" /></span>
      <span className="profile-menu-label">{label}</span>
      <ChevronRight className="profile-menu-chevron" size={22} aria-hidden="true" />
    </span>
  );
  const items = [
    ...(userType == "7"
      ? [
          {
            label: menuLabel("Deposit", Wallet, "green"),
            key: "2",
          },
        ]
      : []),
    {
      label: menuLabel("Change Password", LockKeyhole, "blue"),
      key: "0",
    },

    {
      label: menuLabel("Logout", LogOut, "red"),
      className: "profile-menu-logout",
      key: "1",
    },
  ];
  const handleModal = (e) => {
    if (e.key == 0) {
      setIsModalOpen(true);
    } else if (e.key == 2) {
      setIsDepositeModalOpen(true);
    } else if (e.key == 1) {
      handleLogout();
    }
  };

  const handleCancel = () => {
    if ((pType == "old" || pType == "Old") && uType == "5") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const pType = localStorage.getItem("passType");
  const uType = localStorage.getItem("userType");

  useEffect(() => {
    if ((pType == "old" || pType == "Old") && uType == "5") {
      setIsModalOpen(true);
    }
  }, [pType, uType]);

  const hostName = window.location.hostname;
  const avatarText = userData?.slice(0, 2)?.toUpperCase() || "SA";

  const roleName = { 7: "Super Administrator", 6: "Admin", 5: "madmin", 4: "MasterAgent", 3: "SuperAgent", 2: "Agent" }[userType] || "";

  return (
    <>
      <div className="nav">
        <div className="nav_start">
          <Space className="open_btn">
            <Button type="" className="sub_open_btn" onClick={action}>
              <Menu size={22} strokeWidth={1.9} />
            </Button>
          </Space>

          <img
            alt="example"
            src={
              hostName.includes("mumbaiexchange9") ? "/img/mum-img.png" : imgUrl
            }
            height={40}
          />
          <span className="nav_greeting">🌸 Jay Shree Shyam 🌸</span>
        </div>
        <div className="nav_drop">
          <div className="sub_menu_nav">
            <span className="nav_notification" aria-hidden="true">
              <Bell size={23} strokeWidth={1.8} />
            </span>
            <Dropdown
              overlayClassName="admin-profile-dropdown"
              placement="bottomRight"
              autoFocus
              dropdownRender={(menu) => (
                <div className="profile-menu-panel">
                  <div className="profile-menu-heading">
                    <span className="profile-menu-avatar">{avatarText}</span>
                    <div className="profile-menu-identity">
                      <strong>{userData}</strong>
                      <span>{roleName}</span>
                    </div>
                  </div>
                  {menu}
                </div>
              )}
              className="droup_nav"
              menu={{
                className: "nav_droupdown",
                items,
                onClick: handleModal,
              }}
              trigger={["click"]}>
              <button type="button" className="user_deatils profile-menu-trigger" aria-label="Open profile menu">
                <span className="nav_username">
                  {userData}
                  <ChevronDown size={15} strokeWidth={2} />
                </span>
                <span className="nav_avatar">{avatarText}</span>
              </button>
            </Dropdown>
          </div>
        </div>
      </div>

      <Modal
        className="change_pass"
        rootClassName="change-password-modal-root"
        title="Change Password"
        open={isModalOpen}
        width={600}
        onCancel={handleCancel}
        destroyOnClose
        footer={false}>
        <div className="ch_pass">
          {isModalOpen && (
            <Suspense fallback={null}>
              <ChangePassword setIsModalOpen={setIsModalOpen} />
            </Suspense>
          )}
        </div>
      </Modal>
      {isDepositeModalOpen && (
        <Suspense fallback={null}>
          <SelfDeposit
            isDepositeModalOpen={isDepositeModalOpen}
            setIsDepositeModalOpen={setIsDepositeModalOpen}
          />
        </Suspense>
      )}
    </>
  );
};

export default Navbar;
