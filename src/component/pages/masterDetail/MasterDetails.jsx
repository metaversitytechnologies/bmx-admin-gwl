import React from "react";
import CardItem from "../../common/carditem/CardItem";
import { BiUserCircle } from "react-icons/bi";
import { Card, Col, Modal, Row } from "antd";

const MasterDetails = ({ setOpenModals, openModal }) => {
  const data = [
    {
      image: <BiUserCircle />,
      name: "Master",
      path: "/user-list/Master/4",
      size: "20",
      id: 0,
      userType: 0,
    },
    {
      image: <BiUserCircle />,
      name: "Super",
      path: `/user-list/Super/3`,
      size: "20",
      userType: 1,
    },
    {
      image: <BiUserCircle />,
      name: "Agent",
      path: `/user-list/Agent/2`,
      size: "20",
      userType: 2,
    },
    {
      image: <BiUserCircle />,
      name: "Client",
      path: "/user-list/Client/1",
      size: "20",
      userType: 3,
    },
  ];
  const uType = localStorage.getItem("userType");
  const userTypeMatch = {
    0: [1, 2, 3],
    1: [2, 3],
    2: [3],
    5: [0, 1, 2, 3],
  };
  return (
    <>
      {/* <CardItem data={data.filter(
        res=>
        ((userTypeMatch[uType]?.includes(res?.userType))) 
      )} /> */}
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
          {data?.map((items) => {
            return (
              <Col md={12} xs={24} key={items?.id}>
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
                              {items?.image}
                            </div>
                            <div className="gx-media-body">
                              <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                                {items?.name}
                              </h1>
                              <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                              <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                              <p className="gx-mb-0">Master</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Modal>
    </>
  );
};

export default MasterDetails;
