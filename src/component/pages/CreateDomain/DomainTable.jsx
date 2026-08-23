import PropTypes from "prop-types";
import { Globe2, Pencil } from "lucide-react";
import DomainEmpty from "./DomainEmpty";

const DomainTable = ({ data, onUpdate }) => (
  <div className="create-domain-table-scroll">
    <table className="create-domain-table">
      <colgroup>
        <col style={{ width: "36%" }} />
        <col style={{ width: "34%" }} />
        <col style={{ width: "14%" }} />
        <col style={{ width: "16%" }} />
      </colgroup>
      <thead>
        <tr>
          <th>App Name</th>
          <th>App Url</th>
          <th>App Id</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data.map((domain, index) => (
            <tr key={domain?.appId ?? index}>
              <td>
                <div className="create-domain-name-cell">
                  <span className="create-domain-row-icon">
                    <Globe2 size={15} strokeWidth={1.8} />
                  </span>
                  <span className="create-domain-name-text">
                    {domain?.appName}
                  </span>
                </div>
              </td>
              <td className="create-domain-url-text">{domain?.appUrl}</td>
              <td className="create-domain-id-text">{domain?.appId}</td>
              <td>
                <button
                  type="button"
                  className="create-domain-update-btn"
                  onClick={() => onUpdate(domain)}>
                  <Pencil size={14} strokeWidth={1.8} />
                  Update
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>
              <DomainEmpty />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

DomainTable.propTypes = {
  data: PropTypes.array,
  onUpdate: PropTypes.func.isRequired,
};

export default DomainTable;
