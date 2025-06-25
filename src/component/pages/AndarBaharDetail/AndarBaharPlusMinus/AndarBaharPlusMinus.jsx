import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { render } from "react-dom";
// import ModalsData from "./ModalsData/ModalsData";

const AndarBaharPlusMinus = () => {
  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  //   const [isDepositeModalOpen, SetisDepositeModalOpen] = useState(false);
  //   const [WithdrawnModal, SetWithdrawnModal] = useState(false);

  //   const handleDepositeOk = () => {
  //     SetisDepositeModalOpen(false);
  //   };
  //   const handleDepositeCancel = () => {
  //     SetisDepositeModalOpen(false);
  //   };
  //   const showDepositModal = () => {
  //     SetisDepositeModalOpen(true);
  //   };

  //   const handleWithdrawnOk = () => {
  //     SetWithdrawnModal(false);
  //   };
  //   const handleWithdrawnCancel = () => {
  //     SetWithdrawnModal(false);
  //   };
  //   const showWithdrawnModal = () => {
  //     SetWithdrawnModal(true);
  //   };

  const [Active, setActive] = useState("inActive");
  const [inActive, setInActive] = useState(true);

  const handleActive = () => {
    if (Active === "inActive") {
      setActive("Active");
      setInActive(false);
    } else {
      setActive("inActive");
      setInActive(true);
    }
  };
  const data = [
    {
      key: "1",
      code: "SA152471",
      name: "John Brown",
      casino_amt: <span style={{ color: "green" }}>240</span>,
      casino_comm: <span style={{ color: "green" }}>0.00</span>,
      total_amount: <span style={{ color: "green" }}>240</span>,
      my_share: <span style={{ color: "red" }}>-90</span>,
      m_app: <span style={{ color: "green" }}>0.00</span>,
      net_amount: <span style={{ color: "green" }}>200</span>,
    },
    {
      key: "2",
      code: "SA152471",
      name: "Joe Black",
      casino_amt: <span style={{ color: "red" }}>-40</span>,
      casino_comm: <span style={{ color: "green" }}>0.00</span>,
      total_amount: <span style={{ color: "red" }}>-40</span>,
      my_share: <span style={{ color: "green" }}>90</span>,
      m_app: <span style={{ color: "green" }}>0.00</span>,
      net_amount: <span style={{ color: "green" }}>300</span>,
    },
  ];

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Casino Amt",
      dataIndex: "casino_amt",
      key: "casino_amt",
    },
    {
      title: "Casino Comm",
      dataIndex: "casino_comm",
      key: "casino_comm",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "My Share",
      dataIndex: "my_share",
      key: "my_share",
    },
    {
      title: "M.App",
      dataIndex: "m_app",
      key: "m_app",
    },
    {
      title: "Net Amount",
      dataIndex: "net_amount",
      key: "net_amount",
    },
  ];

  return (
    <>
      <div className="main_live_section list_supers company_resport_casi">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              <p>Company Report</p>
            </div>
            <div className="show_btn">
              {/* <button>Show</button> */}
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
        </div>
        <div className="table_section">
          <Table
            className=" roulette_table"
            bordered
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName={(record) => {
              return record?.key == 2 ? "dateHiglight" : "";
            }}></Table>
        </div>
      </div>
    </>
  );
};

export default AndarBaharPlusMinus;
