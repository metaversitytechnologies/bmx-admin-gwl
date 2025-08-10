import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { IoMdInformationCircle } from "react-icons/io";
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

const Dashboard = () => {
  const [openModal, setOpenModals] = useState(false);
  const [openSetting, setSetting] = useState(false);
  const [openDashBoard, setOpenDashBoard] = useState();
  const [openModalReport, setOpenModalsReport] = useState(false);
  const [openSportModals, setSportModals] = useState(false);

  const nav = useNavigate();

  const handleRules = () => {
    nav("/rules");
  };

  const { data: dataDes } = useDashboardQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const uType = localStorage.getItem("userType");

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
                          <img src="/Images/dash.png" height={33} />
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            {uType == 7
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
                <div
                  className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent"
                  onClick={() => setSportModals(!openSportModals)}>
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          <img src="/Images/left-sport.png" height={22.5} />
                        </div>
                        <div className="gx-media-body">
                          <h1 className=" gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            {`Sport's Details`}
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
                          <img src="/Images/ledger.png" width={25} />
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
                          <img src="/Images/cash.png" width={27} />
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
                          <img src="/Images/setting.png" width={29} />
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
                          <CiLogin
                            style={{
                              fontSize: "38px",
                            }}
                          />
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
                icon: <img src="/Images/user.png" width={30} />,
                title: `${convertCode(localStorage.getItem("userId"))}`,
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
                }`,
              },
              {
                icon: <img src="/Images/chips.png" width={30} />,
                title: `${dataDes?.data?.balance?.toFixed(2)}`,
                desc: "Chips",
              },
              {
                icon: <img src="/Images/member.png" width={30} />,
                title: `${dataDes?.data?.members}`,
                desc: "Members",
              },
              {
                icon: <img src="/Images/sheare.png" width={30} />,
                title: `${dataDes?.data?.myShare}`,
                desc: "My Share",
              },
              {
                icon: <img src="/Images/com_s.png" width={30} />,
                title: `${dataDes?.data?.companyShare}%`,
                desc: "Company Share",
              },
              {
                icon: null,
                title: `${dataDes?.data?.matchCommission}%`,
                desc: "Match Commission",
              },
              {
                icon: null,
                title: `${dataDes?.data?.sessionCommission}%`,
                desc: "Session Commission",
              },
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
