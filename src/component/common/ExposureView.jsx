import { Table } from "antd";
import { ChartNoAxesColumnIncreasing, Inbox } from "lucide-react";
import PropTypes from "prop-types";
import CustomLoading from "./CustomLoading/CustomLoading";

const recordType = (record) => record?.marketType == "Fancy"
  ? record?.back ? "YES" : "NOT"
  : record?.back ? "LAGAI" : "KHAI";
const matchName = (record) => `${record?.matchName ?? ""}-${record?.marketType === "Fancy" ? record?.marketType : "Bookmaker"}`;
const rowTone = (record) => record?.back ? "exposure-back" : "exposure-lay";
const recordKey = (record, index) => record.key ?? index;

function TypeBadge({ record }) {
  return <span className={`exposure-type ${rowTone(record)}`}>{recordType(record)}</span>;
}
function Money({ value, kind }) {
  return <span className={`exposure-money exposure-${kind}`}>{value?.toFixed(2)}</span>;
}
function EmptyExposure() {
  return <div className="exposure-empty">
    <Inbox size={30} strokeWidth={1.2} aria-hidden="true" />
    <strong>No data available</strong>
    <span className="exposure-empty-help">No records to show in this section</span>
  </div>;
}

function ExposureCards({ records, fancy }) {
  if (!records.length) return <EmptyExposure />;
  return <div className="exposure-cards">
    {records.map((record, index) => <article className={`exposure-card ${rowTone(record)}`} key={recordKey(record, index)}>
      <h2>{matchName(record)}</h2>
      <div className="exposure-time">{record.date}</div>
      <dl className="exposure-card-metrics">
        <div><dt>Selection</dt><dd><span className="exposure-selection">{record.selectionName}</span></dd></div>
        <div><dt>Stake</dt><dd>{record.stake}</dd></div>
        <div><dt>{fancy ? "Run" : "Rate"}</dt><dd>{record.odds}</dd></div>
        <div><dt>Type</dt><dd><TypeBadge record={record} /></dd></div>
      </dl>
      <div className="exposure-card-result">
        <div className="exposure-loss"><span>Loss</span><Money value={record.loss} kind="loss" /></div>
        <div className="exposure-profit"><span>Profit</span><Money value={record.profit} kind="profit" /></div>
      </div>
    </article>)}
  </div>;
}

function ExposureTable({ records, fancy, isLoading }) {
  const columns = [
    { title: "Match", dataIndex: "matchName", key: "matchName", width: "23%", render: (_, record) => <span className="exposure-match">{matchName(record)}</span> },
    { title: "Selection Name", dataIndex: "selectionName", key: "selectionName", width: "13%", align: "center", render: (value) => <span className="exposure-selection">{value}</span> },
    { title: "Stake", dataIndex: "stake", key: "stake", align: "right", width: "8%" },
    { title: fancy ? "Run" : "Rate", dataIndex: "odds", key: "odds", align: "right", width: "7%" },
    { title: "Type", dataIndex: "back", key: "back", width: "10%", align: "center", render: (_, record) => <TypeBadge record={record} /> },
    { title: "Time", dataIndex: "date", key: "date", width: "19%", render: (value) => <span className="exposure-time">{value}</span> },
    { title: "Loss", dataIndex: "loss", key: "loss", width: "10%", align: "right", render: (value) => <Money value={value} kind="loss" /> },
    { title: "Profit", dataIndex: "profit", key: "profit", width: "10%", align: "right", render: (value) => <Money value={value} kind="profit" /> },
  ];
  return <Table columns={columns} dataSource={records} rowKey={recordKey}
    pagination={false} rowClassName={rowTone} locale={{ emptyText: <EmptyExposure /> }}
    loading={{ spinning: isLoading, indicator: <CustomLoading /> }} />;
}

export default function ExposureView({ matchData, sessionData, isLoading }) {
  // Preserve the original second-table summary scope and arithmetic exactly.
  let totalProfit = 0;
  let totalLoss = 0;
  sessionData.forEach(({ profit, loss }) => {
    totalProfit += profit || 0;
    totalLoss += loss || 0;
  });

  return <>
    <div className="exposure-scroll-body" aria-busy={isLoading}>
      <div className="exposure-desktop">
        <section className="exposure-table-section" aria-label="Match exposure">
          <ExposureTable records={matchData} isLoading={isLoading} />
        </section>
        <section className="exposure-table-section" aria-label="Session exposure">
          <ExposureTable records={sessionData} fancy isLoading={isLoading} />
        </section>
      </div>
      <div className="exposure-mobile">
        {isLoading ? <div className="exposure-mobile-loading" role="status"><CustomLoading /><span>Loading exposure…</span></div> : <>
          <section aria-label="Match exposure"><ExposureCards records={matchData} /></section>
          <details className="exposure-second-section" open>
            <summary>Second Table</summary>
            <ExposureCards records={sessionData} fancy />
          </details>
        </>}
      </div>
    </div>
    <div className="exposure-total" aria-label="Total exposure">
      <strong className="exposure-total-title"><ChartNoAxesColumnIncreasing size={23} aria-hidden="true" />Total</strong>
      <div><span className="exposure-total-label">Loss</span><Money value={totalLoss} kind="loss" /></div>
      <div><span className="exposure-total-label">Profit</span><Money value={totalProfit} kind="profit" /></div>
    </div>
  </>;
}

TypeBadge.propTypes = { record: PropTypes.object.isRequired };
Money.propTypes = { value: PropTypes.number, kind: PropTypes.oneOf(["loss", "profit"]).isRequired };
ExposureCards.propTypes = { records: PropTypes.array.isRequired, fancy: PropTypes.bool };
ExposureTable.propTypes = { records: PropTypes.array.isRequired, fancy: PropTypes.bool, isLoading: PropTypes.bool };
ExposureView.propTypes = { matchData: PropTypes.array.isRequired, sessionData: PropTypes.array.isRequired, isLoading: PropTypes.bool };
