import { Card, Col, Modal, Row } from "antd";
import { Banknote, ChevronRight, UserRound, X } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const data = [
  {
    icon: UserRound,
    head: "Admin",
    name: "Dr/Cr Entry Admin",
    path: "/client/txn-super/Admin/6",
    size: "14",
    userType: 6,
  },
  {
    icon: UserRound,
    head: "madmin",
    name: "Dr/Cr Entry Super",
    path: "/client/txn-super/madmin/5",
    size: "14",
    userType: 5,
  },
  {
    icon: UserRound,
    head: "Master",
    name: "Dr/Cr Entry Super",
    path: "/client/txn-super/Master/4",
    size: "14",
    userType: 4,
  },
  {
    icon: UserRound,
    head: "Superagent",
    name: "Dr/Cr Entry Master",
    path: "/client/txn-super/Super/3",
    size: "14",
    userType: 3,
  },
  {
    icon: UserRound,
    head: "Agent",
    name: "Dr/Cr Entry Agent",
    path: "/client/txn-super/Agent/2",
    size: "14",
    userType: 2,
  },
  {
    icon: UserRound,
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
      <Modal
        onCancel={() => setOpenModals(!openModal)}
        footer={
          <button
            onClick={() => setOpenModals(!openModal)}
            className="ant-btn approved-modal-secondary master-details-footer-close">
            Close
          </button>
        }
        title={
          <div className="approved-modal-header master-details-header">
            <span className="approved-modal-header-icon master-details-header-icon">
              <Banknote size={18} strokeWidth={1.8} />
            </span>
            <span>
              <h2>Cash Transaction</h2>
              <p>Choose a role for debit or credit entry</p>
            </span>
          </div>
        }
        closeIcon={<X size={17} strokeWidth={1.8} />}
        className="antd_dsh_madals approved-dash-modal master-details-modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}>
        <Row className="modal_opne_dash approved-modal-grid master-details-body">
          {data
            ?.filter((res) => userTypeMatch[uType]?.includes(res?.userType))
            ?.map((items) => {
              const Icon = items.icon;
              return (
                <Col md={12} xs={24} key={items?.path}>
                  <Card bordered={false} className="approved-modal-card-shell">
                    <Link
                      to={items?.path}
                      className="approved-action-card master-detail-card">
                      <span className="approved-action-icon master-detail-card-icon">
                        <Icon size={19} strokeWidth={1.8} />
                      </span>
                      <span className="approved-action-content master-detail-card-content">
                        <strong>{items?.head}</strong>
                        <small>{items?.name}</small>
                      </span>
                      <ChevronRight
                        className="approved-action-arrow master-detail-chevron"
                        size={16}
                        strokeWidth={2}
                      />
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

CashTransanction.propTypes = {
  setOpenModals: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
};

export default CashTransanction;
