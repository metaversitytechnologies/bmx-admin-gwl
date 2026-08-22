import { useState } from "react";
import {
  Banknote,
  ChevronRight,
  Gem,
  Landmark,
  LogOut,
  Percent,
  PieChart,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Trophy,
  UserRoundCog,
  UsersRound,
  WalletCards,
} from "lucide-react";
import ActiveMatch from "../../common/ActiveMatch/ActiveMatch";
import { useNavigate } from "react-router-dom";
import { useDashboardQuery } from "../../../store/service/userlistService";
import LadgerDetails from "../ladgerdetail/LadgerDetails";
import CashTransanction from "../CashTransanction/CashTransanction";
import SettingModals from "./SettingModals";
import MasterDetails from "../masterDetail/MasterDetails";
import SportModal from "./SportModal";
import { convertCode } from "../../../store/constant";

const Dashboard = () => {
  const [openModal, setOpenModals] = useState(false);
  const [openSetting, setSetting] = useState(false);
  const [openDashBoard, setOpenDashBoard] = useState();
  const [openModalReport, setOpenModalsReport] = useState(false);
  const [openSportModals, setSportModals] = useState(false);

  const nav = useNavigate();

  const handleRules = () => {
    nav("/rules");
  };

  const { data: dataDes } = useDashboardQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const uType = localStorage.getItem("userType");

  const adminLabel =
    uType == 7
      ? "SuperAdmin Details"
      : uType == 6
        ? "Admin Detail"
        : uType == 5
          ? "Mini Admin"
          : uType == 4
            ? "Master"
            : uType == 3
              ? "SuperAgent"
              : uType == 2
                ? "Agent"
                : "";

  const roleDescription =
    uType == 7
      ? "Super Admin"
      : uType == 6
        ? "Admin"
        : uType == 5
          ? "Mini Admin"
          : uType == 4
            ? "Masetr"
            : uType == 3
              ? "Super Master"
              : uType == 2
                ? "Agent"
                : "Client";

  const quickActions = [
    {
      title: adminLabel,
      desc: "View profile & permissions",
      icon: UserRoundCog,
      tone: "purple",
      onClick: () => setOpenDashBoard(!openDashBoard),
    },
    {
      title: "Sport's Details",
      desc: "Manage sports & games",
      icon: Trophy,
      tone: "blue",
      onClick: () => setSportModals(!openSportModals),
    },
    {
      title: "Ledger",
      desc: "View all ledger entries",
      icon: WalletCards,
      tone: "green",
      onClick: () => setOpenModals(!openModal),
    },
    {
      title: "Cash Transaction",
      desc: "Track cash transactions",
      icon: Banknote,
      tone: "orange",
      onClick: () => setOpenModalsReport(!openModalReport),
    },
    {
      title: "Setting",
      desc: "System configurations",
      icon: Settings,
      tone: "purple",
      onClick: () => setSetting(!openSetting),
    },
    {
      title: "Logout",
      desc: "Sign out from account",
      icon: LogOut,
      tone: "red",
      onClick: () => {
        localStorage.clear();
        nav("/");
      },
    },
  ];

  const stats = [
    {
      icon: UserRoundCog,
      title: `${convertCode(localStorage.getItem("userId"))}`,
      desc: `You are ${roleDescription}`,
      tone: "admin",
    },
    {
      icon: Gem,
      title: `${dataDes?.data?.balance?.toFixed(2)}`,
      desc: "Chips",
      tone: "chips",
    },
    {
      icon: UsersRound,
      title: `${dataDes?.data?.members}`,
      desc: "Members",
      tone: "members",
    },
    {
      icon: Landmark,
      title: `${dataDes?.data?.myShare}`,
      desc: "My Share",
      tone: "share",
    },
    {
      icon: PieChart,
      title: `${dataDes?.data?.companyShare}%`,
      desc: "Company Share",
      tone: "company",
    },
    {
      icon: Percent,
      title: `${dataDes?.data?.matchCommission}%`,
      desc: "Match Commission",
      tone: "match",
    },
    {
      icon: Percent,
      title: `${dataDes?.data?.sessionCommission}%`,
      desc: "Session Commission",
      tone: "session",
    },
    {
      icon: ShieldCheck,
      title: "Rules",
      desc: "View all rules",
      tone: "rules",
      onClick: handleRules,
    },
  ];

  return (
    <>
      <div className="main_dash_class dashboard-modern">
        <section className="dashboard-action-grid" aria-label="Dashboard actions">
          {quickActions.map(({ icon: Icon, ...item }) => (
            <button
              type="button"
              className="dashboard-action-card"
              key={item.title}
              onClick={item.onClick}>
              <span className={`dashboard-card-icon is-${item.tone}`}>
                <Icon size={28} strokeWidth={1.9} />
              </span>
              <span className="dashboard-action-copy">
                <strong>{item.title}</strong>
                <small>{item.desc}</small>
              </span>
              <ChevronRight className="dashboard-card-arrow" size={20} />
            </button>
          ))}
        </section>

        <section className="dashboard-stat-grid" aria-label="Dashboard summary">
          {stats.map(({ icon: Icon, ...item }) => (
            <button
              type="button"
              className={`dashboard-stat-card is-${item.tone}`}
              key={item.desc || item.title}
              onClick={item.onClick}
              disabled={!item.onClick}>
              <span className="dashboard-stat-icon">
                <Icon size={30} strokeWidth={1.9} />
              </span>
              <span className="dashboard-stat-copy">
                <strong>{item.title}</strong>
                {item.desc && <small>{item.desc}</small>}
              </span>
              {item.onClick && (
                <SlidersHorizontal
                  className="dashboard-stat-action"
                  size={20}
                  strokeWidth={1.8}
                />
              )}
            </button>
          ))}
        </section>
      </div>

      <ActiveMatch />

      <LadgerDetails setOpenModals={setOpenModals} openModal={openModal} />
      <CashTransanction
        setOpenModals={setOpenModalsReport}
        openModal={openModalReport}
      />
      <SettingModals setOpenModals={setSetting} openModal={openSetting} />
      <MasterDetails
        setOpenModals={setOpenDashBoard}
        openModal={openDashBoard}
      />
      <SportModal setOpenModals={setSportModals} openModal={openSportModals} />
    </>
  );
};

export default Dashboard;
