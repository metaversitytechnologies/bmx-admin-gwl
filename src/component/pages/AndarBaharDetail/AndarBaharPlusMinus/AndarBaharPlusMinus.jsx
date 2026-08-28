import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Table } from "antd";
import { FileBarChart2 } from "lucide-react";
import { useGetCompletedPlusMinusQuery } from "../../../../store/service/SportDetailServices";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";

const AndarBaharPlusMinus = () => {
  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };
  const { date, id } = useParams();

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const {
    data: casino,
    isLoading,
    isFetching,
  } = useGetCompletedPlusMinusQuery(
    {
      userId: userId,
      date: date,
      casinoId: id,
    },
    { refetchOnMountOrArgChange: true }
  );

  const columns = [
    {
      title: "Code",
      dataIndex: "userId",
      key: "userId",
      render: (text) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            !text?.startsWith("C") && setUserId(text);
          }}>
          {text}
        </span>
      ),
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Casino Amt",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <span style={{ color: text > 0 ? "green" : "red" }}>
          {text?.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Casino Comm",
      dataIndex: "commission",
      key: "commission",
      render: (text) => (
        <span style={{ color: text > 0 ? "green" : "red" }}>
          {text?.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
      render: (text) => (
        <span style={{ color: text > 0 ? "green" : "red" }}>
          {text?.toFixed(2)}
        </span>
      ),
    },
    {
      title: "My Share",
      dataIndex: "myShare",
      key: "myShare",
      render: (text) => (
        <span style={{ color: text > 0 ? "green" : "red" }}>
          {text?.toFixed(2)}
        </span>
      ),
    },
    {
      title: "M.App",
      dataIndex: "mapp",
      key: "mapp",
    },
    {
      title: "Net Amount",
      dataIndex: "netAmount",
      key: "netAmount",
      render: (text) => (
        <span style={{ color: text > 0 ? "green" : "red" }}>
          {text?.toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="main_live_section list_supers admin-details-panel company_resport_casi andar-bahar-plus-minus-panel">
        <div className="_match">
          <AppPageHeader
            icon={<FileBarChart2 size={20} strokeWidth={1.8} />}
            title="Company Report"
            subtitle="Review Andar Bahar profit and loss"
            onBack={handleBackClick}
          />
        </div>
        <div className="table_section">
          <Table
            className="roulette_table"
            bordered
            loading={{
              spinning: isLoading || isFetching,
              indicator: <CustomLoading />,
            }}
            columns={columns}
            dataSource={casino?.data || []}
            pagination={false}
            summary={(pageData) => {
              let totalAmount = 0;
              let totalCommission = 0;
              let totalTotal = 0;
              let totalMyShare = 0;
              let totalNetAmount = 0;

              pageData.forEach(
                ({ amount, commission, total, myShare, netAmount }) => {
                  totalAmount += amount || 0;
                  totalCommission += commission || 0;
                  totalTotal += total || 0;
                  totalMyShare += myShare || 0;
                  totalNetAmount += netAmount || 0;
                }
              );

              return (
                <Table.Summary.Row className="dateHiglight">
                  <Table.Summary.Cell
                    index={0}
                    colSpan={2}
                    style={{ fontWeight: "bold" }}>
                    Total
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={2}
                    className={totalAmount > 0 ? "green" : "red"}>
                    {totalAmount.toFixed(2)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={3}
                    className={totalCommission > 0 ? "green" : "red"}>
                    {totalCommission.toFixed(2)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={4}
                    className={totalTotal > 0 ? "green" : "red"}>
                    {totalTotal.toFixed(2)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={5}
                    className={totalMyShare > 0 ? "green" : "red"}>
                    {totalMyShare.toFixed(2)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}></Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={7}
                    className={totalNetAmount > 0 ? "green" : "red"}>
                    {totalNetAmount.toFixed(2)}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AndarBaharPlusMinus;
