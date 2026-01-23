import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import "./Dashboard.scss";
import ActiveMatch from "../../common/ActiveMatch/ActiveMatch";
import { useNavigate } from "react-router-dom";
import { useDashboardQuery } from "../../../store/service/userlistService";
import LadgerDetails from "../ladgerdetail/LadgerDetails";
import CashTransanction from "../CashTransanction/CashTransanction";
import SettingModals from "./SettingModals";
import MasterDetails from "../masterDetail/MasterDetails";
import SportModal from "./SportModal";
import { convertCode } from "../../../store/constant";
import { useDispatch } from "react-redux";
import { setShowMarquee } from "../../../store/global/slice";
import {
  BankOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  BarChartOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const [openModal, setOpenModals] = useState(false);
  const [openSetting, setSetting] = useState(false);
  const [openDashBoard, setOpenDashBoard] = useState();
  const [openModalReport, setOpenModalsReport] = useState(false);
  const [openSportModals, setSportModals] = useState(false);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleRules = () => {
    nav("/rules");
  };

  const { data: dataDes } = useDashboardQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const uType = localStorage.getItem("userType");
  const toUpper = (value) =>
    typeof value === "string" ? value.toUpperCase() : value;

  useEffect(() => {
    dispatch(setShowMarquee(true));
    return () => {
      dispatch(setShowMarquee(false));
    };
  }, [dispatch]);

  return (
    <>
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
                          {/* <img src="/Images/dash.png" height={33} /> */}
                          <UserOutlined style={{ fontSize: "18px" }} />
                        </div>
                        <div className="gx-media-body">
                          <h1
                            className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white"
                            style={{ fontSize: "12px" }}>
                            {toUpper(
                              uType == 7
                                ? "SuperAdmin Details"
                                : uType == 6
                                ? "Admin Detail"
                                : uType == 5
                                ? "Mini Admin"
                                : uType == 4
                                ? "Master"
                                : uType == 3
                                ? "SuperAgent"
                                : uType == 2
                                ? "Agent"
                                : ""
                            )}
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={6} className="colo_name">
              <div>
                <div
                  className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent"
                  onClick={() => setSportModals(!openSportModals)}>
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          <BarChartOutlined style={{ fontSize: "16px" }} />
                        </div>
                        <div className="gx-media-body">
                          <h1
                            className=" gx-text-capitalize gx-fs-lg  gx-font-weight-semi-bold  gx-text-white"
                            style={{ fontSize: "12px" }}>
                            {`Sport's Details`.toUpperCase()}
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
                          <BankOutlined style={{ fontSize: "18px" }} />
                        </div>
                        <div className="gx-media-body">
                          <h1
                            className=" gx-text-capitalize  gx-fs-lg gx-font-weight-semi-bold  gx-text-white"
                            style={{ fontSize: "12px" }}>
                            LEDGER
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
                          <BankOutlined style={{ fontSize: "18px" }} />
                        </div>
                        <div className="gx-media-body">
                          <h1
                            className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white"
                            style={{ fontSize: "12px" }}>
                            CASH TRANSACTION
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                          {/* <p className="gx-mb-0">Cash Transaction</p> */}
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
                          <SettingOutlined style={{ fontSize: "16px" }} />
                        </div>
                        <div className="gx-media-body">
                          <h1
                            className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white"
                            style={{ fontSize: "12px" }}>
                            SETTING
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
              onClick={() => {
                localStorage.clear();
                nav("/");
              }}>
              <div>
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          <LogoutOutlined style={{ fontSize: "20px" }} />
                        </div>
                        <div className="gx-media-body">
                          <h1
                            className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white"
                            style={{ fontSize: "12px" }}>
                            LOGOUT
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
      <Row
        justify="center"
        className="main_dash_class"
        style={{
          paddingTop: "0px",
        }}>
        <Col xs={24} lg={24}>
          <Row className="gx-pb-10">
            {" "}
            {[
              {
                icon: <UserOutlined style={{ fontSize: "16px" }} />,
                title: `${convertCode(localStorage.getItem("userId"))}`.toUpperCase(),
                desc: `You are ${
                  uType == 7
                    ? "Super Admin"
                    : uType == 6
                    ? "Admin"
                    : uType == 5
                    ? "Mini Admin"
                    : uType == 4
                    ? "Masetr"
                    : uType == 3
                    ? "Super Master"
                    : uType == 2
                    ? "Agent"
                    : "Client"
                }`.toUpperCase(),
              },
              {
                icon: <TrophyOutlined style={{ fontSize: "16px" }} />,
                title: `${dataDes?.data?.balance?.toFixed(2)}`,
                desc: "COINS",
              },
              {
                icon: <TeamOutlined style={{ fontSize: "16px" }} />,
                title: `${dataDes?.data?.members}`,
                desc: "MEMBERS",
              },
              {
                icon: <BarChartOutlined style={{ fontSize: "16px" }} />,
                title: `${dataDes?.data?.myShare}`,
                desc: "MY SHARE",
              },
              {
                icon: <BarChartOutlined style={{ fontSize: "16px" }} />,
                title: `${dataDes?.data?.companyShare}%`,
                desc: "COMPANY SHARE",
              },
              {
                icon: null,
                title: `${dataDes?.data?.matchCommission}%`,
                desc: "MATCH COMMISSION",
              },
              {
                icon: null,
                title: `${dataDes?.data?.sessionCommission}%`,
                desc: "SESSION COMMISSION",
              },
              {
                icon: <InfoCircleOutlined style={{ fontSize: "16px" }} />,
                title: "RULES",
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
                            <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" style={{fontSize: '12px'}}>
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
      <SportModal setOpenModals={setSportModals} openModal={openSportModals} />
    </>
  );
};

export default Dashboard;
