import React, { useEffect } from "react";
import { Form, Modal, Table } from "antd";
import "./Deposit.scss";

import { useLazyGetUserLabilatyQuery } from "../../store/service/SportDetailServices";
import { render } from "react-dom";

const Exposure = ({ openExp, setOpenExp, userId }) => {
  const [trigger, { data: exposureData, isLoading }] =
    useLazyGetUserLabilatyQuery();

  console.log(userId, "userIduserIduserId");

  useEffect(() => {
    trigger({ userId: userId });
  }, [userId]);

  const column = [
    {
      title: "Match",
      dataIndex: "matchName",
      key: "matchName",
    },
    {
      title: "Stake",
      dataIndex: "stake",
      key: "stake",
    },
    {
      title: "Rate",
      dataIndex: "odds",
      key: "odds",
    },
    {
      title: "Type",
      dataIndex: "back",
      key: 2,
      render: (text, record) => (
        <span>
          {record?.marketType == "Fancy"
            ? record?.back
              ? "YES"
              : "NOT"
            : record?.back
            ? "LAGAI"
            : "KHAI"}
        </span>
      ),
    },
    {
      title: "Time",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Market Type",
      dataIndex: "marketType",
      key: "marketType",
    },
  ];

  return (
    <>
      <Modal
        className="modal_deposit"
        title={
          <h1>
            <span>User Exposure</span>
          </h1>
        }
        open={openExp}
        onCancel={() => setOpenExp(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}>
        <div
          className="table_section exposure"
          style={{ marginBottom: "100px" }}>
          <Table
            columns={column}
            dataSource={exposureData?.data || []}
            pagination={false}
            loading={isLoading}
          />
        </div>
      </Modal>
    </>
  );
};

export default Exposure;
