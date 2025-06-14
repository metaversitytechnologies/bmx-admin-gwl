// src/components/Main/routes.js

import Dashboard from "../../pages/Dashboard/Dashboard";
import MasterDetails from "../../pages/masterDetail/MasterDetails";
import LadgerDetails from "../../pages/ladgerdetail/LadgerDetails";
import SportsDetails from "../../pages/sportsdetails/SportsDetails";
import LiveReport from "../../pages/sportsdetails/livereport/LiveReport";
import PlusMinusReport from "../../pages/sportsdetails/plusminusreport/PlusMinusReport";
import PlusMinusDetails from "../../pages/sportsdetails/plusminusreport/plusMinusDetails/PlusMinusDetails";
import FancySlips from "../../pages/sportsdetails/fancyslips/FancySlips";
import CompletedFancySlips from "../../pages/sportsdetails/completedFancySlips/CompletedFancySlips";
import RejectedBetsByEvent from "../../pages/sportsdetails/rejectedBetsByEvent/RejectedBetsByEvent";
import ListSuper from "../../pages/supermaster/listsuper/ListSuper";
import UpdateSuper from "../../pages/supermaster/updateSuper/UpdateSuper";
import AccountOperations from "../../pages/supermaster/accountOperations/AccountOperations";
import LoginReport from "../../pages/LoginReport/LoginReport";
import NewCreateUser from "../../pages/newCreateUser/NewCreateUser";
import SuperAgentLimitDetails from "../../pages/supermaster/SuperAgentLimitDetails/SuperAgentLimitDetails";
import AgentLimitDetails from "../../pages/AgentDetail/AgentLimitDetails/AgentLimitDetails";
import ClientLimitDetails from "../../pages/ClientMaster/ClientLimitDetails/ClientLimitDetails";
import MyLedger from "../../pages/ladgerdetail/MyLedger/MyLedger";
import SuperAgentLedger from "../../pages/ladgerdetail/SuperAgentLedger/SuperAgentLedger";
import MatchLedger from "../../pages/ladgerdetail/MatchLedger/MatchLedger";
import CashTransanction from "../../pages/CashTransanction/CashTransanction";
import AgentTransactions from "../../pages/CashTransanction/AgentTransactions/AgentTransactions";
import Settings from "../../pages/Settings/Settings";
import AccountStatement from "../../pages/Settings/AccountStatement/AccountStatement";
import ProfitAndLoss from "../../pages/Settings/ProfitAndLoss/ProfitAndLoss";
import CasinoProfitAndLoss from "../../pages/Settings/CasinoProfitAndLoss/CasinoProfitAndLoss";
import TodayProfitLoss from "../../pages/Settings/CasinoProfitAndLoss/TodayProfitLoss/TodayProfitLoss";
import SelectClient from "../../pages/Reports/SelectClient/SelectClient";
import SecureCodeReport from "../../pages/Reports/SecureCodeReport/SecureCodeReport";
import Rulespage from "../../pages/RulesPage/Rulespage";
import MasterReport from "../../pages/dataReport/masterReport/MasterReport";
import CommReport from "../../pages/dataReport/commReport/CommReport";
import SetCommission from "../../pages/setCommission/SetCommission";
import DeletedLenden from "../../pages/CashTransanction/DeletedLenden/DeletedLenden";
import EventProfitLoss from "../../pages/sportsdetails/livereport/EventProfitLoss/EventProfitLoss";

