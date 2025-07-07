"use client";
import React, { useEffect } from "react";

declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        load: (opts: any) => Promise<void>;
        close?: () => void;
        interact?: (payload: any) => void;
      };
    };
  }
}

const KfBot = () => {
  useEffect(() => {
    if (document.getElementById("voiceflow-script")) return;

    const script = document.createElement("script");
    script.id = "voiceflow-script";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

    script.onload = () => {
      const path = window.location.pathname;

      const stylesheet =
        "data:text/css;base64," +
        btoa(`
        .vfrc-launcher {
          background-color: #ffffff !important;
          color: #ffffff !important;
          width: 60px !important;
          height: 60px !important;
          border-radius: 50% !important;
        }
        .vfrc-launcher:hover {
          background-color: #ffffff !important;
        }
      `);

      const sharedConfig = {
        verify: { projectID: "6849bea9894655c0d600d259" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        assistant: {
          stylesheet,
        },
      };

      const eventMap: Record<string, string> = {
        "/finance": "Navigation_to_Finance_Marketplace",
        "/non-finance": "Navigation_To_The_Non_Finance_Marketplace",
      };

      const eventName = eventMap[path];

      // Always close first to reset cleanly
      window.voiceflow?.chat?.close?.();

      // Extend config for finance/non-finance pages
      const config =
        eventName != null
          ? {
              ...sharedConfig,
              voice: {
                url: "https://runtime-api.voiceflow.com",
              },
              assistant: {
                ...sharedConfig.assistant,
                persistence: "sessionStorage",
              },
            }
          : sharedConfig;

      window.voiceflow?.chat
        ?.load(config)
        .then(() => {
          if (eventName) {
            console.log(`Triggering event for: ${eventName}`);
            window.voiceflow?.chat?.interact?.({
              type: "event",
              payload: {
                event: {
                  name: eventName,
                },
              },
            });
          }
        })
        .catch(console.error);
    };

    document.body.appendChild(script);
  }, []);

  return null;
};

export default KfBot;

// "use client";
// import React, { useEffect } from "react";

// declare global {
//   interface Window {
//     voiceflow?: { chat?: { load: (opts: any) => Promise<void> } };
//   }
// }

// const KfBot = () => {
//   useEffect(() => {
//     if (document.getElementById("voiceflow-script")) return;

//     const script = document.createElement("script");
//     script.id = "voiceflow-script";
//     script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
//     script.onload = () => {
//       window.voiceflow?.chat
//         ?.load({
//           verify: { projectID: "6849bea9894655c0d600d259" },
//           url: "https://general-runtime.voiceflow.com",
//           versionID: "production",
//           assistant: {
//             stylesheet:
//               "data:text/css;base64," +
//               btoa(`
//               .vfrc-launcher {
//                 background-color: #ffffff !important;
//                 color: #ffffff !important;
//                  width: 60px !important;
//                   height: 60px !important;
//                   border-radius: 50% !important;
//               }
//               .vfrc-launcher:hover {
//                 background-color: #ffffff !important;
//               }
//             `),
//           },
//         })
//         .catch(console.error);
//     };
//     document.body.appendChild(script);
//   }, []);

//   return null;
// };

// export default KfBot;
