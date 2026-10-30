import { Button, Checkbox, Layout, Modal } from "antd";
import { ShieldAlert, X } from "lucide-react";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import Sidebar from "../common/sidebar/Sidebar";
const { Header, Content } = Layout;
import Navbar from "../common/navbar/Navbar";

import { Outlet, useNavigate } from "react-router-dom";
import MarqueeTag from "../common/marquee/MarqueeTag";

const HomeRules = lazy(() => import("../pages/HomeRules"));

const LayOut = () => {
  const [, setCollapsed] = useState();
  const [openRules, setOpenRules] = useState(false);
  const [open, setOpen] = useState(false);
  const pType = localStorage.getItem("passType");
  const uType = localStorage.getItem("userType");
  const hostname = window.location.hostname.toLowerCase();
  const hostLabels = hostname
    .split(".")
    .filter(Boolean);
  const isIpv4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  const hasCompoundSuffix = ["co", "com", "net", "org", "gov", "ac"].includes(
    hostLabels.at(-2),
  );
  const websiteDomain =
    !isIpv4 && hostLabels.length >= 3
      ? hostLabels.slice(hasCompoundSuffix ? -3 : -2).join(".")
      : !isIpv4 && hostLabels.length === 2
        ? hostLabels.join(".")
        : "";

  const collll = useCallback((val) => {
    setCollapsed(val);
  }, []);

  const toggleDarawer = useCallback(() => setOpen((prev) => !prev), []);

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
  }, [pType, uType]);

  const handleCloseBtn = () => {
    localStorage.removeItem("rulesStatus");
    setOpenRules(false);
  };

  return (
    <>
      <Layout className="main_layout">
        <Sidebar collll={collll} open={open} action={toggleDarawer} />
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
          <MarqueeTag />
          <Content
            // style={{ margin: "2px 1px", padding: "21px 19px 0" }}
            className="main_section">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Modal
        open={openRules}
        className="modals_rule duplicate-site-modal"
        width={560}
        title={
          <div className="duplicate-site-header">
            <span className="duplicate-site-header-icon" aria-hidden="true">
              <ShieldAlert size={30} strokeWidth={2} />
            </span>
            <div className="duplicate-site-header-copy">
              <h1>Duplicate Site Alert</h1>
              <p>Please read the information below.</p>
            </div>
            <button
              type="button"
              className="duplicate-site-close-icon"
              aria-label="Close alert"
              onClick={handleCloseBtn}>
              <X size={22} />
            </button>
          </div>
        }
        onOk={handleOk}
        onCancel={handleCloseBtn}
        closable={false}
        closeIcon={false}
        footer={
          <div className="duplicate-site-footer">
            <Checkbox className="duplicate-site-checkbox">
              Don&apos;t show again
            </Checkbox>
            <Button
              className="duplicate-site-close-button"
              key="close"
              onClick={handleCloseBtn}>
              Close
            </Button>
          </div>
        }
        maskStyle={{
          background: "rgba(15, 23, 42, 0.60)",
          backdropFilter: "blur(6px)",
        }}>
        {openRules && (
          <Suspense fallback={null}>
            <HomeRules domain={websiteDomain} />
          </Suspense>
        )}
      </Modal>
    </>
  );
};

export default LayOut;
