// src/components/Main/Main.jsx
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useIt_Self_By_APP_URLQuery } from "../../../store/service/supermasteAccountStatementServices";
import Signin from "../signin/Signin";
import LayOut from "../../layout/LayOut";
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
import SuperAgentLedger from "../../pages/ladgerdetail/SuperAgentLedger/SuperAgentLedger";
import MyLedger from "../../pages/ladgerdetail/MyLedger/MyLedger";
import MatchLedger from "../../pages/ladgerdetail/MatchLedger/MatchLedger";
import CashTransanction from "../../pages/CashTransanction/CashTransanction";
import AgentTransactions from "../../pages/CashTransanction/AgentTransactions/AgentTransactions";
import SetCommission from "../../pages/setCommission/SetCommission";
import CommReport from "../../pages/dataReport/commReport/CommReport";
import MasterReport from "../../pages/dataReport/masterReport/MasterReport";
import Rulespage from "../../pages/RulesPage/Rulespage";
import DeletedLenden from "../../pages/CashTransanction/DeletedLenden/DeletedLenden";
import EventProfitLoss from "../../pages/sportsdetails/livereport/EventProfitLoss/EventProfitLoss";
import Settings from "../../pages/Settings/Settings";
import AccountStatement from "../../pages/Settings/AccountStatement/AccountStatement";
import ProfitAndLoss from "../../pages/Settings/ProfitAndLoss/ProfitAndLoss";
import CasinoProfitAndLoss from "../../pages/Settings/CasinoProfitAndLoss/CasinoProfitAndLoss";
import TodayProfitLoss from "../../pages/Settings/CasinoProfitAndLoss/TodayProfitLoss/TodayProfitLoss";
import SelectClient from "../../pages/Reports/SelectClient/SelectClient";
import SecureCodeReport from "../../pages/Reports/SecureCodeReport/SecureCodeReport";
import MatchSessionBet from "../../pages/sportsdetails/MatchSessionBet/MatchSessionBet";
import ClientReport from "../../pages/sportsdetails/ClientReport/ClientReport";
import FinishedGame from "../../pages/FinishedGame/FinishedGame";
import CompanyReport from "../../pages/sportsdetails/CompanyReport/CompanyReport";
import SecureCode from "../../pages/LoginReport/SecureCode";
import UserSearch from "../../pages/Settings/UserSearch/UserSearch";
import CommissionLenDen from "../../pages/CommissionLenDen/CommissionLenDen";
import MatchLedgerCasino from "../../pages/MatchLedgerCasino/MatchLedgerCasino";
import CasinoPandLDetail from "../../pages/CasinoPandLDetail/CasinoPandLDetail";
import AnderBaharShowBets from "../../pages/AndarBaharDetail/AnderBaharShowBets/AnderBaharShowBets";
import AnderBaharAllGame from "../../pages/AndarBaharDetail/AnderBaharAllGame/AnderBaharAllGame";
import AndarBaharPlusMinus from "../../pages/AndarBaharDetail/AndarBaharPlusMinus/AndarBaharPlusMinus";
import RoulettePlusMinus from "../../pages/RouletteDetail/RoulettePlusMinus/RoulettePlusMinus";
import GameDeatis from "../../pages/GameDeatis/GameDeatis";
import CasinoMainPage from "../../pages/Casino/CasinoMainPage";
import FancyBets from "../../pages/sportsdetails/fancyslips/FancyBets";

