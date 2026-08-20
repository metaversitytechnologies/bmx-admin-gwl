import React, { useEffect } from "react";
import { Form, Modal, Table } from "antd";

import { useLazyGetUserLabilatyQuery } from "../../store/service/SportDetailServices";
import { render } from "react-dom";
import CustomLoading from "./CustomLoading/CustomLoading";

const Exposure = ({ openExp, setOpenExp, userId }) => {
  const [trigger, { data: exposureData, isLoading }] =
    useLazyGetUserLabilatyQuery();

  useEffect(() => {
    if (userId) {
      trigger({ userId: userId });
    }
  }, [userId]);

  const column = [
    {
      title: "Match",
      dataIndex: "matchName",
      key: "matchName",
      render: (text, record) => (
        <span>
          {record?.matchName}-
          {record?.marketType === "Fancy" ? record?.marketType : "Bookmaker"}
        </span>
      ),
    },
    {
      title: "Selection Name",
      dataIndex: "selectionName",
      key: "selectionName",
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

  const columnFancy = [
    {
      title: "Match",
      dataIndex: "matchName",
      key: "matchName",
      render: (text, record) => (
        <span>
          {record?.matchName}-
          {record?.marketType === "Fancy" ? record?.marketType : "Bookmaker"}
        </span>
      ),
    },
    {
      title: "Selection Name",
      dataIndex: "selectionName",
      key: "selectionName",
    },
    {
      title: "Stake",
      dataIndex: "stake",
      key: "stake",
    },
    {
      title: "Run",
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
  const sessionData = exposureData?.data?.filter(
    (Item) => Item?.marketType === "Fancy"
  );
  const matchData = exposureData?.data?.filter(
    (Item) => Item?.marketType !== "Fancy"
  );

  return (
    <>
      <Modal
        width={1100}
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
            maxHeight: "70vh",
            overflow: "scroll",
            paddingBottom: "10px",
          }}>
          <Table
            columns={column}
            dataSource={matchData || []}
            pagination={false}
            loading={{
              spinning: isLoading,
              indicator: <CustomLoading />,
            }}
            rowClassName={(record) => {
              if (record?.marketType === "Fancy") {
                return record?.back ? "back" : "lay";
              } else {
                return record?.back ? "back" : "lay";
              }
            }}
          />
          <br />
          <Table
            columns={columnFancy}
            dataSource={sessionData || []}
            pagination={false}
            loading={{
              spinning: isLoading,
              indicator: <CustomLoading />,
            }}
            rowClassName={(record) => {
              if (record?.marketType === "Fancy") {
                return record?.back ? "back" : "lay";
              } else {
                return record?.back ? "back" : "lay";
              }
            }}
            summary={(pageData) => {
              let totalProfit = 0;
              let totalLoss = 0;

              pageData.forEach(({ profit, loss }) => {
                totalProfit += profit || 0;
                totalLoss += loss || 0;
              });

              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <strong>Total</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={0} />
                  <Table.Summary.Cell index={0} />
                  <Table.Summary.Cell index={0} />
                  <Table.Summary.Cell index={0} />
                  <Table.Summary.Cell index={0} />
                  <Table.Summary.Cell index={6}>
                    <strong style={{ color: "red" }}>
                      {totalLoss.toFixed(2)}
                    </strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    <strong style={{ color: "green" }}>
                      {totalProfit.toFixed(2)}
                    </strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
          <br />
        </div>
      </Modal>
    </>
  );
};

export default Exposure;
