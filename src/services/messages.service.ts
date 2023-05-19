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

export const newConversationFn = async (input: {
  senderId: string;
  receiverId: string;
}) => {
  try {
    
    const res = await backendApiPrivate.post("/conversation", input);
    return res.data;
  } catch (error: any) {
    console.log(error.response);
    return error.response;
  }
};
