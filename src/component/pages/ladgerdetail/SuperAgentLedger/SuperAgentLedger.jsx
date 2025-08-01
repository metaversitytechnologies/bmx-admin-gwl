import { useState, useEffect } from "react";
import { Card, Col, Row, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./SuperAgentLedger.scss";
import { Money } from "./moneySvg";
import { EyeOutlined } from "@ant-design/icons";
import { useGetLedgerAllQuery } from "../../../../store/service/SportDetailServices";

const nameData = {
  6: "Mini-Admin",
  5: "Super",
  4: "Master",
  3: "Agent",
  2: "Client",
};

const SuperAgentLedger = () => {
  const { id: userTyep, name: Listname, userId } = useParams();
  const [clearData, setClearData] = useState(0);

  const { data } = useGetLedgerAllQuery({
    requestTypeUser: Number(userTyep),
    ...(userId && { userId }),
  });

  const nav = useNavigate();

  const handleBackbtn = () => {
    nav(-1);
  };

  const denaTotal = Array.isArray(data?.data?.dena)
    ? data.data.dena.reduce((acc, curr) => acc + (curr?.currentBalance || 0), 0)
    : 0;

  const lenaTotal = Array.isArray(data?.data?.lena)
    ? data.data.lena.reduce((acc, curr) => acc + (curr?.currentBalance || 0), 0)
    : 0;

  const handleDownline = (userId) => {
    nav(
      `/client/ledger-super/${userTyep - 1}/${nameData?.[userTyep]}/${userId}`
    );
  };

  const generateColumns = (actionName) => [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <span
          style={{ color: "#038fde" }}
          onClick={() => handleDownline(record?.userId)}>
          <EyeOutlined /> {record?.username} ({record?.userId})
        </span>
      ),
    },
    {
      title: "Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      render: (text, record) => <span>{Math.abs(record?.currentBalance)}</span>,
    },

    {
      title: <Money textColor="#FFF" />,
      key: "settlement",
      render: (text, record) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() =>
            nav(`/client/txn-super/${Listname}/${userTyep}/${record?.userId}`)
          }>
          <Money textColor="#038fde" />
        </span>
      ),
    },
  ];

  return (
    <>
      <Card
        className="sport_detail ledger_data led_super"
        title={`${Listname?.replace("-", " ")} Ledger`}
        extra={<button onClick={handleBackbtn}>Back</button>}>
        <Row className="main_super_super_ledger">
          {["Lena", "Dena", "Clear"].map((itemName, index) => (
            <Col key={index} xl={8} xs={24} lg={8} md={24}>
              <div className={`super_ledger item${index + 1}`}>
                <div>{itemName}</div>
                <div>
                  {itemName === "Dena"
                    ? Math.abs(denaTotal)?.toFixed(2)
                    : itemName === "Clear"
                    ? clearData?.toFixed(2)
                    : Math.abs(lenaTotal)?.toFixed(2)}
                </div>
              </div>
              <div className="table_section">
                <Table
                  className="live_table limit_update"
                  bordered
                  pagination={false}
                  columns={generateColumns(itemName)}
                  dataSource={data?.data?.[itemName.toLowerCase()]}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
};

export default SuperAgentLedger;
