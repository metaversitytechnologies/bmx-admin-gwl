/* eslint-disable react/prop-types */
import { Suspense, lazy, useEffect, useState } from "react";
// import { AiOutlineDown } from "react-icons/ai";
import { Dropdown, Space, Modal, Button } from "antd";
import { Bell, ChevronDown, PanelLeft } from "lucide-react";
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

  const items = [
    ...(userType == "7"
      ? [
          {
            label: "Deposit",
            key: "2",
          },
        ]
      : []),
    {
      label: "Change Password",
      key: "0",
    },

    {
      label: <p onClick={handleLogout}>Logout</p>,
      key: "1",
    },
  ];
  const handleModal = (e) => {
    if (e.key == 0) {
      setIsModalOpen(true);
    } else if (e.key == 2) {
      setIsDepositeModalOpen(true);
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

  return (
    <>
      <div className="nav">
        <div className="nav_start">
          <Space className="open_btn">
            <Button type="" className="sub_open_btn" onClick={action}>
              <PanelLeft size={22} strokeWidth={1.9} />
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
              style={{ zIndex: "999999" }}
              className="droup_nav"
              menu={{
                className: "nav_droupdown",
                items,
                onClick: handleModal,
              }}
              trigger={["click"]}>
              <div
                className="user_deatils"
                onClick={(e) => e.preventDefault()}>
                <span className="nav_username">
                  {userData}
                  <ChevronDown size={17} strokeWidth={2} />
                </span>
                <span className="nav_avatar">{avatarText}</span>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>

      <Modal
        className="change_pass"
        title="Change Password"
        open={isModalOpen}
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
