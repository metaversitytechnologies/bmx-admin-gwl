import { useState } from "react";
import { Copy, Check } from "lucide-react";
import PropTypes from "prop-types";

const CredentialRow = ({ icon: Icon, label, value, onCopy, ariaLabel }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const didCopy = await onCopy(value);
    if (didCopy) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="approved-credential-row">
      <span className="approved-credential-icon">
        <Icon size={16} strokeWidth={1.8} />
      </span>
      <span className="approved-credential-label">{label}</span>
      <span className="approved-credential-colon">:</span>
      <span className="approved-credential-value" title={value}>
        {value}
      </span>
      <button
        type="button"
        className={`approved-credential-copy${copied ? " is-copied" : ""}`}
        onClick={handleCopy}
        aria-label={ariaLabel}>
        {copied ? (
          <Check size={15} strokeWidth={2} />
        ) : (
          <Copy size={15} strokeWidth={1.8} />
        )}
      </button>
    </div>
  );
};

CredentialRow.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  onCopy: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

export default CredentialRow;
