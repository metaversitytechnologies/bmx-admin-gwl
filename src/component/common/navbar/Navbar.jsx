import { useEffect, useState } from "react";
import "./Navbar.scss";
// import { AiOutlineDown } from "react-icons/ai";
import { Dropdown, Input, Space, Modal, Button } from "antd";
import { CaretDownOutlined, DownOutlined } from "@ant-design/icons";
import { Form, Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../store/service/authService";
import ChangePassword from "../ChangePassword/ChangePassword";
import { useForm } from "antd/es/form/Form";
import { MdMenu } from "react-icons/md";

const Navbar = ({ action, logo }) => {
  const [trigger, { error, isLoading, isError }] = useLogoutMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const nav = useNavigate();

  const handleLogout = () => {
    trigger();
    localStorage.clear();
    nav("/");
  };

  const items = [
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
    // e.preventDefault();
    if (e.key == 0) {
      setIsModalOpen(true);
    } else {
      console.log("hii");
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    if ((pType == "old" || pType == "Old") && uType == "5") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleDashbordHome = () => {
    nav("/dashboard");
  };

  const pType = localStorage.getItem("passType");
  const uType = localStorage.getItem("userType");

  useEffect(() => {
    if ((pType == "old" || pType == "Old") && uType == "5") {
      setIsModalOpen(true);
    }
  }, [pType]);

  return (
    <>
      {/* {localStorage.getItem("token") !== null && ( */}
      <div className="nav">
        <div
          style={{
            marginTop: "0px",
          }}>
          <Space className="open_btn">
            <Button type="" className="sub_open_btn" onClick={action}>
              <MdMenu />
            </Button>
          </Space>

          <img onClick={handleDashbordHome} src={logo} alt="" />
        </div>
        <div className="nav_drop">
          <div className="sub_menu_nav">
            <Dropdown
              style={{ zIndex: "999999" }}
              className="droup_nav"
              menu={{
                className: "nav_droupdown",
                items,
                onClick: handleModal,
              }}
              trigger={["hover"]}>
              <p
                className="user_deatils"
                style={{ cursor: "pointer", marginRight: "42px" }}
                onClick={(e) => e.preventDefault()}>
                <p style={{ fontWeight: 500, fontSize: "20px" }}>
                  King{" "}
                  <CaretDownOutlined
                    style={{ fontSize: "20px", marginLeft: "-3px" }}
                  />
                </p>
              </p>
            </Dropdown>
            <svg
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
      {/* // )} */}

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
    </>
  );
};

export default Navbar;
