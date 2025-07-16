"use client";
import React, { useEffect } from "react";

declare global {
  interface Window {
    voiceflow?: { chat?: { load: (opts: any) => Promise<void> } };
  }
}

const KfBot = () => {
  useEffect(() => {
    if (document.getElementById("voiceflow-script")) return;

    const script = document.createElement("script");
    script.id = "voiceflow-script";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.onload = () => {
      window.voiceflow?.chat
        ?.load({
          verify: { projectID: "6849bea9894655c0d600d259" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
          assistant: {
            stylesheet:
              "data:text/css;base64," +
              btoa(`
              .vfrc-launcher {
                background-color: #ffffff !important;
                color: #ffffff !important;
                 width: 60px !important;
                  height: 60px !important;
                  border-radius: 50% !important;
                 position: fixed !important;
                top: 50% !important;
                right: 15px !important;
                transform: translateY(-50%) !important;
              }
              .vfrc-launcher:hover {
                background-color: #ffffff !important;
              }
            `),
          },
        })
        .catch(console.error);
    };
    document.body.appendChild(script);
  }, []);

  return null;
};

export default KfBot;
