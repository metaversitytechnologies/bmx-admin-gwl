import { useState } from "react";
import { Drawer, Menu, Space } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { LuBarChart4 } from "react-icons/lu";
import { SlDiamond } from "react-icons/sl";
import { MdMenu } from "react-icons/md";
import "./Sidebar.scss";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { Link, json, useNavigate } from "react-router-dom";

const rootSubmenuKeys = ["1", "2", "3", "4", "5", "6", "7"];

const Sidebar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(["1"]);

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
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
        width="275"
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
              icon: <AiOutlineHome />,
              label: (
                <Link to="/dashboard" onClick={() => setOpenKeys([])}>
                  Dashboard
                </Link>
              ),
              // onClick:{handleDashBoard}
            },
            {
              key: "2",
              icon: <BiUserCircle />,
              label: (
                <div>
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
                  label: <Link to="/client/list-super">Master</Link>,
                },
                {
                  className: `${
                    userType === "0" || userType == "5" ? "" : "d-none"
                  }`,
                  label: <Link to="/client/list-agent">Super</Link>,
                },
                {
                  className: `${
                    userType === "1" || userType == "5" || userType === "0"
                      ? ""
                      : "d-none"
                  }`,
                  label: <Link to="/client/list-dealer">Agent</Link>,
                },
                {
                  label: <Link to="client/list-client">Client</Link>,
                },
              ],
            },
            {
              key: "3",
              icon: <LuBarChart4 />,
              label: "Sports-Betting",
              children: [
                {
                  label: <Link to="/Events/sports-details">Sports Detail</Link>,
                },
                {
                  label: <Link to="/casino/aura-details">Aura Detail</Link>,
                },
                {
                  label: <Link to="/casino/supernowa">Super Nowa Detail</Link>,
                },
                {
                  label: <Link to="/casino/qtech">QTech Detail</Link>,
                },
                // {
                //   label: (
                //     <Link to="/Casino/andar-bahar-details">
                //       AndarBahar Detail
                //     </Link>
                //   ),
                // },
                // {
                //   label: <Link to="/Casino/casino-details">Casino Detail</Link>,
                // },
              ],
            },
            {
              key: "4",
              icon: <BiUserCircle />,
              label: "Ledger",
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
              icon: <BiUserCircle />,
              label: "Cash Transaction",
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
              key: "6",
              icon: <BiUserCircle />,
              label: "Reports",
              children: [
                {
                  key: "11",
                  label: "Data Report",
                  children: [
                    {
                      className: `${userType != "5" ? "d-none" : ""}`,
                      label: <Link to="/report/super">Master </Link>,
                    },
                    {
                      className: `${
                        userType === "0" || userType == "5" ? "" : "d-none"
                      }`,
                      label: <Link to="/report/master">Super</Link>,
                    },

                    {
                      className: `${
                        userType === "1" || userType == "5" || userType === "0"
                          ? ""
                          : "d-none"
                      }`,
                      label: <Link to="/report/agent">Agent </Link>,
                    },
                    {
                      label: <Link to="/report/client">Client </Link>,
                    },
                  ],
                },
                {
                  key: "12",
                  label: "Commission Report",
                  children: [
                    {
                      className: `${userType != "5" ? "d-none" : ""}`,
                      label: <Link to="/client/comm-report-super">Master</Link>,
                    },
                    {
                      className: `${
                        userType === "0" || userType == "5" ? "" : "d-none"
                      }`,
                      label: <Link to="/client/comm-report-master">Super</Link>,
                    },
                    {
                      className: `${
                        userType === "1" || userType == "5" || userType === "0"
                          ? ""
                          : "d-none"
                      }`,
                      label: <Link to="/client/comm-report-agent">Agent</Link>,
                    },
                    {
                      label: (
                        <Link to="/client/comm-report-client">Client</Link>
                      ),
                    },
                  ],
                },
                {
                  key: "13",
                  label: "Login Reports",
                  children: [
                    {
                      label: (
                        <Link to="/client/login-report">Login Report</Link>
                      ),
                    },
                  ],
                },
              ],
            },
            // {
            //   key: "7",
            //   icon: <BiUserCircle />,
            //   label: "Login Reports",
            //   children: [
            //     {
            //       label: <Link to="/client/login-report">Login Report</Link>,
            //     },
            //   ],
            // },
            // {
            //   key: "8",
            //   icon: <SlDiamond />,
            //   label: (
            //     <Link to="/markets" onClick={() => setOpenKeys([])}>
            //       Setting
            //     </Link>
            //   ),
            // },
            {
              key: "8",
              icon: <SlDiamond />,
              label: "Setting",
              children: [
                {
                  className: `${
                    props?.logoData?.data?.selfAllowed ? "" : "d-none"
                  }`,
                  label: <Link to="/set-commission">Set Commission</Link>,
                },
                {
                  label: <Link to="/markets">Setting</Link>,
                },
              ],
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
                icon: <AiOutlineHome />,
                label: (
                  <Link
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
                icon: <BiUserCircle />,
                label: (
                  <div>
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
                        to="/client/list-super"
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
                        to="/client/list-agent"
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
                        to="/client/list-dealer"
                        onClick={() => props?.action()}>
                        Agent
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="client/list-client"
                        onClick={() => props?.action()}>
                        Client
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "3",
                icon: <LuBarChart4 />,
                label: "Sports-Betting",
                children: [
                  {
                    label: (
                      <Link
                        to="/Events/sports-details"
                        onClick={() => props?.action()}>
                        Sports Detail
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="/casino/aura-details"
                        onClick={() => props?.action()}>
                        Aura Detail
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="/casino/supernowa"
                        onClick={() => props?.action()}>
                        Super Nowa Detail
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link to="/casino/qtech" onClick={() => props?.action()}>
                        QTech Detail
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "4",
                icon: <BiUserCircle />,
                label: "Ledger",
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
                icon: <BiUserCircle />,
                label: "Cash Transaction",
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
                key: "6",
                className: "data_report_list",
                icon: <BiUserCircle />,
                label: "Reports",
                children: [
                  {
                    key: "12",
                    label: "Data Reports",
                    children: [
                      {
                        className: `${userType != "5" ? "d-none" : ""}`,
                        label: (
                          <Link
                            to="/report/super"
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
                            to="/report/master"
                            onClick={() => props?.action()}>
                            Super
                          </Link>
                        ),
                      },

                      {
                        className: `${
                          userType === "1" ||
                          userType == "5" ||
                          userType === "0"
                            ? ""
                            : "d-none"
                        }`,
                        label: (
                          <Link
                            to="/report/agent"
                            onClick={() => props?.action()}>
                            Agent
                          </Link>
                        ),
                      },
                      {
                        label: (
                          <Link
                            to="/report/client"
                            onClick={() => props?.action()}>
                            Client
                          </Link>
                        ),
                      },
                    ],
                  },
                  {
                    key: "13",
                    label: "Commission Report",
                    children: [
                      {
                        className: `${userType != "5" ? "d-none" : ""}`,
                        label: (
                          <Link
                            to="/client/comm-report-super"
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
                            to="/client/comm-report-master"
                            onClick={() => props?.action()}>
                            Super
                          </Link>
                        ),
                      },
                      {
                        className: `${
                          userType === "1" ||
                          userType == "5" ||
                          userType === "0"
                            ? ""
                            : "d-none"
                        }`,
                        label: (
                          <Link
                            to="/client/comm-report-agent"
                            onClick={() => props?.action()}>
                            Agent
                          </Link>
                        ),
                      },
                      {
                        label: (
                          <Link
                            to="/client/comm-report-client"
                            onClick={() => props?.action()}>
                            Client
                          </Link>
                        ),
                      },
                    ],
                  },
                  {
                    key: "14",
                    label: "Login Reports",
                    children: [
                      {
                        label: (
                          <Link
                            to="/client/login-report"
                            onClick={() => props?.action()}>
                            Login Report
                          </Link>
                        ),
                      },
                    ],
                  },
                ],
              },
              // {
              //   key: "6",
              //   icon: <BiUserCircle />,
              //   label: "Reports",
              //   children: [
              //     {
              //       label: (
              //         <Link
              //           to="/client/login-report"
              //           onClick={() => props?.action()}>
              //           Login Report
              //         </Link>
              //       ),
              //     },
              //     // {
              //     //   label: (
              //     //     <Link
              //     //       to="/client/mobile-app-report"
              //     //       onClick={() => props?.action()}>
              //     //       Mobile App Report
              //     //     </Link>
              //     //   ),
              //     // },
              //     // {
              //     //   label: (
              //     //     <Link
              //     //       to="/client/secure-code-report"
              //     //       onClick={() => props?.action()}>
              //     //       Secure Code Report
              //     //     </Link>
              //     //   ),
              //     // },
              //   ],
              // },
              {
                key: "7",
                icon: <SlDiamond />,
                label: "Setting",
                children: [
                  {
                    className: `${
                      props?.logoData?.data?.selfAllowed ? "" : "d-none"
                    }`,
                    label: (
                      <Link
                        to="/set-commission"
                        onClick={() => {
                          props?.action();
                          setOpenKeys([]);
                        }}>
                        Set Commission
                      </Link>
                    ),
                  },
                  {
                    label: (
                      <Link
                        to="/markets"
                        onClick={() => {
                          props?.action();
                          setOpenKeys([]);
                        }}>
                        Setting
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