const Main = () => {
  let appUrl = window.location.hostname.split(".");
  appUrl.shift();
  appUrl = appUrl.join(".");

  const { data: logoData } = useIt_Self_By_APP_URLQuery(
    { appUrl },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    const hostnamePart = window.location.hostname.split(".")[1];
    document.title = hostnamePart;

    if (logoData?.data?.favicon) {
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.href = logoData.data.favicon;
      document.head.appendChild(favicon);
    }
  }, [logoData?.data]);

  return (
    <Routes>
      <Route path="/" element={<Signin logo={logoData?.data?.logo} />} />
      <Route path="/signin" element={<Signin logo={logoData?.data?.logo} />} />
      <Route
        path=""
        element={<LayOut logoData={logoData} logo={logoData?.data?.logo} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client/details-master" element={<MasterDetails />} />
        <Route path="/Events/ladger-details" element={<LadgerDetails />} />
        <Route path="/Events/sports-details" element={<SportsDetails />} />
        <Route path="/livereport" element={<LiveReport />} />
        <Route path="/plus-minus-report/:id" element={<PlusMinusReport />} />
        <Route
          path="/Events/:id/plus-minus-report"
          element={<PlusMinusDetails />}
        />
        <Route
          path="/match-slips/:id"
          element={<FancySlips type={2} name={"Match Bets"} />}
        />
        <Route
          path="/fancy-slips/:id"
          element={<FancyBets />}
        />
        <Route
          path="/completed-fancy-slips/:id"
          element={<CompletedFancySlips />}
        />
        <Route
          path="/rejectedBetsByEvent/:id"
          element={<RejectedBetsByEvent />}
        />
        <Route
          path="/user-list/:Listname/:userTyep/:parentId?"
          element={<ListSuper />}
        />
        {/* <Route
          path="/user-list/Super/3"
          element={<ListSuper userTyep={3} Listname={"Super"} />}
        />
        <Route
          path="/user-list/Agent/2"
          element={<ListSuper userTyep={2} Listname={"Agent"} />}
        />
        <Route
          path="/user-list/Client/1"
          element={<ListSuper userTyep={1} Listname={"Client"} />}
        />
        <Route
          path="/user-list/Master/4/:id"
          element={<ListSuper userTyep={0} Listname={"Master"} />}
        />
        <Route
          path="/user-list/Super/3/:id"
          element={<ListSuper userTyep={1} Listname={"Super"} />}
        />
        <Route
          path="/user-list/Agent/2/:id"
          element={<ListSuper userTyep={2} Listname={"Agent"} />}
        />
        <Route
          path="/client/list-clent/:id"
          element={<ListSuper userTyep={3} Listname={"Client"} />}
        />
        <Route
          path="/client/update-super/:id"
          element={<UpdateSuper updateName={"Master"} />}
        />
        <Route
          path="/client/update-agent/:id"
          element={<UpdateSuper updateName={"Super"} />}
        />
        <Route
          path="/client/update-client/:id"
          element={<UpdateSuper updateName={"Client"} />}
        /> */}
        <Route
          path="/client/update-dealer/:id"
          element={<UpdateSuper updateName={"Agent"} />}
        />
        <Route
          path="/client/account-operations/:id"
          element={<AccountOperations />}
        />
        <Route path="/account-operation" element={<AccountOperations />} />
        <Route path="/client/login-report" element={<LoginReport />} />
        <Route path="/client/secure-code" element={<SecureCode />} />
        <Route path="/searchUser" element={<UserSearch />} />
        <Route path="/commissionLenden" element={<CommissionLenDen />} />
        <Route path="/inplay-casino" element={<MatchLedgerCasino />} />
        <Route path="/completed-casino" element={<CasinoPandLDetail />} />
        <Route path="/client/login-report/:id" element={<LoginReport />} />
        <Route
          path="/client/create-super"
          element={
            <NewCreateUser
              userTypeOrder={0}
              createName={"Master"}
              userTyep={5}
            />
          }
        />
        <Route
          path="/client/create-agent"
          element={
            <NewCreateUser
              userTypeOrder={1}
              createName={"Super"}
              userTyep={0}
            />
          }
        />
        <Route
          path="/client/create-dealer"
          element={
            <NewCreateUser
              userTypeOrder={2}
              createName={"Agent"}
              userTyep={1}
            />
          }
        />
        <Route
          path="/client/create-client"
          element={
            <NewCreateUser
              userTypeOrder={3}
              createName={"Client"}
              userTyep={2}
            />
          }
        />

        {/* <Route path="/client/create-super" element={<CreateSuperAgent createName={"Master"}/>}/>
            <Route path="/client/create-agent" element={<CreateSuperAgent createName={"Super"}/>}/>
            <Route path="/client/create-dealer" element={<CreateSuperAgent createName={"Agent"}/>} />
            <Route path="/client/create-client" element={<CreateSuperAgent createName={"Client"}/>} /> */}

        <Route
          path="/client/limitplusminus-super/:id"
          element={<SuperAgentLimitDetails />}
        />
        <Route
          path="/client/limitplusminus-agent"
          element={<AgentLimitDetails />}
        />

        <Route
          path="/client/limitplusminus-client"
          element={<ClientLimitDetails />}
        />
        <Route path="/client/my-ledger" element={<MyLedger />} />
        <Route
          path="/client/ledger-super"
          element={<SuperAgentLedger userTyep={0} Listname={"Master"} />}
        />
        <Route
          path="/client/ledger-master"
          element={<SuperAgentLedger userTyep={1} Listname={"Super"} />}
        />
        <Route
          path="/client/ledger-agent"
          element={<SuperAgentLedger userTyep={2} Listname={"Agent"} />}
        />
        <Route
          path="/client/ledger-client"
          element={<SuperAgentLedger userTyep={3} Listname={"Client"} />}
        />
        <Route path="/Events/matchledger" element={<MatchLedger />} />
        <Route
          path="/client/cash-transanction"
          element={<CashTransanction />}
        />
        {/* <Route path="/client/txn-super" element={<SuperAgentTransactions/>}/> */}
        <Route
          path="/client/txn-super"
          element={<AgentTransactions userType={0} Listname={"Master"} />}
        />
        <Route
          path="/client/txn-agent"
          element={<AgentTransactions userType={2} Listname={"Agent"} />}
        />
        <Route
          path="/client/txn-client"
          element={<AgentTransactions userType={3} Listname={"Client"} />}
        />
        <Route
          path="/client/txn-master"
          element={<AgentTransactions userType={1} Listname={"Super"} />}
        />
        {/* <Route path="/client/txn-client" element={<ClientTransactions/>}/> */}
        <Route path="/markets" element={<Settings />} />
        <Route path="/account-statement/:id?" element={<AccountStatement />} />
        <Route path="/profitandloss" element={<ProfitAndLoss />} />
        <Route path="/casinoprofitandloss" element={<CasinoProfitAndLoss />} />
        <Route path="/Casino/today-pandl" element={<TodayProfitLoss />} />
        <Route path="/client/mobile-app-report" element={<SelectClient />} />
        <Route path="/matchsessionbet/:id" element={<MatchSessionBet />} />
        <Route path="/agent-list/:id" element={<ClientReport />} />
        <Route path="/finish-game" element={<FinishedGame />} />
        <Route path="/matchplusminus/:id?" element={<CompanyReport />} />
        <Route path="/casino/:id?" element={<CasinoMainPage />} />
        <Route
          path="/client/secure-code-report"
          element={<SecureCodeReport />}
        />

        {/* <Route
          path="/casino/aura-details"
          element={<RouletteDetail isAura={"Aura"} Id={323334} />}
        />
        <Route
          path="/casino/supernowa"
          element={<RouletteDetail isAura={"Super Nowa"} Id={323338} />}
        />
        <Route
          path="/casino/qtech"
          element={<RouletteDetail isAura={"QTech"} Id={323337} />}
        /> */}

        <Route
          path="/casino/:id/plus-minus-type"
          element={<RoulettePlusMinus />}
        />
        {/* <Route path="/casino/:id/all-games" element={<RouletteAllGame />} />
        <Route path="/casino/show-bets/:id" element={<ShowBets />} />
        <Route path="/Casino/dus-ka-dum-details" element={<DusKaDumDetail />} /> */}
        {/* <Route
          path="/Casino/andar-bahar-details"
          element={<AndarBaharDetail />}
        /> */}
        <Route
          path="/Casino/AndarBahar/plus-minus-type"
          element={<AndarBaharPlusMinus />}
        />
        <Route
          path="Casino/AndarBahar/all-games"
          element={<AnderBaharAllGame />}
        />
        <Route path="/Casino/show-bet/:id" element={<AnderBaharShowBets />} />
        {/* <Route path="/Casino/casino-details" element={<CasinoDetail />} />
        <Route path="/Casino/roulette-book" element={<RouletteBook />} /> */}
        <Route path="/Events/:id/:id1/live-report" element={<GameDeatis />} />
        <Route
          path="/Events/:id/pl/live-report"
          element={<EventProfitLoss />}
        />
        <Route path="/client/deletedlenden/:id" element={<DeletedLenden />} />
        <Route path="/rules" element={<Rulespage />} />

        <Route
          path="/report/super"
          element={<MasterReport userType={0} reportName={"Master"} />}
        />
        <Route
          path="/report/master"
          element={<MasterReport userType={1} reportName={"Super"} />}
        />
        <Route
          path="/report/agent"
          element={<MasterReport userType={2} reportName={"Agent"} />}
        />
        <Route
          path="/report/client"
          element={<MasterReport userType={3} reportName={"Clients"} />}
        />

        <Route
          path="/client/comm-report-super"
          element={<CommReport userType={0} reportName={"Master"} />}
        />
        <Route
          path="/client/comm-report-master"
          element={<CommReport userType={1} reportName={"Super"} />}
        />
        <Route
          path="/client/comm-report-agent"
          element={<CommReport userType={2} reportName={"Agent"} />}
        />
        <Route
          path="/client/comm-report-client"
          element={<CommReport userType={3} reportName={"Clients"} />}
        />
        <Route path="/set-commission" element={<SetCommission />} />
      </Route>
    </Routes>
  );
};

export default Main;
