import React, { useState, useEffect } from "react";
import { Card, Col, Modal, Row, Table } from "antd";
import { useNavigate } from "react-router-dom";
import LedgerPopUp from "../LedgerPopUp";
import "./SuperAgentLedger.scss";
import Withdraw from "../../../common/Withdraw";
import Deposit from "../../../common/Deposit";
import { Money } from "./moneySvg";
import { EyeOutlined } from "@ant-design/icons";

const SuperAgentLedger = ({ userTyep, Listname }) => {
  const [lenaBalance, setLenaBalance] = useState(0);
  const [denaData, setDenaBalance] = useState(0);
  const [clearData, setClearData] = useState(0);
  const [isDepositeModalOpen, setIsDepositeModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [modalsName, setModalsName] = useState("");
  const [clientDataState, setClientDataState] = useState(false);

  const nav = useNavigate();

  const handleBackbtn = () => {
    nav(-1);
  };

  const handleClose = () => {
    setIsDepositeModalOpen(false);
  };

  const handleDenaModals = (val, name) => {
    setUserData(val);
    setModalsName(name);
    setIsDepositeModalOpen(true);
  };

  // Static Ledger Data
  const staticData = {
    lena: [
      { userId: "L1", userName: "Alice", balance: 1500 },
      { userId: "L2", userName: "Bob", balance: 2000 },
    ],
    dena: [
      { userId: "D1", userName: "Charlie", balance: -1000 },
      { userId: "D2", userName: "David", balance: -500 },
    ],
    clear: [{ userId: "C1", userName: "Eve", balance: 0 }],
  };

  const processData = (data) =>
    data
      ?.map((res) => res?.balance)
      .reduce((prev, curr) => Number(prev) + Number(curr), 0);

  useEffect(() => {
    const dataToProcess = staticData;
    setLenaBalance(processData(dataToProcess?.lena));
    setDenaBalance(processData(dataToProcess?.dena));
    setClearData(processData(dataToProcess?.clear));
  }, []);

  const renderActionButton = (record, name) => (
    <span>
      <button
        onClick={() => handleDenaModals(record, name)}
        className="dena_button">
        {name}
      </button>
    </span>
  );

  const generateColumns = (actionName) => [
    // {
    //   title: "User ID",
    //   dataIndex: "userId",
    //   key: "userId",
    // },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <span style={{ color: "#038fde" }}>
          <EyeOutlined /> {text}
        </span>
      ),
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text, record) => <span>{Math.abs(record?.balance)}</span>,
    },

    {
      title: <Money textColor="#FFF" />,
      key: "settlement",
      render: () => (
        <span>
          <Money textColor="#038fde" />
        </span>
      ),
    },
  ];

  return (
    <>
      <Card
        className="sport_detail ledger_data led_super"
        title={`${Listname} Ledger`}
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <Row className="main_super_super_ledger">
          {["Lena", "Dena", "Clear"].map((itemName, index) => (
            <Col key={index} xl={8} xs={24} lg={8} md={24}>
              <div className={`super_ledger item${index + 1}`}>
                <div>{itemName}</div>
                <div>
                  {itemName === "Dena"
                    ? Math.abs(denaData)?.toFixed(2)
                    : itemName === "Clear"
                    ? clearData?.toFixed(2)
                    : Math.abs(lenaBalance)?.toFixed(2)}
                </div>
              </div>
              <div className="table_section">
                <Table
                  className="live_table limit_update"
                  bordered
                  pagination={false}
                  columns={generateColumns(itemName)}
                  dataSource={staticData?.[itemName.toLowerCase()]}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        className="lena_dena_modals"
        destroyOnClose
        title={<h1>{modalsName}</h1>}
        open={isDepositeModalOpen}
        onCancel={handleClose}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={false}>
        {modalsName === "Withdraw" && (
          <Withdraw
            userIdData={userData?.userId}
            handleClose={handleClose}
            data={userData?.userId}
            setClientDataState={setClientDataState}
          />
        )}
        {modalsName === "Deposit" && (
          <Deposit
            userIdData={userData?.userId}
            handleClose={handleClose}
            data={userData?.userId}
            setClientDataState={setClientDataState}
          />
        )}
        {(modalsName === "Lena" || modalsName === "Dena") && (
          <LedgerPopUp
            handleClose={handleClose}
            userData={userData}
            modalsName={modalsName}
          />
        )}
      </Modal>
    </>
  );
};

export default SuperAgentLedger;
