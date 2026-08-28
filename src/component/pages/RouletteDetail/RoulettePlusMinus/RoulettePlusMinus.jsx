import { useLocation, useNavigate } from "react-router-dom";
import { FileBarChart2 } from "lucide-react";
import "./RoulettePlusMinus.scss";
import { useGetCasinoLedgerQuery } from "../../../../store/service/SportDetailServices";
import AppPageHeader from "../../../common/AppPageHeader/AppPageHeader";
import LedgerDataAdminCasino from "./LedgerDataCasino/LedgerDataAdminCasino";
import LedgerdataSubAdminCasino from "./LedgerDataCasino/LedgerdataSubAdminCasino";
import LedgerdataSuperMasterCasino from "./LedgerDataCasino/LedgerdataSuperMasterCasino";
import LedgerdataMasterCasino from "./LedgerDataCasino/LedgerdataMasterCasino";
import LedgerdataAgentCasino from "./LedgerDataCasino/LedgerdataAgentCasino";
import LedgerDataComponentSuperCasino from "./LedgerDataCasino/LedgerDataComponentSuperCasino";
// import { useCasinoBetListNewQuery } from "../../../../store/service/CasinoServices"; // Comment out or remove this import

const RoulettePlusMinus = () => {
  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const { state } = useLocation();

  const { data: ledgerData } = useGetCasinoLedgerQuery({
    date: state?.date,
    gameIdList: state?.first,
    userIdList: state?.thirdUserid,
  });


  const userType = localStorage.getItem("userType");

  const roleLabel =
    userType == 7
      ? "Super Admin"
      : userType == 6
      ? "Admin"
      : userType == 5
      ? "Mini Admin"
      : userType == 4
      ? "Master "
      : userType == 3
      ? "Super Agent Master"
      : userType == 2
      ? "Agent"
      : "Client";

  return (
    <>
      <div className="main_live_section list_supers admin-details-panel roulette-plus-minus-panel">
        <div className="_match">
          <AppPageHeader
            icon={<FileBarChart2 size={20} strokeWidth={1.8} />}
            title={`${roleLabel} Company Report`}
            subtitle={`${state?.isAuraDetails ?? ""} ${state?.rouletteDate ?? ""}`.trim()}
            onBack={handleBackClick}
          />
        </div>
        <div>
          {/* <div
            className="table_section"
            style={{ overflowX: "auto", position: "relative" }}>
            <table className="plus-table plus_minus_sec">
              <tbody>
                {plusMinusNew?.data &&
                  Object.keys(plusMinusNew?.data).map((item, id) => (
                    <RecursiveTable
                      key={id}
                      data={plusMinusNew?.data[item]}
                      title={item}
                    />
                  ))}
              </tbody>
            </table>
            {isLoading && (
              <div className="plus_spin">
                <Spin size="large" />
              </div>
            )}
          </div> */}
          {userType === "6" && (
            <LedgerDataAdminCasino ledgerData={ledgerData} />
          )}
          {userType === "7" && (
            <LedgerDataComponentSuperCasino ledgerData={ledgerData} />
          )}
          {userType === "5" && (
            <LedgerdataSubAdminCasino ledgerData={ledgerData} />
          )}
          {userType === "4" && (
            <LedgerdataSuperMasterCasino ledgerData={ledgerData} />
          )}
          {userType === "3" && (
            <LedgerdataMasterCasino ledgerData={ledgerData} />
          )}
          {userType === "2" && (
            <LedgerdataAgentCasino ledgerData={ledgerData} />
          )}
        </div>
      </div>
    </>
  );
};

export default RoulettePlusMinus;

// const RecursiveTable = ({ data, title }) => {
//   const [arrayState, setArrayState] = useState([]);

//   // Use a dummy userType for demonstration, or keep localStorage if it's consistently available
//   const uType = localStorage.getItem("userType") || "5";

//   useEffect(() => {
//     let returnArr = [];

