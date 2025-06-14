import { useEffect, useState } from "react";
import "./Navbar.scss";
// import { AiOutlineDown } from "react-icons/ai";
import { Dropdown, Input, Space, Modal, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
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
    if((pType == "old" || pType == "Old") && uType == "5"){
      setIsModalOpen(true);
    }else{
      setIsModalOpen(false);
    }
   
  };

  const handleDashbordHome = () => {
    nav("/dashboard");
  };


  const pType = localStorage.getItem("passType");
  const uType = localStorage.getItem("userType");

  useEffect(()=>{
    if((pType == "old" || pType == "Old") && uType == "5"){
      setIsModalOpen(true)
    }
  }, [pType])
  

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
                style={{ cursor: "pointer" }}
                onClick={(e) => e.preventDefault()}>
                <p style={{ fontWeight: 600, fontSize: "16px" }}>
                  {localStorage.getItem("userId")}
                </p>
                <p>
                  <DownOutlined />
                </p>
              </p>
            </Dropdown>
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
