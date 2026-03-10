/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Drawer, Menu } from "antd";
import "./Sidebar.scss";
import { Button } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useNavigate } from "react-router-dom";
import { HoverIcon } from "./HeroIcon";
import { imgUrl } from "../../../store/constant";

const rootSubmenuKeys = ["1", "2", "3", "4", "5", "6", "7"];

const Sidebar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(["1"]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    props.collll(collapsed);
  }, [collapsed, props]);

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
  const hasRole = (roles) => roles.includes(userType);

  const hostName = window.location.hostname;

  return (
    <>
      <Sider
        trigger={null}
        width="280"
        collapsible
        collapsed={collapsed}
        className={`side_bar coll desk_side`}
        style={{
          background: "var(--bg-color)",
        }}>
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
              alt="example"
              src={
                hostName.includes("mumbaiexchange9")
                  ? "/img/mum-img.png"
                  : imgUrl
              }
              height={50}
            />
          </div>
        </div>
        <Menu
          style={{
            height: "calc(100vh - 70px)",
            minHeight: "calc(100vh - 70px)",
            maxHeight: "calc(100vh - 70px)",
            overflowY: "auto",
          }}
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
                  width={23}
                  hoverWidth={22}
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
                  defaultSrc="/Images/adminbar.png"
                  hoverSrc="/Images/admin-bar-hover.png"
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
                  className: hasRole(["7", "6"]) ? "" : "d-none",
                  label: (
                    <Link to="/user-list/Mini-Admin/5">Mini Admin Master</Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                  label: (
                    <Link to="/user-list/Master-Master/4">Master Master</Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                  label: (
                    <Link to="/user-list/Super-Master/3">Super Master</Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4", "3"]) ? "" : "d-none",
                  label: (
                    <Link to="/user-list/Agent-Master/2">Agent Master</Link>
                  ),
                },
                {
                  label: (
                    <Link to="/user-list/Client-Master/1">Client Master</Link>
                  ),
                },
                {
                  className: `${userType === "7" ? "" : "d-none"}`,
                  label: <Link to="/create-domain">Create Domain</Link>,
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
                  defaultSrc="/Images/casino.png"
                  hoverSrc="/Images/casino-hover.png"
                  width={24}
                  hoverWidth={23}
                />
              ),
              label: (
                <span
                  onMouseEnter={() => setHoveredItem("3")}
                  onMouseLeave={() => setHoveredItem(null)}>
                  Sports-Betting
                </span>
              ),
              children: [
                {
                  key: "3-active-games",
                  label: <Link to="/Events/sports-details">Active Games</Link>,
                },
                {
                  key: "3-finished-games",
                  label: <Link to="/finish-game">Finished Games</Link>,
                },
                {
                  className: `${userType === "7" ? "" : "d-none"}`,
                  key: "3-reject-bets",
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
                  width={24}
                  hoverWidth={23}
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
                  key: "13-inplay",
                  label: <Link to="/inplay-casino">Inplay Casino</Link>,
                },
                {
                  key: "13-completed",
                  label: <Link to="/completed-casino">Completed Casino</Link>,
                },
                {
                  key: "13-details",
                  label: <Link to="/casinoprofitandloss">Casino Details</Link>,
                },
              ],
            },
            {
              key: "14",
              icon: (
                <HoverIcon
                  id="14"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/casino.png"
                  hoverSrc="/Images/casino-hover.png"
                  width={24}
                  hoverWidth={23}
                />
              ),
              label: (
                <div
                  onMouseEnter={() => setHoveredItem("14")}
                  onMouseLeave={() => setHoveredItem(null)}>
                  Matka
                </div>
              ),
              children: [
                {
                  key: "14-inplay",
                  label: <Link to="/matka/inplay">INPLAY MATKA</Link>,
                },
                {
                  key: "14-completed",
                  label: <Link to="/matka/completed">COMPLETED MATKA</Link>,
                },
                {
                  className: `${userType != "7" ? "d-none" : ""}`,
                  key: "14-set-result",
                  label: <Link to="/matka/set-result">SET MATKA RESULT</Link>,
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
                  width={24}
                  hoverWidth={24}
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
                  key: "4-profit-loss",
                  label: <Link to="/Events/matchledger">Profit/Loss</Link>,
                },
                {
                  key: "4-my-ledger",
                  label: <Link to="/client/my-ledger">My Leger</Link>,
                },
                {
                  className: `${userType != "7" ? "d-none" : ""}`,
                  key: "4-admin-ledger",
                  label: (
                    <Link to="/client/ledger-super/6/Admin">Admin Leger</Link>
                  ),
                },
                {
                  className: hasRole(["7", "6"]) ? "" : "d-none",
                  key: "4-mini-admin-ledger",
                  label: (
                    <Link to="/client/ledger-super/5/Mini-Admin">
                      Mini Admin Leger
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                  key: "4-master-ledger",
                  label: (
                    <Link to="/client/ledger-super/4/Master">Master Leger</Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                  key: "4-super-ledger",
                  label: (
                    <Link to="/client/ledger-super/3/Super">
                      Super agent Leger
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4", "3"]) ? "" : "d-none",
                  key: "4-agent-ledger",
                  label: (
                    <Link to="/client/ledger-super/2/Agent">Agent Leger</Link>
                  ),
                },
                {
                  key: "4-client-ledger",
                  label: (
                    <Link to="/client/ledger-super/1/Client">Client Leger</Link>
                  ),
                },
              ],
            },
            userType === "7" && {
              key: "15",
              icon: (
                <HoverIcon
                  id="16"
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
                  onMouseEnter={() => setHoveredItem("16")}
                  onMouseLeave={() => setHoveredItem(null)}>
                  Post Ledger
                </div>
              ),
              children: [
                {
                  key: "15-create-ledger",
                  label: <Link to="/create-ledger">Create Ledger</Link>,
                },
                {
                  key: "15-rollback",
                  label: <Link to="/rollback">Rollback</Link>,
                },
              ],
            },

            (userType === "7" || ps == "dtl") && {
              key: "25",
              icon: (
                <HoverIcon
                  id="26"
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
                  onMouseEnter={() => setHoveredItem("26")}
                  onMouseLeave={() => setHoveredItem(null)}>
                  Event Controller
                </div>
              ),
              children: [
                {
                  className: userType === "7" ? "" : "d-none",
                  key: "25-event-lock",
                  label: <Link to="/event-lock">Event Lock</Link>,
                },
                {
                  className: userType === "7" ? "" : "d-none",
                  key: "25-complete-match-active-bet",
                  label: (
                    <Link to="/completd-actibe-bet">
                      Complete Match Active Bet
                    </Link>
                  ),
                },
                {
                  key: "25-delete-bet",
                  label: <Link to="/delete-bets">Delete Bet</Link>,
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
                  key: "5-client-debit-credit",
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
                  className: hasRole(["7", "6", "5", "4", "3"]) ? "" : "d-none",
                  key: "5-agent-debit-credit",
                  label: (
                    <Link to="/client/txn-super/Agent-Master/2">
                      (A) Debit/Credit Entry
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                  key: "5-super-agent-debit-credit",
                  label: (
                    <Link to="/client/txn-super/Super-Master/3">
                      (SA) Debit/Credit Entry
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                  key: "5-master-debit-credit",
                  label: (
                    <Link to="/client/txn-super/Master-Master/4">
                      (MA) Debit/Credit Entry
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6"]) ? "" : "d-none",
                  key: "5-mini-admin-debit-credit",
                  label: (
                    <Link to="/client/txn-super/Mini-Admin/5">
                      (AD) Debit/Credit Entry
                    </Link>
                  ),
                },
                {
                  className: `${userType === "7" ? "" : "d-none"}`,
                  key: "5-admin-debit-credit",
                  label: (
                    <Link to="/client/txn-super/Admin/6">
                      (ADM) Debit/Credit Entry
                    </Link>
                  ),
                },
              ],
            },
            {
              className: `${userType === "7" ? "" : "d-none"}`,
              key: "28",
              icon: (
                <HoverIcon
                  id="28"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/casino.png"
                  hoverSrc="/Images/casino-hover.png"
                  width={23}
                  hoverWidth={22}
                />
              ),
              label: (
                <Link
                  onMouseEnter={() => setHoveredItem("28")}
                  onMouseLeave={() => setHoveredItem(null)}
                  to="/set-message">
                  Set Message
                </Link>
              ),
            },
            {
              key: "8-commission",
              icon: (
                <HoverIcon
                  id="7"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/dashbord.png"
                  hoverSrc="/Images/dash-hover.png"
                  width={23}
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
                  hoverWidth={25}
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
                  key: "6-login-report",
                  label: <Link to="/client/login-report">Login Report</Link>,
                },
                {
                  key: "6-secure-code-report",
                  label: (
                    <Link to="/client/secure-code">Secure Code Report</Link>
                  ),
                },
              ],
            },
            {
              key: "9-setting",
              icon: (
                <HoverIcon
                  id="9"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/dashbord.png"
                  hoverSrc="/Images/dash-hover.png"
                  width={23}
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
            {
              key: "200",
              icon: (
                <HoverIcon
                  id="200"
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  defaultSrc="/Images/adminbar.png"
                  hoverSrc="/Images/admin-bar-hover.png"
                  width={22}
                  hoverWidth={22}
                />
              ),
              label: (
                <div
                  onMouseEnter={() => setHoveredItem("200")}
                  onMouseLeave={() => setHoveredItem(null)}>
                  {uType == 6
                    ? "Dead Admin Details"
                    : uType == 5
                      ? "Dead Mini Admin Master"
                      : uType == 4
                        ? "Dead Master Master"
                        : uType == 3
                          ? "Dead Super Agent Master"
                          : userType == 7
                            ? "Dead SuperAdmin"
                            : userType == 2
                              ? "Dead Agent Master"
                              : ""}
                </div>
              ),
              children: [
                {
                  className: `${userType != "7" ? "d-none" : ""}`,
                  key: "200-dead-admin",
                  label: <Link to="/dead-user-list/Admin/6">Dead Admin</Link>,
                },
                {
                  className: hasRole(["7", "6"]) ? "" : "d-none",
                  key: "200-dead-mini-admin",
                  label: (
                    <Link to="/dead-user-list/Mini-Admin/5">
                      Dead Mini Admin Master
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                  key: "200-dead-master",
                  label: (
                    <Link to="/dead-user-list/Master-Master/4">
                      Dead Master Master
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                  key: "200-dead-super-master",
                  label: (
                    <Link to="/dead-user-list/Super-Master/3">
                      Dead Super Master
                    </Link>
                  ),
                },
                {
                  className: hasRole(["7", "6", "5", "4", "3"]) ? "" : "d-none",
                  key: "200-dead-agent-master",
                  label: (
                    <Link to="/dead-user-list/Agent-Master/2">
                      Dead Agent Master
                    </Link>
                  ),
                },
                {
                  key: "200-dead-client-master",
                  label: (
                    <Link to="/dead-user-list/Client-Master/1">
                      Dead Client Master
                    </Link>
                  ),
                },
              ],
            },
          ]}
        />
      </Sider>

      <div className="mob_side">
        <Drawer
          title={
            <img
              onClick={props.action}
              src={
                hostName.includes("mumbaiexchange9")
                  ? "/img/mum-img.png"
                  : imgUrl
              }
            />
          }
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
                    width={23}
                    hoverWidth={22}
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
                    defaultSrc="/Images/adminbar.png"
                    hoverSrc="/Images/admin-bar-hover.png"
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
                    className: hasRole(["7", "6"]) ? "" : "d-none",
                    label: (
                      <Link
                        to="/user-list/Mini-Admin/5"
                        onClick={() => props?.action()}>
                        Mini Admin
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                    label: (
                      <Link
                        to="/user-list/Master-Master/4"
                        onClick={() => props?.action()}>
                        Master Master
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                    label: (
                      <Link
                        to="/user-list/Super-Master/3"
                        onClick={() => props?.action()}>
                        Super Agent Master
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4", "3"])
                      ? ""
                      : "d-none",
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
                  {
                    className: `${userType === "7" ? "" : "d-none"}`,
                    label: (
                      <Link onClick={() => props?.action()} to="/create-domain">
                        Create Domain
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
                    defaultSrc="/Images/casino.png"
                    hoverSrc="/Images/casino-hover.png"
                    width={24}
                    hoverWidth={23}
                  />
                ),
                label: (
                  <span
                    onMouseEnter={() => setHoveredItem("3")}
                    onMouseLeave={() => setHoveredItem(null)}>
                    Sports-Betting
                  </span>
                ),
                children: [
                  {
                    key: "3-active-games",
                    label: (
                      <Link
                        to="/Events/sports-details"
                        onClick={() => props?.action()}>
                        Active Games
                      </Link>
                    ),
                  },
                  {
                    key: "3-finished-games",
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
                    key: "3-reject-bets",
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
                    width={24}
                    hoverWidth={23}
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
                    key: "13-inplay",
                    label: (
                      <Link to="/inplay-casino" onClick={() => props?.action()}>
                        Inplay Casino
                      </Link>
                    ),
                  },
                  {
                    key: "13-completed",
                    label: (
                      <Link
                        to="/completed-casino"
                        onClick={() => props?.action()}>
                        Completed Casino
                      </Link>
                    ),
                  },
                  {
                    key: "13-details",
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
                key: "14",
                icon: (
                  <HoverIcon
                    id="14"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/casino.png"
                    hoverSrc="/Images/casino-hover.png"
                    width={24}
                    hoverWidth={23}
                  />
                ),
                label: (
                  <div
                    onMouseEnter={() => setHoveredItem("14")}
                    onMouseLeave={() => setHoveredItem(null)}>
                    Matka
                  </div>
                ),
                children: [
                  {
                    key: "14-inplay",
                    label: (
                      <Link to="/matka/inplay" onClick={() => props?.action()}>
                        INPLAY MATKA
                      </Link>
                    ),
                  },
                  {
                    key: "14-completed",
                    label: (
                      <Link
                        to="/matka/completed"
                        onClick={() => props?.action()}>
                        COMPLETED MATKA
                      </Link>
                    ),
                  },
                  {
                    className: `${userType != "7" ? "d-none" : ""}`,
                    key: "14-set-result",
                    label: (
                      <Link
                        to="/matka/set-result"
                        onClick={() => props?.action()}>
                        SET MATKA RESULT
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
                    width={24}
                    hoverWidth={24}
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
                    key: "4-profit-loss",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/Events/matchledger">
                        Profit/Loss
                      </Link>
                    ),
                  },
                  {
                    key: "4-my-ledger",
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
                    key: "4-admin-ledger",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/6/Admin">
                        Admin Leger
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6"]) ? "" : "d-none",
                    key: "4-mini-admin-ledger",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/5/Mini-Admin">
                        Mini Admin Leger
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                    key: "4-master-ledger",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/4/Master">
                        Master Leger
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                    key: "4-super-ledger",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/3/Super-Agent">
                        Super agent Leger
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4", "3"])
                      ? ""
                      : "d-none",
                    key: "4-agent-ledger",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/client/ledger-super/2/Agent">
                        Agent Leger
                      </Link>
                    ),
                  },
                  {
                    key: "4-client-ledger",
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
              userType === "7" && {
                key: "15",
                icon: (
                  <HoverIcon
                    id="16"
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
                    onMouseEnter={() => setHoveredItem("16")}
                    onMouseLeave={() => setHoveredItem(null)}>
                    Post Ledger
                  </div>
                ),
                children: [
                  {
                    key: "15-create-ledger",
                    label: (
                      <Link onClick={() => props?.action()} to="/create-ledger">
                        Create Ledger
                      </Link>
                    ),
                  },
                  {
                    key: "15-rollback",
                    label: (
                      <Link onClick={() => props?.action()} to="/rollback">
                        Rollback
                      </Link>
                    ),
                  },
                ],
              },

              (userType === "7" || ps == "dtl") && {
                key: "25",
                icon: (
                  <HoverIcon
                    id="26"
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
                    onMouseEnter={() => setHoveredItem("26")}
                    onMouseLeave={() => setHoveredItem(null)}>
                    Event Controller
                  </div>
                ),
                children: [
                  {
                    className: userType === "7" ? "" : "d-none",
                    key: "25-event-lock",
                    label: (
                      <Link onClick={() => props?.action()} to="/event-lock">
                        Event Lock
                      </Link>
                    ),
                  },
                  {
                    className: userType === "7" ? "" : "d-none",
                    key: "25-complete-match-active-bet",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/completd-actibe-bet">
                        Complete Match Active Bet
                      </Link>
                    ),
                  },
                  {
                    key: "25-delete-bet",
                    label: (
                      <Link onClick={() => props?.action()} to="/delete-bets">
                        Delete Bet
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
                    key: "5-client-debit-credit",
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
                    className: hasRole(["7", "6", "5", "4", "3"])
                      ? ""
                      : "d-none",
                    key: "5-agent-debit-credit",
                    label: (
                      <Link
                        to="/client/txn-super/Agent-Master/2"
                        onClick={() => props?.action()}>
                        (A) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                    key: "5-super-agent-debit-credit",
                    label: (
                      <Link
                        to="/client/txn-super/Super-Master/3"
                        onClick={() => props?.action()}>
                        (SA) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                    key: "5-master-debit-credit",
                    label: (
                      <Link
                        to="/client/txn-super/Master-Master/4"
                        onClick={() => props?.action()}>
                        (MA) Debit/Credit Entry
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6"]) ? "" : "d-none",
                    key: "5-mini-admin-debit-credit",
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
                    key: "5-admin-debit-credit",

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
                className: `${userType === "7" ? "" : "d-none"}`,
                key: "28",
                icon: (
                  <HoverIcon
                    id="28"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/casino.png"
                    hoverSrc="/Images/casino-hover.png"
                    width={23}
                    hoverWidth={22}
                  />
                ),
                label: (
                  <Link
                    onClick={() => props?.action()}
                    onMouseEnter={() => setHoveredItem("28")}
                    onMouseLeave={() => setHoveredItem(null)}
                    to="/set-message">
                    Set Message
                  </Link>
                ),
              },
              {
                key: "18",
                icon: (
                  <HoverIcon
                    id="7"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/dashbord.png"
                    hoverSrc="/Images/dash-hover.png"
                    width={23}
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
                    hoverWidth={24}
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
                    key: "6-login-report",
                    label: (
                      <Link
                        to="/client/login-report"
                        onClick={() => props?.action()}>
                        Login Report
                      </Link>
                    ),
                  },
                  {
                    key: "6-secure-code-report",
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
                    defaultSrc="/Images/dashbord.png"
                    hoverSrc="/Images/dash-hover.png"
                    width={23}
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

              {
                key: "200",
                icon: (
                  <HoverIcon
                    id="200"
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    defaultSrc="/Images/adminbar.png"
                    hoverSrc="/Images/admin-bar-hover.png"
                    width={22}
                    hoverWidth={22}
                  />
                ),
                label: (
                  <div
                    onMouseEnter={() => setHoveredItem("200")}
                    onMouseLeave={() => setHoveredItem(null)}>
                    {uType == 6
                      ? "Dead Admin Details"
                      : uType == 5
                        ? "Dead Mini Admin Master"
                        : uType == 4
                          ? "Dead Master Master"
                          : uType == 3
                            ? "Dead Super Agent Master"
                            : userType == 7
                              ? "Dead SuperAdmin"
                              : userType == 2
                                ? "Dead Agent Master"
                                : ""}
                  </div>
                ),
                children: [
                  {
                    className: `${userType != "7" ? "d-none" : ""}`,
                    key: "200-dead-admin",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Admin/6">
                        Dead Admin
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6"]) ? "" : "d-none",
                    key: "200-dead-mini-admin",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Mini-Admin/5">
                        Dead Mini Admin Master
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5"]) ? "" : "d-none",
                    key: "200-dead-master",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Master-Master/4">
                        Dead Master Master
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4"]) ? "" : "d-none",
                    key: "200-dead-super-master",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Super-Master/3">
                        Dead Super Master
                      </Link>
                    ),
                  },
                  {
                    className: hasRole(["7", "6", "5", "4", "3"])
                      ? ""
                      : "d-none",
                    key: "200-dead-agent-master",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Agent-Master/2">
                        Dead Agent Master
                      </Link>
                    ),
                  },
                  {
                    key: "200-dead-client-master",
                    label: (
                      <Link
                        onClick={() => props?.action()}
                        to="/dead-user-list/Client-Master/1">
                        Dead Client Master
                      </Link>
                    ),
                  },
                ],
              },
            ]}
          />
        </Drawer>
      </div>
    </>
  );
};

export default Sidebar;
