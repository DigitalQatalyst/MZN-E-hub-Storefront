// Robust SDK wrapper: never throws; always returns a structured result.

export type InitOk  = { ok: true };
export type InitErr = { ok: false; step: string; code?: string; message: string };
export type InitResult = InitOk | InitErr;

type PreChat = Record<string, any>;

const omnichannelConfig = {
  orgId: "f1255e28-8de7-ef11-933e-6045bd6a2361",
  orgUrl: "https://m-f1255e28-8de7-ef11-933e-6045bd6a2361.ae.omnichannelengagementhub.com",
  widgetId: "dc96ebc7-3d33-4a3e-868c-e4d753f31e17",
};

let sdkPromise: Promise<any> | null = null;
let initialized = false;
let chatStarted = false;
let voiceVideoEnabled = false;

function shapeError(step: string, err: any): InitErr {
  const code =
    err?.status ||
    err?.response?.status ||
    err?.code ||
    err?.body?.error?.code;

  const msgRaw =
    err?.message ||
    err?.response?.data?.message ||
    err?.response?.data ||
    err?.body?.error?.message ||
    err?.toString?.();

  const message = typeof msgRaw === "string" ? msgRaw : JSON.stringify(msgRaw ?? "Unknown error");
  return { ok: false, step, code: code ? String(code) : undefined, message };
}

async function getSDK(): Promise<any> {
  if (typeof window === "undefined") {
    throw new Error("Chat SDK can only load in the browser");
  }
  if (!sdkPromise) {
    sdkPromise = (async () => {
      const mod = await import("@microsoft/omnichannel-chat-sdk");

      // Prefer the named export; fall back to default.OmnichannelChatSDK
      const ctorCandidates = [
        (mod as any).OmnichannelChatSDK,
        (mod as any).default?.OmnichannelChatSDK,
      ];

      const ctor = ctorCandidates.find((c) => typeof c === "function");
      if (!ctor) {
        // TEMP: help debug if the package shape changes
        const keys = Object.keys(mod || {});
        const defKeys = Object.keys(((mod as any).default || {}));
        throw new Error(
          `Could not resolve OmnichannelChatSDK constructor. ` +
          `module keys: [${keys.join(", ")}], default keys: [${defKeys.join(", ")}]`
        );
      }

      return new ctor(omnichannelConfig);
    })();
  }
  return sdkPromise;
}


/**
 * Initializes and starts chat. Never throws:
 * returns { ok: true } or { ok: false, step, code?, message }.
 */
export async function initChat(
  preChatResponse?: PreChat,
  opts?: { authTokenProvider?: () => Promise<string> }
): Promise<InitResult> {
  try {
    const sdk = await getSDK().catch((e) => { throw e; });

    if (opts?.authTokenProvider) {
      try { sdk.setAuthTokenProvider(opts.authTokenProvider); }
      catch (e) { return shapeError("setAuthTokenProvider", e); }
    }

    if (!initialized) {
      let liveChatConfig: any;
      try { liveChatConfig = await sdk.getLiveChatConfig(); }
      catch (e) { return shapeError("getLiveChatConfig", e); }

      try { await sdk.initialize(liveChatConfig); }
      catch (e1) {
        try { await sdk.initialize(); }
        catch (e2) { return shapeError("initialize", e2); }
      }

      initialized = true;
      try { voiceVideoEnabled = Boolean(sdk.isVoiceVideoCallingEnabled?.()); }
      catch { voiceVideoEnabled = false; }
    }

    if (!chatStarted) {
      try {
        await sdk.startChat(preChatResponse ? { preChatResponse } : undefined);
      } catch (e) {
        return shapeError("startChat", e);
      }
      chatStarted = true;
    }

    return { ok: true };
  } catch (e) {
    // In case getSDK bubbled a shaped error (or anything else).
    return typeof e === "object" && e && "ok" in (e as any) ? (e as InitErr) : shapeError("unknown", e);
  }
}

/** Plain text message */
export async function sendMessage(text: string) {
  const sdk = await getSDK().catch((e) => { throw e; });
  if (!chatStarted) throw new Error("Chat not started. Call initChat() first.");
  await sdk.sendMessage({ content: text });
}

/** Subscribe to incoming messages */
export async function onMessageReceived(
  callback: (m: { content: string; timestamp: string }) => void
) {
  const sdk = await getSDK().catch((e) => { throw e; });
  sdk.onNewMessage((message: any) => {
    callback({ content: message.content, timestamp: message.clienttimestamp });
  });
}

/** File upload */
export async function uploadFile(file: File) {
  const sdk = await getSDK().catch((e) => { throw e; });
  if (!chatStarted) throw new Error("Chat not started.");
  const data = await file.arrayBuffer();
  return sdk.uploadFileAttachment({ name: file.name, type: file.type, size: file.size, data });
}

/** Calls */
export function canCall(): boolean { return voiceVideoEnabled; }
export async function startCall(callType: "Audio" | "Video" = "Audio") {
  const sdk = await getSDK().catch((e) => { throw e; });
  if (!chatStarted) throw new Error("Chat not started.");
  return sdk.getVoiceVideoCalling({ callType });
}
