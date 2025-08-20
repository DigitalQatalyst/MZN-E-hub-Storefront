<<<<<<< HEAD
// "use client";
// import React, { useEffect, useRef } from "react";
// import { usePathname } from "next/navigation";

// declare global {
//   interface Window {
//     voiceflow?: {
//       chat?: {
//         load: (opts: any) => Promise<void>;
//         close?: () => void;
//         interact?: (payload: any) => void;
//         destroy?: () => void;
//       };
//     };
//   }
// }

// // page specific detection enabled

// const KfBot = () => {
//   const pathname = usePathname();
//   const isInitialized = useRef(false);

//   useEffect(() => {
//     const initializeVoiceflow = async () => {
//       // If already initialized, destroy the existing instance
//       if (isInitialized.current && window.voiceflow?.chat) {
//         window.voiceflow.chat.destroy?.();
//         window.voiceflow.chat.close?.();
//       }

//       // Remove existing script if it exists
//       const existingScript = document.getElementById("voiceflow-script");
//       if (existingScript) {
//         existingScript.remove();
//       }

//       // Create and load new script
//       const script = document.createElement("script");
//       script.id = "voiceflow-script";
//       script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

//       script.onload = async () => {
//         const stylesheet =
//           "data:text/css;base64," +
//           btoa(`
//           .vfrc-launcher {
//             background-color: #ffffff !important;
//             color: #ffffff !important;
//             width: 60px !important;
//             height: 60px !important;
//             border-radius: 50% !important;
//           }
//           .vfrc-launcher:hover {
//             background-color: #ffffff !important;
//           }
//         `);

//         const sharedConfig = {
//           verify: { projectID: "6849bea9894655c0d600d259" },
//           url: "https://general-runtime.voiceflow.com",
//           versionID: "production",
//           assistant: {
//             stylesheet,
//           },
//         };

//         const eventMap: Record<string, string> = {
//           "/financial-marketplace": "Navigation_to_Finance_Marketplace",
//           "/non-financial-marketplace":
//             "Navigation_To_The_Non_Finance_Marketplace",
//         };

//         const eventName = eventMap[pathname];

//         const config =
//           eventName != null
//             ? {
//                 ...sharedConfig,
//                 voice: {
//                   url: "https://runtime-api.voiceflow.com",
//                 },
//                 assistant: {
//                   ...sharedConfig.assistant,
//                   persistence: "sessionStorage",
//                 },
//               }
//             : sharedConfig;

//         try {
//           await window.voiceflow?.chat?.load(config);
//           isInitialized.current = true;

//           if (eventName) {
//             // Add a small delay to ensure the widget is fully loaded
//             setTimeout(() => {
//               console.log(`Triggering event for: ${eventName}`);
//               window.voiceflow?.chat?.interact?.({
//                 type: "event",
//                 payload: {
//                   event: {
//                     name: eventName,
//                   },
//                 },
//               });
//             }, 500);
//           }
//         } catch (error) {
//           console.error("Failed to load Voiceflow:", error);
//         }
//       };

//       document.body.appendChild(script);
//     };

//     initializeVoiceflow();

//     // Cleanup function
//     return () => {
//       if (window.voiceflow?.chat) {
//         window.voiceflow.chat.close?.();
//       }
//     };
//   }, [pathname]);

//   return null;
// };

// export default KfBot;

"use client";
import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
=======
"use client";
import React, { useEffect } from "react";
>>>>>>> origin/faq_landing_page

declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        load: (opts: any) => Promise<void>;
        close?: () => void;
        interact?: (payload: any) => void;
<<<<<<< HEAD
        destroy?: () => void;
=======
>>>>>>> origin/faq_landing_page
      };
    };
  }
}

<<<<<<< HEAD
// page specific detection enabled

const KfBot = () => {
  const pathname = usePathname();
  const isInitialized = useRef(false);

  useEffect(() => {
    const initializeVoiceflow = async () => {
      // If already initialized, destroy the existing instance
      if (isInitialized.current && window.voiceflow?.chat) {
        window.voiceflow.chat.destroy?.();
        window.voiceflow.chat.close?.();
      }

      // Remove existing script if it exists
      const existingScript = document.getElementById("voiceflow-script");
      if (existingScript) {
        existingScript.remove();
      }

      // Create and load new script
      const script = document.createElement("script");
      script.id = "voiceflow-script";
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

      script.onload = async () => {
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
          "/financial-marketplace": "Navigation_to_Finance_Marketplace",
          "/non-financial-marketplace":
            "Navigation_To_The_Non_Finance_Marketplace",
        };

        const eventName = eventMap[pathname];

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

        try {
          await window.voiceflow?.chat?.load(config);
          isInitialized.current = true;

          if (eventName) {
            // Add a small delay to ensure the widget is fully loaded
            setTimeout(() => {
              console.log(`Triggering event for: ${eventName}`);
              window.voiceflow?.chat?.interact?.({
                type: "event",
                payload: {
                  event: {
                    name: eventName,
                  },
                },
              });
            }, 500);
          }

          // Trigger the launch event
          const storage = {
            name: "User Name", // Example: Replace with actual data from your storage
            stage: "Stage 1", // Example: Replace with actual data from your storage
            sector: "Finance", // Example: Replace with actual data from your storage
          };

          window.voiceflow?.chat?.interact?.({
            type: "launch",
            payload: {
              user_name: storage.name,
              user_stage: storage.stage,
              user_sector: storage.sector,
            },
          });
        } catch (error) {
          console.error("Failed to load Voiceflow:", error);
        }
      };

      document.body.appendChild(script);
    };

    initializeVoiceflow();

    // Cleanup function
    return () => {
      if (window.voiceflow?.chat) {
        window.voiceflow.chat.close?.();
      }
    };
  }, [pathname]);
=======
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
        "/services": "Navigation_to_Finance_Marketplace",
        "/non-financial-marketplace":
          "Navigation_To_The_Non_Finance_Marketplace",
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
>>>>>>> origin/faq_landing_page

  return null;
};

export default KfBot;
<<<<<<< HEAD
=======

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
>>>>>>> origin/faq_landing_page
