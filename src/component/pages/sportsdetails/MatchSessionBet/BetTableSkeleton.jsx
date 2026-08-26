import PropTypes from "prop-types";

const BetTableSkeleton = ({ columns, rows }) => (
  <>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <tr key={rowIndex} className="msb-skeleton-row" aria-hidden="true">
        {Array.from({ length: columns }).map((__, colIndex) => (
          <td key={colIndex}>
            <span className="msb-skeleton-bar" />
          </td>
        ))}
      </tr>
    ))}
  </>
);

BetTableSkeleton.propTypes = {
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number,
};

BetTableSkeleton.defaultProps = {
  rows: 5,
};

export default BetTableSkeleton;
