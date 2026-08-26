import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetCompletedFancyMutation } from "../../../../../store/service/SportDetailServices";
import { useLazyFilterbyClientQuery } from "../../../../../store/service/supermasteAccountStatementServices";
import FancyPLHeader from "./FancyPLHeader";
import FancyPLFilters from "./FancyPLFilters";
import PLSummaryCard from "./PLSummaryCard";
import FancyPLTable from "./FancyPLTable";

const CompeleteFancy = () => {
  const [clientId, setClientId] = useState("");
  const [selectedFancyId, setSelectedFancyId] = useState("");

  const { pathname } = useLocation();

  const nav = useNavigate();
  const { id } = useParams();

  const [userTrigger, { data: userData }] = useLazyFilterbyClientQuery();
  const [trigger, { data, isLoading, isFetching, isError }] =
    useGetCompletedFancyMutation();

  const fetchFancy = useCallback(() => {
    trigger({ matchId: id, userId: clientId });
  }, [id, clientId]);

  useEffect(() => {
    fetchFancy();
  }, [fetchFancy]);

  useEffect(() => {
    userTrigger({ userId: "", userType: 1 });
  }, []);

  // Get unique fancies from the data
  const uniqueFancies =
    data?.data?.reduce((acc, item) => {
      const existing = acc.find((fancy) => fancy.fancyId === item.fancyId);
      if (!existing) {
        acc.push({
          fancyId: item.fancyId,
          fancyName: item.fancyName,
        });
      }
      return acc;
    }, []) || [];

  // Filter data based on selected fancy
  const filteredData = selectedFancyId
    ? data?.data?.filter((item) => item.fancyId === selectedFancyId) || []
    : data?.data || [];

  const totalPnl = filteredData?.reduce((acc, item) => acc + item.pnl, 0) || 0;

  const userOptions = [
    { label: "All Users", value: "" },
    ...(userData?.data?.map((user) => ({
      label: `${user.userName} (${user.userId})`,
      value: user.userId,
    })) || []),
  ];

  const fancyOptions = [
    { value: "", label: "All Fancy" },
    ...uniqueFancies.map((fancy) => ({
      value: fancy.fancyId,
      label: fancy.fancyName,
    })),
  ];

  return (
    <div className="list_supers admin-details-panel fancy-pl-panel">
      <FancyPLHeader
        showBack={pathname?.includes("completed-fancy-slips")}
        onBack={() => nav(-1)}
      />

      <div className="fpl-content">
        <div className="fpl-toolbar">
          <FancyPLFilters
            clientId={clientId}
            onSelectClient={setClientId}
            onSearchClient={(value) => {
              if (value) userTrigger({ userId: value, userType: 1 });
            }}
            userOptions={userOptions}
            selectedFancyId={selectedFancyId}
            onSelectFancy={setSelectedFancyId}
            onClearFancy={() => setSelectedFancyId("")}
            fancyOptions={fancyOptions}
          />
          <PLSummaryCard totalPnl={totalPnl} />
        </div>

        <FancyPLTable
          rows={filteredData}
          isLoading={isLoading || isFetching}
          isError={isError}
          onRetry={fetchFancy}
        />
      </div>
    </div>
  );
};

export default CompeleteFancy;
