import { useEffect, useState } from "react";
import { Button, Dropdown, Popconfirm, Space, notification } from "antd";
import {
  Banknote,
  FileText,
  MoreVertical,
  Trash2,
  WalletCards,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import { useGetDeletedTranstionMutation } from "../../../store/service/SportDetailServices";
import { convertCodeReverse } from "../../../store/constant";
import { openNotification, openNotificationError } from "../../../App";

const TransactionTable = ({ data, clientId, trigger: triggerTran }) => {
  const [, contextHolder] = notification.useNotification();
  const nav = useNavigate();

  const [trigger, { error }] = useGetDeletedTranstionMutation();
  const [selectedId, setSelectedId] = useState(null); // store clicked transaction ID

  const fetchDeletedTran = () => {
    nav(`/client/deletedlenden/${clientId}`);
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
  // const totalBalance =
  //   data?.reduce((acc, item) => acc + Number(item.balance || 0), 0) || 0;
  const totalBalance = totalCreadit - totalDebit;

  const formatAmount = (value) => Number(value || 0).toFixed(2);
  const getBalanceTone = (value) => (Number(value) > 0 ? "is-lena" : "is-dena");
  const formatPaymentType = (paymentType) => paymentType || "—";

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
      <div className="my_ledger approved-transaction-summary atx-summary-strip">
        <div className="approved-summary-card approved-summary-card-danger atx-summary-card">
          <span className="approved-summary-icon atx-summary-icon">
            <WalletCards size={18} strokeWidth={1.8} />
          </span>
          <div>
            <span>Dena</span>
            <h3>{formatAmount(totalCreadit)}</h3>
          </div>
        </div>
        <div className="approved-summary-card approved-summary-card-success atx-summary-card">
          <span className="approved-summary-icon atx-summary-icon">
            <Banknote size={18} strokeWidth={1.8} />
          </span>
          <div>
            <span>Lena</span>
            <h3>{formatAmount(totalDebit)}</h3>
          </div>
        </div>
        <div className="approved-summary-card atx-summary-card atx-balance-card">
          <span className="approved-summary-icon atx-summary-icon">
            <FileText size={18} strokeWidth={1.8} />
          </span>
          <div>
            <span>Balance</span>
            <h3 className={totalBalance < 0 ? "text_danger" : "text_success"}>
              {formatAmount(-1 * totalBalance)}{" "}
              <small>{totalBalance > 0 ? "(Lena)" : "(Dena)"}</small>
            </h3>
          </div>
        </div>
        <div className="deleted_sec atx-deleted-action">
          <Button className="approved-primary-button" onClick={fetchDeletedTran}>
            <Trash2 size={16} strokeWidth={2} />
            Deleted
          </Button>
        </div>
      </div>
      <div className="atx-mobile-table-hint">← Swipe to view all columns →</div>
      <div className="table_section approved-data-table atx-table-card">
        <table>
          <thead>
            <tr>
              <th className="text-right atx-action-column">
                #
              </th>
              <th>Date</th>
              <th className="atx-sticky-column">
                Collection Name
              </th>
              <th className="text-right">
                Debit
              </th>
              <th className="text-right">
                Credit
              </th>
              <th className="text-right">
                Balance
              </th>
              <th>Payment Type</th>
              <th>Done By</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((res, idx) => (
                <tr
                  key={res._id || idx}
                  className={res?.paymentType ? "gx-bg-yellow" : ""}>
                  <td className="atx-row-action">
                    {res?.id && (
                      <Dropdown
                        className="table_dropdown sport_droupdown"
                        menu={{ items: items(res.id), className: "trans" }}
                        trigger={["click", "contextMenu"]}>
                        <button
                          className="atx-table-action-button"
                          type="button"
                          onClick={(e) => e.preventDefault()}>
                          <Space>
                            <MoreVertical size={17} strokeWidth={2.1} />
                          </Space>
                        </button>
                      </Dropdown>
                    )}
                  </td>
                  <td className="atx-date-cell">
                    <span>{moment(res?.date).format("DD MMM")}</span>
                    <small>{moment(res?.date).format("hh:mm:ss A")}</small>
                  </td>
                  <td className="atx-sticky-column atx-collection-cell" title={res?.collectionName}>
                    <span>{res?.collectionName}</span>
                  </td>
                  <td className="text-right atx-money atx-debit">
                    {formatAmount(res?.debit)}
                  </td>
                  <td className="text-right atx-money atx-credit">
                    {formatAmount(res?.credit)}
                  </td>
                  <td
                    className={`text-right atx-money atx-balance ${getBalanceTone(
                      res?.balance
                    )}`}>
                    {formatAmount(-1 * res?.balance)}{" "}
                    <small>({res?.balance > 0 ? "Lena" : "Dena"})</small>
                  </td>
                  <td>
                    <span className="atx-payment-badge">
                      {formatPaymentType(res?.paymentType)}
                    </span>
                  </td>
                  <td className="atx-done-by-cell" title={res?.remark}>
                    <span>{res?.remark}</span>
                  </td>
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

TransactionTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  clientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trigger: PropTypes.func.isRequired,
};

export default TransactionTable;
