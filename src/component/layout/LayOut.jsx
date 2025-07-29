import { Button, Layout, Modal } from "antd";
import { useEffect, useState } from "react";
import Sidebar from "../common/sidebar/Sidebar";
const { Header, Content } = Layout;
import Navbar from "../common/navbar/Navbar";
import "./Layout.scss";
import MarqueeTag from "../common/marquee/MarqueeTag";
import { Outlet, useNavigate } from "react-router-dom";
import { useJwtTokenQuery } from "../../store/service/jwtTokenServices";
import HomeRules from "../pages/HomeRules";
import JwtToken from "./JwtToken";

const LayOut = () => {
  const [collapsed, setCollapsed] = useState();
  const [openRules, setOpenRules] = useState(false);
  const [open, setOpen] = useState(false);


  const collll = (val) => {
    setCollapsed(val);
  };

  const toggleDarawer = () => setOpen((prev) => !prev);

  const openDrawer = (val) => {
    setOpen(val);
  };

  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      nav("/");
    }
  }, [nav]);

  const handleOk = () => {};

  useEffect(() => {
    if ((pType == "old" || pType == "Old") && uType == "5") {
      setOpenRules(localStorage.getItem("false"));
    } else {
      setOpenRules(localStorage.getItem("rulesStatus"));
    }
  }, []);

  const handleCloseBtn = () => {
    localStorage.removeItem("rulesStatus");
    setOpenRules(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const pType = localStorage.getItem("passType");
  const uType = localStorage.getItem("userType");

  return (
    <>
      {(pType == "New" || pType == "new") && <JwtToken />}

      <Layout className="main_layout">
        <Sidebar
          collll={collll}
          open={open}
          action={toggleDarawer}
        />
        <Layout>
          <Header
            className="header_com"
            style={{
              padding: 0,
              display: "flex",
              alignItems: "center",
              height: "72px",
              zIndex: "3",
            }}>
            <Navbar open={open} action={toggleDarawer} />
          </Header>
          <div className="marqu_tag">
            <MarqueeTag />
          </div>
          <Content
            // style={{ margin: "2px 1px", padding: "21px 19px 0" }}
            className="main_section">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Modal
        open={openRules}
        className="modals_rule"
        title="Rules"
        onOk={handleOk}
        onCancel={handleCloseBtn}
        footer={[
          <Button key="back" onClick={handleCloseBtn}>
            Close
          </Button>,
        ]}>
        <HomeRules />
      </Modal>
    </>
  );
};

export default LayOut;
