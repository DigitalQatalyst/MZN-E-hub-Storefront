"use client";
import { useEffect } from "react";

const css = `
  .custom-tab-scroll::-webkit-scrollbar { height: 4px; }
  .custom-tab-scroll::-webkit-scrollbar-track { background: transparent; border-radius: 10px; }
  .custom-tab-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,.2); border-radius: 10px; }
  .custom-tab-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,.3); }
  .custom-tab-scroll { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,.2) transparent; }
`;

export function useScrollbarStyle(id = "firm-profile-scrollbar-styles") {
  useEffect(() => {
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = css;
      document.head.appendChild(el);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [id]);
}
