import { Globe2 } from "lucide-react";

const DomainEmpty = () => (
  <div className="create-domain-empty">
    <span className="create-domain-empty-icon">
      <Globe2 size={20} strokeWidth={1.8} />
    </span>
    <p className="create-domain-empty-title">No domains found</p>
    <p className="create-domain-empty-subtitle">Try a different search term.</p>
  </div>
);

export default DomainEmpty;
