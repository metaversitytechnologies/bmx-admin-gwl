import PropTypes from "prop-types";
import MobileBetRow from "./MobileBetRow";
import MatchBetsEmpty from "./MatchBetsEmpty";

const MatchBetsMobileTable = ({ rows }) => (
  <div className="mb-mobile-table-scroll">
    <table className="mb-mobile-table">
      <thead>
        <tr>
          <th className="mb-num-col">Rate</th>
          <th className="mb-num-col">Amount</th>
          <th>Type</th>
          <th>Team</th>
          <th>Client</th>
          <th className="mb-mobile-action">Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, index) => <MobileBetRow key={index} row={row} />)
        ) : (
          <tr>
            <td colSpan={6}>
              <MatchBetsEmpty />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

MatchBetsMobileTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default MatchBetsMobileTable;