export const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/client/details-master", element: <MasterDetails /> },
  { path: "/Events/ladger-details", element: <LadgerDetails /> },
  { path: "/Events/sports-details", element: <SportsDetails /> },
  { path: "/livereport", element: <LiveReport /> },
  { path: "/plus-minus-report/:id", element: <PlusMinusReport /> },
  { path: "/Events/:id/plus-minus-report", element: <PlusMinusDetails /> },
  {
    path: "/fancy-slips/:id",
    element: <FancySlips type={1} name="Session Bet" />,
  },
  {
    path: "/match-slips/:id",
    element: <FancySlips type={2} name="Match Bets" />,
  },
  { path: "/completed-fancy-slips/:id", element: <CompletedFancySlips /> },
  { path: "/rejectedBetsByEvent/:id", element: <RejectedBetsByEvent /> },
  {
    path: "/client/list-super",
    element: <ListSuper userTyep={0} Listname="Master" />,
  },
  {
    path: "/client/list-agent",
    element: <ListSuper userTyep={1} Listname="Super" />,
  },
  {
    path: "/client/list-dealer",
    element: <ListSuper userTyep={2} Listname="Agent" />,
  },
  {
    path: "/client/list-client",
    element: <ListSuper userTyep={3} Listname="Client" />,
  },
  {
    path: "/client/update-super/:id",
    element: <UpdateSuper updateName="Master" />,
  },
  {
    path: "/client/update-agent/:id",
    element: <UpdateSuper updateName="Super" />,
  },
  {
    path: "/client/update-dealer/:id",
    element: <UpdateSuper updateName="Agent" />,
  },
  {
    path: "/client/update-client/:id",
    element: <UpdateSuper updateName="Client" />,
  },
  { path: "/client/account-operations/:id", element: <AccountOperations /> },
  { path: "/account-operation", element: <AccountOperations /> },
  { path: "/client/login-report", element: <LoginReport /> },
  {
    path: "/client/create-super",
    element: (
      <NewCreateUser userTypeOrder={0} createName="Master" userTyep={5} />
    ),
  },
  {
    path: "/client/create-agent",
    element: (
      <NewCreateUser userTypeOrder={1} createName="Super" userTyep={0} />
    ),
  },
  {
    path: "/client/create-dealer",
    element: (
      <NewCreateUser userTypeOrder={2} createName="Agent" userTyep={1} />
    ),
  },
  {
    path: "/client/create-client",
    element: (
      <NewCreateUser userTypeOrder={3} createName="Client" userTyep={2} />
    ),
  },
  {
    path: "/client/limitplusminus-super/:id",
    element: <SuperAgentLimitDetails />,
  },
  { path: "/client/limitplusminus-agent", element: <AgentLimitDetails /> },
  { path: "/client/limitplusminus-client", element: <ClientLimitDetails /> },
  { path: "/client/my-ledger", element: <MyLedger /> },
  {
    path: "/client/ledger-super",
    element: <SuperAgentLedger userTyep={0} Listname="Master" />,
  },
  { path: "/Events/matchledger", element: <MatchLedger /> },
  { path: "/client/cash-transanction", element: <CashTransanction /> },
  {
    path: "/client/txn-super",
    element: <AgentTransactions userType={0} Listname="Master" />,
  },
  {
    path: "/client/txn-agent",
    element: <AgentTransactions userType={2} Listname="Agent" />,
  },
  {
    path: "/client/txn-client",
    element: <AgentTransactions userType={3} Listname="Client" />,
  },
  {
    path: "/client/txn-master",
    element: <AgentTransactions userType={1} Listname="Super" />,
  },
  { path: "/markets", element: <Settings /> },
  { path: "/account-statement", element: <AccountStatement /> },
  { path: "/profitandloss", element: <ProfitAndLoss /> },
  { path: "/casinoprofitandloss", element: <CasinoProfitAndLoss /> },
  { path: "/Casino/today-pandl", element: <TodayProfitLoss /> },
  { path: "/client/mobile-app-report", element: <SelectClient /> },
  { path: "/client/secure-code-report", element: <SecureCodeReport /> },
  { path: "/rules", element: <Rulespage /> },
  {
    path: "/report/super",
    element: <MasterReport userType={0} reportName="Master" />,
  },
  {
    path: "/client/comm-report-super",
    element: <CommReport userType={0} reportName="Master" />,
  },
  { path: "/set-commission", element: <SetCommission /> },
  { path: "/client/deletedlenden/:id", element: <DeletedLenden /> },
  { path: "/Events/:id/pl/live-report", element: <EventProfitLoss /> },
];
