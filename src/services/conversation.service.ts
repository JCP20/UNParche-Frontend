import { backendApiPrivate } from "./api/config";

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
