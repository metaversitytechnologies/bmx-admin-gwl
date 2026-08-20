// src/components/Main/Main.jsx
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../signin/Signin";
import LayOut from "../../layout/LayOut";

const Dashboard = lazy(() => import("../../pages/Dashboard/Dashboard"));
const LadgerDetails = lazy(() => import("../../pages/ladgerdetail/LadgerDetails"));
const SportsDetails = lazy(() => import("../../pages/sportsdetails/SportsDetails"));
const PlusMinusReport = lazy(() =>
  import("../../pages/sportsdetails/plusminusreport/PlusMinusReport")
);
const PlusMinusDetails = lazy(() =>
  import("../../pages/sportsdetails/plusminusreport/plusMinusDetails/PlusMinusDetails")
);
const FancySlips = lazy(() =>
  import("../../pages/sportsdetails/fancyslips/FancySlips")
);
const CompletedFancySlips = lazy(() =>
  import("../../pages/sportsdetails/completedFancySlips/CompletedFancySlips")
);
const RejectedBetsByEvent = lazy(() =>
  import("../../pages/sportsdetails/rejectedBetsByEvent/RejectedBetsByEvent")
);
const ListSuper = lazy(() => import("../../pages/supermaster/listsuper/ListSuper"));
const UpdateSuper = lazy(() => import("../../pages/supermaster/updateSuper/UpdateSuper"));
const AccountOperations = lazy(() =>
  import("../../pages/supermaster/accountOperations/AccountOperations")
);
const LoginReport = lazy(() => import("../../pages/LoginReport/LoginReport"));
const NewCreateUser = lazy(() => import("../../pages/newCreateUser/NewCreateUser"));
const SuperAgentLimitDetails = lazy(() =>
  import("../../pages/supermaster/SuperAgentLimitDetails/SuperAgentLimitDetails")
);
const SuperAgentLedger = lazy(() =>
  import("../../pages/ladgerdetail/SuperAgentLedger/SuperAgentLedger")
);
const MyLedger = lazy(() => import("../../pages/ladgerdetail/MyLedger/MyLedger"));
const MatchLedger = lazy(() => import("../../pages/ladgerdetail/MatchLedger/MatchLedger"));
const AgentTransactions = lazy(() =>
  import("../../pages/CashTransanction/AgentTransactions/AgentTransactions")
);
const Rulespage = lazy(() => import("../../pages/RulesPage/Rulespage"));
const DeletedLenden = lazy(() =>
  import("../../pages/CashTransanction/DeletedLenden/DeletedLenden")
);
const EventProfitLoss = lazy(() =>
  import("../../pages/sportsdetails/livereport/EventProfitLoss/EventProfitLoss")
);
const Settings = lazy(() => import("../../pages/Settings/Settings"));
const AccountStatement = lazy(() =>
  import("../../pages/Settings/AccountStatement/AccountStatement")
);
const CasinoProfitAndLoss = lazy(() =>
  import("../../pages/Settings/CasinoProfitAndLoss/CasinoProfitAndLoss")
);
const MatchSessionBet = lazy(() =>
  import("../../pages/sportsdetails/MatchSessionBet/MatchSessionBet")
);
const ClientReport = lazy(() => import("../../pages/sportsdetails/ClientReport/ClientReport"));
const FinishedGame = lazy(() => import("../../pages/FinishedGame/FinishedGame"));
const CompanyReport = lazy(() => import("../../pages/sportsdetails/CompanyReport/CompanyReport"));
const SecureCode = lazy(() => import("../../pages/LoginReport/SecureCode"));
const UserSearch = lazy(() => import("../../pages/Settings/UserSearch/UserSearch"));
const CommissionLenDen = lazy(() =>
  import("../../pages/CommissionLenDen/CommissionLenDen")
);
const MatchLedgerCasino = lazy(() =>
  import("../../pages/MatchLedgerCasino/MatchLedgerCasino")
);
const CasinoPandLDetail = lazy(() =>
  import("../../pages/CasinoPandLDetail/CasinoPandLDetail")
);
const AndarBaharPlusMinus = lazy(() =>
  import("../../pages/AndarBaharDetail/AndarBaharPlusMinus/AndarBaharPlusMinus")
);
const RoulettePlusMinus = lazy(() =>
  import("../../pages/RouletteDetail/RoulettePlusMinus/RoulettePlusMinus")
);
const GameDeatis = lazy(() => import("../../pages/GameDeatis/GameDeatis"));
const CasinoMainPage = lazy(() => import("../../pages/Casino/CasinoMainPage"));
const FancyBets = lazy(() => import("../../pages/sportsdetails/fancyslips/FancyBets"));
const EventProfitLossList = lazy(() => import("../../pages/GameDeatis/EventProfitLoss"));
const DisplayGames = lazy(() => import("../../pages/MatchLedgerCasino/DisplayGames"));
const AllBets = lazy(() => import("../../pages/MatchLedgerCasino/AllBets"));
const CasinoPLMinus = lazy(() =>
  import("../../pages/RouletteDetail/RoulettePlusMinus/CasinoPLMinus")
);
const DeleteBet = lazy(() => import("../../pages/DeleteBet/DeleteBet"));
const CasinoProfitAndLossDetails = lazy(() =>
  import("../../pages/Settings/CasinoProfitAndLoss/CasinoProfitAndLossDetails")
);
const CreateLedger = lazy(() => import("../../pages/PostLedgerSection/CreateLedger"));
const CreateDomain = lazy(() => import("../../pages/CreateDomain/CreateDomain"));
const EventControllor = lazy(() => import("../../pages/EventControllor/EventControllor"));
const CompletedActive = lazy(() => import("../../pages/EventControllor/CompletedActive"));
const DeletedBets = lazy(() => import("../../pages/EventControllor/DeletedBets"));
const DeleteSessionBets = lazy(() =>
  import("../../pages/EventControllor/DeleteSessionBets")
);
const DeleteMatchBets = lazy(() => import("../../pages/EventControllor/DeleteMatchBets"));
const SetMessage = lazy(() => import("../../pages/SetMessage/SetMessage"));
const InplayMatka = lazy(() => import("../../pages/Matka/InplayMatka"));
const CompletedMatka = lazy(() => import("../../pages/Matka/CompletedMatka"));
const InplayMatkaDetail = lazy(() => import("../../pages/Matka/InplayMatkaDetail"));
const AllBetsMatka = lazy(() => import("../../pages/Matka/AllBetsMatka"));
const SetMatkaResult = lazy(() => import("../../pages/Matka/SetMatkaResult"));

