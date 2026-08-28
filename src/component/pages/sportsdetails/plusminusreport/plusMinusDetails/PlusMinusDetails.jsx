import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TrendingUp } from "lucide-react";
import { globalSelector } from "../../../../../store/global/slice";
import PlusMinusTable from "./PlusMinusTable";
import AppPageHeader from "../../../../common/AppPageHeader/AppPageHeader";

const PlusMinusDetails = () => {
  const { state } = useLocation();
  const nav = useNavigate();

  return (
    <>
      <div className="main_live_section list_supers admin-details-panel plus-minus-details-panel">
        <div className="_match plus_minus_sec">
          <AppPageHeader
            icon={<TrendingUp size={20} strokeWidth={1.8} />}
            title={state?.state?.dataNameee}
            subtitle="Review profit and loss for this match"
            onBack={() => nav(-1)}
          />
          <div className="main_table_section">
            <PlusMinusTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlusMinusDetails;
