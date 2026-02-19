import { Button, Card, Col, DatePicker, Modal, Row, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import {
  useGetLedgerPostMutation,
  useGetLiveCasinoListQuery,
} from "../../../store/service/CasinoServices";
import moment from "moment";
import CustomLoading from "../../common/CustomLoading/CustomLoading";
import { useState } from "react";

const { RangePicker } = DatePicker;

const MatchLedgerCasino = () => {
  const [open, setOpen] = useState(false);

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
          <Link
            to={`/casino/${items?.tableId}`}
            className="gx-text-blue"
            style={{ fontWeight: 400 }}>
            {items?.name}
          </Link>
        </td>
        <td>
          <span style={{ fontWeight: 400 }}>
            {moment().format("YYYY-MM-DD hh:mm:ss A")}
          </span>
        </td>
        <td>
          <div
            className="gx-justify-content-end"
            style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="primary"
              style={{
                height: "36px",
                padding: "0px 15px",
                borderRadius: "5px",
                marginRight: "15px",
              }}>
              <Link to={`/casino/${items?.tableId}`}>View</Link>
            </Button>
            <Button type="link" className="Display_Games">
              <Link to={`/display-games/${items?.tableId}/${items?.name}`}>
                Display Games
              </Link>
            </Button>
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
    <div className="match_slip match_ledger">
      <Card
        className="sport_detail team_name"
        title="Match Ledger"
        extra={<button>Back</button>}
        style={{ margin: 0, width: "100%" }}>
        <div className="gx-mt-3">
          <Row
            className="date_picker gx-px-5"
            style={{ gap: 16, marginBottom: "10px" }}>
            <Col xs={24} md={8}>
              <RangePicker
                style={{ marginBottom: 10, width: 300 }}
                bordered={false}
                showSecond
                renderExtraFooter={() => (
                  <Space style={{ padding: 10 }}>
                    <Tag color="blue">Today</Tag>
                    <Tag color="blue">Yesterday</Tag>
                    <Tag color="blue">This Week</Tag>
                    <Tag color="blue">Last Week</Tag>
                    <Tag color="blue">This Month</Tag>
                    <Tag color="blue">Last Month</Tag>
                  </Space>
                )}
              />
            </Col>
            <Col xs={8}>
              <Button
                type="primary"
                className="gx-border-redius0"
                style={{ height: 36, lineHeight: "30px" }}>
                Submit
              </Button>
            </Col>
            <Col xs={6} style={{ textAlign: "left" }}>
              <Button
                type="primary"
                className="gx-border-redius0 "
                onClick={showModal}
                style={{ height: 36, lineHeight: "30px" }}>
                Post Casino Ledger
              </Button>
            </Col>
          </Row>
        </div>

        <div className="table_section statement_tabs_data ant-spin-nested-loading">
          {(isFetching || isLoading) && <CustomLoading />}
          <table className="live_table login_data_table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Action</th>
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
