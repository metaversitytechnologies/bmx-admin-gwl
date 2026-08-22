import { useNavigate } from "react-router-dom";

import AddSuperLimites from "./AddSuperLimites";
import UpdateLimitHeader from "./UpdateLimitHeader";

const SuperAgentLimitDetails = () => {
  const nav = useNavigate();

  const handleBackClick = () => {
    nav(-1);
  };

  return (
    <div className="main_live_section list_supers admin-details-panel update-limit-panel">
      <div className="_match">
        <UpdateLimitHeader onBack={handleBackClick} />
      </div>

      <div className="table_section sport_detail m-0 admin-details-table-shell">
        <AddSuperLimites />
      </div>
    </div>
  );
};

export default SuperAgentLimitDetails;