//     if (data?.groupName === "subadmin") {
//       returnArr.push(
//         <tr className="sub_color">
//           <td>&nbsp;</td>
//           <td style={{ whiteSpace: "nowrap" }}>madmin</td>
//           <td colSpan={34}>
//             <strong>{title}</strong>
//           </td>
//         </tr>
//       );
//     } else if (data?.groupName === "supermaster") {
//       returnArr.push(
//         <tr className="master_color">
//           <td colSpan={2}>&nbsp;</td>
//           <td style={{ whiteSpace: "nowrap" }}>MASTER </td>
//           <td colSpan={32}>
//             <strong>{title}</strong>
//           </td>
//         </tr>
//       );
//     } else if (data?.groupName === "master") {
//       returnArr.push(
//         <tr className="super_color">
//           <td colSpan={3}>&nbsp;</td> <td>SUPER </td>
//           <td colSpan={31}>
//             <strong>{title}</strong>
//           </td>
//         </tr>
//       );
//     } else if (data?.groupName === "agent") {
//       returnArr.push(
//         <tr className="agent_color">
//           <td colSpan={4}>&nbsp;</td> <td>Agent </td>
//           <td colSpan={29}>
//             <strong>{title}</strong>
//           </td>
//         </tr>
//       );
//     }
//     if (data) {
//       Object.keys(data).forEach((item) => {
//         if (!["groupName", "total", "users"].includes(item)) {
//           returnArr = [
//             ...returnArr,
//             <RecursiveTable data={data[item]} title={item} />,
//           ];
//         } else if (item === "users") {
//           const clientRows = Object.keys(data[item]).map((userKey) => (
//             <>
//               <tr className="border_tr">
//                 <td>
//                   <strong>{userKey}</strong>
//                 </td>

//                 <td
//                   style={{
//                     borderRightWidth: 2,
//                     borderRightColor: "rgb(174, 174, 174)",
//                   }}
//                   className={
//                     uType == 5 || uType == 0 || uType == 1 || uType == 2
//                       ? ""
//                       : "d_none"
//                   }>
//                   <strong>{data[item][userKey].totalAmount?.toFixed(2)}</strong>
//                 </td>

//                 <td
//                   style={{
//                     borderRightWidth: 2,
//                     borderRightColor: "rgb(174, 174, 174)",
//                   }}
//                   className={
//                     uType == 5 || uType == 0 || uType == 1 || uType == 2
//                       ? ""
//                       : "d_none"
//                   }>
//                   {data[item][userKey]?.totalComm?.toFixed(2)}
//                 </td>

//                 <td
//                   className={
//                     uType == 5 || uType == 0 || uType == 1 || uType == 2
//                       ? ""
//                       : "d_none"
//                   }>
//                   <strong>
//                     {data[item][userKey]?.dealer?.totalComm?.toFixed(2)}
//                   </strong>
//                 </td>
//                 <td
//                   className={
//                     uType == 5 || uType == 0 || uType == 1 || uType == 2
//                       ? ""
//                       : "d_none"
//                   }>
//                   {data[item][userKey]?.dealer?.netAmount?.toFixed(2)}
//                 </td>
//                 <td
//                   className={
//                     uType == 5 || uType == 0 || uType == 1 || uType == 2
//                       ? ""
//                       : "d_none"
//                   }>
//                   {data[item][userKey]?.dealer?.shareAmount?.toFixed(2)}
//                 </td>
//                 <td
//                   className={
//                     uType == 5 || uType == 0 || uType == 1 || uType == 2
//                       ? ""
//                       : "d_none"
//                   }
//                   style={{
//                     borderRightWidth: 2,
//                     borderRightColor: "rgb(174, 174, 174)",
//                   }}>
//                   <strong>
//                     {data[item][userKey]?.dealer?.finalAmount?.toFixed(2)}
//                   </strong>
//                 </td>

