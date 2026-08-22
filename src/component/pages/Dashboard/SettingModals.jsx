import { Card, Col, Modal, Row } from "antd";
import {
  ChartNoAxesColumnIncreasing,
  ChevronRight,
  FileChartColumn,
  FileText,
  Settings,
  Settings2,
  X,
} from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SettingModals = ({ setOpenModals, openModal }) => {
  const userId = localStorage.getItem("userId");
  const data = [
    {
      icon: FileText,
      name: "Statements",
      desc: "Review account statements",
      path: "/account-statement",
    },
    {
      icon: Settings2,
      name: "A/c Operations",
      desc: "Manage account operations",
      path: `/account-operation/${userId}`,
    },
    {
      icon: ChartNoAxesColumnIncreasing,
      name: "Profit and Loss",
      desc: "Open match P/L records",
      path: "/Events/matchledger",
    },
    {
      icon: FileChartColumn,
      name: "Casino Profit & Loss",
      desc: "Open casino P/L records",
      path: "/casinoprofitandloss",
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
              <Settings size={18} strokeWidth={1.8} />
            </span>
            <span>
              <h2>Settings</h2>
              <p>Choose a report or account action</p>
            </span>
          </div>
        }
        closeIcon={<X size={17} strokeWidth={1.8} />}
        className="antd_dsh_madals approved-dash-modal master-details-modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}>
        <Row className="modal_opne_dash approved-modal-grid master-details-body">
          {data?.map((items) => {
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

SettingModals.propTypes = {
  setOpenModals: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
};

export default SettingModals;
