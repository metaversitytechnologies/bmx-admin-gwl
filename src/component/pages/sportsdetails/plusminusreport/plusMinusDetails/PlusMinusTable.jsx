import { useLocation, useParams } from "react-router-dom";
import { MapInteractionCSS } from "react-map-interaction";
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

  const userType = localStorage.getItem("userType");

  return (
    <div style={{ position: "relative" }}>
      <MapInteractionCSS
        defaultValue={{
          scale: 1,
          translation: { x: 0, y: 0 },
        }}
        minScale={0.2}
        maxScale={3}
        translationBounds={{
          xMax: 200,
          yMax: 100,
        }}>
        {userType === "7" && (
          <LedgerDataComponentSuper ledgerData={ledgerData} />
        )}
        {userType === "6" && <LedgerDataAdmin ledgerData={ledgerData} />}
        {userType === "5" && <LedgerdataSubAdmin ledgerData={ledgerData} />}
        {userType === "4" && <LedgerdataSuperMaster ledgerData={ledgerData} />}
        {userType === "3" && <LedgerdataMaster ledgerData={ledgerData} />}
        {userType === "2" && <LedgerdataAgent ledgerData={ledgerData} />}
      </MapInteractionCSS>
      {isLoading && (
        <div className="plus_spin">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default PlusMinusTable;
