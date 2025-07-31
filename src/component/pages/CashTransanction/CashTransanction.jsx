import { BiUserCircle } from "react-icons/bi";
import { Card, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom";

const data = [
  {
    image: <BiUserCircle />,
    head: "Admin",
    name: "Dr/Cr Entry Admin",
    path: "/client/txn-super/Admin/6",
    size: "14",
    userType: 6,
  },
  {
    image: <BiUserCircle />,
    head: "madmin",
    name: "Dr/Cr Entry Super",
    path: "/client/txn-super/madmin/5",
    size: "14",
    userType: 5,
  },
  {
    image: <BiUserCircle />,
    head: "Master",
    name: "Dr/Cr Entry Super",
    path: "/client/txn-super/Master/4",
    size: "14",
    userType: 4,
  },
  {
    image: <BiUserCircle />,
    head: "Superagent",
    name: "Dr/Cr Entry Master",
    path: "/client/txn-super/Super/3",
    size: "14",
    userType: 3,
  },
  {
    image: <BiUserCircle />,
    head: "Agent",
    name: "Dr/Cr Entry Agent",
    path: "/client/txn-super/Agent/2",
    size: "14",
    userType: 2,
  },
  {
    image: <BiUserCircle />,
    head: "Client",
    name: "Dr/Cr Entry Client",
    path: "/client/txn-super/Client/1",
    size: "14",
    userType: 1,
  },
];

const CashTransanction = ({ setOpenModals, openModal }) => {
  const userTypeMatch = {
    2: [1],
    3: [1, 2],
    4: [1, 2, 3],
    5: [1, 2, 3, 4],
    6: [1, 2, 3, 4, 5],
    7: [1, 2, 3, 4, 5, 6],
  };
  const uType = localStorage.getItem("userType");
  return (
    <>
      {/* <CardItem
        data={data.filter((res) =>
          userTypeMatch[uType]?.includes(res?.userType)
        )}
      /> */}
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
                                <img src="/Images/cash.png" width={27} />
                              </div>
                              <div className="gx-media-body">
                                <h1 className="gx-fs-lg gx-text-capitalize  gx-font-weight-semi-bold  gx-text-white">
                                  {items?.head}
                                </h1>
                                <h1 className="gx-fs-lg gx-text-capitalize gx-font-weight-semi-bold gx-text-white" />
                                <h1 className="gx-fs-lg  gx-text-capitalize gx-text-white" />
                                <p className="gx-mb-0">{items?.name}</p>
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

export default CashTransanction;
