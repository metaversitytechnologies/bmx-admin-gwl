import { useEffect, useState } from "react";
import { notification } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetSessionPlusMinusQuery } from "../../../../store/service/SportDetailServices";
import MatchHero from "./MatchHero";
import MatchSettingsCard from "./MatchSettingsCard";
import SessionDeclareCard from "./SessionDeclareCard";
import ChildAccessCard from "./ChildAccessCard";
import MatchInfoNotice from "./MatchInfoNotice";

const PlusMinusReport = () => {
  const { id, inplay } = useParams();
  const [first, setFirst] = useState([]);
  const [secondUserid] = useState([]);
  const [thirdUserid, setThirdUserid] = useState([]);
  const [showOdds, setShowOdds] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const { state } = useLocation();
  const nav = useNavigate();

  const [sessionExpanded, setSessionExpanded] = useState(false);
  const [childExpanded, setChildExpanded] = useState(false);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetSessionPlusMinusQuery({
    matchId: id,
    matchCompleted: inplay === 1 ? false : true,
    oddsAndSessionBoth: true,
  });

  const handleBackClick = () => {
    nav(-1);
  };

  const handleShowBtn = () => {
    if (!showOdds && first.length === 0) {
      api.error({
        message: "Please select at least one fancy or odds",
        closeIcon: false,
        placement: "top",
      });
    } else if (secondUserid.length === 0 && thirdUserid.length === 0) {
      api.error({
        message: "Please select at least one client.",
        closeIcon: false,
        placement: "top",
      });
    } else {
      nav(`/Events/${id}/plus-minus-report`, {
        state: {
          first,
          state,
          thirdUserid,
          matchCompleted: inplay === 1 ? false : true,
        },
      });
    }
  };

  const onChange = (e) => {
    setShowOdds(e.target.checked);
  };

  useEffect(() => {
    const allData = data;

    if (allData?.data?.sessionDetail?.length) {
      setFirst(allData?.data?.sessionDetail.map((i) => i.sessionId));
    }

    if (allData?.data?.userDetail?.length) {
      setThirdUserid(allData?.data?.userDetail.map((i) => i.userId));
    }
  }, [data]);

  // Defensive optional chaining only — same filter criteria as before, just
  // guarded so a still-loading/undefined sessionDetail doesn't throw.
  const filteredMarkets =
    data?.data?.sessionDetail?.filter(
      (i) => !["match odds", "bookmaker"].includes(i.sessionName?.toLowerCase())
    ) || [];

  const childRows = data?.data?.userDetail || [];

  const toggleSession = (sessionId) => {
    setFirst((prev) =>
      prev.includes(sessionId)
        ? prev.filter((x) => x !== sessionId)
        : [...prev, sessionId]
    );
  };

  const toggleAllSessions = (selectAll) => {
    setFirst(selectAll ? filteredMarkets.map((i) => i.sessionId) : []);
  };

  const toggleChild = (userId) => {
    setThirdUserid((prev) =>
      prev.includes(userId) ? prev.filter((x) => x !== userId) : [...prev, userId]
    );
  };

  const toggleAllChild = (selectAll) => {
    setThirdUserid(selectAll ? childRows.map((i) => i.userId) : []);
  };

  const matchName = state?.dataNameee || "Match Name";
  const loading = isLoading || isFetching;

  return (
    <>
      {contextHolder}
      <div className="main_live_section list_supers admin-details-panel plus-minus-report-panel">
        <MatchHero matchName={matchName} onShow={handleShowBtn} onBack={handleBackClick} />

        <div className="pmr-content">
          <MatchSettingsCard
            matchName={matchName}
            showOdds={showOdds}
            onOddsChange={onChange}
          />

          <div className="pmr-grid">
            <SessionDeclareCard
              rows={filteredMarkets}
              selected={first}
              onToggleRow={toggleSession}
              onToggleAll={toggleAllSessions}
              isLoading={loading}
              isError={isError}
              onRetry={refetch}
              expanded={sessionExpanded}
              onToggleExpand={() => setSessionExpanded((v) => !v)}
            />

            <ChildAccessCard
              rows={childRows}
              selected={thirdUserid}
              onToggleRow={toggleChild}
              onToggleAll={toggleAllChild}
              isLoading={loading}
              isError={isError}
              onRetry={refetch}
              expanded={childExpanded}
              onToggleExpand={() => setChildExpanded((v) => !v)}
            />
          </div>

          <MatchInfoNotice />
        </div>
      </div>
    </>
  );
};

export default PlusMinusReport;
