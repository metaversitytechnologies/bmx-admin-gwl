import { Card, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetLedgerPostMutation,
  useGetLiveCasinoListQuery,
} from "../../../store/service/CasinoServices";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import { useState } from "react";
import LinkButton from "../../common/LinkButton";

const MatchLedgerCasino = () => {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const { data, isFetching, isLoading } = useGetLiveCasinoListQuery();

  const [trigger, { isLoading: loading }] = useGetLedgerPostMutation();

  const handleLedgerPost = async () => {
    const res = await trigger({}).unwrap();
    if (res?.status) {
      console.log("Ledger Post Success:", res);
    } else {
      console.error("Ledger Post Failed:", res?.message);
    }
  };

  const renderTableRows = () =>
    data?.data?.map((items, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
            {items?.name}
        </td>
        <td>
          <div
            className="gx-justify-content-start"
            style={{ display: "flex", alignItems: "center" }}>
            <LinkButton to={`/casino/${items?.tableId}`} label="View" />
            <LinkButton
              to={`/display-games/${items?.tableId}/${items?.name}`}
              label="Display Games"
              icon={<EyeOutlined />}
              className="Display_Games"
            />
          </div>
        </td>
      </tr>
    ));

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    handleLedgerPost();
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="match_slip inplay_casino">
      <Card
        className="sport_detail team_name"
        title="ACTIVE GAMES"
        extra={<button className="inplay_back_btn" onClick={() => nav(-1)}>Back</button>}
        style={{ margin: 0, width: "100%" }}>
        <div className="table_section statement_tabs_data ant-spin-nested-loading" style={{ padding: "20px" }}>
          {(isFetching || isLoading) && <CustomLoading />}
          <table className="live_table login_data_table">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "45%" }}>Name</th>
                <th style={{ width: "45%" }}>Details</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </Card>
      <Modal
        title=""
        open={open}
        onOk={handleOk}
        confirmLoading={loading}
        okButtonProps={{
          disabled: loading,
        }}
        onCancel={handleCancel}
        className="ledger_post_modal">
        <p
          style={{
            fontSize: "18px",
            textAlign: "center",
            marginBottom: "12px",
          }}>
          Are you sure you want to post the casino ledger?
        </p>
      </Modal>
    </div>
  );
};

export default MatchLedgerCasino;
