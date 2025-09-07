import { Modal, Table, Tabs } from "antd";
import React from "react";

const column = [
  {
    title: "Run",
    dataIndex: "odds",
    key: "odds",
  },
  {
    title: "pnl",
    dataIndex: "pnl",
    key: "pnl",
    render: (text) => {
      return <spam style={{ color: text > 0 ? "green" : "red" }}>{text}</spam>;
    },
  },
];

const column2 = [
  {
    title: "Place Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Username",
    dataIndex: "userId",
    key: "userId",
    render: (text, record) => {
      return (
        <spam>
          {record?.userId} ({record?.username})
        </spam>
      );
    },
  },
  {
    title: "Runner",
    dataIndex: "selectionName",
    key: "selectionName",
  },
  {
    title: "Bet Type",
    dataIndex: "mode",
    key: "mode",
  },
  {
    title: "Bet Price",
    dataIndex: "rate",
    key: "rate",
  },
  {
    title: "Bet Value",
    dataIndex: "run",
    key: "run",
  },
  {
    title: "Bet Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

const BookDataShow = ({
  openBook,
  setOpenBook,
  fancyBookData,
  sessionData,
  fancyName,
}) => {
  const onChange = (key) => {
    console.log("Active Tab:", key);
  };

  return (
    <Modal
      centered
      className="modal_deposit book_Data"
      title={
        <h1>
          <span>{fancyName}</span>
        </h1>
      }
      open={openBook}
      onCancel={() => setOpenBook(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      footer={null}
      style={{ marginBottom: "40px" }}>
      <Tabs
        onChange={onChange}
        type="card"
        defaultActiveKey="book"
        items={[
          {
            key: "book",
            label: "Book",
            children: (
              <div
                className="table_section "
                style={{
                  marginBottom: "100px",
                  maxHeight: "70vh",
                  overflow: "scroll",
                  paddingBottom: "10px",
                  color: "#fff",
                }}>
                <Table
                  columns={column}
                  dataSource={fancyBookData || []}
                  pagination={false}
                />
              </div>
            ),
          },
          {
            key: "bets",
            label: "Bets",
            children: (
              <div
                className="table_section exposure"
                style={{
                  marginBottom: "100px",
                  maxHeight: "70vh",
                  overflow: "scroll",
                  paddingBottom: "10px",
                }}>
                <Table
                  columns={column2}
                  dataSource={sessionData || []}
                  pagination={false}
                  rowClassName={(record) => {
                    return record?.mode === "YES"
                      ? "back nowrape"
                      : "lay nowrape";
                  }}
                />
              </div>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default BookDataShow;
