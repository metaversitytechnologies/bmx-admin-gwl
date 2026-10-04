import { useLocation, useNavigate } from "react-router-dom";
import PlusMinusTable from "./PlusMinusTable";
import "./PlusMinusDetails.scss";

const PlusMinusDetails = () => {
  const { state } = useLocation();
  const nav = useNavigate();
  const title = state?.state?.dataNameee || state?.dataNameee || "Match profit and loss";

  return (
    <div className="main_live_section pnl-page">
      <header className="pnl-page-header">
        <div className="pnl-match-heading">
          <span className="pnl-match-label">MATCH</span>
          <h1 title={title}>{title}</h1>
        </div>
        <button type="button" className="pnl-back" onClick={() => nav(-1)}>
          <span aria-hidden="true">←</span> Back
        </button>
      </header>
      <PlusMinusTable />
    </div>
  );
};

export default PlusMinusDetails;
