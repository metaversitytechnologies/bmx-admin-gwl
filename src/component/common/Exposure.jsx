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
    {
      title: "Loss",
      dataIndex: "loss",
      render: (text) => <span>{text?.toFixed(2)}</span>,
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (text) => <span>{text?.toFixed(2)}</span>,
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
        footer={null}
        style={{ marginBottom: "40px" }}>
        <div
          className="table_section exposure"
          style={{
            marginBottom: "100px",
            height: "70vh",
            overflow: "scroll",
            paddingBottom: "10px",
          }}>
          <Table
            columns={column}
            dataSource={exposureData?.data || []}
            pagination={false}
            loading={isLoading}
            summary={(pageData) => {
              let totalProfit = 0;
              let totalLoss = 0;

              pageData.forEach(({ profit, loss }) => {
                totalProfit += profit || 0;
                totalLoss += loss || 0;
              });

              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={6}>
                    <strong>Total</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>
                    <strong>{totalLoss.toFixed(2)}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    <strong>{totalProfit.toFixed(2)}</strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
          <br />
          <br />
        </div>
      </Modal>
    </>
  );
};

export default Exposure;
