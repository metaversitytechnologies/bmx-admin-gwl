import { Card, Col, Modal, Row } from "antd";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

const SettingModals = ({ setOpenModals, openModal }) => {
  return (
    <>
      <Modal
        onCancel={() => setOpenModals(!openModal)}
        footer={
          <button
            onClick={() => setOpenModals(!openModal)}
            className="ant-btn gx-bg-grey ant-modal-footer ant-btn-default">
            Close
          </button>
        }
        className="antd_dsh_madals"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}>
        <Row className="modal_opne_dash">
          <Col md={12} xs={24}>
            <Card bordered={false}>
              <Link to="/account-operation">
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          <img src="/Images/user.png" height={33} />
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            Statements
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                          {/* <p className="gx-mb-0">{items?.name}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          </Col>
          <Col md={12} xs={24}>
            <Card bordered={false}>
              <a href="/components/general/button-superagent/3">
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          {/* <i className="icon icon-family gx-fs-2xl" /> */}
                          {/* <HiUser /> */}
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            A/c Operations
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                          {/* <p className="gx-mb-0">{items?.name}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
          <Col md={12} xs={24}>
            <Card bordered={false}>
              <a href="/components/general/button-superagent/3">
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          {/* <i className="icon icon-family gx-fs-2xl" /> */}
                          {/* <HiUser /> */}
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            Profit and Loss
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                          {/* <p className="gx-mb-0">{items?.name}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
          <Col md={12} xs={24}>
            <Card bordered={false}>
              <a href="/components/general/button-superagent/3">
                <div className="ant-card ant-card-bordered gx-card-widget gx-card-full gx-bg-transparent">
                  <div className="ant-card-body">
                    <div className="gx-fillchart   gx-overlay-fillchart gx-bg-transparent">
                      <div
                        className="gx-media gx-align-items-center gx-pointer  gx-flex-nowrap gx-fillchart-content "
                        style={{ borderRadius: 20 }}>
                        <div className="gx-mr-1 gx-mr-xl-3">
                          {/* <i className="icon icon-family gx-fs-2xl" /> */}
                          {/* <HiUser /> */}
                        </div>
                        <div className="gx-media-body">
                          <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                            Casino Profit&Loss
                          </h1>
                          <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                          <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                          {/* <p className="gx-mb-0">{items?.name}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default SettingModals;
