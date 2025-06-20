import { BiUserCircle } from "react-icons/bi";
import CardItem from "../../common/carditem/CardItem";
import { Card, Col, Modal, Row } from "antd";

const data = [
  {
    image: <BiUserCircle />,
    head: "Master",
    name: "Dr/Cr Entry Super",
    path: "/client/txn-super",
    size: "14",
    userType: 0,
  },
  {
    image: <BiUserCircle />,
    head: "Superagent",
    name: "Dr/Cr Entry Master",
    path: "/client/txn-master",
    size: "14",
    userType: 1,
  },
  {
    image: <BiUserCircle />,
    head: "Agent",
    name: "Dr/Cr Entry Agent",
    path: "/client/txn-agent",
    size: "14",
    userType: 2,
  },
  {
    image: <BiUserCircle />,
    head: "Client",
    name: "Dr/Cr Entry Client",
    path: "/client/txn-client",
    size: "14",
    userType: 3,
  },
];

const CashTransanction = ({ setOpenModals, openModal }) => {
  const userTypeMatch = {
    0: [1, 2, 3],
    1: [2, 3],
    2: [3],
    5: [0, 1, 2, 3],
  };
  const uType = 5;
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

export default CashTransanction;
