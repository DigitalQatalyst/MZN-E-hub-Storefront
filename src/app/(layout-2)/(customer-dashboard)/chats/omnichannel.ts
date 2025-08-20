// src/app/(layout-2)/(customer-dashboard)/chats/omnichannel.ts
// ❗ No "use client" here and no top-level SDK import/instantiation.

const omnichannelConfig = {
  orgId: "f1255e28-8de7-ef11-933e-6045bd6a2361",
  orgUrl: "https://m-f1255e28-8de7-ef11-933e-6045bd6a2361.ae.omnichannelengagementhub.com",
  widgetId: "dc96ebc7-3d33-4a3e-868c-e4d753f31e17",
};

let sdkPromise: Promise<any> | null = null;

async function getSDK() {
  if (!sdkPromise) {
    sdkPromise = (async () => {
      // Dynamic import so Node never evaluates the SDK during build/prerender
      const mod = await import('@microsoft/omnichannel-chat-sdk');
      const OmnichannelChatSDK = mod.default ?? (mod as any).OmnichannelChatSDK;
      return new OmnichannelChatSDK(omnichannelConfig);
    })();
  }
  return sdkPromise;
}

export async function initChat() {
  const sdk = await getSDK();
  await sdk.initialize();
  await sdk.getLiveChatConfig();
}

export async function startChat() {
  const sdk = await getSDK();
  await sdk.startChat();
}

export async function sendMessage(text: string) {
  const sdk = await getSDK();
  await sdk.sendMessage({ content: text });
}

export async function onMessageReceived(
  callback: (m: { content: string; timestamp: string }) => void
) {
  const sdk = await getSDK();
  sdk.onNewMessage((message: any) => {
    callback({
      content: message.content,
      timestamp: message.clienttimestamp,
    });
  });
}

export async function uploadFile(file: File) {
  const sdk = await getSDK();
  const data = await file.arrayBuffer();
  return sdk.uploadFileAttachment({
    name: file.name,
    type: file.type,
    size: file.size,
    data,
  });
}

export function canCall(): boolean {
  // This method reads config only; safe to call without awaiting getSDK,
  // but we’ll guard in case SDK isn’t ready yet.
  // If you see false negatives, switch to an async version that awaits getSDK().
  return (globalThis as any).__oc_call_enabled__ ?? true;
}

export async function startCall(callType: 'Audio' | 'Video' = 'Audio') {
  const sdk = await getSDK();
  return sdk.getVoiceVideoCalling({ callType });
}
