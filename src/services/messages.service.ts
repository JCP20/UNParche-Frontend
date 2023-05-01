import { backendApiPrivate } from "./api/config";

export const sendMessageFn = async (message: any) => {
  try {
    const res = await backendApiPrivate.post("/message", message);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getConversationsFn = async (id: string) => {
  try {
    const res = await backendApiPrivate.get(`/conversation/${id}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMessagesFn = async (chatId: string) => {
  try {
    const res = await backendApiPrivate.get(`/message/${chatId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};