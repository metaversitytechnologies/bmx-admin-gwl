import { useNavigate } from "react-router-dom";
import { Scale } from "lucide-react";

import AddSuperLimites from "./AddSuperLimites";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";

const SuperAgentLimitDetails = () => {
  const nav = useNavigate();

  const handleBackClick = () => {
    nav(-1);
  };

  return (
    <div className="main_live_section list_supers admin-details-panel update-limit-panel">
      <div className="_match">
        <AppPageHeader
          icon={<Scale size={20} strokeWidth={1.8} />}
          title="Update Limit"
          subtitle="Manage chip limits for all admins"
          onBack={handleBackClick}
        />
      </div>

      <div className="table_section sport_detail m-0 admin-details-table-shell">
        <AddSuperLimites />
      </div>
    </div>
  );
};

export default SuperAgentLimitDetails;
