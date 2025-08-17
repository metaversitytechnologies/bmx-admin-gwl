import { Card, Empty, Modal, Row, Table } from "antd";
import { useNavigate } from "react-router-dom";

const UserCommissionModal = ({ openModal, setOpenModals }) => {
  const nav = useNavigate();

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
      <div className="match_slip " style={{ position: "relative" }}>
        <Card
          style={{
            margin: "0px",
            width: "100%",
          }}
          className="sport_detail  team_name"
          title="">
          <div className="table_section statement_tabs_data ant-spin-nested-loading">
            <table className="live_table login_data_table">
              <tr>
                <th style={{ textAlign: "center" }} colSpan={6}>
                  Mila Hai
                </th>
                <th style={{ textAlign: "center" }} colSpan={4}>
                  Dena hai
                </th>
                <th>Bacha Hai</th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>M.Comm.</th>
                <th>S.Comm.</th>
                <th>C.Comm.</th>
                <th>T.Comm.</th>

                <th>M.Comm.</th>
                <th>S.Comm.</th>
                <th>C.Comm.</th>
                <th>T.Comm.</th>
                <th>Comm.</th>
              </tr>

              <tr>
                <td colSpan={11}>
                  {" "}
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
              </tr>
            </table>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default UserCommissionModal;
