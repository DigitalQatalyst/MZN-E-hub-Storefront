"use client";
import React, { useEffect } from "react";

const KfBot = () => {
  useEffect(() => {
    // Prevent adding the script multiple times
    if (document.getElementById("voiceflow-script")) return;

    const script = document.createElement("script");
    script.id = "voiceflow-script";
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

    script.onload = function () {
      if (window.voiceflow?.chat?.load) {
        window.voiceflow.chat.load({
          verify: { projectID: "6849bea9894655c0d600d259" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
          voice: {
            url: "https://runtime-api.voiceflow.com",
          },
        });
      } else {
        console.error("Voiceflow chat failed to initialize.");
      }
    };

    document.body.appendChild(script);
  }, []);
  return <div id="vf-widget"></div>;
};

export default KfBot;
