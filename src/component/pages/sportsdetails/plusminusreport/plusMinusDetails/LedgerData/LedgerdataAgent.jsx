import LedgerAmount from "./LedgerAmount";

const LedgerdataAgent = ({ ledgerData }) => {
  return (
    <div className={`card width_card`}>
      <div
        className="card-body"
        style={{
          padding: "0px 3px",
        }}>
        <>
          <div className="card-body">
            <div className="ledger-table-scroll">
              <table
                data-ledger-columns="14"
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
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan={7} className="text-center">
                      Client PlusMinus{" "}
                    </th>
                    <th colSpan={7} className="text-center">
                      Agent PlusMinus{" "}
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th>CLIENT</th>
                    <th>M AMT</th>
                    <th>S AMT</th>
                    <th>C COM</th>
                    <th>NET AMT</th>
                    <th>C MOB</th>
                    <th>FINAL</th>
                    <th>M COM</th>
                    <th>S COM</th>
                    <th>T COM</th>
                    <th>NET AMT</th>
                    <th>SHR AMT</th>
                    <th>MOB APP</th>
                    <th>FINAL</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerData?.data?.ledgetList?.map((agent) => (
                    <tr key={agent.userId}>
                      <td
                        style={{
                          color: "#173fad",
                          fontWeight: "bold",
                        }}>
                        {agent.userId} {agent.username}
                      </td>
                      <td>
                        <LedgerAmount value={agent.matchAmount}>
                          {agent.matchAmount?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={agent.sessionAmount}>
                          {agent.sessionAmount?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={agent.clientCommission}>
                          {agent.clientCommission?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={agent.clientNetAmount}>
                          {agent.clientNetAmount?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={agent.clientMobileApp}>
                          {agent.clientMobileApp?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={agent.clientFinal}>
                          {agent.clientFinal?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount commission value={agent.matchCommissionDealer}>
                          {agent.matchCommissionDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount commission value={agent.sessionCommissionDealer}>
                          {agent.sessionCommissionDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount commission value={agent.totalCommissionDealer}>
                          {agent.totalCommissionDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={agent.netAmountDealer}>
                          {agent.netAmountDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={agent.shareAmountDealer}>
                          {agent.shareAmountDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={agent.mobileAppDealer}>
                          {agent.mobileAppDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                      <td>
                        <LedgerAmount value={agent.finalAmountDealer}>
                          {agent.finalAmountDealer?.toFixed(2)}
                        </LedgerAmount>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>TOTAL</th>
                    <th>
                      <LedgerAmount value={ledgerData?.data?.matchAmount}>
                        {ledgerData?.data?.matchAmount?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount value={ledgerData?.data?.sessionAmount}>
                        {ledgerData?.data?.sessionAmount?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount value={ledgerData?.data?.clientCommission}>
                        {ledgerData?.data?.clientCommission?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount value={ledgerData?.data?.clientNetAmount}>
                        {ledgerData?.data?.clientNetAmount?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount value={ledgerData?.data?.clientMobileApp}>
                        {ledgerData?.data?.clientMobileApp?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount value={ledgerData?.data?.clientFinal}>
                        {ledgerData?.data?.clientFinal?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount commission
                        value={ledgerData?.data.matchCommissionDealer}>
                        {ledgerData?.data.matchCommissionDealer?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount commission
                        value={ledgerData?.data.sessionCommissionDealer}>
                        {ledgerData?.data.sessionCommissionDealer?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount commission
                        value={ledgerData?.data.totalCommissionDealer}>
                        {ledgerData?.data.totalCommissionDealer?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount value={ledgerData?.data.netAmountDealer}>
                        {ledgerData?.data.netAmountDealer?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount value={ledgerData?.data.shareAmountDealer}>
                        {ledgerData?.data.shareAmountDealer?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount value={ledgerData?.data.mobileAppDealer}>
                        {ledgerData?.data.mobileAppDealer?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                    <th>
                      <LedgerAmount value={ledgerData?.data.finalAmountDealer}>
                        {ledgerData?.data.finalAmountDealer?.toFixed(2)}
                      </LedgerAmount>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default LedgerdataAgent;
