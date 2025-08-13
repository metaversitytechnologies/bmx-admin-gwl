import { useEffect, useState } from "react";
import { Button, Dropdown, Popconfirm, Space, notification } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useGetDeletedTranstionMutation } from "../../../store/service/SportDetailServices";
import { convertCodeReverse } from "../../../store/constant";

const TransactionTable = ({ data, clientId, trigger: triggerTran }) => {
  const [api, contextHolder] = notification.useNotification();
  const nav = useNavigate();

  const [trigger, { error }] = useGetDeletedTranstionMutation();
  const [selectedId, setSelectedId] = useState(null); // store clicked transaction ID

  const fetchDeletedTran = () => {
    nav(`/client/deletedlenden/${clientId}`);
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

  const handleDelete = async () => {
    try {
      if (!selectedId) return;
      await trigger({
        transactionId: selectedId,
        userId: clientId,
      }).unwrap();
      triggerTran({
        userId: convertCodeReverse(clientId),
        transactiontype: "All",
      });
      openNotification("Transaction deleted successfully");
    } catch (error) {
      // openNotificationError("Failed to delete transaction");
    } finally {
      setSelectedId(null); // clear after action
    }
  };

  useEffect(() => {
    if (!error?.data?.status && error?.data?.message) {
      openNotificationError(error?.data?.message);
    }
  }, [error]);

  const totalCreadit = data?.reduce((acc, item) => acc + item.credit, 0) || 0;
  const totalDebit = data?.reduce((acc, item) => acc + item.debit, 0) || 0;
  const totalBalance =
    data?.reduce((acc, item) => acc + Number(item.balance || 0), 0) || 0;

  const items = (id) => [
    {
      label: (
        <Popconfirm
          description="Are you sure to delete?"
          onConfirm={handleDelete} // Call delete using stored ID
          className="ant-btn-default_no"
          okText="Yes"
          cancelText="No">
          <p
            onClick={(e) => {
              e.preventDefault();
              setSelectedId(id); // store the clicked transaction ID
            }}>
            Delete
          </p>
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
            Dena : {totalCreadit?.toFixed(2)}
          </h3>
        </div>
        <div>
          <h3 style={{ padding: "5px", color: "rgb(51, 181, 28)" }}>
            Lena : {totalDebit?.toFixed(2)}
          </h3>
        </div>
        <div>
          <h3
            style={{ padding: "5px" }}
            className={totalBalance < 0 ? "text_danger" : "text_success"}>
            Balance: {totalBalance?.toFixed(2)}{" "}
            {totalBalance > 0 ? "(Lena)" : "(Dena)"}
          </h3>
        </div>
        <div className="deleted_sec">
          <Button onClick={fetchDeletedTran}>Deleted</Button>
        </div>
      </div>
      <div className="table_section" style={{ paddingBottom: "20px" }}>
        <table>
          <thead>
            <tr>
              <th
                style={{ whiteSpace: "nowrap", padding: "5px" }}
                className="text-right">
                #
              </th>
              <th style={{ whiteSpace: "nowrap", padding: "5px" }}>Date</th>
              <th style={{ whiteSpace: "nowrap", padding: "5px" }}>
                Collection Name
              </th>
              <th
                style={{ whiteSpace: "nowrap", padding: "5px" }}
                className="text-right">
                Debit
              </th>
              <th
                style={{ whiteSpace: "nowrap", padding: "5px" }}
                className="text-right">
                Credit
              </th>
              <th
                style={{ whiteSpace: "nowrap", padding: "5px" }}
                className="text-right">
                Balance
              </th>
              <th style={{ whiteSpace: "nowrap", padding: "5px" }}>
                Payment Type
              </th>
              <th style={{ whiteSpace: "nowrap", padding: "5px" }}>Done By</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((res, idx) => (
                <tr
                  key={res._id || idx}
                  className={res?.id ? "gx-bg-yellow" : ""}>
                  <td>
                    {res?.id && (
                      <Dropdown
                        className="table_dropdown sport_droupdown"
                        menu={{ items: items(res.id), className: "trans" }}
                        trigger={["click", "contextMenu"]}>
                        <p onClick={(e) => e.preventDefault()}>
                          <Space>
                            <CaretDownOutlined />
                          </Space>
                        </p>
                      </Dropdown>
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {moment(res?.date).format("DD MMM HH:mm:ss A ")}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {res?.collectionName}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }} className="text-right">
                    {res?.debit}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }} className="text-right">
                    {res?.credit}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }} className="text-right">
                    {res?.balance?.toFixed(2)} (
                    {res?.balance > 0 ? "Lena" : "Dena"})
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{res?.paymentType}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{res?.remark}</td>
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
