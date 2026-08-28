import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShieldX } from "lucide-react";
import { useGetRejectedBetQuery } from "../../../../store/service/SportDetailServices";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";
import RejectedBetsFilters from "./RejectedBetsFilters";
import RejectedBetsTable from "./RejectedBetsTable";

const RejectedBetsByEvent = () => {
  const nav = useNavigate();
  const { id, name } = useParams();
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetRejectedBetQuery({ matchId: id });

  const [selectedUser, setSelectedUser] = useState("ALL");

  const userOptions = useMemo(() => {
    if (!data?.data) return [];
    const uniqueUsers = Array.from(
      new Map(
        data.data.map((item) => [
          item.userId,
          { label: item.userId, value: item.userId },
        ])
      ).values()
    );
    return [{ label: "All Users", value: "ALL" }, ...uniqueUsers];
  }, [data]);

  const filteredData = useMemo(() => {
    if (!selectedUser || selectedUser === "ALL") return data?.data || [];
    return data?.data.filter((item) => item.userId === selectedUser) || [];
  }, [data, selectedUser]);

  const handleBackClick = () => {
    nav(-1);
  };

  return (
    <div className="main_live_section list_supers admin-details-panel rejected-bets-panel">
      <AppPageHeader
        icon={<ShieldX size={20} strokeWidth={1.8} />}
        title="Rejected & Cancelled Bets"
        subtitle="Review rejected, cancelled and deleted betting activity"
        onBack={handleBackClick}
      />

      <div className="rb-content">
        <RejectedBetsFilters
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
          userOptions={userOptions}
          recordCount={filteredData.length}
        />

        <RejectedBetsTable
          rows={filteredData}
          teamName={name}
          isLoading={isLoading}
          isError={isError}
          onRetry={refetch}
        />
      </div>
    </div>
  );
};

export default RejectedBetsByEvent;
