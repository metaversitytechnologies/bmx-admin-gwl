/* eslint-disable react/prop-types */
import { useState } from "react";
import { Drawer, Menu } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { LuBarChart4 } from "react-icons/lu";
import { SlDiamond } from "react-icons/sl";
import "./Sidebar.scss";
import { Button } from "antd";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { RiNotificationBadgeFill } from "react-icons/ri";
import Sider from "antd/es/layout/Sider";
import { Link, useNavigate } from "react-router-dom";
import { IoMdPricetag } from "react-icons/io";
import { HoverIcon } from "./HeroIcon";

const rootSubmenuKeys = ["1", "2", "3", "4", "5", "6", "7"];

const Sidebar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(["1"]);
  const [hoveredItem, setHoveredItem] = useState(null);

  props.collll(collapsed);

  const nav = useNavigate();

  const userType = 5;

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const uType = 5;

  return (
    <>
      <div className={collapsed ? "logo_icon" : "logo_icon coll_btn"}>
        <Button
          type="text"
          className="clolapsedd"
          icon={
            collapsed ? (
              <i className="gx-icon-btn icon icon-menu-fold gx-text-white" />
            ) : (
              <i className="gx-icon-btn icon icon-menu-unfold gx-text-white" />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 81,
            height: 71,
            border: "unset",
            textDecoration: "none",
            outline: "unset",
            color: "#fff",
          }}
        />
        <div
          onClick={() => nav("/dashboard")}
          className={`bm_side_logo ${collapsed ? "d-none" : ""}`}>
          <img
            src={"https://master.antpro99.pro/assets/images/antpro.png"}
            alt="alt"
          />
        </div>
      </div>
      <Sider
        trigger={null}
        width="280"
        collapsible
        collapsed={collapsed}
        className={`side_bar coll desk_side`}
        style={{
          background: "#7d5c0e",
          height: "100vh",
          minHeight: "100vh",
          maxHeight: "100vh",
          overflowY: "auto",
        }}>
        <Menu
          theme=""
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          defaultSelectedKeys={openKeys}
          items={[
            {
              key: "1",
              icon: (
                <HoverIcon
                  id="1"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/dashbord.png"
                  hoverSrc="/Images/dash-hover.png"
                />
              ),
              label: (
                <Link
                  onMouseEnter={() => setHoveredItem("1")}
                  onMouseLeave={() => setHoveredItem(null)}
                  to="/dashboard"
                  onClick={() => setOpenKeys([])}>
                  Dashboard
                </Link>
              ),
              // onClick:{handleDashBoard}
            },
            {
              key: "2",
              icon: (
                <HoverIcon
                  id="2"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/user.png"
                  hoverSrc="/Images/user-hover.png"
                  width={22}
                  hoverWidth={22}
                />
              ),
              label: (
                <div
                  onMouseEnter={() => setHoveredItem("2")}
                  onMouseLeave={() => setHoveredItem(null)}>
                  {uType == 5
                    ? "Sub Admin Details"
                    : uType == 0
                    ? "Master Detail"
                    : uType == 1
                    ? "Super Detail"
                    : uType == 2
                    ? "Agent Detail"
                    : ""}
                </div>
              ),
              children: [
                {
                  className: `${userType != "5" ? "d-none" : ""}`,
                  label: <Link to="/user-list/Master/4">Master</Link>,
                },
                {
                  className: `${
                    userType === "0" || userType == "5" ? "" : "d-none"
                  }`,
                  label: <Link to="/user-list/Super/3">Super</Link>,
                },
                {
                  className: `${
                    userType === "1" || userType == "5" || userType === "0"
                      ? ""
                      : "d-none"
                  }`,
                  label: <Link to="/user-list/Agent/2">Agent</Link>,
                },
                {
                  label: <Link to="/user-list/Client/1">Client</Link>,
                },
              ],
            },
            {
              key: "3",
              icon: (
                <HoverIcon
                  id="3"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/left-sport.png"
                  hoverSrc="/Images/left-sport-hover.png"
                  width={23}
                  hoverWidth={22}
                />
              ),
              label: (
                <sapn
                  onMouseEnter={() => setHoveredItem("3")}
                  onMouseLeave={() => setHoveredItem(null)}>
                  Sports-Betting
                </sapn>
              ),
              children: [
                {
                  label: <Link to="/Events/sports-details">Active Games</Link>,
                },
                {
                  label: <Link to="/finish-game">Finished Games</Link>,
                },
              ],
            },
            {
              key: "13",
              icon: (
                <HoverIcon
                  id="4"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/casino.png"
                  hoverSrc="/Images/casino-hover.png"
                  width={22}
                  hoverWidth={22}
                />
              ),
              label: (
                <div
                  onMouseEnter={() => setHoveredItem("4")}
                  onMouseLeave={() => setHoveredItem(null)}>
                  Casino
                </div>
              ),
              children: [
                {
                  label: <Link to="/inplay-casino">Inplay Casino</Link>,
                },
                {
                  label: <Link to="/completed-casino">Completed Casino</Link>,
                },
                {
                  label: <Link to="/casinoprofitandloss">Casino Details</Link>,
                },
              ],
            },
            {
              key: "4",
              icon: (
                <HoverIcon
                  id="5"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/ledger.png"
                  hoverSrc="/Images/ledger-hover.png"
                  width={22}
                  hoverWidth={22}
                />
              ),
              label: (
                <div
                  onMouseEnter={() => setHoveredItem("5")}
                  onMouseLeave={() => setHoveredItem(null)}>
                  Ledger
                </div>
              ),
              children: [
                {
                  label: <Link to="/Events/matchledger">Profit/Loss</Link>,
                },
                {
                  label: <Link to="/client/my-ledger">My Ledger</Link>,
                },
                {
                  className: `${userType != "5" ? "d-none" : ""}`,
                  label: <Link to="/client/ledger-super">Master Ledger</Link>,
                },
                {
                  className: `${
                    userType === "0" || userType == "5" ? "" : "d-none"
                  }`,
                  label: <Link to="/client/ledger-master">Super Ledger</Link>,
                },
                {
                  className: `${
                    userType === "1" || userType == "5" || userType === "0"
                      ? ""
                      : "d-none"
                  }`,
                  label: <Link to="/client/ledger-agent">Agent Ledger</Link>,
                },
                {
                  label: <Link to="/client/ledger-client">Client Ledger</Link>,
                },
              ],
            },
            {
              key: "5",
              icon: (
                <HoverIcon
                  id="6"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/cash.png"
                  hoverSrc="/Images/cash-hover.png"
                  width={22}
                  hoverWidth={22}
                />
              ),
              label: (
                <div
                  onMouseEnter={() => setHoveredItem("6")}
                  onMouseLeave={() => setHoveredItem(null)}>
                  Cash Transaction
                </div>
              ),
              children: [
                {
                  className: `${userType == "5" ? "" : "d-none"}`,
                  label: (
                    <Link to="/client/txn-super">Debit/Credit Entry(M)</Link>
                  ),
                },
                {
                  className: `${
                    userType === "0" || userType == "5" ? "" : "d-none"
                  }`,
                  label: (
                    <Link to="/client/txn-master">Debit/Credit Entry(S)</Link>
                  ),
                },

                {
                  className: `${
                    userType === "1" || userType == "5" || userType === "0"
                      ? ""
                      : "d-none"
                  }`,
                  label: (
                    <Link to="/client/txn-agent">Debit/Credit Entry(A)</Link>
                  ),
                },
                // {
                //   label: (
                //     <Link to="/client/txn-client">Debit/Credit Entry(C)</Link>
                //   ),
                // },
              ],
            },
            {
              key: "8",
              icon: (
                <HoverIcon
                  id="7"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/comm.png"
                  hoverSrc="/Images/comm-hover.png"
                  width={22}
                  hoverWidth={22}
                />
              ),
              label: (
                <Link
                  onMouseEnter={() => setHoveredItem("7")}
                  onMouseLeave={() => setHoveredItem(null)}
                  to="/commissionLenden">
                  Comm. Report
                </Link>
              ),
            },
            {
              key: "6",
              icon: (
                <HoverIcon
                  id="8"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/report.png"
                  hoverSrc="/Images/report-hover.png"
                  width={22}
                  hoverWidth={22}
                />
              ),
              label: (
                <div
                  onMouseEnter={() => setHoveredItem("8")}
                  onMouseLeave={() => setHoveredItem(null)}>
                  Reports
                </div>
              ),
              children: [
                {
                  label: <Link to="/client/login-report">Login Report</Link>,
                },
                {
                  label: (
                    <Link to="/client/secure-code">Secure Code Report</Link>
                  ),
                },
              ],
            },

            {
              key: "8",
              icon: (
                <HoverIcon
                  id="9"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/setting.png"
                  hoverSrc="/Images/setting-hover.png"
                  width={22}
                  hoverWidth={22}
                />
              ),
              label: (
                <Link
                  onMouseEnter={() => setHoveredItem("9")}
                  onMouseLeave={() => setHoveredItem(null)}
                  to="/markets">
                  Setting
                </Link>
              ),
            },
          ]}
        />
      </Sider>

      <div className="mob_side">
        <Drawer
          title={<img onClick={props.action} src={props?.logo} />}
          className="drawer_main"
          placement="left"
          closable={false}
          onClose={props.action}
          open={props.open}
          width="275"
          // key={placement}
        >
          <Menu
            theme=""
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            defaultSelectedKeys={openKeys}
            items={[
              {
                key: "1",
                icon: (
                  <HoverIcon
                    id="1"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/dashbord.png"
                    hoverSrc="/Images/dash-hover.png"
                  />
                ),
                label: (
                  <Link
                    onMouseEnter={() => setHoveredItem("1")}
                    onMouseLeave={() => setHoveredItem(null)}
                    to="/dashboard"
                    onClick={() => {
                      props?.action();
                      setOpenKeys([]);
                    }}>
                    Dashboard
                  </Link>
                ),
              },
              {
                key: "2",
                icon: (
                  <HoverIcon
                    id="2"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/user.png"
                    hoverSrc="/Images/user-hover.png"
                    width={22}
                    hoverWidth={22}
                  />
                ),
                label: (
                  <div
                    onMouseEnter={() => setHoveredItem("2")}
                    onMouseLeave={() => setHoveredItem(null)}>
                    {uType == 5
                      ? "Sub Admin Details"
                      : uType == 0
                      ? "Master Detail"
                      : uType == 1
                      ? "Super Detail"
                      : uType == 2
                      ? "Agent Detail"
                      : ""}
                  </div>
                ),
                children: [
                  {
                    className: `${userType != "5" ? "d-none" : ""}`,
                    label: (
                      <Link
                        to="/user-list/Master/4"
                        onClick={() => props?.action()}>
                        Master
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "0" || userType == "5" ? "" : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/user-list/Super/3"
                        onClick={() => props?.action()}>
                        Super
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "1" || userType == "5" || userType === "0"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/user-list/Agent/2"
                        onClick={() => props?.action()}>
                        Agent
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="/user-list/Client/1"
                        onClick={() => props?.action()}>
                        Client
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "3",
                icon: (
                  <HoverIcon
                    id="3"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/left-sport.png"
                    hoverSrc="/Images/left-sport-hover.png"
                    width={23}
                    hoverWidth={22}
                  />
                ),
                label: (
                  <sapn
                    onMouseEnter={() => setHoveredItem("3")}
                    onMouseLeave={() => setHoveredItem(null)}>
                    Sports-Betting
                  </sapn>
                ),
                children: [
                  {
                    label: (
                      <Link
                        to="/Events/sports-details"
                        onClick={() => props?.action()}>
                        Active Games
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link to="/finish-game" onClick={() => props?.action()}>
                        Finished Games
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "13",
                icon: (
                  <HoverIcon
                    id="4"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/casino.png"
                    hoverSrc="/Images/casino-hover.png"
                    width={22}
                    hoverWidth={22}
                  />
                ),
                label: (
                  <div
                    onMouseEnter={() => setHoveredItem("4")}
                    onMouseLeave={() => setHoveredItem(null)}>
                    Casino
                  </div>
                ),
                children: [
                  {
                    label: (
                      <Link to="/inplay-casino" onClick={() => props?.action()}>
                        Inplay Casino
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="/completed-casino"
                        onClick={() => props?.action()}>
                        Completed Casino
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="/casinoprofitandloss"
                        onClick={() => props?.action()}>
                        Casino Details
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "4",
                icon: (
                  <HoverIcon
                    id="5"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/ledger.png"
                    hoverSrc="/Images/ledger-hover.png"
                    width={22}
                    hoverWidth={22}
                  />
                ),
                label: (
                  <div
                    onMouseEnter={() => setHoveredItem("5")}
                    onMouseLeave={() => setHoveredItem(null)}>
                    Ledger
                  </div>
                ),
                children: [
                  {
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/Events/matchledger">
                        Profit/Loss
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/my-ledger">
                        My Ledger
                      </Link>
                    ),
                  },
                  {
                    className: `${userType != "5" ? "d-none" : ""}`,
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super">
                        Master Ledger
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "0" || userType == "5" ? "" : "d-none"
                    }`,
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-master">
                        Super Ledger
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "1" || userType == "5" || userType === "0"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-agent">
                        Agent Ledger
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-client">
                        Client Ledger
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "5",
                icon: (
                  <HoverIcon
                    id="6"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/cash.png"
                    hoverSrc="/Images/cash-hover.png"
                    width={22}
                    hoverWidth={22}
                  />
                ),
                label: (
                  <div
                    onMouseEnter={() => setHoveredItem("6")}
                    onMouseLeave={() => setHoveredItem(null)}>
                    Cash Transaction
                  </div>
                ),
                children: [
                  {
                    className: `${userType == "5" ? "" : "d-none"}`,
                    label: (
                      <Link
                        to="/client/txn-super"
                        onClick={() => props?.action()}>
                        Debit/Credit Entry(M)
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "0" || userType == "5" ? "" : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/client/txn-master"
                        onClick={() => props?.action()}>
                        Debit/Credit Entry(S)
                      </Link>
                    ),
                  },

                  {
                    className: `${
                      userType === "1" || userType == "5" || userType === "0"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/client/txn-agent"
                        onClick={() => props?.action()}>
                        Debit/Credit Entry(A)
                      </Link>
                    ),
                  },
                  // {
                  //   label: (
                  //     <Link
                  //       to="/client/txn-client"
                  //       onClick={() => props?.action()}>
                  //       Debit/Credit Entry(C)
                  //     </Link>
                  //   ),
                  // },
                ],
              },
              {
                key: "18",
                icon: (
                  <HoverIcon
                    id="7"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/comm.png"
                    hoverSrc="/Images/comm-hover.png"
                    width={22}
                    hoverWidth={22}
                  />
                ),
                label: (
                  <Link
                    onClick={() => props?.action()}
                    onMouseEnter={() => setHoveredItem("7")}
                    onMouseLeave={() => setHoveredItem(null)}
                    to="/commissionLenden">
                    Comm. Report
                  </Link>
                ),
              },
              {
                key: "6",
                className: "data_report_list",
                icon: (
                  <HoverIcon
                    id="8"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/report.png"
                    hoverSrc="/Images/report-hover.png"
                    width={22}
                    hoverWidth={22}
                  />
                ),
                label: (
                  <div
                    onMouseEnter={() => setHoveredItem("8")}
                    onMouseLeave={() => setHoveredItem(null)}>
                    Reports
                  </div>
                ),
                children: [
                  {
                    key: "14",
                    label: (
                      <Link
                        to="/client/login-report"
                        onClick={() => props?.action()}>
                        Login Report
                      </Link>
                    ),
                  },
                  {
                    key: "14",
                    label: (
                      <Link
                        to="/client/secure-code"
                        onClick={() => props?.action()}>
                        Secure Code Report
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "7",
                icon: (
                  <HoverIcon
                    id="9"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/setting.png"
                    hoverSrc="/Images/setting-hover.png"
                    width={22}
                    hoverWidth={22}
                  />
                ),
                label: (
                  <Link
                    onMouseEnter={() => setHoveredItem("9")}
                    onMouseLeave={() => setHoveredItem(null)}
                    to="/markets"
                    onClick={() => {
                      props?.action();
                      setOpenKeys([]);
                    }}>
                    Setting
                  </Link>
                ),
              },
            ]}
          />
        </Drawer>
      </div>
    </>
  );
};

export default Sidebar;
