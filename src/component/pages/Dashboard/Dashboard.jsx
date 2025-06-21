import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { LuBarChart4 } from "react-icons/lu";
import { AiOutlineSetting } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { HiUser } from "react-icons/hi";
import { SlDiamond } from "react-icons/sl";
import { IoMdInformationCircle } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Card, Col, Modal, Row } from "antd";
import "./Dashboard.scss";
import ActiveMatch from "../../common/ActiveMatch/ActiveMatch";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../store/service/authService";
import { useCreateCasinoListQuery } from "../../../store/service/supermasteAccountStatementServices";
import CasinoModalsDash from "./CasinoModalsDash";
import { useDashboardQuery } from "../../../store/service/userlistService";
import LadgerDetails from "../ladgerdetail/LadgerDetails";
import CashTransanction from "../CashTransanction/CashTransanction";
import SettingModals from "./SettingModals";
import DashboardModal from "./DashboardModal";
import MasterDetails from "../masterDetail/MasterDetails";

const Dashboard = () => {
  const [openModal, setOpenModals] = useState(false);
  const [openSetting, setSetting] = useState(false);
  const [openDashBoard, setOpenDashBoard] = useState();
  const [openModalReport, setOpenModalsReport] = useState(false);
  const [casinoLockModals, setCasinoLockModals] = useState(false);

  const nav = useNavigate();

  const handleRules = () => {
    nav("/rules");
  };

  // const userType = localStorage.getItem("userType")
  const gridStyle = {
    width: "22.342%",
    background: "#7d5c0e",
    color: "#fff",
    margin: "10px",
    cursor: "pointer",
    borderRadius: "20px",
  };

  // const { data: dataDes } = useDashboardQuery();

  // const [logOut, { data: logOutData }] = useLogoutMutation();

  // const handleLogout = () => {
  //   localStorage.clear();
  //   nav("/");
  //   logOut();
  // };

  // const uType = localStorage.getItem("userType");
  const uType = 5;

  const { data: casinoDetails } = useCreateCasinoListQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      {/* <Card className="dash_card">
        <Card.Grid hoverable={false} className="" style={gridStyle}>
          <Link to="#" onClick={() => setOpenDashBoard(!openDashBoard)}>
            <div className="main_card_section">
              <div className="icon_card_section">
                <BiUserCircle />
              </div>
              <div className="tital_card_section">
                <p style={{ fontSize: "16px" }}>
                  {uType == 5
                    ? "Sub Admin Details"
                    : uType == 0
                    ? "Master Detail"
                    : uType == 1
                    ? "Super Detail"
                    : uType == 2
                    ? "Agent Detail"
                    : ""}
                </p>
                <p className="gx-mb-0">My Team</p>
              </div>
            </div>
          </Link>
        </Card.Grid>

        <Card.Grid hoverable={false} className="" style={gridStyle}>
          <Link to="/Events/sports-details">
            <div className="main_card_section">
              <div className="icon_card_section">
                <LuBarChart4 />
              </div>
              <div className="tital_card_section">
                <p style={{ fontSize: "16px" }}>Sport's Details</p>
              </div>
            </div>
          </Link>
        </Card.Grid>

        <Card.Grid
          hoverable={false}
          className=""
          style={gridStyle}
          onClick={() => setOpenModals(!openModal)}>
          <Link to="#">
            <div className="main_card_section">
              <div className="icon_card_section">
                <BiUserCircle />
              </div>
              <div className="tital_card_section">
                <p style={{ fontSize: "16px" }}>Ledger</p>
              </div>
            </div>
          </Link>
        </Card.Grid>

        <Card.Grid
          hoverable={false}
          className=""
          style={gridStyle}
          onClick={() => setOpenModalsReport(!openModalReport)}>
          <Link to="#">
            <div className="main_card_section">
              <div className="icon_card_section">
                <BiUserCircle />
              </div>
              <div className="tital_card_section">
                <p style={{ fontSize: "16px" }}>Reports</p>
                <p className="gx-mb-0">Cash Transaction</p>
              </div>
            </div>
          </Link>
        </Card.Grid>

        <Card.Grid
          hoverable={false}
          className=""
          style={gridStyle}
          onClick={() => setSetting(!openSetting)}>
          <Link to="#">
            <div className="main_card_section">
              <div className="icon_card_section">
                <AiOutlineSetting />
              </div>
              <div className="tital_card_section">
                <p style={{ fontSize: "14px" }}>Settings</p>
              </div>
            </div>
          </Link>
        </Card.Grid>

        <Card.Grid hoverable={false} className="" style={gridStyle}>
          <p
          
          >
            <div className="main_card_section">
              <div className="icon_card_section">
                <CiLogin />
              </div>
              <div className="tital_card_section">
                <p style={{ fontSize: "14px" }}>Log Out</p>
              </div>
            </div>
          </p>
        </Card.Grid>
      </Card> */}
      {/* 
      <Card>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <HiUser />
            </div>
            <div className="tital_card_section f-w">
              <h2 style={{ fontSize: "19px" }}>Demo</h2>
              <p>
                You are{" "}
                {uType == 5
                  ? "Sub Admin"
                  : uType == 0
                  ? "Master"
                  : uType == 1
                  ? "Super"
                  : uType == 2
                  ? "Agent"
                  : "Client"}
              </p>
            </div>
          </div>
        </Card.Grid>

        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <SlDiamond />
            </div>
            <div className="tital_card_section f-w">
              <h2 style={{ fontSize: "19px" }}>1000</h2>
              <p>Chips</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <HiUser />
            </div>
            <div className="tital_card_section f-w">
              <h2 style={{ fontSize: "19px" }}>10</h2>
              <p>Members</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <LuBarChart4 />
            </div>
            <div className="tital_card_section f-w">
              <h2 style={{ fontSize: "19px" }}>100</h2>
              <p>My Share</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <LuBarChart4 />
            </div>
            <div className="tital_card_section f-w">
              <h2 style={{ fontSize: "19px" }}>100</h2>
              <p>Company Share</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section"></div>
            <div className="tital_card_section f-w">
              <h2 style={{ fontSize: "19px" }}>90%</h2>
              <p>Match Commission</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section"></div>
            <div className="tital_card_section f-w">
              <h2 style={{ fontSize: "19px" }}>90%</h2>
              <p>Session Commission</p>
            </div>
          </div>
        </Card.Grid>

        <Card.Grid hoverable={false} style={gridStyle}>
          <div className="main_card_section">
            <div className="icon_card_section">
              <HiUser />
            </div>
            <div className="tital_card_section f-w">
              <h2 style={{ fontSize: "19px" }}>10</h2>
              <p>Client</p>
            </div>
          </div>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <div
            onClick={handleRules}
            style={{ cursor: "pointer" }}
            className="main_card_section">
            <div className="icon_card_section">
              <IoMdInformationCircle />
            </div>
            <div className="tital_card_section f-w">
              <h2 style={{ fontSize: "19px" }}>Rules</h2>
            </div>
          </div>
        </Card.Grid>

        <Card.Grid hoverable={false} style={gridStyle}>
          <div
            onClick={() => setCasinoLockModals(true)}
            style={{ cursor: "pointer" }}
            className="main_card_section">
            <div className="icon_card_section">
              <FaLock style={{ fontSize: "40px" }} />
            </div>
            <div className="tital_card_section f-w">
              <h2 style={{ fontSize: "18px" }}>My Casino Allowed</h2>
            </div>
          </div>
        </Card.Grid>
      </Card> */}

      <Row justify="center" className="main_dash_class">
        <Col xs={24} lg={24}>
          <Row className="gx-pb-10">
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={6}
              className="colo_name"
              onClick={() => setOpenDashBoard(!openDashBoard)}>
              <div>
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          {/* <i className="icon icon-family gx-fs-2xl" /> */}
                          <img src="/Images/dash.png" height={33} />
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            {uType == 5
                              ? "Sub Admin Details"
                              : uType == 0
                              ? "Master Detail"
                              : uType == 1
                              ? "Super Detail"
                              : uType == 2
                              ? "Agent Detail"
                              : ""}
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                          <p className="gx-mb-0">My Team</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={6} className="colo_name">
              <div>
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          <i className="icon icon-family gx-fs-2xl" />
                        </div>
                        <div className="gx-media-body">
                          <h1 className=" gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            Sport's Details
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={6}
              className="colo_name"
              onClick={() => setOpenModals(!openModal)}>
              <div>
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          <BiUserCircle />
                        </div>
                        <div className="gx-media-body">
                          <h1 className=" gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            Ledger
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={6}
              className="colo_name"
              onClick={() => setOpenModalsReport(!openModalReport)}>
              <div>
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          <BiUserCircle />
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            Reports
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                          <p className="gx-mb-0">Cash Transaction</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={6}
              className="colo_name"
              onClick={() => setSetting(!openSetting)}>
              <div>
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          <AiOutlineSetting />
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            Setting
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={6}
              className="colo_name"
              onClick={() => setSetting(!openSetting)}>
              <div>
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          <CiLogin />
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            Logout
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center" className="main_dash_class">
        <Col xs={24} lg={24}>
          <Row className="gx-pb-10">
            {" "}
            {[
              {
                icon: <HiUser />,
                title: "Demo",
                desc:
                  uType == 5
                    ? "Sub Admin"
                    : uType == 0
                    ? "Master"
                    : uType == 1
                    ? "Super"
                    : uType == 2
                    ? "Agent"
                    : "Client",
              },
              { icon: <SlDiamond />, title: "1000", desc: "Chips" },
              { icon: <HiUser />, title: "10", desc: "Members" },
              { icon: <LuBarChart4 />, title: "100", desc: "My Share" },
              { icon: <LuBarChart4 />, title: "100", desc: "Company Share" },
              { icon: null, title: "90%", desc: "Match Commission" },
              { icon: null, title: "90%", desc: "Session Commission" },
              // { icon: <HiUser />, title: "10", desc: "Client" },
              {
                icon: <IoMdInformationCircle />,
                title: "Rules",
                onClick: handleRules,
              },
              // {
              //   icon: <FaLock style={{ fontSize: "40px" }} />,
              //   title: "My Casino Allowed",
              //   onClick: () => setCasinoLockModals(true),
              // },
            ].map((item, index) => (
              <Col
                key={index}
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={6}
                className="colo_name"
                onClick={item.onClick}>
                <div>
                  <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                    <div className="ant-card-body">
                      <div className="gx-fillchart gx-overlay-fillchart gx-bg-transparent">
                        <div
                          className="gx-media gx-align-items-center gx-pointer gx-flex-nowrap gx-fillchart-content"
                          style={{ borderRadius: 20 }}>
                          <div className="gx-mr-1 gx-mr-xl-3">
                            {item.icon ? item.icon : <></>}
                          </div>
                          <div className="gx-media-body">
                            <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white">
                              {item.title}
                            </h1>
                            {item.desc && (
                              <p className="gx-mb-0">{item.desc}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* </div> */}

      <Modal
        className="modal_dash"
        destroyOnClose
        title={
          <h1>
            <span>My Casino Allowed</span>
          </h1>
        }
        open={casinoLockModals}
        onCancel={() => setCasinoLockModals(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}>
        <CasinoModalsDash data={casinoDetails?.data} />
      </Modal>

      <ActiveMatch />

      <LadgerDetails setOpenModals={setOpenModals} openModal={openModal} />
      <CashTransanction
        setOpenModals={setOpenModalsReport}
        openModal={openModalReport}
      />
      <SettingModals setOpenModals={setSetting} openModal={openSetting} />
      <MasterDetails
        setOpenModals={setOpenDashBoard}
        openModal={openDashBoard}
      />
    </>
  );
};

export default Dashboard;
