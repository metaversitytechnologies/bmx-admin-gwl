import PropTypes from "prop-types";
import { Globe2, Pencil } from "lucide-react";
import DomainEmpty from "./DomainEmpty";

const DomainMobileList = ({ data, onUpdate }) => (
  <div className="create-domain-mobile-list">
    {data?.length > 0 ? (
      data.map((domain, index) => (
        <div className="create-domain-mobile-row" key={domain?.appId ?? index}>
          <span className="create-domain-row-icon">
            <Globe2 size={15} strokeWidth={1.8} />
          </span>
          <div className="create-domain-mobile-info">
            <span className="create-domain-mobile-name">
              {domain?.appName}
            </span>
            <span className="create-domain-mobile-url">{domain?.appUrl}</span>
          </div>
          <span className="create-domain-mobile-id">#{domain?.appId}</span>
          <button
            type="button"
            className="create-domain-update-btn"
            onClick={() => onUpdate(domain)}>
            <Pencil size={14} strokeWidth={1.8} />
            Update
          </button>
        </div>
      ))
    ) : (
      <DomainEmpty />
    )}
  </div>
);

DomainMobileList.propTypes = {
  data: PropTypes.array,
  onUpdate: PropTypes.func.isRequired,
};

export default DomainMobileList;
