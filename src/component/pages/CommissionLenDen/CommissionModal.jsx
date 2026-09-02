import { Button, Empty, Modal, Table } from "antd";
import {
  CalendarDays,
  CircleX,
  History,
  TrendingDown,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
import PropTypes from "prop-types";
import CustomLoading from "../../common/CustomLoading/CustomLoading";

const CommissionModal = ({
  openModal,
  setOpenModals,
  commHistory,
  isLoading,
}) => {
  const columns = [
    {
      title: (
        <span className="commission-modal-head-label">
          <CalendarDays size={14} strokeWidth={2} />
          Date & Time
        </span>
      ),
      dataIndex: "date",
      key: "date",
      className: "commission-modal-date-cell",
      render: (text) => (
        <span className="commission-modal-date" title={text}>
          {text}
        </span>
      ),
    },
    {
      title: "M Comm",
      dataIndex: "matchComm",
      key: "matchComm",
      align: "center",
      render: (value) => (
        <span className="commission-modal-value is-mila">
          {Number(value || 0).toFixed(2)}
        </span>
      ),
    },
    {
      title: "S Comm",
      dataIndex: "sessionComm",
      key: "sessionComm",
      align: "center",
      render: (value) => (
        <span className="commission-modal-value is-neutral">
          {Number(value || 0).toFixed(2)}
        </span>
      ),
    },
    {
      title: "C Comm",
      dataIndex: "casinocomm",
      key: "casinocomm",
      align: "center",
      render: (value) => (
        <span className="commission-modal-value is-bacha">
          {Number(value || 0).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Done By",
      dataIndex: "resettingCommReportUserId",
      key: "resettingCommReportUserId",
      render: (value) => (
        <span className="commission-modal-user">
          <UserRound size={14} strokeWidth={2} />
          {value || "--"}
        </span>
      ),
    },
  ];

  return (
    <Modal
      width="min(1180px, calc(100vw - 48px))"
      onCancel={() => setOpenModals(false)}
      className="modal_deposit commission-modal-shell commission-history-modal"
      rootClassName="commission-modal-root"
      maskStyle={{ backdropFilter: "blur(3px)" }}
      title={
        <div className="commission-modal-titlebar">
          <span className="commission-modal-icon">
            <History size={24} strokeWidth={2} />
          </span>
          <div>
            <h2>Commission History</h2>
            <p>Detailed commission lena / dena history</p>
          </div>
        </div>
      }
      footer={
        <div className="commission-modal-footer">
          <span className="commission-modal-note">
            All amounts are shown in your default currency.
          </span>
          <Button
            onClick={() => setOpenModals(false)}
            className="approved-primary-button commission-modal-close">
            <CircleX size={16} strokeWidth={2} />
            Close
          </Button>
        </div>
      }
      closeIcon={<X aria-label="Close" size={22} strokeWidth={1.8} />}
      open={openModal}>
      <div className="commission-modal-body">
        <div className="commission-modal-table-card">
         
          <div className="commission-modal-table-scroll">
            <Table
              className="commission-simple-table"
              columns={columns}
              loading={{
                spinning: isLoading,
                indicator: <CustomLoading />,
              }}
              dataSource={commHistory || []}
              pagination={false}
              rowKey={(record, index) =>
                `${record?.date || "commission"}-${index}`
              }
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span className="commission-modal-empty-copy">
                        <strong>No commission history found</strong>
                        <small>
                          There are no commission transactions available for
                          this selection.
                        </small>
                      </span>
                    }
                  />
                ),
              }}
            />
          </div>
          {(commHistory || []).length > 0 && (
            <div className="commission-modal-legend">
              <span>
                <TrendingUp size={14} strokeWidth={2} />
                Mila values
              </span>
              <span>
                <TrendingDown size={14} strokeWidth={2} />
                Dena values
              </span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

CommissionModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModals: PropTypes.func.isRequired,
  commHistory: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CommissionModal;
