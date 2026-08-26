import PropTypes from "prop-types";

const ClientReportSkeleton = ({ rows }) => (
  <>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <tr key={rowIndex} className="cr2-skeleton-row" aria-hidden="true">
        <td>
          <span className="cr2-skeleton-bar" />
        </td>
        <td>
          <span className="cr2-skeleton-bar" style={{ width: "60px" }} />
        </td>
        <td>
          <span className="cr2-skeleton-bar" style={{ width: "70px" }} />
        </td>
      </tr>
    ))}
  </>
);

ClientReportSkeleton.propTypes = {
  rows: PropTypes.number,
};

ClientReportSkeleton.defaultProps = {
  rows: 6,
};

export default ClientReportSkeleton;
