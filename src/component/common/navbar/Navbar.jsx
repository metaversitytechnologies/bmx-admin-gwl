import { useEffect, useState } from "react";
import "./Navbar.scss";
// import { AiOutlineDown } from "react-icons/ai";
import { Dropdown, Space, Modal, Button } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../store/service/authService";
import { useDashboardQuery } from "../../../store/service/userlistService";
import ChangePassword from "../ChangePassword/ChangePassword";
import { MdMenu } from "react-icons/md";
import SelfDeposit from "../DepositModal/SelfDeposit";
import { imgUrl } from "../../../store/constant";

const Navbar = ({ action }) => {
  const userData = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");
  const usernameLabel = userData || "User";
  const { data: dashboardData } = useDashboardQuery(undefined, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
  });
  const balanceValue = Number(dashboardData?.data?.balance);
  const balanceLabel = Number.isFinite(balanceValue)
    ? balanceValue.toFixed(2)
    : "--";

  const [trigger] = useLogoutMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositeModalOpen, setIsDepositeModalOpen] = useState(false);
  const nav = useNavigate();

  const handleLogout = () => {
    trigger();
    localStorage.clear();
    nav("/");
  };

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
    } else {
      console.log("logout");
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
  }, [pType]);

  const hostName = window.location.hostname;

  return (
    <>
      <div className="nav">
        <div className="nav_left">
          <Space className="open_btn">
            <Button type="" className="sub_open_btn" onClick={action}>
              <MdMenu />
            </Button>
          </Space>

          <img
            alt="example"
            src={
              hostName.includes("mumbaiexchange9") ? "/img/mum-img.png" : imgUrl
            }
            height={40}
          />
        </div>
        <div className="nav_drop">
          <div className="sub_menu_nav">
            <Dropdown
              placement="bottomRight"
              menu={{
                className: "nav_droupdown",
                items,
                onClick: handleModal,
              }}
              trigger={["click"]}>
              <button
                type="button"
                className="user_deatils"
                title={usernameLabel}
                onClick={(e) => e.preventDefault()}>
                <span className="user_text_group">
                  <span className="user_name_text">{usernameLabel}</span>
                  <span className="user_balance_text">Bal: {balanceLabel}</span>
                </span>
                <CaretDownOutlined className="user_dropdown_icon" />
              </button>
            </Dropdown>
            <svg
              className="nav_status_icon"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              color="white"
              height="30"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "white" }}>
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM16.8201 17.0761C18.1628 15.8007 19 13.9981 19 12C19 8.13401 15.866 5 12 5C10.9391 5 9.9334 5.23599 9.03241 5.65834L10.0072 7.41292C10.6177 7.14729 11.2917 7 12 7C14.7614 7 17 9.23858 17 12H14L16.8201 17.0761ZM14.9676 18.3417L13.9928 16.5871C13.3823 16.8527 12.7083 17 12 17C9.23858 17 7 14.7614 7 12H10L7.17993 6.92387C5.83719 8.19929 5 10.0019 5 12C5 15.866 8.13401 19 12 19C13.0609 19 14.0666 18.764 14.9676 18.3417Z"></path>
            </svg>
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
          <ChangePassword setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
      <SelfDeposit
        isDepositeModalOpen={isDepositeModalOpen}
        setIsDepositeModalOpen={setIsDepositeModalOpen}
      />
    </>
  );
};

export default Navbar;
