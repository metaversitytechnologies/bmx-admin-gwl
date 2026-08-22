import { Card, Col, Modal, Row } from "antd";
import {
  ChevronRight,
  FileText,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LadgerDetails = ({ setOpenModals, openModal }) => {
  const data = [
    {
      icon: FileText,
      name: "P/L",
      path: "/Events/matchledger",
      size: "20",
      userType: 10,
    },
    {
      icon: WalletCards,
      name: "My Ledger",
      path: "/client/my-ledger",
      size: "20",
      userType: 10,
    },
    {
      icon: UserRound,
      name: "Admin",
      path: "/client/ledger-super/6/Admin",
      size: "20",
      userType: 6,
    },
    {
      icon: UserRound,
      name: "Mini Admin",
      path: "/client/ledger-super/5/Mini-Admin",
      size: "20",
      userType: 5,
    },
    {
      icon: UserRound,
      name: "Master",
      path: "/client/ledger-super/4/Master",
      size: "20",
      userType: 4,
    },
    {
      icon: UserRound,
      name: "Super",
      path: "/client/ledger-super/3/Super",
      size: "20",
      userType: 3,
    },
    {
      icon: UserRound,
      name: "Agent",
      path: `/client/ledger-super/2/Agent`,
      size: "20",
      userType: 2,
    },
    {
      icon: UserRound,
      name: "Client",
      path: "/client/ledger-super/1/Client",
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
              <WalletCards size={18} strokeWidth={1.8} />
            </span>
            <span>
              <h2>Ledger Details</h2>
              <p>Select a ledger view to continue</p>
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
                        <strong>{items?.name}</strong>
                        <small>Open ledger records</small>
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

LadgerDetails.propTypes = {
  setOpenModals: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
};

export default LadgerDetails;
