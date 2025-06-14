import { Button, Dropdown, Popconfirm, Space, notification } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Static mock transaction data
const defaultData = [
  {
    _id: "1",
    date: "2025/06/14",
    collectionName: "Invoice #1001",
    debit: 0,
    credit: 5000,
    balance: 5000,
    paymentType: "Cash",
    remarks: "Initial deposit",
    doneBy: "Admin",
    isRollback: false,
  },
  {
    _id: "2",
    date: "2025/06/15",
    collectionName: "Invoice #1002",
    debit: 2000,
    credit: 0,
    balance: 3000,
    paymentType: "Bank Transfer",
    remarks: "Payment received",
    doneBy: "Manager",
    isRollback: false,
  },
  {
    _id: "3",
    date: "2025/06/16",
    collectionName: "Refund",
    debit: 0,
    credit: 1000,
    balance: 4000,
    paymentType: "UPI",
    remarks: "Refund processed",
    doneBy: "Admin",
    isRollback: true, // rollback = can't delete
  },
];

const defaultBalance = {
  credit: 6000,
  debit: 2000,
  balance: 4000,
};

const TransactionTable = ({
  clientId = "123",
  balanceData = defaultBalance,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const nav = useNavigate();
 

  const fetchDeletedTran = () => {
    nav(`/client/deletedlenden/1001`);
  };

  const openNotification = (mess) => {
    api.success({
      message: mess,
      description: "Success",
      closeIcon: false,
      placement: "top",
    });
  };

  const openNotificationError = (mess) => {
    api.error({
      message: mess,
      closeIcon: false,
      placement: "top",
    });
  };

  const handleDelete = (id) => {
    const updated = transactions.filter((tran) => tran._id !== id);
    setTransactions(updated);
    openNotification("Transaction deleted successfully");
  };

  const items = (id) => [
    {
      label: (
        <Popconfirm
          description="Are you sure to delete this transaction?"
          onConfirm={() => handleDelete(id)}
          okText="Yes"
          cancelText="No">
          <p>Delete</p>
        </Popconfirm>
      ),
      key: "0",
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="my_ledger" style={{ padding: "12px 0px" }}>
        <div>
          <h3 style={{ padding: "5px", color: "rgb(214, 75, 75)" }}>
            Dena : {balanceData?.credit?.toFixed(2)}
          </h3>
        </div>
        <div>
          <h3 style={{ padding: "5px", color: "rgb(51, 181, 28)" }}>
            Lena : {balanceData?.debit?.toFixed(2)}
          </h3>
        </div>
        <div>
          <h3
            style={{ padding: "5px" }}
            className={
              balanceData?.balance < 0 ? "text_danger" : "text_success"
            }>
            Balance: {Math.abs(balanceData?.balance)}{" "}
            {balanceData?.balance > 0 ? "(Lena)" : "(Dena)"}
          </h3>
        </div>
        <div className="deleted_sec">
          <Button onClick={fetchDeletedTran}>Deleted</Button>
        </div>
      </div>
      <div className="table_section" style={{ paddingBottom: "20px" }}>
        <table className="">
          <thead>
            <tr>
              <th className="text-right">#</th>
              <th>Date</th>
              <th>Post Date</th>
              <th>Collection Name </th>
              <th className="text-right">Debit</th>
              <th className="text-right">Credit</th>
              <th className="text-right">Balance</th>
              <th>Payment Type</th>
              <th>Remark</th>
              <th>Done By</th>
            </tr>
          </thead>
          <tbody>
            {defaultData.length > 0 ? (
              defaultData.map((res, idx) => (
                <tr key={res._id || idx}>
                  <td>
                    {res?.doneBy && !res?.isRollback && (
                      <Dropdown
                        className="table_dropdown sport_droupdown"
                        menu={{ items: items(res._id), className: "trans" }}
                        trigger={["click", "contextMenu"]}>
                        <p onClick={(e) => e.preventDefault()}>
                          <Space>
                            <CaretDownOutlined />
                          </Space>
                        </p>
                      </Dropdown>
                    )}
                  </td>
                  <td>{res?.date}</td>
                  <td>{res?.date}</td>
                  <td>{res?.collectionName}</td>
                  <td className="text-right">{res?.debit}</td>
                  <td className="text-right">{res?.credit}</td>
                  <td className="text-right">
                    {Math.abs(res?.balance)} -{" "}
                    {res?.balance > 0 ? "Lena" : "Dena"}
                  </td>
                  <td>{res?.paymentType}</td>
                  <td>{res?.remarks}</td>
                  <td>{res?.doneBy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;
