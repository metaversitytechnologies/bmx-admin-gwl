import { FC } from "react";
import "./style.scss";

const RecursiveCard = ({ data, depth }) => {
  if (!data || !data.length) return null;

  return (
    <>
      {data.map((item, index) => (
        <div
          key={index}
          className={`card card-${depthColors[depth]}  ${
            depthColors[depth] === "dark" ? "bg-gray-light" : ""
          }`}>
          <div className={` card-header ${`color_${depth}`} `}>
            <h2 className="card-title text-bold">
              <span className={`card_${depth}`}></span>
              <span className="border-title">{depthLabels[depth]}</span>
              <span className="border-userid">{item[depthKeys[depth]]}</span>
            </h2>
          </div>
          <div className="card-body">
            {depth < depthKeys.length - 1 ? (
              <RecursiveCard data={item.ledgetList} depth={depth + 1} />
            ) : (
              <>
                <div className="card-body" style={{ overflow: "scroll" }}>
                  <table
                    id="data"
                    className="plus-table plus_minus_sec">
                    <thead>
                      <tr>
                        <th colSpan={11} className="">
                          Agent PlusMinus{" "}
                        </th>
                        <th colSpan={7} className="">
                          Super Agent PlusMinus{" "}
                        </th>
                        <th colSpan={7} className="">
                          Master Agent PlusMinus{" "}
                        </th>
                        <th colSpan={7} className="">
                          Sub Admin PlusMinus
                        </th>
                        <th colSpan={7} className="">
                          Admin PlusMinus
                        </th>
                        <th colSpan={7} className="">
                          Super Admin PlusMinus
                        </th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th>CLIENT</th>
                        <th>M AMT</th>
                        <th>S AMT</th>
                        <th>TOT AMT</th>
                        <th>M COM</th>
                        <th>S COM</th>
                        <th>TOT COM</th>
                        <th>NET AMT</th>
                        <th>SHR AMT</th>
                        <th>MOB APP</th>
                        <th>FINAL</th>
                        <th>M COM</th>
                        <th>S COM</th>
                        <th>TOL COM</th>
                        <th>NET AMT</th>
                        <th>SHR AMT</th>
                        <th>MOB APP</th>
                        <th>FINAL</th>
                        <th>M COM</th>
                        <th>S COM</th>
                        <th>TOL COM</th>
                        <th>NET AMT</th>
                        <th>SHR AMT</th>
                        <th>MOB APP</th>
                        <th>FINAL</th>
                        <th>M COM</th>
                        <th>S COM</th>
                        <th>TOL COM</th>
                        <th>NET AMT</th>
                        <th>SHR AMT</th>
                        <th>MOB APP</th>
                        <th>FINAL</th>
                        <th>M COM</th>
                        <th>S COM</th>
                        <th>TOL COM</th>
                        <th>NET AMT</th>
                        <th>SHR AMT</th>
                        <th>MOB APP</th>
                        <th>FINAL</th>
                        <th>M COM</th>
                        <th>S COM</th>
                        <th>TOL COM</th>
                        <th>NET AMT</th>
                        <th>SHR AMT</th>
                        <th>MOB APP</th>
                        <th>FINAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.ledgetList.map((agent) => (
                        <tr key={agent.userId}>
                          <td>
                            {agent.userId} {agent.username}
                          </td>
                          <td>{agent?.matchAmount?.toFixed(2)}</td>
                          <td>{agent?.sessionAmount?.toFixed(2)}</td>
                          <td>{agent?.totalAmoount?.toFixed(2)}</td>
                          <td>{agent?.matchCommissionDealer?.toFixed(2)}</td>
                          <td>{agent?.sessionCommissionDealer?.toFixed(2)}</td>
                          <td>{agent?.totalCommissionDealer?.toFixed(2)}</td>
                          <td>{agent?.netAmountDealer?.toFixed(2)}</td>
                          <td>{agent?.shareAmountDealer?.toFixed(2)}</td>
                          <td>{agent?.mobileAppDealer?.toFixed(2)}</td>
                          <td>{agent?.finalAmountDealer?.toFixed(2)}</td>
                          <td>{agent?.matchCommissionMaster?.toFixed(2)}</td>
                          <td>{agent?.sessionCommissionMaster?.toFixed(2)}</td>
                          <td>{agent?.totalCommissionMaster?.toFixed(2)}</td>
                          <td>{agent?.netAmountMaster?.toFixed(2)}</td>
                          <td>{agent?.shareAmountMaster?.toFixed(2)}</td>
                          <td>{agent?.mobileAppMaster?.toFixed(2)}</td>
                          <td>{agent?.finalAmountMaster?.toFixed(2)}</td>
                          <td>
                            {agent?.matchCommissionSuperMaster?.toFixed(2)}
                          </td>
                          <td>
                            {agent?.sessionCommissionSuperMaster?.toFixed(2)}
                          </td>
                          <td>
                            {agent?.totalCommissionSuperMaster?.toFixed(2)}
                          </td>
                          <td>{agent?.netAmountSuperMaster?.toFixed(2)}</td>
                          <td>{agent?.shareAmountSuperMaster?.toFixed(2)}</td>
                          <td>{agent?.mobileAppSuperMaster?.toFixed(2)}</td>
                          <td>{agent?.finalAmountSuperMaster?.toFixed(2)}</td>
                          <td>{agent?.matchCommissionSubAdmin?.toFixed(2)}</td>
                          <td>
                            {agent?.sessionCommissionSubAdmin?.toFixed(2)}
                          </td>
                          <td>{agent?.totalCommissionSubAdmin?.toFixed(2)}</td>
                          <td>{agent?.netAmountSubAdmin?.toFixed(2)}</td>
                          <td>{agent?.shareAmountSubAdmin?.toFixed(2)}</td>
                          <td>{agent?.mobileAppSubAdmin?.toFixed(2)}</td>
                          <td>{agent?.finalAmountSubAdmin?.toFixed(2)}</td>
                          <td>{agent?.matchCommissionAdmin?.toFixed(2)}</td>
                          <td>{agent?.sessionCommissionAdmin?.toFixed(2)}</td>
                          <td>{agent?.totalCommissionAdmin?.toFixed(2)}</td>
                          <td>{agent?.netAmountAdmin?.toFixed(2)}</td>
                          <td>{agent?.shareAmountAdmin?.toFixed(2)}</td>
                          <td>{agent?.mobileAppAdmin?.toFixed(2)}</td>
                          <td>{agent?.finalAmountAdmin?.toFixed(2)}</td>
                          <td>
                            {agent?.matchCommissionSuperAdmin?.toFixed(2)}
                          </td>
                          <td>
                            {agent?.sessionCommissionSuperAdmin?.toFixed(2)}
                          </td>
                          <td>
                            {agent?.totalCommissionSuperAdmin?.toFixed(2)}
                          </td>
                          <td>{agent?.netAmountSuperAdmin?.toFixed(2)}</td>
                          <td>{agent?.shareAmountSuperAdmin?.toFixed(2)}</td>
                          <td>{agent?.mobileAppSuperAdmin?.toFixed(2)}</td>
                          <td>{agent?.finalAmountSuperAdmin?.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>TOTAL</th>
                        <th>{item?.matchAmount?.toFixed(2)}</th>
                        <th>{item?.sessionAmount?.toFixed(2)}</th>
                        <th>{item?.totalAmoount?.toFixed(2)}</th>
                        <th>{item?.matchCommissionDealer?.toFixed(2)}</th>
                        <th>{item?.sessionCommissionDealer?.toFixed(2)}</th>
                        <th>{item?.totalCommissionDealer?.toFixed(2)}</th>
                        <th>{item?.netAmountDealer?.toFixed(2)}</th>
                        <th>{item?.shareAmountDealer?.toFixed(2)}</th>
                        <th>{item?.mobileAppDealer?.toFixed(2)}</th>
                        <th>{item?.finalAmountDealer?.toFixed(2)}</th>
                        <th>{item?.matchCommissionMaster?.toFixed(2)}</th>
                        <th>{item?.sessionCommissionMaster?.toFixed(2)}</th>
                        <th>{item?.totalCommissionMaster?.toFixed(2)}</th>
                        <th>{item?.netAmountMaster?.toFixed(2)}</th>
                        <th>{item?.shareAmountMaster?.toFixed(2)}</th>
                        <th>{item?.mobileAppMaster?.toFixed(2)}</th>
                        <th>{item?.finalAmountMaster?.toFixed(2)}</th>
                        <th>{item?.matchCommissionSuperMaster?.toFixed(2)}</th>
                        <th>
                          {item?.sessionCommissionSuperMaster?.toFixed(2)}
                        </th>
                        <th>{item?.totalCommissionSuperMaster?.toFixed(2)}</th>
                        <th>{item?.netAmountSuperMaster?.toFixed(2)}</th>
                        <th>{item?.shareAmountSuperMaster?.toFixed(2)}</th>
                        <th>{item?.mobileAppSuperMaster?.toFixed(2)}</th>
                        <th>{item?.finalAmountSuperMaster?.toFixed(2)}</th>
                        <th>{item?.matchCommissionSubAdmin?.toFixed(2)}</th>
                        <th>{item?.sessionCommissionSubAdmin?.toFixed(2)}</th>
                        <th>{item?.totalCommissionSubAdmin?.toFixed(2)}</th>
                        <th>{item?.netAmountSubAdmin?.toFixed(2)}</th>
                        <th>{item?.shareAmountSubAdmin?.toFixed(2)}</th>
                        <th>{item?.mobileAppSubAdmin?.toFixed(2)}</th>
                        <th>{item?.finalAmountSubAdmin?.toFixed(2)}</th>
                        <th>{item?.matchCommissionAdmin?.toFixed(2)}</th>
                        <th>{item?.sessionCommissionAdmin?.toFixed(2)}</th>
                        <th>{item?.totalCommissionAdmin?.toFixed(2)}</th>
                        <th>{item?.netAmountAdmin?.toFixed(2)}</th>
                        <th>{item?.shareAmountAdmin?.toFixed(2)}</th>
                        <th>{item?.mobileAppAdmin?.toFixed(2)}</th>
                        <th>{item?.finalAmountAdmin?.toFixed(2)}</th>
                        <th>{item?.matchCommissionSuperAdmin?.toFixed(2)}</th>
                        <th>{item?.sessionCommissionSuperAdmin?.toFixed(2)}</th>
                        <th>{item?.totalCommissionSuperAdmin?.toFixed(2)}</th>
                        <th>{item?.netAmountSuperAdmin?.toFixed(2)}</th>
                        <th>{item?.shareAmountSuperAdmin?.toFixed(2)}</th>
                        <th>{item?.mobileAppSuperAdmin?.toFixed(2)}</th>
                        <th>{item?.finalAmountSuperAdmin?.toFixed(2)}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            )}
          </div>
          {depthKeysF[depth] !== "A" && (
            <div className="card-footer" style={{ overflow: "scroll" }}>
              <table className="plus-table plus_minus_sec">
                <thead className="bg-gradient-white">
                  <tr>
                    <th
                      style={{
                        whiteSpace: "nowrap",
                      }}>
                      {depthKeysF[depth]} TOTAL
                    </th>
                    <th>{item?.matchAmount?.toFixed(2)}</th>
                    <th>{item?.sessionAmount?.toFixed(2)}</th>
                    <th>{item?.totalAmoount?.toFixed(2)}</th>
                    <th>{item?.matchCommissionDealer?.toFixed(2)}</th>
                    <th>{item?.sessionCommissionDealer?.toFixed(2)}</th>
                    <th>{item?.totalCommissionDealer?.toFixed(2)}</th>
                    <th>{item?.netAmountDealer?.toFixed(2)}</th>
                    <th>{item?.shareAmountDealer?.toFixed(2)}</th>
                    <th>{item?.mobileAppDealer?.toFixed(2)}</th>
                    <th>{item?.finalAmountDealer?.toFixed(2)}</th>
                    <th>{item?.matchCommissionMaster?.toFixed(2)}</th>
                    <th>{item?.sessionCommissionMaster?.toFixed(2)}</th>
                    <th>{item?.totalCommissionMaster?.toFixed(2)}</th>
                    <th>{item?.netAmountMaster?.toFixed(2)}</th>
                    <th>{item?.shareAmountMaster?.toFixed(2)}</th>
                    <th>{item?.mobileAppMaster?.toFixed(2)}</th>
                    <th>{item?.finalAmountMaster?.toFixed(2)}</th>
                    <th>{item?.matchCommissionSuperMaster?.toFixed(2)}</th>
                    <th>{item?.sessionCommissionSuperMaster?.toFixed(2)}</th>
                    <th>{item?.totalCommissionSuperMaster?.toFixed(2)}</th>
                    <th>{item?.netAmountSuperMaster?.toFixed(2)}</th>
                    <th>{item?.shareAmountSuperMaster?.toFixed(2)}</th>
                    <th>{item?.mobileAppSuperMaster?.toFixed(2)}</th>
                    <th>{item?.finalAmountSuperMaster?.toFixed(2)}</th>
                    <th>{item?.matchCommissionSubAdmin?.toFixed(2)}</th>
                    <th>{item?.sessionCommissionSubAdmin?.toFixed(2)}</th>
                    <th>{item?.totalCommissionSubAdmin?.toFixed(2)}</th>
                    <th>{item?.netAmountSubAdmin?.toFixed(2)}</th>
                    <th>{item?.shareAmountSubAdmin?.toFixed(2)}</th>
                    <th>{item?.mobileAppSubAdmin?.toFixed(2)}</th>
                    <th>{item?.finalAmountSubAdmin?.toFixed(2)}</th>
                    <th>{item?.matchCommissionAdmin?.toFixed(2)}</th>
                    <th>{item?.sessionCommissionAdmin?.toFixed(2)}</th>
                    <th>{item?.totalCommissionAdmin?.toFixed(2)}</th>
                    <th>{item?.netAmountAdmin?.toFixed(2)}</th>
                    <th>{item?.shareAmountAdmin?.toFixed(2)}</th>
                    <th>{item?.mobileAppAdmin?.toFixed(2)}</th>
                    <th>{item?.finalAmountAdmin?.toFixed(2)}</th>
                    <th>{item?.matchCommissionSuperAdmin?.toFixed(2)}</th>
                    <th>{item?.sessionCommissionSuperAdmin?.toFixed(2)}</th>
                    <th>{item?.totalCommissionSuperAdmin?.toFixed(2)}</th>
                    <th>{item?.netAmountSuperAdmin?.toFixed(2)}</th>
                    <th>{item?.shareAmountSuperAdmin?.toFixed(2)}</th>
                    <th>{item?.mobileAppSuperAdmin?.toFixed(2)}</th>
                    <th>{item?.finalAmountSuperAdmin?.toFixed(2)}</th>
                  </tr>
                </thead>
              </table>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

const depthLabels = ["Admin", "Subadmin", "MasterAgent", "SuperAgent", "Agent"];
const depthColors = ["purple", "primary", "success", "purple", "primary"];
const depthKeys = [
  "adminName",
  "subAdminName",
  "superMasterName",
  "masterName",
  "dealerName",
];
const depthKeysF = ["Ad.", "SUB", "MA", "SA", "A"];

const LedgerDataComponentSuper = ({ ledgerData }) => {
  return (
    <>
      <div className={`card card-dark`}>
        <div className="card-body">
          <RecursiveCard data={ledgerData?.data?.ledgetList} depth={0} />
          <div className="card-footer" style={{ overflow: "scroll" }}>
            <table className="plus-table plus_minus_sec">
              <thead className="bg-gradient-white">
                <tr>
                  <th
                    style={{
                      whiteSpace: "nowrap",
                    }}>
                    AA TOTAL
                  </th>
                  <th>{ledgerData?.data?.matchAmount?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.sessionAmount?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.totalAmoount?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.matchCommissionDealer?.toFixed(2)}</th>
                  <th>
                    {ledgerData?.data?.sessionCommissionDealer?.toFixed(2)}
                  </th>
                  <th>{ledgerData?.data?.totalCommissionDealer?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.netAmountDealer?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.shareAmountDealer?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.mobileAppDealer?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.finalAmountDealer?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.matchCommissionMaster?.toFixed(2)}</th>
                  <th>
                    {ledgerData?.data?.sessionCommissionMaster?.toFixed(2)}
                  </th>
                  <th>{ledgerData?.data?.totalCommissionMaster?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.netAmountMaster?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.shareAmountMaster?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.mobileAppMaster?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.finalAmountMaster?.toFixed(2)}</th>
                  <th>
                    {ledgerData?.data?.matchCommissionSuperMaster?.toFixed(2)}
                  </th>
                  <th>
                    {ledgerData?.data?.sessionCommissionSuperMaster?.toFixed(2)}
                  </th>
                  <th>
                    {ledgerData?.data?.totalCommissionSuperMaster?.toFixed(2)}
                  </th>
                  <th>{ledgerData?.data?.netAmountSuperMaster?.toFixed(2)}</th>
                  <th>
                    {ledgerData?.data?.shareAmountSuperMaster?.toFixed(2)}
                  </th>
                  <th>{ledgerData?.data?.mobileAppSuperMaster?.toFixed(2)}</th>
                  <th>
                    {ledgerData?.data?.finalAmountSuperMaster?.toFixed(2)}
                  </th>
                  <th>
                    {ledgerData?.data?.matchCommissionSubAdmin?.toFixed(2)}
                  </th>
                  <th>
                    {ledgerData?.data?.sessionCommissionSubAdmin?.toFixed(2)}
                  </th>
                  <th>
                    {ledgerData?.data?.totalCommissionSubAdmin?.toFixed(2)}
                  </th>
                  <th>{ledgerData?.data?.netAmountSubAdmin?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.shareAmountSubAdmin?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.mobileAppSubAdmin?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.finalAmountSubAdmin?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.matchCommissionAdmin?.toFixed(2)}</th>
                  <th>
                    {ledgerData?.data?.sessionCommissionAdmin?.toFixed(2)}
                  </th>
                  <th>{ledgerData?.data?.totalCommissionAdmin?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.netAmountAdmin?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.shareAmountAdmin?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.mobileAppAdmin?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.finalAmountAdmin?.toFixed(2)}</th>
                  <th>
                    {ledgerData?.data?.matchCommissionSuperAdmin?.toFixed(2)}
                  </th>
                  <th>
                    {ledgerData?.data?.sessionCommissionSuperAdmin?.toFixed(2)}
                  </th>
                  <th>
                    {ledgerData?.data?.totalCommissionSuperAdmin?.toFixed(2)}
                  </th>
                  <th>{ledgerData?.data?.netAmountSuperAdmin?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.shareAmountSuperAdmin?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.mobileAppSuperAdmin?.toFixed(2)}</th>
                  <th>{ledgerData?.data?.finalAmountSuperAdmin?.toFixed(2)}</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LedgerDataComponentSuper;
