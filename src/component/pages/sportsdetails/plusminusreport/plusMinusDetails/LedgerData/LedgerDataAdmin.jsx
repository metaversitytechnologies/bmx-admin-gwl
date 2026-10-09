import { UserRound } from "lucide-react";
import LedgerAmount from "./LedgerAmount";
import { convertCode } from "../../../../../../store/constant";

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
          <div className={` card-header ${`color_${depth}`} `} data-ledger-role={depthKeys[depth]}>
            <h2 className="card-title text-bold">
              <span className="ledger-role-icon"><UserRound size={19} aria-hidden="true" /></span>
              <span className="border-title">{depthLabels[depth]}</span>
              <span className="border-userid">{convertCode(item[depthKeys[depth]])}</span>
            </h2>
          </div>
          <div className="card-body">
            {depth < depthKeys.length - 1 ? (
              <RecursiveCard data={item.ledgetList} depth={depth + 1} />
            ) : (
              <>
                <div className="card-body">
                  <div className="ledger-table-scroll">
                  <table data-ledger-columns="34" id="data" className="plus-table plus_minus_sec"><colgroup><col className="ledger-client-col" /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /></colgroup>
                    <thead>
                      <tr>
                        <th colSpan={4} />
                        <th colSpan={6}>Agent PlusMinus </th>
                        <th colSpan={6}>Super Agent PlusMinus </th>
                        <th colSpan={6}>Master Agent PlusMinus </th>
                        <th colSpan={6}>madmin PlusMinus</th>
                        <th colSpan={6}>Admin PlusMinus</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>M Amt</th>
                        <th>S Amt</th>
                        <th>TOT Amt</th>
                        <th>M Com</th>
                        <th>S Com</th>
                        <th>T Com</th>
                        <th>Net Amt</th>
                        <th>SHR</th>
                        <th>Final</th>
                        <th>M Com</th>
                        <th>S Com</th>
                        <th>T Com</th>
                        <th>Net Amt</th>
                        <th>SHR</th>
                        <th>Final</th>
                        <th>M Com</th>
                        <th>S Com</th>
                        <th>T Com</th>
                        <th>Net Amt</th>
                        <th>SHR</th>
                        <th>Final</th>
                        <th>M Com</th>
                        <th>S Com</th>
                        <th>T Com</th>
                        <th>Net Amt</th>
                        <th>SHR</th>
                        <th>Final</th>
                        <th>M Com</th>
                        <th>S Com</th>
                        <th>T Com</th>
                        <th>Net Amt</th>
                        <th>SHR</th>
                        <th>Final</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.ledgetList.map((agent) => (
                        <tr key={agent.userId}>
                          <td style={{
                                color: "#173fad",
                                fontWeight: "bold",
                              }}>
                            {agent.userId} {agent.username}
                          </td>
                          <td><LedgerAmount value={agent?.matchAmount}>{agent?.matchAmount?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.sessionAmount}>{agent?.sessionAmount?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.totalAmoount}>{agent?.totalAmoount?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount commission value={agent?.matchCommissionDealer}>{agent?.matchCommissionDealer?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount commission value={agent?.sessionCommissionDealer}>{agent?.sessionCommissionDealer?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount commission value={agent?.totalCommissionDealer}>{agent?.totalCommissionDealer?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.netAmountDealer}>{agent?.netAmountDealer?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.shareAmountDealer}>{agent?.shareAmountDealer?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.finalAmountDealer}>{agent?.finalAmountDealer?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount commission value={agent?.matchCommissionMaster}>{agent?.matchCommissionMaster?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount commission value={agent?.sessionCommissionMaster}>{agent?.sessionCommissionMaster?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount commission value={agent?.totalCommissionMaster}>{agent?.totalCommissionMaster?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.netAmountMaster}>{agent?.netAmountMaster?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.shareAmountMaster}>{agent?.shareAmountMaster?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.finalAmountMaster}>{agent?.finalAmountMaster?.toFixed(2)}</LedgerAmount></td>
                          <td>
                            <LedgerAmount commission value={agent?.matchCommissionSuperMaster}>{agent?.matchCommissionSuperMaster?.toFixed(2)}</LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount commission value={agent?.sessionCommissionSuperMaster}>{agent?.sessionCommissionSuperMaster?.toFixed(2)}</LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount commission value={agent?.totalCommissionSuperMaster}>{agent?.totalCommissionSuperMaster?.toFixed(2)}</LedgerAmount>
                          </td>
                          <td><LedgerAmount value={agent?.netAmountSuperMaster}>{agent?.netAmountSuperMaster?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.shareAmountSuperMaster}>{agent?.shareAmountSuperMaster?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.finalAmountSuperMaster}>{agent?.finalAmountSuperMaster?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount commission value={agent?.matchCommissionSubAdmin}>{agent?.matchCommissionSubAdmin?.toFixed(2)}</LedgerAmount></td>
                          <td>
                            <LedgerAmount commission value={agent?.sessionCommissionSubAdmin}>{agent?.sessionCommissionSubAdmin?.toFixed(2)}</LedgerAmount>
                          </td>
                          <td><LedgerAmount commission value={agent?.totalCommissionSubAdmin}>{agent?.totalCommissionSubAdmin?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.netAmountSubAdmin}>{agent?.netAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.shareAmountSubAdmin}>{agent?.shareAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.finalAmountSubAdmin}>{agent?.finalAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount commission value={agent?.matchCommissionAdmin}>{agent?.matchCommissionAdmin?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount commission value={agent?.sessionCommissionAdmin}>{agent?.sessionCommissionAdmin?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount commission value={agent?.totalCommissionAdmin}>{agent?.totalCommissionAdmin?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.netAmountAdmin}>{agent?.netAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.shareAmountAdmin}>{agent?.shareAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                          <td><LedgerAmount value={agent?.finalAmountAdmin}>{agent?.finalAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>TOTAL</th>
                        <td><LedgerAmount value={item?.matchAmount}>{item?.matchAmount?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.sessionAmount}>{item?.sessionAmount?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.totalAmoount}>{item?.totalAmoount?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.matchCommissionDealer}>{item?.matchCommissionDealer?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.sessionCommissionDealer}>{item?.sessionCommissionDealer?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.totalCommissionDealer}>{item?.totalCommissionDealer?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.netAmountDealer}>{item?.netAmountDealer?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.shareAmountDealer}>{item?.shareAmountDealer?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.finalAmountDealer}>{item?.finalAmountDealer?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.matchCommissionMaster}>{item?.matchCommissionMaster?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.sessionCommissionMaster}>{item?.sessionCommissionMaster?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.totalCommissionMaster}>{item?.totalCommissionMaster?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.netAmountMaster}>{item?.netAmountMaster?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.shareAmountMaster}>{item?.shareAmountMaster?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.finalAmountMaster}>{item?.finalAmountMaster?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.matchCommissionSuperMaster}>{item?.matchCommissionSuperMaster?.toFixed(2)}</LedgerAmount></td>
                        <td>
                          <LedgerAmount commission value={item?.sessionCommissionSuperMaster}>{item?.sessionCommissionSuperMaster?.toFixed(2)}</LedgerAmount>
                        </td>
                        <td><LedgerAmount commission value={item?.totalCommissionSuperMaster}>{item?.totalCommissionSuperMaster?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.netAmountSuperMaster}>{item?.netAmountSuperMaster?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.shareAmountSuperMaster}>{item?.shareAmountSuperMaster?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.finalAmountSuperMaster}>{item?.finalAmountSuperMaster?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.matchCommissionSubAdmin}>{item?.matchCommissionSubAdmin?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.sessionCommissionSubAdmin}>{item?.sessionCommissionSubAdmin?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.totalCommissionSubAdmin}>{item?.totalCommissionSubAdmin?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.netAmountSubAdmin}>{item?.netAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.shareAmountSubAdmin}>{item?.shareAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.finalAmountSubAdmin}>{item?.finalAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.matchCommissionAdmin}>{item?.matchCommissionAdmin?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.sessionCommissionAdmin}>{item?.sessionCommissionAdmin?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount commission value={item?.totalCommissionAdmin}>{item?.totalCommissionAdmin?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.netAmountAdmin}>{item?.netAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.shareAmountAdmin}>{item?.shareAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                        <td><LedgerAmount value={item?.finalAmountAdmin}>{item?.finalAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                      </tr>
                    </tfoot>
                  </table>
                  </div>
                </div>
              </>
            )}
          </div>
          {depthKeysF[depth] !== "A" && (
            <div className="card-footer">
              <div className="ledger-table-scroll">
              <table data-ledger-columns="34"
                className="plus-table plus_minus_sec"
                style={{ height: "auto", minHeight: "auto" }}><colgroup><col className="ledger-client-col" /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /></colgroup>
                <thead className="bg-gradient-white">
                  <tr>
                    <th
                      style={{
                        whiteSpace: "nowrap",
                      }}>
                      {depthKeysF[depth]} TOTAL
                    </th>
                    <td><LedgerAmount value={item?.matchAmount}>{item?.matchAmount?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.sessionAmount}>{item?.sessionAmount?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.totalAmoount}>{item?.totalAmoount?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.matchCommissionDealer}>{item?.matchCommissionDealer?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.sessionCommissionDealer}>{item?.sessionCommissionDealer?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.totalCommissionDealer}>{item?.totalCommissionDealer?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.netAmountDealer}>{item?.netAmountDealer?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.shareAmountDealer}>{item?.shareAmountDealer?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.finalAmountDealer}>{item?.finalAmountDealer?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.matchCommissionMaster}>{item?.matchCommissionMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.sessionCommissionMaster}>{item?.sessionCommissionMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.totalCommissionMaster}>{item?.totalCommissionMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.netAmountMaster}>{item?.netAmountMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.shareAmountMaster}>{item?.shareAmountMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.finalAmountMaster}>{item?.finalAmountMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.matchCommissionSuperMaster}>{item?.matchCommissionSuperMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.sessionCommissionSuperMaster}>{item?.sessionCommissionSuperMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.totalCommissionSuperMaster}>{item?.totalCommissionSuperMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.netAmountSuperMaster}>{item?.netAmountSuperMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.shareAmountSuperMaster}>{item?.shareAmountSuperMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.finalAmountSuperMaster}>{item?.finalAmountSuperMaster?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.matchCommissionSubAdmin}>{item?.matchCommissionSubAdmin?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.sessionCommissionSubAdmin}>{item?.sessionCommissionSubAdmin?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.totalCommissionSubAdmin}>{item?.totalCommissionSubAdmin?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.netAmountSubAdmin}>{item?.netAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.shareAmountSubAdmin}>{item?.shareAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.finalAmountSubAdmin}>{item?.finalAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.matchCommissionAdmin}>{item?.matchCommissionAdmin?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.sessionCommissionAdmin}>{item?.sessionCommissionAdmin?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount commission value={item?.totalCommissionAdmin}>{item?.totalCommissionAdmin?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.netAmountAdmin}>{item?.netAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.shareAmountAdmin}>{item?.shareAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                    <td><LedgerAmount value={item?.finalAmountAdmin}>{item?.finalAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                  </tr>
                </thead>
              </table>
                  </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

const depthLabels = ["madmin", "MasterAgent", "SuperAgent", "Agent"];
const depthColors = ["purple", "primary", "success", "purple"];
const depthKeys = [
  "subAdminName",
  "superMasterName",
  "masterName",
  "dealerName",
];
const depthKeysF = ["AD", "MA", "SA", "A"];

const LedgerDataAdmin = ({ ledgerData }) => {
  return (
    <>
      <div className={`card card-dark`}>
        <div className="card-body">
          <RecursiveCard data={ledgerData?.data?.ledgetList} depth={0} />
          <div className="card-footer">
            <div className="ledger-table-scroll">
            <table data-ledger-columns="34"
              className="plus-table plus_minus_sec"
              style={{ height: "auto", minHeight: "auto" }}><colgroup><col className="ledger-client-col" /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /></colgroup>
              <thead className="bg-gradient-white">
                <tr>
                  <th
                    style={{
                      whiteSpace: "nowrap",
                    }}>
                     Ad TOTAL
                  </th>
                  <td><LedgerAmount value={ledgerData?.data?.matchAmount}>{ledgerData?.data?.matchAmount?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.sessionAmount}>{ledgerData?.data?.sessionAmount?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.totalAmoount}>{ledgerData?.data?.totalAmoount?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount commission value={ledgerData?.data?.matchCommissionDealer}>{ledgerData?.data?.matchCommissionDealer?.toFixed(2)}</LedgerAmount></td>
                  <td>
                    <LedgerAmount commission value={ledgerData?.data?.sessionCommissionDealer}>{ledgerData?.data?.sessionCommissionDealer?.toFixed(2)}</LedgerAmount>
                  </td>
                  <td><LedgerAmount commission value={ledgerData?.data?.totalCommissionDealer}>{ledgerData?.data?.totalCommissionDealer?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.netAmountDealer}>{ledgerData?.data?.netAmountDealer?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.shareAmountDealer}>{ledgerData?.data?.shareAmountDealer?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.finalAmountDealer}>{ledgerData?.data?.finalAmountDealer?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount commission value={ledgerData?.data?.matchCommissionMaster}>{ledgerData?.data?.matchCommissionMaster?.toFixed(2)}</LedgerAmount></td>
                  <td>
                    <LedgerAmount commission value={ledgerData?.data?.sessionCommissionMaster}>{ledgerData?.data?.sessionCommissionMaster?.toFixed(2)}</LedgerAmount>
                  </td>
                  <td><LedgerAmount commission value={ledgerData?.data?.totalCommissionMaster}>{ledgerData?.data?.totalCommissionMaster?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.netAmountMaster}>{ledgerData?.data?.netAmountMaster?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.shareAmountMaster}>{ledgerData?.data?.shareAmountMaster?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.finalAmountMaster}>{ledgerData?.data?.finalAmountMaster?.toFixed(2)}</LedgerAmount></td>
                  <td>
                    <LedgerAmount commission value={ledgerData?.data?.matchCommissionSuperMaster}>{ledgerData?.data?.matchCommissionSuperMaster?.toFixed(2)}</LedgerAmount>
                  </td>
                  <td>
                    <LedgerAmount commission value={ledgerData?.data?.sessionCommissionSuperMaster}>{ledgerData?.data?.sessionCommissionSuperMaster?.toFixed(2)}</LedgerAmount>
                  </td>
                  <td>
                    <LedgerAmount commission value={ledgerData?.data?.totalCommissionSuperMaster}>{ledgerData?.data?.totalCommissionSuperMaster?.toFixed(2)}</LedgerAmount>
                  </td>
                  <td><LedgerAmount value={ledgerData?.data?.netAmountSuperMaster}>{ledgerData?.data?.netAmountSuperMaster?.toFixed(2)}</LedgerAmount></td>
                  <td>
                    <LedgerAmount value={ledgerData?.data?.shareAmountSuperMaster}>{ledgerData?.data?.shareAmountSuperMaster?.toFixed(2)}</LedgerAmount>
                  </td>
                  <td>
                    <LedgerAmount value={ledgerData?.data?.finalAmountSuperMaster}>{ledgerData?.data?.finalAmountSuperMaster?.toFixed(2)}</LedgerAmount>
                  </td>
                  <td>
                    <LedgerAmount commission value={ledgerData?.data?.matchCommissionSubAdmin}>{ledgerData?.data?.matchCommissionSubAdmin?.toFixed(2)}</LedgerAmount>
                  </td>
                  <td>
                    <LedgerAmount commission value={ledgerData?.data?.sessionCommissionSubAdmin}>{ledgerData?.data?.sessionCommissionSubAdmin?.toFixed(2)}</LedgerAmount>
                  </td>
                  <td>
                    <LedgerAmount commission value={ledgerData?.data?.totalCommissionSubAdmin}>{ledgerData?.data?.totalCommissionSubAdmin?.toFixed(2)}</LedgerAmount>
                  </td>
                  <td><LedgerAmount value={ledgerData?.data?.netAmountSubAdmin}>{ledgerData?.data?.netAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.shareAmountSubAdmin}>{ledgerData?.data?.shareAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.finalAmountSubAdmin}>{ledgerData?.data?.finalAmountSubAdmin?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount commission value={ledgerData?.data?.matchCommissionAdmin}>{ledgerData?.data?.matchCommissionAdmin?.toFixed(2)}</LedgerAmount></td>
                  <td>
                    <LedgerAmount commission value={ledgerData?.data?.sessionCommissionAdmin}>{ledgerData?.data?.sessionCommissionAdmin?.toFixed(2)}</LedgerAmount>
                  </td>
                  <td><LedgerAmount commission value={ledgerData?.data?.totalCommissionAdmin}>{ledgerData?.data?.totalCommissionAdmin?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.netAmountAdmin}>{ledgerData?.data?.netAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.shareAmountAdmin}>{ledgerData?.data?.shareAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                  <td><LedgerAmount value={ledgerData?.data?.finalAmountAdmin}>{ledgerData?.data?.finalAmountAdmin?.toFixed(2)}</LedgerAmount></td>
                </tr>
              </thead>
            </table>
                  </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LedgerDataAdmin;
