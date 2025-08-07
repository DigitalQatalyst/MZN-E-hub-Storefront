// services/omnichannel.ts
import {OmnichannelChatSDK} from "@microsoft/omnichannel-chat-sdk";


const omnichannelConfig = {
  orgId: "f1255e28-8de7-ef11-933e-6045bd6a2361",
  orgUrl: "https://m-f1255e28-8de7-ef11-933e-6045bd6a2361.ae.omnichannelengagementhub.com",
  widgetId: "dc96ebc7-3d33-4a3e-868c-e4d753f31e17",
};


const omnichannelSDK = new OmnichannelChatSDK(omnichannelConfig);

export const initChat = async () => {
  await omnichannelSDK.initialize();
  await omnichannelSDK.getLiveChatConfig(); // Load server-side config
};

export const startChat = async () => {
  await omnichannelSDK.startChat();
};

export const sendMessage = async (text: string) => {
  await omnichannelSDK.sendMessage({
    content: text,
  });
};

export const onMessageReceived = (
  callback: (message: { content: string; timestamp: string }) => void
) => {
  omnichannelSDK.onNewMessage((message) => {
    callback({
      content: message.content,
      timestamp: message.clienttimestamp,
    });
  });
};

/** Upload a file into the current conversation **/
// services/omnichannel.ts
export const uploadFile = async (file: File) => {
  const data = await file.arrayBuffer();     // ArrayBuffer for the file’s bytes
  const fileInfo = {
    name: file.name,
    type: file.type,
    size: file.size,
    data,
  };
  return omnichannelSDK.uploadFileAttachment(fileInfo);
};

export const canCall = (): boolean => {
  return omnichannelSDK.isVoiceVideoCallingEnabled();
};
export const startCall = async (
  callType: "Audio" | "Video" = "Audio"
) => {
  const response = await omnichannelSDK.getVoiceVideoCalling({
    callType,
  });
  return response; // contains joinUrl, token, etc.
};
