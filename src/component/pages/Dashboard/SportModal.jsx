import { Card, Col, Modal, Row } from "antd";
import { ChevronRight, Trophy, X } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SportModal = ({ setOpenModals, openModal }) => {
  const data = [
    {
      name: "Active Games",
      desc: "Manage in-play sport events",
      path: "/Events/sports-details",
      size: "20",
      id: 0,
      userType: 0,
    },
    {
      name: "Finished Games",
      desc: "Review completed games",
      path: `/finish-game`,
      size: "20",
      id: 1,
      userType: 1,
    },
  ];

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
              <Trophy size={18} strokeWidth={1.8} />
            </span>
            <span>
              <h2>Sports Details</h2>
              <p>Select a sport view to continue</p>
            </span>
          </div>
        }
        closeIcon={<X size={17} strokeWidth={1.8} />}
        className="antd_dsh_madals approved-dash-modal master-details-modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}>
        <Row className="modal_opne_dash approved-modal-grid master-details-body">
          {data?.map((items) => {
            return (
              <Col md={12} xs={24} key={items?.path}>
                <Card bordered={false} className="approved-modal-card-shell">
                  <Link
                    to={items?.path}
                    className="approved-action-card master-detail-card">
                    <span className="approved-action-icon master-detail-card-icon">
                      <Trophy size={19} strokeWidth={1.8} />
                    </span>
                    <span className="approved-action-content master-detail-card-content">
                      <strong>{items?.name}</strong>
                      <small>{items?.desc}</small>
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

SportModal.propTypes = {
  setOpenModals: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
};

export default SportModal;
