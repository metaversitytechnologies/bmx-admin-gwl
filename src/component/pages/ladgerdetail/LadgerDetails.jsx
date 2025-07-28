import { BsFiles } from "react-icons/bs";
import CardItem from "../../common/carditem/CardItem";
import { Card, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom";

const LadgerDetails = ({ setOpenModals, openModal }) => {
  const data = [
    {
      image: <BsFiles />,
      name: "P/L",
      path: "/Events/matchledger",
      size: "20",
      userType: 10,
    },
    {
      image: <BsFiles />,
      name: "My Ledger",
      path: "/client/my-ledger",
      size: "20",
      userType: 10,
    },
    {
      image: <BsFiles />,
      name: "Admin",
      path: "/client/ledger-super",
      size: "20",
      userType: 6,
    },
    {
      image: <BsFiles />,
      name: "madmin",
      path: "/client/ledger-super",
      size: "20",
      userType: 5,
    },
    {
      image: <BsFiles />,
      name: "Master",
      path: "/client/ledger-super",
      size: "20",
      userType: 4,
    },
    {
      image: <BsFiles />,
      name: "Super",
      path: "/client/ledger-master",
      size: "20",
      userType: 3,
    },
    {
      image: <BsFiles />,
      name: "Agent",
      path: `/client/ledger-agent`,
      size: "20",
      userType: 2,
    },
    {
      image: <BsFiles />,
      name: "Client",
      path: "/client/ledger-client",
      size: "20",
      userType: 1,
    },
  ];

  const uType = localStorage.getItem("userType");
  const userTypeMatch = {
    2: [1, 10],
    3: [1, 2, 10],
    4: [1, 2, 3, 10],
    5: [1, 2, 3, 4, 10],
    6: [1, 2, 3, 4, 5, 10],
    7: [1, 2, 3, 4, 5, 6, 10],
  };

  return (
    <>
      <Modal
        onCancel={() => setOpenModals(false)}
        footer={
          <button
            onClick={() => setOpenModals(false)}
            className="ant-btn gx-bg-grey ant-modal-footer ant-btn-default">
            Close
          </button>
        }
        className="antd_dsh_madals"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}>
        <Row className="modal_opne_dash">
          {data
            .filter((res) => userTypeMatch[uType]?.includes(res?.userType))
            ?.map((items, id) => {
              return (
                <Col md={12} xs={24} key={id}>
                  <Card bordered={false}>
                    <Link to={items?.path}>
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
                                <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                                  {items?.name}
                                </h1>
                                <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                                <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                                {/* <p className="gx-mb-0">Master</p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Modal>
    </>
  );
};

export default LadgerDetails;
