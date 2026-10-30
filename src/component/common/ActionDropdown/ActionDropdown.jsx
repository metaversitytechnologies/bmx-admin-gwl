import { cloneElement, useEffect, useId, useRef, useState } from "react";
import { Dropdown } from "antd";
import PropTypes from "prop-types";
import "./ActionDropdown.scss";

const accountTones = ["green", "blue", "amber", "red", "red", "purple", "blue", "teal", "indigo", "slate", "pink"];
const matchTones = ["indigo", "purple", "blue", "teal", "amber", "green", "slate", "pink", "red"];

export default function ActionDropdown({ menu, open, onOpenChange, accountActions = false, ...props }) {
  const id = useId();
  const popupClass = `table-account-action-popup-${id.replace(/:/g, "")}`;
  const triggerRef = useRef(null);
  const [localOpen, setLocalOpen] = useState(false);
  const isOpen = open ?? localOpen;
  const changeOpen = (next, info) => {
    setLocalOpen(next);
    onOpenChange?.(next, info);
    if (next) window.dispatchEvent(new CustomEvent("table-action-open", { detail: id }));
  };

  useEffect(() => {
    if (!isOpen) return;
    const closeOther = (event) => {
      if (event.detail !== id) changeOpen(false);
    };
    const escape = (event) => {
      if (event.key === "Escape") changeOpen(false);
    };
    window.addEventListener("table-action-open", closeOther);
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("table-action-open", closeOther);
      window.removeEventListener("keydown", escape);
    };
  });

  useEffect(() => {
    if (!isOpen || !accountActions) return undefined;

    let frame = 0;
    const updateAvailableHeight = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const popup = document.querySelector(`.${popupClass}`);
        const menuElement = popup?.querySelector(".table-action-menu");
        const trigger = triggerRef.current;
        if (!menuElement || !trigger) return;

        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        const triggerRect = trigger.getBoundingClientRect();
        const spaceBelow = Math.max(0, viewportHeight - triggerRect.bottom - 12);
        const spaceAbove = Math.max(0, triggerRect.top - 12);
        const naturalHeight = menuElement.scrollHeight;
        const availableHeight = naturalHeight <= spaceBelow
          ? spaceBelow
          : naturalHeight <= spaceAbove
            ? spaceAbove
            : Math.max(spaceAbove, spaceBelow);

        menuElement.style.maxHeight = `${Math.max(0, availableHeight)}px`;
        menuElement.style.overflowY = "auto";
      });
    };

    updateAvailableHeight();
    window.addEventListener("scroll", updateAvailableHeight, true);
    window.addEventListener("resize", updateAvailableHeight);
    window.visualViewport?.addEventListener("resize", updateAvailableHeight);
    window.visualViewport?.addEventListener("scroll", updateAvailableHeight);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateAvailableHeight, true);
      window.removeEventListener("resize", updateAvailableHeight);
      window.visualViewport?.removeEventListener("resize", updateAvailableHeight);
      window.visualViewport?.removeEventListener("scroll", updateAvailableHeight);
    };
  }, [accountActions, isOpen, menu.items, popupClass]);

  const items = menu.items.flatMap((item, index) => {
    if (!item || item.type === "divider") return item ? [item] : [];
    if (item.label?.props?.className?.split(" ").includes("d_none")) return [];
    const tone = (accountActions ? accountTones : matchTones)[Number(item.key)] || "blue";
    const divider = accountActions && ["2", "5", "9"].includes(String(item.key)) && index > 0;
    return [
      ...(divider ? [{ type: "divider", key: `divider-${item.key}` }] : []),
      { ...item, className: `${item.className || ""} action-tone-${tone}` },
    ];
  });

  return (
    <Dropdown
      {...props}
      open={isOpen}
      onOpenChange={changeOpen}
      autoFocus
      arrow={{ pointAtCenter: true }}
      placement="bottomRight"
      autoAdjustOverflow
      getPopupContainer={() => document.body}
      overlayClassName={`table-action-popup${accountActions ? ` ${popupClass}` : ""}`}
      menu={{ ...menu, items, className: "table-action-menu", onClick: (info) => {
        // Existing labels own their navigation and modal handlers. Activate
        // those same elements when rc-menu receives a keyboard selection.
        const row = info.domEvent.target.closest('[role="menuitem"]');
        const label = row?.querySelector(".ant-dropdown-menu-title-content");
        if (info.domEvent.type === "keydown" || !label?.contains(info.domEvent.target)) {
          const action = label?.querySelector("a") || label?.firstElementChild;
          action?.click();
          if (action) return;
        }
        menu.onClick?.(info);
        changeOpen(false, { source: "menu" });
      } }}
    >
      {props.children && cloneElement(props.children, { ref: triggerRef })}
    </Dropdown>
  );
}

ActionDropdown.propTypes = {
  menu: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  accountActions: PropTypes.bool,
};
