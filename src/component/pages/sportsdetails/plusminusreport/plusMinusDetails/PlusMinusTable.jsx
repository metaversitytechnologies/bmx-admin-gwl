import { useLocation, useParams } from "react-router-dom";
import { useRef } from "react";
import useLedgerSticky from "./useLedgerSticky";
import { Spin } from "antd";
import { useGetCompleteLedgerQuery } from "../../../../../store/service/SportDetailServices";
import LedgerDataComponentSuper from "./LedgerData/LedgerDataComponentSuper";
import LedgerDataAdmin from "./LedgerData/LedgerDataAdmin";
import LedgerdataSubAdmin from "./LedgerData/LedgerdataSubAdmin";
import LedgerdataSuperMaster from "./LedgerData/LedgerdataSuperMaster";
import LedgerdataMaster from "./LedgerData/LedgerdataMaster";
import LedgerdataAgent from "./LedgerData/LedgerdataAgent";

const PlusMinusTable = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { data: ledgerData, isLoading } = useGetCompleteLedgerQuery({
    matchId: id,
    matchCompleted: state?.matchCompleted || true,
    fancyIdList: state?.first,
    userIdList: state?.thirdUserid,
    oddsAndSessionBoth: true,
  });

  const viewportRef = useRef(null);
  useLedgerSticky(viewportRef, ledgerData);

  const userType = localStorage.getItem("userType");

  return (
    <div ref={viewportRef} className="ledger-live-viewport" style={{ position: "relative" }}>
        {userType === "7" && (
          <LedgerDataComponentSuper ledgerData={ledgerData} />
        )}
        {userType === "6" && <LedgerDataAdmin ledgerData={ledgerData} />}
        {userType === "5" && <LedgerdataSubAdmin ledgerData={ledgerData} />}
        {userType === "4" && <LedgerdataSuperMaster ledgerData={ledgerData} />}
        {userType === "3" && <LedgerdataMaster ledgerData={ledgerData} />}
        {userType === "2" && <LedgerdataAgent ledgerData={ledgerData} />}
      {isLoading && (
        <div className="plus_spin">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default PlusMinusTable;
