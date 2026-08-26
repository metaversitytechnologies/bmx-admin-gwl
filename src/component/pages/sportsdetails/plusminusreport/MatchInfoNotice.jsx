import { Info } from "lucide-react";

const MatchInfoNotice = () => (
  <div className="pmr-info-notice">
    <Info size={15} strokeWidth={1.8} />
    <span>Changes made here will be applicable to the selected match only.</span>
  </div>
);

export default MatchInfoNotice;
