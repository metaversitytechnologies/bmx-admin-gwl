import PropTypes from "prop-types";
import FancyBetRow from "./FancyBetRow";
import FancyBetsEmpty from "./FancyBetsEmpty";

const FancyBetsMobileTable = ({ rows }) => (
  <div className="fb-mobile-table-scroll">
    <table className="fb-mobile-table">
      <thead>
        <tr>
          <th>Client</th>
          <th className="fb-num-col">Run</th>
          <th className="fb-num-col">Amount</th>
          <th className="fb-num-col">Profit</th>
          <th className="fb-mobile-action">Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, index) => <FancyBetRow key={index} row={row} />)
        ) : (
          <tr>
            <td colSpan={5}>
              <FancyBetsEmpty />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

FancyBetsMobileTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default FancyBetsMobileTable;
