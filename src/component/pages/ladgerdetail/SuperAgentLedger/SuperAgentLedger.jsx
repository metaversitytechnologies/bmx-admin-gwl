import { useState, useEffect } from "react";
import { Card, Empty, Table, Tooltip } from "antd";
import { Money } from "./moneySvg";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookText,
  HandCoins,
  RefreshCw,
  UsersRound,
} from "lucide-react";
import { useGetLedgerAllQuery } from "../../../../store/service/SportDetailServices";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import { convertCode, isNsg } from "../../../../store/constant";
import SettlementModal from "./SettlementModal";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";

const nameData = {
  6: "Mini-Admin",
  5: "Super",
  4: "Master",
  3: "Agent",
  2: "Client",
};

const formatLedgerAmount = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

const SuperAgentLedger = () => {
  const { id: userTyep, name: Listname, userId } = useParams();
  const [clearData, setClearData] = useState([]);
  const [denaList, setDenaList] = useState([]);
  const [lenaList, setLenaList] = useState([]);
  const [isDepositeModalOpen, setIsDepositModalOpen] = useState(false);
  const [reportData, setReportData] = useState(null);

  const { data, isLoading, isFetching, refetch } = useGetLedgerAllQuery({
    requestTypeUser: Number(userTyep),
    ...(userId && { userId }),
  });

  const nav = useNavigate();

  const handleBackbtn = () => {
    nav(-1);
  };

  // totals
  const denaTotal = Array.isArray(denaList)
    ? denaList.reduce((acc, curr) => acc + (curr?.closinBalane || 0), 0)
    : 0;

  const lenaTotal = Array.isArray(lenaList)
    ? lenaList.reduce((acc, curr) => acc + (curr?.closinBalane || 0), 0)
    : 0;

  useEffect(() => {
    if (data?.data) {
      const dena = Array.isArray(data.data.dena) ? data.data.dena : [];
      const lena = Array.isArray(data.data.lena) ? data.data.lena : [];

      const clearList = dena.filter((item) => item?.closinBalane === 0);
      const filteredDena = dena.filter((item) => item?.closinBalane !== 0);
      // if userId exists, filter by parentId
      const denaFiltered = userId
        ? filteredDena.filter((item) => item?.parentId == userId)
        : filteredDena;

      const clearFiltered = userId
        ? clearList.filter((item) => item?.parentId == userId)
        : clearList;

      const lenaFiltered = userId
        ? lena.filter((item) => item?.parentId == userId)
        : lena;

      setClearData(clearFiltered);
      setDenaList(denaFiltered);
      setLenaList(lenaFiltered);
    }
  }, [data, userId]);

  const handleDownline = (userId) => {
    nav(
      `/client/ledger-super/${userTyep - 1}/${nameData?.[userTyep]}/${userId}`,
    );
  };

  const handleSettelemtData = (report, itemName) => {
    setIsDepositModalOpen(true);
    setReportData({
      ...report,
      itemName,
    });
  };

  const getSectionTone = (itemName) => itemName.toLowerCase();

  const generateColumns = (itemName) => {
    const tone = getSectionTone(itemName);

    return [
      {
        title: "User Name",
        dataIndex: "fullName",
        key: "fullName",
        width: "48%",
        render: (text, record) => (
          <button
            type="button"
            className="admin-ledger-user-button"
            title={`${record?.fullName} (${convertCode(record?.userId)})`}
            onClick={() => handleDownline(record?.userId)}>
            <span className="admin-ledger-user-copy">
              <strong>{record?.fullName}</strong>
              <small>({convertCode(record?.userId)})</small>
            </span>
          </button>
        ),
      },
      {
        title: "Balance",
        dataIndex: "closinBalane",
        key: "closinBalane",
        align: "right",
        width: "27%",
        render: (text, record) => (
          <span className={`admin-ledger-balance is-${tone}`}>
            {formatLedgerAmount(Math.abs(record?.closinBalane))}
          </span>
        ),
      },
      {
        title: "Action",
        key: "settlement",
        align: "center",
        width: "25%",
        render: (text, record) => (
          // <span
          //   style={{ cursor: "pointer" }}
          //   onClick={() =>
          //     nav(`/client/txn-super/${Listname}/${userTyep}/${record?.userId}`)
          //   }>
          //   <Money textColor="#038fde" />
          // </span>
          <div className="admin-ledger-actions">
            <Tooltip title="Statement">
              <button
                type="button"
                className="admin-ledger-action-button"
                aria-label={`Statement for ${record?.fullName}`}
                title="Statement"
                onClick={() => handleSettelemtData(record, itemName)}>
                <HandCoins size={16} strokeWidth={2} />
              </button>
            </Tooltip>
            {itemName !== "Clear" && (
              <Tooltip title="Cash transaction">
                <button
                  type="button"
                  className="admin-ledger-action-button"
                  aria-label={`Cash transaction for ${record?.fullName}`}
                  title="Cash transaction"
                  onClick={() =>
                    nav(
                      `/client/txn-super/${Listname}/${userTyep}/${record?.userId}`,
                    )
                  }>
                  <Money size={17} strokeWidth={2} />
                </button>
              </Tooltip>
            )}
          </div>
        ),
      },
    ];
  };

  const ledgerSections = [
    {
      name: "Lena",
      data: lenaList,
      total: Math.abs(lenaTotal),
      icon: <ArrowUpRight size={25} strokeWidth={2.2} />,
    },
    {
      name: "Dena",
      data: denaList,
      total: Math.abs(denaTotal),
      icon: <ArrowDownRight size={25} strokeWidth={2.2} />,
    },
    {
      name: "Clear",
      data: clearData,
      total: clearData.length,
      icon: <RefreshCw size={24} strokeWidth={2.2} />,
    },
  ];

  return (
    <>
      <div className="main_live_section list_supers admin-details-panel super-agent-ledger-panel">
        <AppPageHeader
          icon={<BookText size={20} strokeWidth={1.8} />}
          title={`${Listname?.replace("-", " ")} Ledger`}
          subtitle="Review lena/dena balances and settle accounts"
          onBack={handleBackbtn}
        />
        <Card className="sport_detail ledger_data led_super admin-ledger-card">
          <section className="admin-ledger-summary" aria-label="Ledger summary">
            {ledgerSections.map((section) => (
              <article
                key={section.name}
                className={`admin-ledger-summary-card is-${getSectionTone(
                  section.name,
                )}`}>
                <span className="admin-ledger-summary-icon">
                  {section.icon}
                </span>
                <div>
                  <span>{section.name}</span>
                  <strong>
                    {section.name === "Clear"
                      ? section.total
                      : formatLedgerAmount(section.total)}
                  </strong>
                </div>
              </article>
            ))}
          </section>

          <section className="admin-ledger-sections">
            {ledgerSections.map((section) => (
              <article
                className={`admin-ledger-section is-${getSectionTone(
                  section.name,
                )}`}
                key={section.name}>
                <header className="admin-ledger-section-header">
                  <div>
                    <span className="admin-ledger-section-icon">
                      <UsersRound size={19} strokeWidth={2.1} />
                    </span>
                    <strong>{section.name} Users</strong>
                  </div>
                  <span>{section.data.length} users</span>
                </header>

                <div className="admin-ledger-table-scroll">
                  <div className="admin-ledger-mobile-hint">
                    Swipe to view all columns
                  </div>
                  <Table
                    className="admin-ledger-table"
                    pagination={false}
                    columns={generateColumns(section.name)}
                    loading={{
                      spinning: isLoading || isFetching,
                      indicator: <CustomLoading />,
                    }}
                    rowKey={(record) =>
                      record?.userId ??
                      `${section.name}-${record?.fullName}-${record?.closinBalane}`
                    }
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={`No ${section.name.toLowerCase()} users found`}
                        />
                      ),
                    }}
                    dataSource={section.data}
                  />
                </div>

                <footer className="admin-ledger-section-footer">
                  <span>
                    Showing {section.data.length ? 1 : 0} to{" "}
                    {section.data.length} of {section.data.length} entries
                  </span>
                </footer>
              </article>
            ))}
          </section>
        </Card>
      </div>

      <SettlementModal
        handleClose={() => setIsDepositModalOpen(false)}
        isDepositeModalOpen={isDepositeModalOpen}
        reportData={reportData}
        setReportData={setReportData}
        refetch={refetch}
      />
    </>
  );
};

export default SuperAgentLedger;
