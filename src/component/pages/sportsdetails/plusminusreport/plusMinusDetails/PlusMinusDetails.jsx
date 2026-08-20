import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelector } from "../../../../../store/global/slice";
import PlusMinusTable from "./PlusMinusTable";

const PlusMinusDetails = () => {
  const { state } = useLocation();
  const nav = useNavigate();

  return (
    <>
      <div className="main_live_section">
        <div className="_match plus_minus_sec">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "22px" }}
              className="team_name">
              {state?.state?.dataNameee}
            </div>
            <div className="show_btn">
              <button onClick={() => nav(-1)}>Back</button>
            </div>
          </div>
          <div className="main_table_section">
            <PlusMinusTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlusMinusDetails;
