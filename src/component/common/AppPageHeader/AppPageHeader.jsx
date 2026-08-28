import { ArrowLeft } from "lucide-react";
import PropTypes from "prop-types";

// The ONE page-header design used across the app (source of truth: the
// approved "Update Limit" page). Every inner page should render this
// instead of hand-rolling its own header markup/CSS — pass a different
// icon/title/subtitle/onBack, the visual design itself never changes.
const AppPageHeader = ({
  icon,
  title,
  subtitle,
  badge,
  onBack,
  showBack = true,
  actions = null,
  className = "",
}) => (
  <div
    className={
      className
        ? `admin-details-header app-page-header ${className}`
        : "admin-details-header app-page-header"
    }>
    <div className="admin-details-title-wrap">
      <span className="admin-details-icon">{icon}</span>
      <div className={badge ? "app-page-header-title-block" : undefined}>
        <div className="team_name admin-details-title">{title}</div>
        {subtitle && (
          <p
            className="admin-details-subtitle"
            title={typeof subtitle === "string" ? subtitle : undefined}>
            {subtitle}
          </p>
        )}
        {badge && <span className="app-page-header-badge">{badge}</span>}
      </div>
    </div>
    {(actions || showBack) && (
      <div className="show_btn app-page-header-actions">
        {actions}
        {showBack && (
          <button
            type="button"
            className="admin-details-back"
            onClick={onBack}>
            <ArrowLeft size={15} strokeWidth={1.8} />
            <span className="app-page-header-back-label">Back</span>
          </button>
        )}
      </div>
    )}
  </div>
);

AppPageHeader.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  badge: PropTypes.node,
  onBack: PropTypes.func,
  showBack: PropTypes.bool,
  actions: PropTypes.node,
  className: PropTypes.string,
};

export default AppPageHeader;
