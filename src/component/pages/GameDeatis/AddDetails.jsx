import { Button, Modal, Row, Table } from "antd";
import { useGetFancyBetVMutation } from "../../../store/service/SportDetailServices";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AddDetails = ({
  open,
  setOpenResponsive,
  sessionType,
  clientId,
  setSessionType,
}) => {
  const { id } = useParams();
  const [trigger, { data }] = useGetFancyBetVMutation();
  const userType = parseInt(localStorage.getItem("userType")); // Ensure it's a number

  const getColumnsByUserType = (userType, sessionType) => {
    const allColumns = [
      {
        title: "Rate",
        dataIndex: "odds",
        key: "odds",
      },
      {
        title: "Price",
        dataIndex: "priceValue",
        key: "priceValue",
      },
      {
        title: "Amount",
        dataIndex: "stake",
        key: "stake",
      },
      {
        title: "Mode",
        dataIndex: "isBack",
        key: "isBack",
        render: (text, record) => (
          <span>
            {sessionType
              ? record?.isBack
                ? "YES"
                : "NOT"
              : record?.isBack
              ? "LAGAI"
              : "KHAI"}
          </span>
        ),
      },
      {
        title: "Session",
        dataIndex: "selectionName",
        key: "selectionName",
      },
      {
        title: "No",
        dataIndex: "noAmount",
        key: "noAmount",
      },
      {
        title: "Yes",
        dataIndex: "yesAmount",
        key: "yesAmount",
      },
      {
        title: "Agent",
        dataIndex: "dealerUserId",
        key: "dealerUserId",
      },
      {
        title: "Super Master",
        dataIndex: "Action",
        key: "Action",
      },
      {
        title: "Master",
        dataIndex: "masterUserId",
        key: "masterUserId",
      },
      {
        title: "Mini Admin",
        dataIndex: "subAdminUserId",
        key: "subAdminUserId",
      },
      {
        title: "Admin",
        dataIndex: "adminUserId",
        key: "adminUserId",
      },
      {
        title: "A%",
        dataIndex: "dealerP",
        key: "dealerP",
      },
      {
        title: "SA%",
        dataIndex: "superMasterP",
        key: "superMasterP",
      },
      {
        title: "M%",
        dataIndex: "masterP",
        key: "masterP",
      },
      {
        title: "MINI%",
        dataIndex: "subAdminP",
        key: "subAdminP",
      },
      {
        title: "AD%",
        dataIndex: "adminP",
        key: "adminP",
      },
    ];

    const hiddenFieldsByUserType = {
      7: [], // Show all
      6: ["adminUserId", "adminP"],
      5: ["adminUserId", "adminP", "subAdminUserId", "subAdminP"],
      4: [
        "adminUserId",
        "adminP",
        "subAdminUserId",
        "subAdminP",
        "masterUserId",
        "masterP",
      ],
      3: [
        "adminUserId",
        "adminP",
        "subAdminUserId",
        "subAdminP",
        "masterUserId",
        "masterP",
        "Action",
        "superMasterP",
      ],
      2: [
        "adminUserId",
        "adminP",
        "subAdminUserId",
        "subAdminP",
        "masterUserId",
        "masterP",
        "Action",
        "superMasterP",
        "dealerUserId",
        "dealerP",
      ],
    };

    const hiddenFields = hiddenFieldsByUserType[userType] || [];

    return allColumns.filter((col) => !hiddenFields.includes(col.dataIndex));
  };

  const getColumnsByUserMatchType = (userType, sessionType) => {
    const allColumns = [
      {
        title: "Rate",
        dataIndex: "odds",
        key: "odds",
      },

      {
        title: "Amount",
        dataIndex: "stake",
        key: "stake",
      },
      {
        title: "Mode",
        dataIndex: "isBack",
        key: "isBack",
        render: (text, record) => (
          <span>
            {sessionType
              ? record?.isBack
                ? "YES"
                : "NOT"
              : record?.isBack
              ? "L"
              : "K"}
          </span>
        ),
      },
      {
        title: "Team",
        dataIndex: "selectionName",
        key: "selectionName",
      },
      {
        title: "User",
        dataIndex: "userId",
        key: "noAmount",
        render: (text, record) => (
          <span>
            {record?.userId} ({record?.userName})
          </span>
        ),
      },
      {
        title: "Agent",
        dataIndex: "dealerUserId",
        key: "dealerUserId",
      },
      {
        title: "Super Master",
        dataIndex: "Action",
        key: "Action",
      },
      {
        title: "Master",
        dataIndex: "masterUserId",
        key: "masterUserId",
      },
      {
        title: "Mini Admin",
        dataIndex: "subAdminUserId",
        key: "subAdminUserId",
      },
      {
        title: "Admin",
        dataIndex: "adminUserId",
        key: "adminUserId",
      },
      {
        title: "A%",
        dataIndex: "dealerP",
        key: "dealerP",
      },
      {
        title: "SA%",
        dataIndex: "superMasterP",
        key: "superMasterP",
      },
      {
        title: "M%",
        dataIndex: "masterP",
        key: "masterP",
      },
      {
        title: "MINI%",
        dataIndex: "subAdminP",
        key: "subAdminP",
      },
      {
        title: "AD%",
        dataIndex: "adminP",
        key: "adminP",
      },
    ];

    const hiddenFieldsByUserType = {
      7: [], // Show all
      6: ["adminUserId", "adminP"],
      5: ["adminUserId", "adminP", "subAdminUserId", "subAdminP"],
      4: [
        "adminUserId",
        "adminP",
        "subAdminUserId",
        "subAdminP",
        "masterUserId",
        "masterP",
      ],
      3: [
        "adminUserId",
        "adminP",
        "subAdminUserId",
        "subAdminP",
        "masterUserId",
        "masterP",
        "Action",
        "superMasterP",
      ],
      2: [
        "adminUserId",
        "adminP",
        "subAdminUserId",
        "subAdminP",
        "masterUserId",
        "masterP",
        "Action",
        "superMasterP",
        "dealerUserId",
        "dealerP",
      ],
    };

    const hiddenFields = hiddenFieldsByUserType[userType] || [];

    return allColumns.filter((col) => !hiddenFields.includes(col.dataIndex));
  };

  const teamColumns = [
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
      align: "center",
    },
    {
      title: "Plus/Minus",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
  ];

  useEffect(() => {
    trigger({ userId: clientId, matchId: id, forFancy: sessionType });
  }, [clientId, id, sessionType, trigger]);

  return (
    <Modal
      title="All Details"
      className="main_modal_div"
      footer={false}
      open={open}
      width={900}
      onOk={() => setOpenResponsive(false)}
      onCancel={() => setOpenResponsive(false)}>
      <div className="new_match_session">
        <div
          className={`match_session_sec ${!sessionType ? "active" : ""}`}
          onClick={() => setSessionType(false)}>
          Match
        </div>
        <div
          className={`match_session_sec ${sessionType ? "active" : ""}`}
          onClick={() => setSessionType(true)}>
          Session
        </div>
      </div>

      {!sessionType && (
        <Table
          className="live_table limit_update"
          bordered
          columns={teamColumns}
          dataSource={[]} 
        />
      )}

      <div className="table_section">
        <Table
          className="live_table limit_update"
          bordered
          columns={
            sessionType
              ? getColumnsByUserType(userType, sessionType)
              : getColumnsByUserMatchType(userType, sessionType)
          }
          dataSource={data?.data || []}
          rowKey={(record, index) => index}
        />
      </div>
    </Modal>
  );
};

export default AddDetails;