const Main = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="" element={<LayOut />}>
        {/* working path */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/user-list/:Listname/:userTyep/:parentId?"
          element={<ListSuper forDeadClient={false} />}
        />
        <Route
          path="/dead-user-list/:Listname/:userTyep/:parentId?"
          element={<ListSuper forDeadClient={true} />}
        />
        <Route path="/Events/sports-details" element={<SportsDetails />} />
        <Route path="/create-domain" element={<CreateDomain />} />
        <Route path="/finish-game" element={<FinishedGame />} />
        <Route path="/matka/inplay" element={<InplayMatka />} />
        <Route
          path="/matka/inplay/:eventId/:name"
          element={<InplayMatkaDetail />}
        />
        <Route path="/matka/completed" element={<CompletedMatka />} />
        <Route path="/matka/all-bets/:eventId" element={<AllBetsMatka />} />
        <Route path="/matka/set-result" element={<SetMatkaResult />} />
        <Route
          path="/client/update-client/:id/:userId?"
          element={<UpdateSuper />}
        />
        <Route path="/account-statement/:id?" element={<AccountStatement />} />
        <Route path="/account-operation/:id?" element={<AccountOperations />} />
        <Route path="/client/login-report/:id" element={<LoginReport />} />
        <Route path="/Events/:id/:id1/live-report" element={<GameDeatis />} />
        <Route
          path="/plus-minus-report/:id/:inplay?"
          element={<PlusMinusReport />}
        />
        <Route
          path="/Events/:id/plus-minus-report"
          element={<PlusMinusDetails />}
        />
        <Route path="/matchplusminus/:id?/:name?" element={<CompanyReport />} />
        <Route
          path="/match-slips/:id/:inplay?"
          element={<FancySlips type={2} name={"Match Bets"} />}
        />
        <Route path="/fancy-slips/:id/:inplay?" element={<FancyBets />} />
        <Route
          path="/matchsessionbet/:id/:inplay?"
          element={<MatchSessionBet />}
        />
        <Route
          path="/completed-fancy-slips/:id"
          element={<CompletedFancySlips />}
        />
        <Route path="/agent-list/:id/:name?" element={<ClientReport />} />
        <Route
          path="/rejectedBetsByEvent/:id/:name?"
          element={<RejectedBetsByEvent />}
        />
        <Route path="/delete-bet" element={<DeleteBet />} />
        <Route path="/inplay-casino" element={<MatchLedgerCasino />} />
        <Route path="/casino/:id?" element={<CasinoMainPage />} />
        <Route
          path="/display-games/:id/:name/:date?"
          element={<DisplayGames />}
        />
        <Route path="/all-bets/:id" element={<AllBets />} />
        <Route
          path="/plusminuscasinodeatils/:date"
          element={<CasinoPLMinus />}
        />
        <Route
          path="/casino/:id/plus-minus-type"
          element={<RoulettePlusMinus />}
        />
        <Route
          path="/Casino/AndarBahar/plus-minus-type/:date/:id"
          element={<AndarBaharPlusMinus />}
        />
        <Route path="/casinoprofitandloss" element={<CasinoProfitAndLoss />} />
        <Route
          path="/casinoprofitandloss/:id"
          element={<CasinoProfitAndLossDetails />}
        />
        <Route path="/Events/matchledger" element={<MatchLedger />} />
        <Route path="/client/my-ledger" element={<MyLedger />} />
        <Route
          path="/client/ledger-super/:id?/:name?/:userId?"
          element={<SuperAgentLedger />}
        />
        <Route
          path="/create-ledger"
          element={<CreateLedger forPostLedger={true} />}
        />
        <Route
          path="/rollback"
          element={<CreateLedger forPostLedger={false} />}
        />
        <Route path="/event-lock" element={<EventControllor />} />
        <Route path="/completd-actibe-bet" element={<CompletedActive />} />
        <Route path="/delete-bets" element={<DeletedBets />} />
        <Route path="/delete-match/:id?" element={<DeleteMatchBets />} />
        <Route path="/delete-session/:id?" element={<DeleteSessionBets />} />
        <Route path="/Events/ladger-details" element={<LadgerDetails />} />
        <Route path="/set-message" element={<SetMessage />} />
        <Route
          path="/client/txn-super/:name/:id/:userId?"
          element={<AgentTransactions />}
        />
        <Route path="/commissionLenden" element={<CommissionLenDen />} />
        <Route path="/client/login-report" element={<LoginReport />} />
        <Route path="/client/secure-code" element={<SecureCode />} />
        <Route path="/markets" element={<Settings />} />
        <Route path="/searchUser" element={<UserSearch />} />
        <Route
          path="/event-profit-loss/:id/:fancyId"
          element={<EventProfitLossList />}
        />
        <Route
          path="/client/limitplusminus-super/:id"
          element={<SuperAgentLimitDetails />}
        />
        <Route path="/completed-casino" element={<CasinoPandLDetail />} />
        <Route path="/client/create-super/:id?" element={<NewCreateUser />} />
        <Route path="/rules" element={<Rulespage />} />
        <Route
          path="/client/update-dealer/:id"
          element={<UpdateSuper updateName={"Agent"} />}
        />
        <Route
          path="/Events/:id/pl/live-report"
          element={<EventProfitLoss />}
        />
        <Route path="/client/deletedlenden/:id" element={<DeletedLenden />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Main;
