/* eslint-disable react/prop-types */
import { useState } from "react";
import { Drawer, Menu } from "antd";
import "./Sidebar.scss";
import { Button } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useNavigate } from "react-router-dom";
import { HoverIcon } from "./HeroIcon";

const rootSubmenuKeys = ["1", "2", "3", "4", "5", "6", "7"];

const Sidebar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(["1"]);
  const [hoveredItem, setHoveredItem] = useState(null);

  props.collll(collapsed);

  const nav = useNavigate();

  const userType = localStorage.getItem("userType");
  const ps = localStorage.getItem("ps");

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const uType = localStorage.getItem("userType");

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
                  {uType == 6
                    ? "Admin Details"
                    : uType == 5
                    ? "Mini Admin Master"
                    : uType == 4
                    ? "Master Master"
                    : uType == 3
                    ? "Super Agent Master"
                    : userType == 7
                    ? "SuperAdmin"
                    : userType == 2
                    ? "Agent Master"
                    : ""}
                </div>
              ),
              children: [
                {
                  className: `${userType != "7" ? "d-none" : ""}`,
                  label: <Link to="/user-list/Admin/6">Admin</Link>,
                },
                {
                  className: `${
                    userType === "7" || userType === "6" ? "" : "d-none"
                  }`,
                  label: (
                    <Link to="/user-list/Mini-Admin/5">Mini Admin Master</Link>
                  ),
                },
                {
                  className: `${
                    userType == "5" || userType === "7" || userType === "6"
                      ? ""
                      : "d-none"
                  }`,
                  label: (
                    <Link to="/user-list/Master-Master/4">Master Master</Link>
                  ),
                },
                {
                  className: `${
                    userType === "7" ||
                    userType === "6" ||
                    userType === "4" ||
                    userType == "5"
                      ? ""
                      : "d-none"
                  }`,
                  label: (
                    <Link to="/user-list/Super-Master/3">Super Master</Link>
                  ),
                },
                {
                  className: `${
                    userType === "7" ||
                    userType === "6" ||
                    userType === "4" ||
                    userType == "5" ||
                    userType === "3"
                      ? ""
                      : "d-none"
                  }`,
                  label: (
                    <Link to="/user-list/Agent-Master/2">Agent Master</Link>
                  ),
                },
                {
                  label: (
                    <Link to="/user-list/Client-Master/1">Client Master</Link>
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
                  label: <Link to="/Events/sports-details">Active Games</Link>,
                },
                {
                  label: <Link to="/finish-game">Finished Games</Link>,
                },
                {
                  className: `${
                    userType === "7" || ps == "dtl" ? "" : "d-none"
                  }`,
                  label: <Link to="/delete-bet">Reject Bets</Link>,
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
                  label: <Link to="/client/my-ledger">My Leger</Link>,
                },
                {
                  className: `${userType != "7" ? "d-none" : ""}`,
                  label: (
                    <Link to="/client/ledger-super/6/Admin">Admin Leger</Link>
                  ),
                },
                {
                  className: `${
                    userType === "7" || userType == "6" ? "" : "d-none"
                  }`,
                  label: (
                    <Link to="/client/ledger-super/5/Mini-Admin">
                      Mini Admin Leger
                    </Link>
                  ),
                },
                {
                  className: `${
                    userType === "7" || userType == "6" || userType == "5"
                      ? ""
                      : "d-none"
                  }`,
                  label: (
                    <Link to="/client/ledger-super/4/Master">Master Leger</Link>
                  ),
                },
                {
                  className: `${
                    userType === "7" ||
                    userType == "6" ||
                    userType == "5" ||
                    userType == "4"
                      ? ""
                      : "d-none"
                  }`,
                  label: (
                    <Link to="/client/ledger-super/3/Super">
                      Super agent Leger
                    </Link>
                  ),
                },
                {
                  className: `${
                    userType === "7" ||
                    userType == "6" ||
                    userType == "5" ||
                    userType == "4" ||
                    userType == "3"
                      ? ""
                      : "d-none"
                  }`,
                  label: (
                    <Link to="/client/ledger-super/2/Agent">Agent Leger</Link>
                  ),
                },
                {
                  label: (
                    <Link to="/client/ledger-super/1/Client">Client Leger</Link>
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
                  label: (
                    <Link to="/client/txn-super/Client-Master/1">
                      (C) Debit/Credit Entry
                    </Link>
                  ),
                },
                // {
                //   // className: `${userType == "5" ? "" : "d-none"}`,
                //   label: (
                //     <Link to="/client/txn-super/Master/4">
                //       (M) Debit/Credit Entry
                //     </Link>
                //   ),
                // },
                {
                  className: `${
                    userType === "7" ||
                    userType == "6" ||
                    userType === "5" ||
                    userType == "4" ||
                    userType == "3"
                      ? ""
                      : "d-none"
                  }`,
                  label: (
                    <Link to="/client/txn-super/Agent-Master/2">
                      (A) Debit/Credit Entry
                    </Link>
                  ),
                },
                {
                  className: `${
                    userType === "7" ||
                    userType == "6" ||
                    userType === "5" ||
                    userType == "4"
                      ? ""
                      : "d-none"
                  }`,
                  label: (
                    <Link to="/client/txn-super/Super-Master/3">
                      (SA) Debit/Credit Entry
                    </Link>
                  ),
                },
                {
                  className: `${
                    userType === "7" || userType === "6" || userType == "5"
                      ? ""
                      : "d-none"
                  }`,
                  label: (
                    <Link to="/client/txn-super/Master-Master/4">
                      (MA) Debit/Credit Entry
                    </Link>
                  ),
                },
                {
                  className: `${
                    userType === "7" || userType == "6" ? "" : "d-none"
                  }`,
                  label: (
                    <Link to="/client/txn-super/Mini-Admin/5">
                      (AD) Debit/Credit Entry
                    </Link>
                  ),
                },
                {
                  className: `${userType === "7" ? "" : "d-none"}`,
                  label: (
                    <Link to="/client/txn-super/Admin/6">
                      (ADM) Debit/Credit Entry
                    </Link>
                  ),
                },
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
                  {window?.location.hostname?.split(".")?.[1]?.toUpperCase()}{" "}
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
                    {uType == 6
                      ? " Admin Details"
                      : uType == 5
                      ? "Sub Detail"
                      : uType == 4
                      ? "Master Detail"
                      : uType == 3
                      ? "Super Detail"
                      : userType == 7
                      ? "Super Admin"
                      : "Agent Detail"}
                  </div>
                ),
                children: [
                  {
                    className: `${userType != "7" ? "d-none" : ""}`,
                    label: (
                      <Link
                        to="/user-list/Admin/6"
                        onClick={() => props?.action()}>
                        Admin
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "6" || userType === "7" ? "" : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/user-list/Mini-Admin/5"
                        onClick={() => props?.action()}>
                        Mini Admin
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType == "5" || userType === "6" || userType === "7"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/user-list/Master-Master/4"
                        onClick={() => props?.action()}>
                        Master Master
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "6" ||
                      userType === "7" ||
                      userType === "5" ||
                      userType == "4"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/user-list/Super-Master/3"
                        onClick={() => props?.action()}>
                        Super Agent Master
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "6" ||
                      userType === "7" ||
                      userType === "4" ||
                      userType == "5" ||
                      userType == "3"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/user-list/Agent-Master/2"
                        onClick={() => props?.action()}>
                        Agent Master
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="/user-list/Client/1"
                        onClick={() => props?.action()}>
                        Client Master
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
                  {
                    className: `${
                      userType === "7" || ps == "dtl" ? "" : "d-none"
                    }`,
                    label: (
                      <Link to="/delete-bet" onClick={() => props?.action()}>
                        Reject Bets
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
                    className: `${userType != "7" ? "d-none" : ""}`,
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/6/Admin">
                        Admin Leger
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "7" || userType == "6" ? "" : "d-none"
                    }`,
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/5/Mini-Admin">
                        Mini Admin Leger
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "7" || userType === "6" || userType == "5"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/4/Master">
                        Master Leger
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "7" ||
                      userType == "6" ||
                      userType === "5" ||
                      userType == "4"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/3/Super-Agent">
                        Super agent Leger
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "7" ||
                      userType == "6" ||
                      userType === "5" ||
                      userType == "4" ||
                      userType == "3"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/2/Agent">
                        Agent Leger
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/1/Client">
                        Client Leger
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
                    label: (
                      <Link
                        to="/client/txn-super/Client-Master/1"
                        onClick={() => props?.action()}>
                        (C) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  // {
                  //   // className: `${userType == "5" ? "" : "d-none"}`,
                  //   label: (
                  //     <Link to="/client/txn-super/Master/4">
                  //       (M) Debit/Credit Entry
                  //     </Link>
                  //   ),
                  // },
                  {
                    className: `${
                      userType === "7" ||
                      userType == "6" ||
                      userType === "5" ||
                      userType == "4" ||
                      userType == "3"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/client/txn-super/Agent-Master/2"
                        onClick={() => props?.action()}>
                        (A) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "7" ||
                      userType == "6" ||
                      userType === "5" ||
                      userType == "4"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/client/txn-super/Super-Master/3"
                        onClick={() => props?.action()}>
                        (SA) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "7" || userType === "6" || userType == "5"
                        ? ""
                        : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/client/txn-super/Master-Master/4"
                        onClick={() => props?.action()}>
                        (MA) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    className: `${
                      userType === "7" || userType == "6" ? "" : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/client/txn-super/Mini-Admin/5"
                        onClick={() => props?.action()}>
                        (AD) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    className: `${userType === "7" ? "" : "d-none"}`,

                    label: (
                      <Link
                        to="/client/txn-super/Admin/6"
                        onClick={() => props?.action()}>
                        (ADM) Debit/Credit Entry
                      </Link>
                    ),
                  },
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
                    {window?.location.hostname?.split(".")[1]?.toUpperCase()}{" "}
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
