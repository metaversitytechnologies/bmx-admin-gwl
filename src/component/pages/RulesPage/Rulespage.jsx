import { Children, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChartNoAxesColumnIncreasing,
  ChevronDown,
  Circle,
  ClipboardList,
  FileText,
  Gamepad2,
  Info,
  ScrollText,
  Trophy,
  UserRound,
} from "lucide-react";
import { rulesContent, rulesIntro } from "./rulesContent";
import "./Rulespage.scss";

const appearance = (title) => {
  if (/note/i.test(title)) return ["orange", FileText];
  if (/bookmaker/i.test(title)) return ["blue", UserRound];
  if (/casino/i.test(title)) return ["green", Gamepad2];
  if (/bowler/i.test(title)) return ["pink", Circle];
  if (/fancy/i.test(title)) return ["purple", ChartNoAxesColumnIncreasing];
  if (/test/i.test(title)) return ["amber", ClipboardList];
  return ["cyan", Trophy];
};

const Rulespage = () => {
  const nav = useNavigate();
  const [language, setLanguage] = useState(() =>
    window.location.hash === "#english-rules-btns" ? "english" : "hindi",
  );
  return (
    <div className="rules-dashboard">
      <header className="rules-dashboard-header">
        <span className="rules-brand-icon">
          <ScrollText size={25} aria-hidden="true" />
        </span>
        <div className="rules-heading-copy">
          <h1>Rules</h1>
          <p>Platform, bookmaker, fancy and casino rules</p>
        </div>
        <button type="button" className="rules-back" onClick={() => nav(-1)}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back
        </button>
      </header>
      <main className="rules-dashboard-body">
        <div
          className="rules-language"
          role="group"
          aria-label="Rules language">
          {[
            ["hindi", "Hindi"],
            ["english", "English"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={language === key}
              onClick={() => setLanguage(key)}>
              {label}
            </button>
          ))}
        </div>
        {language === "hindi" && (
          <div className="rules-info" lang="hi">
            <Info size={24} aria-hidden="true" />
            <div>{rulesIntro}</div>
          </div>
        )}
        <div
          className="rules-sections"
          lang={language === "hindi" ? "hi" : "en"}>
          {rulesContent[language].map((section) => {
            const [tone, Icon] = appearance(section.title);
            const count = Children.count(section.content.props.children);
            const detailed = /test|odi/i.test(section.title);
            return (
              <details
                key={`${language}-${section.title}`}
                className={`rules-section rules-tone-${tone}`}>
                <summary>
                  <span className="rules-section-icon">
                    <Icon size={23} aria-hidden="true" />
                  </span>
                  <span className="rules-section-heading">
                    <span className="rules-section-title">{section.title}</span>
                    <span className="rules-section-count">
                      {detailed
                        ? "Detailed Rules"
                        : /note/i.test(section.title)
                          ? `${count} Important Points`
                          : `${count} ${count === 1 ? "Rule" : "Rules"}`}
                    </span>
                  </span>
                  <ChevronDown
                    className="rules-chevron"
                    size={21}
                    aria-hidden="true"
                  />
                </summary>
                <div className="rules-section-content">{section.content}</div>
              </details>
            );
          })}
        </div>
      </main>
    </div>
  );
};
export default Rulespage;
