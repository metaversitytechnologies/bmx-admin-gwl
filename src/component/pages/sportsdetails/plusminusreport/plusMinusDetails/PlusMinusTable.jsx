import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
// import { useSportPlusMinusQuery } from "../../../../../store/service/SportDetailServices"; // Removed API import
import { MapInteractionCSS } from "react-map-interaction";
import { Empty, Spin } from "antd";
import { useGetCompleteLedgerQuery } from "../../../../../store/service/SportDetailServices";
import LedgerDataComponentSuper from "./LedgerData/LedgerDataComponentSuper";

const PlusMinusTable = () => {
  // Static data instead of API call
  const { state } = useLocation();
  const { data: ledgerData } = useGetCompleteLedgerQuery({
    matchId: "34542837",
    matchCompleted: state?.matchCompleted || true,
    fancyIdList: state?.first,
    userIdList: state?.thirdUserid,
    oddsAndSessionBoth: true,
  });

  const data = {
    data: {
      "SubAdmin A": {
        groupName: "subadmin",
        "SuperMaster X": {
          groupName: "supermaster",
          "Master Y": {
            groupName: "master",
            "Agent Z": {
              groupName: "agent",
              users: {
                "Client 1": {
                  matchAmount: 100.5,
                  sessionAmount: 50.25,
                  totalAmount: 150.75,
                  matchComm: 2.0,
                  sessionComm: 1.0,
                  totalComm: 3.0,
                  dealer: {
                    matchComm: 0.5,
                    sessionComm: 0.25,
                    totalComm: 0.75,
                    netAmount: 10.0,
                    shareAmount: 5.0,
                    finalAmount: 15.0,
                  },
                  master: {
                    matchComm: 0.1,
                    sessionComm: 0.05,
                    totalComm: 0.15,
                    netAmount: 2.0,
                    shareAmount: 1.0,
                    finalAmount: 3.0,
                  },
                  superMaster: {
                    matchComm: 0.02,
                    sessionComm: 0.01,
                    totalComm: 0.03,
                    netAmount: 0.5,
                    shareAmount: 0.25,
                    finalAmount: 0.75,
                  },
                  subAdmin: {
                    matchComm: 0.01,
                    sessionComm: 0.005,
                    totalComm: 0.015,
                    netAmount: 0.1,
                    shareAmount: 0.05,
                    finalAmount: 0.15,
                  },
                },
                "Client 2": {
                  matchAmount: -75.0,
                  sessionAmount: 25.0,
                  totalAmount: -50.0,
                  matchComm: 1.5,
                  sessionComm: 0.5,
                  totalComm: 2.0,
                  dealer: {
                    matchComm: 0.3,
                    sessionComm: 0.1,
                    totalComm: 0.4,
                    netAmount: 8.0,
                    shareAmount: 4.0,
                    finalAmount: 12.0,
                  },
                  master: {
                    matchComm: 0.08,
                    sessionComm: 0.02,
                    totalComm: 0.1,
                    netAmount: 1.5,
                    shareAmount: 0.75,
                    finalAmount: 2.25,
                  },
                  superMaster: {
                    matchComm: 0.01,
                    sessionComm: 0.005,
                    totalComm: 0.015,
                    netAmount: 0.3,
                    shareAmount: 0.15,
                    finalAmount: 0.45,
                  },
                  subAdmin: {
                    matchComm: 0.005,
                    sessionComm: 0.002,
                    totalComm: 0.007,
                    netAmount: 0.05,
                    shareAmount: 0.02,
                    finalAmount: 0.07,
                  },
                },
              },
              total: {
                matchAmount: 25.5,
                sessionAmount: 75.25,
                totalAmount: 100.75,
                matchComm: 3.5,
                sessionComm: 1.5,
                totalComm: 5.0,
                dealer: {
                  matchComm: 0.8,
                  sessionComm: 0.35,
                  totalComm: 1.15,
                  netAmount: 18.0,
                  shareAmount: 9.0,
                  finalAmount: 27.0,
                },
                master: {
                  matchComm: 0.18,
                  sessionComm: 0.07,
                  totalComm: 0.25,
                  netAmount: 3.5,
                  shareAmount: 1.75,
                  finalAmount: 5.25,
                },
                superMaster: {
                  matchComm: 0.03,
                  sessionComm: 0.015,
                  totalComm: 0.045,
                  netAmount: 0.8,
                  shareAmount: 0.4,
                  finalAmount: 1.2,
                },
                subAdmin: {
                  matchComm: 0.015,
                  sessionComm: 0.007,
                  totalComm: 0.022,
                  netAmount: 0.15,
                  shareAmount: 0.07,
                  finalAmount: 0.22,
                },
              },
            },
          },
        },
      },
    },
  };

  const isLoading = false; // No loading state with static data

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
        {/* <table className="plus-table plus_minus_sec">
          <tbody>
            {data?.data &&
              Object.keys(data.data).map((item) => (
                <RecursiveTable
                  key={item}
                  data={data.data[item]}
                  title={item}
                />
              ))}
          </tbody>
        </table> */}
            <LedgerDataComponentSuper ledgerData={ledgerData} />
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

// const RecursiveTable = ({ data, title }) => {
//   const [arrayState, setArrayState] = useState([]);

//   const uType = 5; // Still using localStorage for userType

//   useEffect(() => {
//     let returnArr = [];

//     // This part remains largely the same, rendering rows based on groupName

//     returnArr.push(
//       <tr className="sub_color" key={`${title}-subadmin-header`}>
//         <td>&nbsp;</td>
//         <td style={{ whiteSpace: "nowrap" }}>Sub Admin </td>
//         <td colSpan={34}>
//           <strong>{title}</strong>
//         </td>
//       </tr>
//     );

//     returnArr.push(
//       <tr className="master_color" key={`${title}-supermaster-header`}>
//         <td colSpan={2}>&nbsp;</td>
//         <td style={{ whiteSpace: "nowrap" }}>Master </td>
//         <td colSpan={32}>
//           <strong>{title}</strong>
//         </td>
//       </tr>
//     );

//     returnArr.push(
//       <tr className="super_color" key={`${title}-master-header`}>
//         <td colSpan={3}>&nbsp;</td> <td>Super </td>
//         <td colSpan={31}>
//           <strong>{title}</strong>
//         </td>
//       </tr>
//     );

//     returnArr.push(
//       <tr className="agent_color" key={`${title}-agent-header`}>
//         <td colSpan={4}>&nbsp;</td> <td>Agent </td>
//         <td colSpan={29}>
//           <strong>{title}</strong>
//         </td>
//       </tr>
//     );

//     if (data) {
//       Object.keys(data).forEach((item) => {
//         if (!["groupName", "total", "users"].includes(item)) {
//           returnArr = [
//             ...returnArr,
//             <RecursiveTable key={item} data={data[item]} title={item} />,
//           ];
//         } else if (item === "users") {
//           const clientRows = Object.keys(data[item]).map((userKey) => (
//             <tr className="border_tr" key={userKey}>
//               <td>
//                 <strong>{userKey}</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data[item][userKey].matchAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data[item][userKey].sessionAmount?.toFixed(2)}
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
//                 <strong>{data[item][userKey].totalAmount?.toFixed(2)}</strong>
//               </td>

//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data[item][userKey]?.matchComm?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data[item][userKey]?.sessionComm?.toFixed(2)}
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
//                 {data[item][userKey]?.totalComm?.toFixed(2)}
//               </td>

//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data[item][userKey]?.dealer?.matchComm?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data[item][userKey]?.dealer?.sessionComm?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>
//                   {data[item][userKey]?.dealer?.totalComm?.toFixed(2)}
//                 </strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data[item][userKey]?.dealer?.netAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data[item][userKey]?.dealer?.shareAmount?.toFixed(2)}
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
//                 <strong>
//                   {data[item][userKey]?.dealer?.finalAmount?.toFixed(2)}
//                 </strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 {data[item][userKey]?.master?.matchComm?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 {data[item][userKey]?.master?.sessionComm?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 <strong>
//                   {data[item][userKey]?.master?.totalComm?.toFixed(2)}
//                 </strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 {data[item][userKey]?.master?.netAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 {data[item][userKey]?.master?.shareAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}>
//                 <strong>
//                   {data[item][userKey]?.master?.finalAmount?.toFixed(2)}
//                 </strong>
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 {data[item][userKey]?.superMaster?.matchComm?.toFixed(2)}
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 {data[item][userKey]?.superMaster?.sessionComm?.toFixed(2)}
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 <strong>
//                   {data[item][userKey]?.superMaster?.totalComm?.toFixed(2)}
//                 </strong>
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 {data[item][userKey]?.superMaster?.netAmount?.toFixed(2)}
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 {data[item][userKey]?.superMaster?.shareAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={uType == 5 || uType == 0 ? "" : "d_none"}
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}>
//                 <strong>
//                   {data[item][userKey]?.superMaster?.finalAmount?.toFixed(2)}
//                 </strong>
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 {data[item][userKey]?.subAdmin?.matchComm?.toFixed(2)}
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 {data[item][userKey]?.subAdmin?.sessionComm?.toFixed(2)}
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 <strong>
//                   {data[item][userKey]?.subAdmin?.totalComm?.toFixed(2)}
//                 </strong>
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 {data[item][userKey]?.subAdmin?.netAmount?.toFixed(2)}
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 {data[item][userKey]?.subAdmin?.shareAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={uType != 5 ? "d_none" : ""}
//                 style={{
//                   borderRightWidth: 2,
//                   borderRightColor: "rgb(174, 174, 174)",
//                 }}>
//                 <strong>
//                   {data[item][userKey]?.subAdmin?.finalAmount?.toFixed(2)}
//                 </strong>
//               </td>
//             </tr>
//           ));
//           const dynamicHeader = (
//             <tr
//               style={{ textAlign: "center", color: "#545454" }}
//               key={`${title}-dynamic-header`}>
//               <th
//                 colSpan={2}
//                 className={
//                   data?.groupName === "agent"
//                     ? "agentBackgroundColor"
//                     : data?.groupName === "master"
//                     ? "masterBackgroundColor"
//                     : data?.groupName === "supermaster"
//                     ? "superBackgroundColor"
//                     : data?.groupName === "subadmin"
//                     ? "subBackgroundColor"
//                     : ""
//                 }>
//                 {" "}
//                 {title}
//               </th>
//               <th className="sub_agent_heading" colSpan={2}></th>
//               <th
//                 className={`sub_agent_heading ${
//                   uType == 0 || uType == 1 || uType == 2 || uType == 5
//                     ? ""
//                     : "d_none"
//                 }`}
//                 colSpan={3}>
//                 CLIENT PLUS MINUS
//               </th>
//               <th
//                 className={`sub_agent_heading ${
//                   uType == 0 || uType == 1 || uType == 2 || uType == 5
//                     ? ""
//                     : "d_none"
//                 }`}
//                 colSpan={6}>
//                 AGENT PLUS MINUS
//               </th>
//               <th
//                 className={`sub_agent_heading ${
//                   uType == 0 || uType == 1 || uType == 5 ? "" : "d_none"
//                 }`}
//                 colSpan={6}>
//                 SUPER PLUS MINUS
//               </th>
//               <th
//                 className={`sub_agent_heading ${
//                   uType == 0 || uType == 5 ? "" : "d_none"
//                 }`}
//                 colSpan={6}>
//                 MASTER PLUS MINUS
//               </th>
//               <th
//                 className={`sub_agent_heading ${uType != 5 ? "d_none" : ""}`}
//                 colSpan={6}>
//                 SUBADMIN PLUS MINUS
//               </th>
//             </tr>
//           );

//           const dynamicSubHeader = (
//             <tr
//               style={{ textAlign: "center" }}
//               className="border_tr"
//               key={`${title}-dynamic-subheader`}>
//               <td>
//                 <strong>CLIENT</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>M AMT</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>SESS.</strong>
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
//                 <strong>TOT. AMT</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>M. COM</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>S. COM</strong>
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
//                 <strong>TOL. COM</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>M. COM</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>S. COM</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>TOL. COM</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>NET AMT</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 <strong>SHR AMT</strong>
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
//                 <strong>FINAL</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 <strong>M. COM</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 <strong>S. COM</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 <strong>TOL. COM</strong>
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
//                 <strong>M. COM</strong>
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 <strong>S. COM</strong>
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 <strong>TOL. COM</strong>
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
//                 <strong>M. COM</strong>
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 <strong>S. COM</strong>
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 <strong>TOL. COM</strong>
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
//           <React.Fragment key={`${title}-total-rows`}>
//             <tr className="border_tr">
//               <td>&nbsp;</td>
//             </tr>
//             <tr className="border_tr">
//               <td>
//                 <strong>{data.groupName} .TOTAL</strong>
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data?.total?.matchAmount?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data?.total?.sessionAmount?.toFixed(2)}
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
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data?.total?.matchComm?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data?.total?.sessionComm?.toFixed(2)}
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
//                 {data?.total?.dealer?.matchComm?.toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 || uType == 2
//                     ? ""
//                     : "d_none"
//                 }>
//                 {data?.total?.dealer?.sessionComm?.toFixed(2)}
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
//                 {(data?.total?.master?.matchComm).toFixed(2)}
//               </td>
//               <td
//                 className={
//                   uType == 5 || uType == 0 || uType == 1 ? "" : "d_none"
//                 }>
//                 {(data?.total?.master?.sessionComm).toFixed(2)}
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
//                 {data?.total?.superMaster?.matchComm?.toFixed(2)}
//               </td>
//               <td className={uType == 5 || uType == 0 ? "" : "d_none"}>
//                 {data?.total?.superMaster?.sessionComm?.toFixed(2)}
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
//                 {data?.total?.subAdmin?.matchComm?.toFixed(2)}
//               </td>
//               <td className={uType != 5 ? "d_none" : ""}>
//                 {data?.total?.subAdmin?.sessionComm?.toFixed(2)}
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
//           </React.Fragment>
//         );
//         returnArr = [...returnArr, totalRows];
//       }
//     }
//     setArrayState(returnArr);
//   }, [data, uType]); // Added uType to dependency array

//   return arrayState;
// };
