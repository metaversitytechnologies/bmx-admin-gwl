import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { Receipt } from "lucide-react";
import { useGetMatchBetsMutation } from "../../../../store/service/SportDetailServices";
import { useLazyFilterbyClientQuery } from "../../../../store/service/supermasteAccountStatementServices";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";
import BookmakerOverview from "./BookmakerOverview";
import MatchBetsFilters from "./MatchBetsFilters";
import MatchBetsDesktopTable from "./MatchBetsDesktopTable";
import MatchBetsMobileTable from "./MatchBetsMobileTable";
import MatchBetsPagination from "./MatchBetsPagination";

const ODDS_OPTIONS = [
  // "All Odds Type" intentionally left out — it was commented out in the
  // original options list, i.e. not currently a supported market type.
  {
    value: "Bookmaker",
    label: "bookmaker",
  },
];

const FancySlips = ({ name }) => {
  const [clientId, setClientId] = useState("");
  const [oddsType, setOddsType] = useState("Bookmaker");
  const [summaryData, setSummaryData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const nav = useNavigate();
  const { id, inplay } = useParams();

  const [trigger, { data: matchBets, isLoading }] = useGetMatchBetsMutation();
  const [userTrigger, { data: userData }] = useLazyFilterbyClientQuery();

  useEffect(() => {
    trigger({
      matchId: id,
      userId: clientId,
      matchCompleted: inplay !== "1" ? true : false,
      marketType: oddsType,
    });
  }, [oddsType, clientId]);

  const handleBackClick = () => {
    nav(-1);
  };

  useEffect(() => {
    if (matchBets?.data?.bookmaker?.betList) {
      const {
        pnl1 = 0,
        pnl2 = 0,
        pnl3 = 0,
      } = matchBets.data.bookmaker.betList.reduce(
        (acc, bet) => {
          acc.pnl1 += Number(bet.pnl1) || 0;
          acc.pnl2 += Number(bet.pnl2) || 0;
          acc.pnl3 += Number(bet.pnl3) || 0;
          return acc;
        },
        { pnl1: 0, pnl2: 0, pnl3: 0 }
      );

      const newSummary = [
        {
          team: matchBets.data?.bookmaker?.team1,
          selectionId: matchBets.data?.bookmaker?.selectionId1,
          pnl: pnl1,
        },
        {
          team: matchBets.data?.bookmaker?.team2,
          selectionId: matchBets.data?.bookmaker?.selectionId2,
          pnl: pnl2,
        },
      ];

      if (matchBets.data?.bookmaker?.team3) {
        newSummary.push({
          team: matchBets.data?.bookmaker?.team3,
          selectionId: matchBets.data?.bookmaker?.selectionId3,
          pnl: pnl3,
        });
      }

      setSummaryData(newSummary);
    }
  }, [matchBets]);

  useEffect(() => {
    userTrigger({ userId: "", userType: 1 });
  }, []);

  const betList = useMemo(
    () => matchBets?.data?.bookmaker?.betList || [],
    [matchBets]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [betList]);

  const total = betList.length;
  const pagedRows = betList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const userOptions =
    userData?.data?.map((user) => ({
      label: `${user.userName} (${user.userId})`,
      value: user.userId,
    })) || [];

  return (
    <div className="main_live_section list_supers admin-details-panel match-bets-panel">
      <AppPageHeader
        icon={<Receipt size={20} strokeWidth={1.8} />}
        title={name}
        onBack={handleBackClick}
      />

      <div className="mb-content">
        {/* <BookmakerOverview summary={summaryData} /> */}

        <MatchBetsFilters
          clientId={clientId}
          onSelectClient={setClientId}
          onSearchClient={(value) => {
            if (value) userTrigger({ userId: value, userType: 1 });
          }}
          userOptions={userOptions}
          oddsType={oddsType}
          onSelectOddsType={setOddsType}
          oddsOptions={ODDS_OPTIONS}
        />

        <div style={{ position: "relative" }}>
          {isLoading && <CustomLoading />}
          <MatchBetsDesktopTable rows={pagedRows} />
          <MatchBetsMobileTable rows={pagedRows} />
        </div>

        <MatchBetsPagination
          currentPage={currentPage}
          pageSize={pageSize}
          total={total}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

FancySlips.propTypes = {
  name: PropTypes.string,
};

export default FancySlips;
