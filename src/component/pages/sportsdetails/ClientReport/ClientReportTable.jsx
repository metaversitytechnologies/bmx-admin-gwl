import PropTypes from "prop-types";
import { UserRound } from "lucide-react";
import RoleBadge from "./RoleBadge";
import ClientReportSkeleton from "./ClientReportSkeleton";
import ClientReportEmpty from "./ClientReportEmpty";
import ClientReportError from "./ClientReportError";
import { formatAmount, getAmountColorClass, getRoleLabel } from "./clientReportUtils";

const ClientReportTable = ({
  rows,
  columnTitle,
  isLoading,
  isError,
  onRetry,
  onDrillDown,
}) => {
  if (isError) {
    return (
      <div className="cr2-table-card">
        <ClientReportError onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="cr2-table-card">
      <div className="cr2-table-scroll">
        <table className="cr2-table">
          <colgroup>
            <col style={{ width: "38%" }} />
            <col style={{ width: "26%" }} />
            <col style={{ width: "36%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>{columnTitle}</th>
              <th>Role</th>
              <th className="cr2-num-col">Net Account</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ClientReportSkeleton />
            ) : rows.length > 0 ? (
              rows.map((record, index) => {
                const role = getRoleLabel(record?.userId);
                const isClient = role === "Client";
                return (
                  <tr key={index}>
                    <td>
                      <span className="cr2-admin-cell">
                        <span className="cr2-admin-icon">
                          <UserRound size={14} strokeWidth={1.8} />
                        </span>
                        <span className="cr2-admin-code">
                          {record?.userId}
                        </span>
                      </span>
                    </td>
                    <td>
                      <RoleBadge
                        label={role}
                        isClient={isClient}
                        onDrillDown={() => onDrillDown(record?.userId)}
                      />
                    </td>
                    <td
                      className={`cr2-num-col cr2-amount ${getAmountColorClass(
                        record?.pnl
                      )}`}>
                      {formatAmount(parseFloat(record?.pnl))}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3}>
                  <ClientReportEmpty />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ClientReportTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columnTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onRetry: PropTypes.func.isRequired,
  onDrillDown: PropTypes.func.isRequired,
};

export default ClientReportTable;
