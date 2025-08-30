import { Card, Modal, Row, Table } from "antd";
import { useNavigate } from "react-router-dom";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import { render } from "react-dom";
import moment from "moment";

const CommissionModal = ({
  openModal,
  setOpenModals,
  commHistory,
  isLoading,
}) => {
  const nav = useNavigate();
  const columns = [
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      onCell: () => ({ style: { whiteSpace: "nowrap" } }),
      render: (text) => (
        <span>{moment(text).format("D/M/YYYY, hh:mm:ss a")}</span>
      ),
    },
    {
      title: "M Comm",
      dataIndex: "matchComm",
      key: "matchComm",
    },
    {
      title: "S Comm",
      dataIndex: "sessionComm",
      key: "sessionComm",
    },
    {
      title: "C Comm",
      dataIndex: "casinocomm",
      key: "casinocomm",
    },
    {
      title: "Done By",
      dataIndex: "resettingCommReportUserId",
      key: "resettingCommReportUserId",
    },
  ];
  const handleBackClick = () => {
    nav(-1);
  };
  return (
    <Modal
      width={800}
      onCancel={() => setOpenModals(false)}
      className="modal_deposit"
      title={
        <h1>
          <span>Commission Modal</span>
        </h1>
      }
      footer={
        <button
          onClick={() => setOpenModals(false)}
          className="ant-btn gx-bg-grey ant-modal-footer ant-btn-default">
          Close
        </button>
      }
      closable={{ "aria-label": "Custom Close Button" }}
      open={openModal}>
      <div className="match_slip">
        <Card
          style={{ margin: 0, width: "100%" }}
          className="sport_detail"
          title="Comm Lena Dena History"
          extra={<button onClick={handleBackClick}>Back</button>}>
          <div className="table_section comm_dsata_table">
            <Table
              className="live_table acc_tabel limit_update"
              bordered
              rowClassName={(record) =>
                record?.pnl < 0 ? "red_back" : "green_back"
              }
              columns={columns}
              loading={{
                spinning: isLoading,
                indicator: <CustomLoading />,
              }}
              dataSource={commHistory || []}
              pagination={false}
            />
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default CommissionModal;
