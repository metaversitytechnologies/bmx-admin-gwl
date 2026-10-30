import { Users } from "lucide-react";

const DomainName = ({ domain }) =>
  domain ? <strong className="duplicate-site-domain">{domain}</strong> : null;

const HomeRules = ({ domain }) => (
  <div className="duplicate-site-notices">
    <section className="duplicate-site-notice is-hindi">
      <span className="duplicate-site-notice-icon" aria-hidden="true">
        <Users size={20} strokeWidth={2} />
      </span>
      <div className="duplicate-site-notice-copy" lang="hi">
        <h2>प्रिय ग्राहक,</h2>
        <p>
          आपसे अनुरोध है हमारी कोई डुप्लीकेट साइट नहीं है। हमारी आधिकारिक साइट
          {domain ? <> <DomainName domain={domain} /> </> : " "}
          से लॉगिन करें। लॉगिन करने से पहले साइट का नाम जरूर देख लें। आपके समर्थन
          के लिए धन्यवाद।
        </p>
        <p className="duplicate-site-signoff">
          {domain ? <>टीम '<DomainName domain={domain} />'</> : null}
        </p>
      </div>
    </section>

    <section className="duplicate-site-notice is-english">
      <span className="duplicate-site-notice-icon" aria-hidden="true">
        <Users size={20} strokeWidth={2} />
      </span>
      <div className="duplicate-site-notice-copy">
        <h2>Dear Client,</h2>
        <p>
          We don't have any duplicate site. You are requested to login with our
          {domain ? (
            <> official site '<DomainName domain={domain} />' only.</>
          ) : (
            <> official website.</>
          )}
          Please check the site name before you login. Thanks for your support.
        </p>
        <p className="duplicate-site-signoff">
          {domain ? <>Team '<DomainName domain={domain} />'</> : null}
        </p>
      </div>
    </section>
  </div>
);

HomeRules.defaultProps = { domain: "" };

export default HomeRules;
