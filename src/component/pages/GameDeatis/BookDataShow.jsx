import { Modal, Tabs } from "antd";
import { BookOpen, ClipboardList, Layers, X } from "lucide-react";
import PropTypes from "prop-types";
import "./BookDataShow.scss";

const sideClass = (mode) => {
  const side = String(mode ?? "").toUpperCase();
  return ["YES", "BACK"].includes(side) ? "book-side-back" : ["NO", "LAY"].includes(side) ? "book-side-lay" : "";
};
const value = (data) => data ?? "—";
const username = (record) => `${record.userId ?? "—"}${record.username ? ` (${record.username})` : ""}`;
const Badge = ({ mode }) => <span className={`book-side-badge ${sideClass(mode)}`}>{value(mode)}</span>;
const Runner = ({ record }) => record.selectionName != null && record.selectionName !== "" ? <small className="book-runner">Runner: {record.selectionName}</small> : null;
const Empty = () => <div className="book-empty">No data available</div>;

export const BookRecords = ({ records = [] }) => (
  <div className="book-records-scroll">
    <table className="book-records-table book-pnl-table">
      <thead><tr><th scope="col">Run</th><th scope="col">pnl</th></tr></thead>
      <tbody>{records.map((record, index) => <tr key={record.key ?? index} className={sideClass(record.mode)}>
        <td>{value(record.odds)}</td>
        <td className={record.pnl > 0 ? "book-positive" : record.pnl < 0 ? "book-negative" : ""}>{value(record.pnl)}</td>
      </tr>)}</tbody>
    </table>
    {!records.length && <Empty />}
  </div>
);

export const BetRecords = ({ records = [] }) => (
  <div className="book-records-scroll">
    <table className="book-records-table book-bets-table">
      <colgroup><col style={{ width: "22%" }} /><col style={{ width: "25%" }} /><col style={{ width: "12%" }} /><col style={{ width: "13%" }} /><col style={{ width: "13%" }} /><col style={{ width: "15%" }} /></colgroup>
      <thead><tr>{["Place Time", "Username", "Bet Type", "Bet Price", "Bet Value", "Bet Amount"].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
      <tbody>{records.map((record, index) => <tr key={record.key ?? index} className={sideClass(record.mode)}>
        <td>{value(record.time)}</td><td>{username(record)}<Runner record={record} /></td><td><Badge mode={record.mode} /></td>
        <td>{value(record.rate)}</td><td>{value(record.run)}</td><td>{value(record.amount)}</td>
      </tr>)}</tbody>
    </table>
    <div className="book-bets-cards">{records.map((record, index) => <article key={record.key ?? index} className={`book-bet-card ${sideClass(record.mode)}`}>
      <div className="book-bet-top"><time>{value(record.time)}</time><Badge mode={record.mode} /></div>
      <div className="book-bet-user">{username(record)}<Runner record={record} /></div>
      <dl>{[["Bet Price", record.rate], ["Bet Value", record.run], ["Bet Amount", record.amount]].map(([label, amount]) => <div key={label}><dt>{label}</dt><dd>{value(amount)}</dd></div>)}</dl>
    </article>)}</div>
    {!records.length && <Empty />}
  </div>
);

const BookDataShow = ({ openBook, setOpenBook, fancyBookData, sessionData, fancyName }) => (
  <Modal centered width={1060} className="book-data-modal" title={<div className="book-modal-heading"><span className="book-modal-icon"><ClipboardList size={24} aria-hidden="true" /></span><h1>{fancyName}</h1></div>}
    closeIcon={<X size={26} aria-hidden="true" />} open={openBook} onCancel={() => setOpenBook(false)} footer={null}>
    <Tabs defaultActiveKey="book" className="book-modal-tabs" items={[
      { key: "book", label: <><BookOpen size={18} aria-hidden="true" />Book</>, children: <BookRecords records={fancyBookData || []} /> },
      { key: "bets", label: <><Layers size={18} aria-hidden="true" />Bets</>, children: <BetRecords records={sessionData || []} /> },
    ]} />
  </Modal>
);
export default BookDataShow;

Badge.propTypes = { mode: PropTypes.any };
Runner.propTypes = { record: PropTypes.object.isRequired };
BookRecords.propTypes = { records: PropTypes.array };
BetRecords.propTypes = { records: PropTypes.array };
BookDataShow.propTypes = {
  openBook: PropTypes.bool,
  setOpenBook: PropTypes.func.isRequired,
  fancyBookData: PropTypes.array,
  sessionData: PropTypes.array,
  fancyName: PropTypes.node,
};
