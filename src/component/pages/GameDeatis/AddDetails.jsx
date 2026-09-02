import { Empty, Modal, Table, Tooltip } from "antd";
import { CircleX, Layers3, Trophy } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetFancyBetVMutation } from "../../../store/service/SportDetailServices";

const LONG_TEXT_COLUMNS = new Set([
  "selectionName",
  "dealerUserId",
  "masterUserId",
  "superAdminUserId",
  "subAdminUserId",
  "adminUserId",
]);

const renderHierarchyCell = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  return (
    <Tooltip title={String(value)}>
      <span className="all-details-truncate">{value}</span>
    </Tooltip>
  );
};

const renderPnl = (value) => {
  const tone =
    Number(value || 0) > 0
      ? "is-positive"
      : Number(value || 0) < 0
        ? "is-negative"
        : "is-neutral";

  return <span className={`all-details-pnl ${tone}`}>{value ?? 0}</span>;
};

const renderModeValue = (isSession, record, shortLabel = false) => (
  <span className={`all-details-mode ${record?.isBack ? "is-back" : "is-lay"}`}>
    {isSession
      ? record?.isBack
        ? "YES"
        : "NOT"
      : record?.isBack
        ? shortLabel
          ? "L"
          : "LAGAI"
        : shortLabel
          ? "K"
          : "KHAI"}
  </span>
);

const enhanceColumn = (column) => {
  const hierarchyWidth = {
    selectionName: 170,
    dealerUserId: 180,
    masterUserId: 190,
    superAdminUserId: 190,
    subAdminUserId: 190,
    adminUserId: 180,
  };

  return {
    ...column,
    width: hierarchyWidth[column.dataIndex] || column.width || 96,
    className: LONG_TEXT_COLUMNS.has(column.dataIndex)
      ? "all-details-long-col"
      : column.className,
    render:
      column.render ||
      (LONG_TEXT_COLUMNS.has(column.dataIndex)
        ? renderHierarchyCell
        : (value) => value ?? "-"),
  };
};

const AddDetails = ({
  open,
  setOpenResponsive,
  sessionType,
  clientId,
  setSessionType,
}) => {
  const { id } = useParams();
  const [trigger, { data, isLoading }] = useGetFancyBetVMutation();
  const [teamTableData, setTeamTableData] = useState([]);
  const userType = parseInt(localStorage.getItem("userType"), 10);

  const getColumnsByUserType = (currentUserType, isSession) => {
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
        render: (text, record) => renderModeValue(isSession, record),
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
      7: [],
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

    const hiddenFields = hiddenFieldsByUserType[currentUserType] || [];

    return allColumns
      .filter((col) => !hiddenFields.includes(col.dataIndex))
      .map(enhanceColumn);
  };

  const getColumnsByUserMatchType = (currentUserType, isSession) => {
    const allColumns = [
      {
        title: "User",
        dataIndex: "userId",
        key: "userId",
        width: 190,
        fixed: "left",
        render: (text, record) => (
          <Tooltip
            title={`${record?.userId || "-"} (${record?.userName || "-"})`}>
            <span className="all-details-user">
              {record?.userId} ({record?.userName})
            </span>
          </Tooltip>
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
        render: (text, record) => renderModeValue(isSession, record, true),
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
        title: `${data?.data?.dataList?.[0]?.team1}`,
        dataIndex: "team1Pnl",
        key: "team1Pnl",
        render: renderPnl,
      },
      {
        title: `${data?.data?.dataList?.[0]?.team2}`,
        dataIndex: "team2Pnl",
        key: "team2Pnl",
        render: renderPnl,
      },
      {
        title: `${data?.data?.dataList?.[0]?.team3}`,
        dataIndex: "team3Pnl",
        key: "team3Pnl",
        render: renderPnl,
      },
    ];

    const hiddenFieldsByUserType = {
      7: [],
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

    const hiddenFields = hiddenFieldsByUserType[currentUserType] || [];

    return allColumns
      .filter(
        (col) =>
          !hiddenFields.includes(col.dataIndex) &&
          col.title &&
          String(col.title).trim() !== "null",
      )
      .map(enhanceColumn);
  };

  const teamColumns = [
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
      align: "left",
      render: renderHierarchyCell,
    },
    {
      title: "Plus / Minus",
      dataIndex: "pnl",
      key: "pnl",
      align: "right",
      render: renderPnl,
    },
  ];

  useEffect(() => {
    trigger({
      userId: clientId,
      matchId: id,
      forFancy: sessionType,
      ...(!sessionType ? { marketName: "BOOKMAKER" } : {}),
    });
  }, [clientId, id, sessionType, trigger]);

  useEffect(() => {
    if (data?.data) {
      const formatted = [
        {
          key: 0,
          team: data.data.selection1,
          pnl: data.data.pnl1,
        },
        {
          key: 1,
          team: data.data.selection2,
          pnl: data.data.pnl2,
        },
        data.data.selection3 && {
          key: 2,
          team: data.data.selection3,
          pnl: data.data.pnl3,
        },
      ].filter(Boolean);

      setTeamTableData(formatted);
    }
  }, [data]);

  const detailColumns = sessionType
    ? getColumnsByUserType(userType, sessionType)
    : getColumnsByUserMatchType(userType, sessionType);

  return (
    <Modal
      className="main_modal_div all_details_data"
      rootClassName="all-details-modal-root"
      footer={false}
      open={open}
      width="min(94vw, 1380px)"
      centered
      closeIcon={<CircleX size={22} strokeWidth={1.8} />}
      title={
        <div className="all-details-modal-title">
          <h2>All Details</h2>
        </div>
      }
      onOk={() => setOpenResponsive(false)}
      onCancel={() => setOpenResponsive(false)}>
      <div
        className="all-details-tabs"
        role="tablist"
        aria-label="Details type">
        <button
          className={`all-details-tab ${!sessionType ? "is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={!sessionType}
          onClick={() => setSessionType(false)}>
          <Trophy size={18} strokeWidth={1.9} />
          Match
        </button>
        <button
          className={`all-details-tab ${sessionType ? "is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={sessionType}
          onClick={() => setSessionType(true)}>
          <Layers3 size={18} strokeWidth={1.9} />
          Session
        </button>
      </div>

      <div className="all-details-body">
        {!sessionType && (
          <div className="all-details-table-card all-details-team-card">
            <Table
              className="all-details-table all-details-team-table"
              columns={teamColumns}
              dataSource={teamTableData || []}
              loading={isLoading}
              pagination={false}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No team plus/minus found"
                  />
                ),
              }}
            />
          </div>
        )}

        <div className="all-details-table-card">
          <Table
            className="live_table limit_update table_v all-details-table"
            columns={detailColumns}
            dataSource={data?.data?.dataList || []}
            loading={isLoading}
            rowKey={(record, index) => index}
            rowClassName={(record) =>
              record?.isBack
                ? "all-details-row-back back"
                : "all-details-row-lay lay"
            }
            scroll={{ x: sessionType ? 1120 : 1320 }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    sessionType
                      ? "No session details found"
                      : "No match details found"
                  }
                />
              ),
            }}
            pagination={{
              showSizeChanger: false,
              showTotal: (total, range) =>
                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

AddDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpenResponsive: PropTypes.func.isRequired,
  sessionType: PropTypes.bool.isRequired,
  clientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSessionType: PropTypes.func.isRequired,
};

export default AddDetails;
