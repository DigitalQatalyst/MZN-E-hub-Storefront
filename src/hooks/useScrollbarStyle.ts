import { useEffect } from "react";

export function useScrollbarStyle() {
  useEffect(() => {
    if (!document.getElementById("scrollbar-style")) {
      const style = document.createElement("style");
      style.id = "scrollbar-style";
      style.innerHTML = `
        .custom-tab-scroll::-webkit-scrollbar {
          height: 0px; /* effectively hidden */
        }
        .custom-tab-scroll {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;    /* Firefox */
        }
        .custom-tab-scroll::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
}
