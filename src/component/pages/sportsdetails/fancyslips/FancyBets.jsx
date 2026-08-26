import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSessionBetMutation,
  useGetSessionHavingBetQuery,
} from "../../../../store/service/SportDetailServices";
import { useLazyFilterbyClientQuery } from "../../../../store/service/supermasteAccountStatementServices";
import CustomLoading from "../../../common/CustomLoading/CustomLoading";
import FancyBetsHeader from "./FancyBetsHeader";
import FancyBetsSummary from "./FancyBetsSummary";
import FancyBetsFilters from "./FancyBetsFilters";
import FancyBetsDesktopTable from "./FancyBetsDesktopTable";
import FancyBetsMobileTable from "./FancyBetsMobileTable";
import FancyBetsPagination from "./FancyBetsPagination";

const FancyBets = () => {
  const [clientId, setClientId] = useState("");
  const [oddsType, setOddsType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const nav = useNavigate();
  const { id, inplay } = useParams();

  const { data: sessionBets } = useGetSessionHavingBetQuery({
    matchCompleted: inplay !== "1" ? true : false,
    matchId: id ?? "",
  });
  const [trigger, { data: sessionData, isLoading }] =
    useGetSessionBetMutation();
  const [userTrigger, { data: userData }] = useLazyFilterbyClientQuery();

  useEffect(() => {
    userTrigger({ userId: "", userType: 1 });
  }, []);

  useEffect(() => {
    trigger({
      matchId: id,
      userId: clientId,
      marketId: oddsType,
      matchCompleted: inplay !== "1" ? true : false,
    });
  }, [oddsType, clientId, id, inplay]);

  const handleBackClick = () => {
    nav(-1);
  };

  const rows = useMemo(() => sessionData?.data || [], [sessionData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [rows]);

  const total = rows.length;
  const pagedRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const userOptions =
    userData?.data?.map((user) => ({
      label: `${user.userName} (${user.userId})`,
      value: user.userId,
    })) || [];

  const fancyOptions = [
    { value: "", label: "All Fancies" },
    ...(sessionBets?.data || []).map((item) => ({
      value: item.fancyId,
      label: item.fancyName,
    })),
  ];

  return (
    <div className="main_live_section list_supers admin-details-panel fancy-bets-panel">
      <FancyBetsHeader onBack={handleBackClick} />

      <div className="fb-content">
        {/* <FancyBetsSummary rows={rows} /> */}

        <FancyBetsFilters
          clientId={clientId}
          onSelectClient={setClientId}
          onSearchClient={(value) => {
            if (value) userTrigger({ userId: value, userType: 1 });
          }}
          userOptions={userOptions}
          fancyId={oddsType}
          onSelectFancy={setOddsType}
          fancyOptions={fancyOptions}
        />

        <div style={{ position: "relative" }}>
          {isLoading && <CustomLoading />}
          <FancyBetsDesktopTable rows={pagedRows} />
          <FancyBetsMobileTable rows={pagedRows} />
        </div>

        <FancyBetsPagination
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

export default FancyBets;
