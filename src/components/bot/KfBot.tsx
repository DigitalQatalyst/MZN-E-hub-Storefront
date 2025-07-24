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
                
                 position: fixed !important;
                top: 50% !important;
                right: 15px !important;
                transform: translateY(-50%) !important;
                box-shadow: none !important;
                border: 1px solid #01E5D1 !important;
              }
              .vfrc-launcher:hover {
                background-color: #ffffff !important;
              }
                .vfrc-launcher::before {
  content: url('/assets/images/KF/KFbotLauncher.png') !important;
  
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
