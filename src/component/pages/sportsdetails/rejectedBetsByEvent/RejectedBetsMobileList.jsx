import PropTypes from "prop-types";
import RejectedBetCard from "./RejectedBetCard";
import RejectedBetsEmpty from "./RejectedBetsEmpty";

// Mirrors the desktop table 1:1 but stacked into cards for narrow
// viewports — shown/hidden purely via CSS breakpoint, never a JS resize
// check, so it stays correct through SSR/hydration and print/export too.
const RejectedBetsMobileList = ({ rows, teamName, isLoading }) => (
  <div className="rb-mobile-list">
    {isLoading ? (
      <div className="rb-mobile-loading">Loading records…</div>
    ) : rows.length ? (
      rows.map((row, index) => (
        <RejectedBetCard key={index} row={row} teamName={teamName} />
      ))
    ) : (
      <RejectedBetsEmpty />
    )}
  </div>
);

RejectedBetsMobileList.propTypes = {
  rows: PropTypes.array.isRequired,
  teamName: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

export default RejectedBetsMobileList;
