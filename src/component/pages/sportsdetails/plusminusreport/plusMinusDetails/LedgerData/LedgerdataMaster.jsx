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
          className={`card card-${depthColors[depth]}  card-purple`}>
          <div
            className={` card-header ${`color_${depth}`} `}
            data-ledger-role={depthKeys[depth]}>
            <h2 className="card-title text-bold">
              <span className="ledger-role-icon">
                <UserRound size={19} aria-hidden="true" />
              </span>
              <span className="border-title">{depthLabels[depth]}</span>
              <span className="border-userid">
                {convertCode(item[depthKeys[depth]])}
              </span>
            </h2>
          </div>
          <div className="card-body">
            {depth < depthKeys.length - 1 ? (
              <RecursiveCard data={item.ledgetList} depth={depth + 1} />
            ) : (
              <>
                <div className="card-body">
                  <div className="ledger-table-scroll">
                    <table
                      data-ledger-columns="16"
                      id="data"
                      className="plus-table plus_minus_sec">
                      <colgroup>
                        <col className="ledger-client-col" />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan={4} />
                          <th colSpan={6}>Agent PlusMinus </th>
                          <th colSpan={6}>Super Agent PlusMinus </th>
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
                        </tr>
                      </thead>
                      <tbody>
                        {item.ledgetList.map((agent) => {
                          return (
                            <tr key={agent.userId}>
                              <td
                                style={{
                                  color: "#173fad",
                                  fontWeight: "bold",
                                }}>
                                {agent.userId} {agent.username}
                              </td>
                              <td>
                                <LedgerAmount value={agent?.matchAmount}>
                                  {agent?.matchAmount?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount value={agent?.sessionAmount}>
                                  {agent?.sessionAmount?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount value={agent?.totalAmoount}>
                                  {agent?.totalAmoount?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount commission
                                  value={agent?.matchCommissionDealer}>
                                  {agent?.matchCommissionDealer?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount commission
                                  value={agent?.sessionCommissionDealer}>
                                  {agent?.sessionCommissionDealer?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount commission
                                  value={agent?.totalCommissionDealer}>
                                  {agent?.totalCommissionDealer?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount value={agent?.netAmountDealer}>
                                  {agent?.netAmountDealer?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount value={agent?.shareAmountDealer}>
                                  {agent?.shareAmountDealer?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount value={agent?.finalAmountDealer}>
                                  {agent?.finalAmountDealer?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount commission
                                  value={agent?.matchCommissionMaster}>
                                  {agent?.matchCommissionMaster?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount commission
                                  value={agent?.sessionCommissionMaster}>
                                  {agent?.sessionCommissionMaster?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount commission
                                  value={agent?.totalCommissionMaster}>
                                  {agent?.totalCommissionMaster?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount value={agent?.netAmountMaster}>
                                  {agent?.netAmountMaster?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount value={agent?.shareAmountMaster}>
                                  {agent?.shareAmountMaster?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                              <td>
                                <LedgerAmount value={agent?.finalAmountMaster}>
                                  {agent?.finalAmountMaster?.toFixed(2)}
                                </LedgerAmount>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>TOTAL</th>
                          <td>
                            <LedgerAmount value={item?.matchAmount}>
                              {item?.matchAmount?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount value={item?.sessionAmount}>
                              {item?.sessionAmount?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount value={item?.totalAmoount}>
                              {item?.totalAmoount?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount commission value={item?.matchCommissionDealer}>
                              {item?.matchCommissionDealer?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount commission value={item?.sessionCommissionDealer}>
                              {item?.sessionCommissionDealer?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount commission value={item?.totalCommissionDealer}>
                              {item?.totalCommissionDealer?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount value={item?.netAmountDealer}>
                              {item?.netAmountDealer?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount value={item?.shareAmountDealer}>
                              {item?.shareAmountDealer?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount value={item?.finalAmountDealer}>
                              {item?.finalAmountDealer?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount commission value={item?.matchCommissionMaster}>
                              {item?.matchCommissionMaster?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount commission value={item?.sessionCommissionMaster}>
                              {item?.sessionCommissionMaster?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount commission value={item?.totalCommissionMaster}>
                              {item?.totalCommissionMaster?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount value={item?.netAmountMaster}>
                              {item?.netAmountMaster?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount value={item?.shareAmountMaster}>
                              {item?.shareAmountMaster?.toFixed(2)}
                            </LedgerAmount>
                          </td>
                          <td>
                            <LedgerAmount value={item?.finalAmountMaster}>
                              {item?.finalAmountMaster?.toFixed(2)}
                            </LedgerAmount>
                          </td>
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
                <table
                  data-ledger-columns="16"
                  className="plus-table plus_minus_sec"
                  style={{ height: "auto", minHeight: "auto" }}>
                  <colgroup>
                    <col className="ledger-client-col" />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead className="bg-gradient-white">
                    <tr>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                        }}>
                        {depthKeysF[depth]} TOTAL
                      </th>
                      <td>
                        <LedgerAmount value={item?.matchAmount}>
                          {item?.matchAmount?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={item?.sessionAmount}>
                          {item?.sessionAmount?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={item?.totalAmoount}>
                          {item?.totalAmoount?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount commission value={item?.matchCommissionDealer}>
                          {item?.matchCommissionDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount commission value={item?.sessionCommissionDealer}>
                          {item?.sessionCommissionDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount commission value={item?.totalCommissionDealer}>
                          {item?.totalCommissionDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={item?.netAmountDealer}>
                          {item?.netAmountDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={item?.shareAmountDealer}>
                          {item?.shareAmountDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={item?.finalAmountDealer}>
                          {item?.finalAmountDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount commission value={item?.matchCommissionMaster}>
                          {item?.matchCommissionMaster?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount commission value={item?.sessionCommissionMaster}>
                          {item?.sessionCommissionMaster?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount commission value={item?.totalCommissionMaster}>
                          {item?.totalCommissionMaster?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={item?.netAmountMaster}>
                          {item?.netAmountMaster?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={item?.shareAmountMaster}>
                          {item?.shareAmountMaster?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={item?.finalAmountMaster}>
                          {item?.finalAmountMaster?.toFixed(2)}
                        </LedgerAmount>
                      </td>
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

const depthKeys = ["dealerName"];
const depthKeysF = ["A"];
const depthColors = ["purple"];
const depthLabels = ["Agent"];

const LedgerdataMaster = ({ ledgerData }) => {
  return (
    <>
      <div className={`card card-dark`}>
        <div className="card-body">
          <RecursiveCard data={ledgerData?.data?.ledgetList} depth={0} />
          <div className="card-footer">
            <div className="ledger-table-scroll">
              <table
                data-ledger-columns="16"
                className="plus-table plus_minus_sec"
                style={{ height: "auto", minHeight: "auto" }}>
                <colgroup>
                  <col className="ledger-client-col" />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="bg-gradient-white">
                  <tr>
                    <th
                      style={{
                        whiteSpace: "nowrap",
                      }}>
                      SM TOTAL
                    </th>
                    <td>
                      <LedgerAmount value={ledgerData?.data?.matchAmount}>
                        {ledgerData?.data?.matchAmount?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount value={ledgerData?.data?.sessionAmount}>
                        {ledgerData?.data?.sessionAmount?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount value={ledgerData?.data?.totalAmoount}>
                        {ledgerData?.data?.totalAmoount?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount commission
                        value={ledgerData?.data?.matchCommissionDealer}>
                        {ledgerData?.data?.matchCommissionDealer?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount commission
                        value={ledgerData?.data?.sessionCommissionDealer}>
                        {ledgerData?.data?.sessionCommissionDealer?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount commission
                        value={ledgerData?.data?.totalCommissionDealer}>
                        {ledgerData?.data?.totalCommissionDealer?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount value={ledgerData?.data?.netAmountDealer}>
                        {ledgerData?.data?.netAmountDealer?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount value={ledgerData?.data?.shareAmountDealer}>
                        {ledgerData?.data?.shareAmountDealer?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount value={ledgerData?.data?.finalAmountDealer}>
                        {ledgerData?.data?.finalAmountDealer?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount commission
                        value={ledgerData?.data?.matchCommissionMaster}>
                        {ledgerData?.data?.matchCommissionMaster?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount commission
                        value={ledgerData?.data?.sessionCommissionMaster}>
                        {ledgerData?.data?.sessionCommissionMaster?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount commission
                        value={ledgerData?.data?.totalCommissionMaster}>
                        {ledgerData?.data?.totalCommissionMaster?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount value={ledgerData?.data?.netAmountMaster}>
                        {ledgerData?.data?.netAmountMaster?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount value={ledgerData?.data?.shareAmountMaster}>
                        {ledgerData?.data?.shareAmountMaster?.toFixed(2)}
                      </LedgerAmount>
                    </td>
                    <td>
                      <LedgerAmount value={ledgerData?.data?.finalAmountMaster}>
                        {ledgerData?.data?.finalAmountMaster?.toFixed(2)}
                      </LedgerAmount>
                    </td>
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

export default LedgerdataMaster;