//                 <td
//                   className={
//                     uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                   }>
//                   <strong>
//                     {data[item][userKey]?.master?.totalComm?.toFixed(2)}
//                   </strong>
//                 </td>
//                 <td
//                   className={
//                     uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                   }>
//                   {data[item][userKey]?.master?.netAmount?.toFixed(2)}
//                 </td>
//                 <td
//                   className={
//                     uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                   }>
//                   {data[item][userKey]?.master?.shareAmount?.toFixed(2)}
//                 </td>
//                 <td
//                   className={
//                     uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                   }
//                   style={{
//                     borderRightWidth: 2,
//                     borderRightColor: "rgb(174, 174, 174)",
//                   }}>
//                   <strong>
//                     {data[item][userKey]?.master?.finalAmount?.toFixed(2)}
//                   </strong>
//                 </td>
//                 <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                   <strong>
//                     {data[item][userKey]?.superMaster?.totalComm?.toFixed(2)}
//                   </strong>
//                 </td>
//                 <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                   {data[item][userKey]?.superMaster?.netAmount?.toFixed(2)}
//                 </td>
//                 <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                   {data[item][userKey]?.superMaster?.shareAmount?.toFixed(2)}
//                 </td>
//                 <td
//                   className={uType == 5 || uType == 0 ? "" : "d_none"}
//                   style={{
//                     borderRightWidth: 2,
//                     borderRightColor: "rgb(174, 174, 174)",
//                   }}>
//                   <strong>
//                     {data[item][userKey]?.superMaster?.finalAmount?.toFixed(2)}
//                   </strong>
//                 </td>
//                 <td className={uType != 5 ? "d_none" : ""}>
//                   <strong>
//                     {data[item][userKey]?.subAdmin?.totalComm?.toFixed(2)}
//                   </strong>
//                 </td>
//                 <td className={uType != 5 ? "d_none" : ""}>
//                   {data[item][userKey]?.subAdmin?.netAmount?.toFixed(2)}
//                 </td>
//                 <td className={uType != 5 ? "d_none" : ""}>
//                   {data[item][userKey]?.subAdmin?.shareAmount?.toFixed(2)}
//                 </td>
//                 <td
//                   className={uType != 5 ? "d_none" : ""}
//                   style={{
//                     borderRightWidth: 2,
//                     borderRightColor: "rgb(174, 174, 174)",
//                   }}>
//                   <strong>
//                     {data[item][userKey]?.subAdmin?.finalAmount?.toFixed(2)}
//                   </strong>
//                 </td>
//               </tr>
//             </>
//           ));
//           const dynamicHeader = (
//             <tr style={{ textAlign: "center", color: "#545454" }}>
//               <th
//                 colSpan={2}
//                 className={`
//                   ${data?.groupName === "agent" ? "agentBackgroundColor" : ""}
//                   ${data?.groupName === "master" ? "masterBackgroundColor" : ""}
//                   ${
//                     data?.groupName === "supermaster"
//                       ? "superBackgroundColor"
//                       : ""
//                   }
//                   ${data?.groupName === "subadmin" ? "subBackgroundColor" : ""}
//                 `}>
//                 {" "}
//                 {title}
//               </th>
//               <th
//                 className={`sub_agent_heading ${
//                   uType == 0 || uType == 1 || uType == 2 || uType == 5
//                     ? ""
//                     : "d_none"
//                 }`}>
//                 CLIENT PLUS MINUS
//               </th>
//               <th
//                 className={`sub_agent_heading ${
//                   uType == 0 || uType == 1 || uType == 2 || uType == 5
//                     ? ""
//                     : "d_none"
//                 }`}
//                 colSpan={4}>
//                 AGENT PLUS MINUS
//               </th>
//               <th
//                 className={`sub_agent_heading ${
//                   uType == 0 || uType == 1 || uType == 5 ? "" : "d_none"
//                 }`}
//                 colSpan={4}>
//                 SUPER PLUS MINUS
//               </th>
//               <th
//                 className={`sub_agent_heading ${
//                   uType == 0 || uType == 5 ? "" : "d_none"
//                 }`}
//                 colSpan={4}>
//                 MASTER PLUS MINUS
//               </th>
//               <th
//                 className={`sub_agent_heading ${uType != 5 ? "d_none" : ""}`}
//                 colSpan={4}>
//                 SUBADMIN PLUS MINUS
//               </th>
//             </tr>
//           );

