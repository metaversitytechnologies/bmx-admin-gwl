import { Button, Modal, Row, Table } from "antd";
import { useGetFancyBetVMutation } from "../../../store/service/SportDetailServices";
import { useEffect, useState } from "react";
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
  const [teamTableData, setTeamTableData] = useState([]);
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
        dataIndex: "masterUserId",
        key: "Action",
      },
      {
        title: "Master",
        dataIndex: "superAdminUserId",
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
        title: "User",
        dataIndex: "userId",
        key: "userId",
        render: (text, record) => (
          <span>
            {record?.userId} ({record?.userName})
          </span>
        ),
      },
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
        title: "Agent",
        dataIndex: "dealerUserId",
        key: "dealerUserId",
      },
      {
        title: "Super Master",
        dataIndex: "masterUserId",
        key: "masterUserId",
      },
      {
        title: "Master",
        dataIndex: "superAdminUserId",
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
      {
        title: "AD%",
        dataIndex: "adminP",
        key: "adminP",
      },
      {
        title: "AD%",
        dataIndex: "adminP",
        key: "adminP",
      },
      {
        title: `${data?.data?.[0]?.team1}`,
        dataIndex: "team1Pnl",
        key: "team1Pnl",
        render: (value) => (
          <span style={{ color: value >= 0 ? "green" : "red" }}>{value}</span>
        ),
      },
      {
        title: `${data?.data?.[0]?.team2}`,
        dataIndex: "team2Pnl",
        key: "team2Pnl",
        render: (value) => (
          <span style={{ color: value >= 0 ? "green" : "red" }}>{value}</span>
        ),
      },
      {
        title: `${data?.data?.[0]?.team3}`,
        dataIndex: "team3Pnl",
        key: "team3Pnl",
        render: (value) => (
          <span style={{ color: value >= 0 ? "green" : "red" }}>{value}</span>
        ),
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

    return allColumns.filter(
      (col) =>
        !hiddenFields.includes(col.dataIndex) &&
        col.title &&
        String(col.title).trim() !== "null"
    );
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
      render: (value) => (
        <span style={{ color: value >= 0 ? "green" : "red" }}>{value}</span>
      ),
    },
  ];

  useEffect(() => {
    trigger({ userId: clientId, matchId: id, forFancy: sessionType });
  }, [clientId, id, sessionType, trigger]);

  useEffect(() => {
    if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
      const totals = data.data.reduce((acc, item) => {
        acc[item.team1] = (acc[item.team1] || 0) + (item.team1Pnl || 0);
        acc[item.team2] = (acc[item.team2] || 0) + (item.team2Pnl || 0);
        if (item.team3) {
          acc[item.team3] = (acc[item.team3] || 0) + (item.team3Pnl || 0);
        }
        return acc;
      }, {});

      const formatted = Object.entries(totals).map(([team, pnl], index) => ({
        key: index,
        team,
        name: pnl,
      }));

      setTeamTableData(formatted);
    }
  }, [data]);

  return (
    <Modal
      title="All Details"
      className="main_modal_div all_details_data"
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
          dataSource={teamTableData || []}
          pagination={false}
        />
      )}

      <div className="table_section">
        <Table
          className="live_table limit_update table_v"
          bordered
          columns={
            sessionType
              ? getColumnsByUserType(userType, sessionType)
              : getColumnsByUserMatchType(userType, sessionType)
          }
          dataSource={data?.data || []}
          rowKey={(record, index) => index}
          rowClassName={(text, record) => (text?.isBack ? "back" : "lay")}
        />
      </div>
    </Modal>
  );
};

export default AddDetails;
