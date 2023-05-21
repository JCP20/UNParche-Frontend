import { backendApiPrivate } from "./api/config";

export const newConversationFn = async ({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) => {
  try {
    const resp = await backendApiPrivate.post("/conversation", {
      senderId,
      receiverId,
    });
    return resp;
  } catch (error) {
    return false;
  }
};