//           const dynamicSubHeader = (
//             <tr style={{ textAlign: "center" }} className="border_tr">
//               <td>
//                 <strong>CLIENT</strong>
//               </td>

//               <td
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>CASINO AMT</strong>
//               </td>

//               <td
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>CASINO COM </strong>
//               </td>

//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 <strong>CASINO COM</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 <strong>NET AMT</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 <strong>SHR AMT</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}>
//                 <strong>FINAL</strong>
//               </td>

//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 <strong>CASINO COM</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 <strong>NET AMT</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 <strong>SHR AMT</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}>
//                 <strong>FINAL</strong>
//               </td>

//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 <strong>CASINO COM</strong>
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 <strong>NET AMT</strong>
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 <strong>SHR AMT</strong>
//               </td>
//               <td
//                 className={uType == 5 || uType == 0 ? "" : "d_none"}
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}>
//                 <strong>FINAL</strong>
//               </td>

//               <td className={uType != 5 ? "d_none" : ""}>
//                 <strong>CASINO COM</strong>
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 <strong>NET AMT</strong>
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 <strong>SHR AMT</strong>
//               </td>
//               <td
//                 className={uType != 5 ? "d_none" : ""}
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}>
//                 <strong>FINAL</strong>
//               </td>
//             </tr>
//           );
//           returnArr = [
//             ...returnArr,
//             dynamicHeader,
//             dynamicSubHeader,
//             ...clientRows,
//           ];
//         }
//       });
//       if (data?.total) {
//         const totalRows = (
//           <>
//             <tr className="border_tr">
//               <td>&nbsp;</td>
//             </tr>
//             <tr className="border_tr">
//               <td>
//                 <strong>{data.groupName} .TOTAL</strong>
//               </td>

//               <td
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data?.total?.totalAmount?.toFixed(2)}
//               </td>

//               <td
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data?.total?.totalComm?.toFixed(2)}
//               </td>

//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data?.total?.dealer?.totalComm?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data?.total?.dealer?.netAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data?.total?.dealer?.shareAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}>
//                 {data?.total?.dealer?.finalAmount?.toFixed(2)}
//               </td>

//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 {(data?.total?.master?.totalComm).toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 {data?.total?.master?.netAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 {data?.total?.master?.shareAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}>
//                 {data?.total?.master?.finalAmount?.toFixed(2)}
//               </td>

//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 {data?.total?.superMaster?.totalComm?.toFixed(2)}
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 {data?.total?.superMaster?.netAmount?.toFixed(2)}
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 {data?.total?.superMaster?.shareAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={uType == 5 || uType == 0 ? "" : "d_none"}
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}>
//                 {data?.total?.superMaster?.finalAmount?.toFixed(2)}
//               </td>

//               <td className={uType != 5 ? "d_none" : ""}>
//                 {data?.total?.subAdmin?.totalComm?.toFixed(2)}
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 {data?.total?.subAdmin?.netAmount?.toFixed(2)}
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 {data?.total?.subAdmin?.shareAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={uType != 5 ? "d_none" : ""}
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}>
//                 {data?.total?.subAdmin?.finalAmount?.toFixed(2)}
//               </td>
//             </tr>
//           </>
//         );
//         returnArr = [...returnArr, totalRows];
//       }
//     }
//     setArrayState(returnArr);
//   }, [data, uType]); // Added uType to dependency array

//   return arrayState;
// };
