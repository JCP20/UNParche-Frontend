//@ts-nocheck

import { useContext, useEffect, useRef, useState } from "react";

import MainLayout from "@/components/Layout/Layout";
import Chat from "@/components/Messages/Chat";
import ConversationComp from "@/components/Messages/ConversationComp";
import { AuthContext } from "@/context/auth/AuthContext";
import { getConversationsFn } from "@/services/messages.service";
import { io } from "socket.io-client";
import LoadingComponent from "@/components/LoadingComponent";
import { IUser } from "@/interfaces/user";
import { useRouter } from "next/router";
import UserSearchBar from "@/components/Messages/UserSearchBar";

interface IConversation {
  members: any[];
}

interface ICurrentChat {
  _id: string;
  members: IUser[];
}

const MessagesPage = () => {
  const socket = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [conversations, setConversations] = useState<IConversation[]>(
    null as any
  );
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState<ICurrentChat>(null);
  const [arrivalMessage, setArrivalMessage] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data: any) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.some(
        (member: IUser) => member._id === arrivalMessage.sender
      ) &&
      setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
  }, [user]);

  const getData = async () => {
    setLoading(true);
    const conversations = await getConversationsFn(user.id);
    setConversations(conversations?.data);

    if (router.query?.current_conversation) {
      const currentConversation = conversations?.data.find(
        (conversation: IConversation) =>
          conversation._id === router.query?.current_conversation
      );
      setCurrentChat(currentConversation);
      setMessages(currentConversation?.messages);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [user.id, router.query]);

  // use scroll ref to scroll to the last message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <MainLayout title="Mensajes">
      <div className="p-1">
        <div className="messagesContainer shadow animate__animated animate__fadeIn animate__faster">
          <div className="messages__chats animate__animated animate__fadeIn animate__faster">
            <div className="messages__header">
              <h2>Chats</h2>
              <UserSearchBar router={router} actualUser={user} />
            </div>
            <div className="messages__conversations">
              {conversations?.map((c) => (
                <div
                  className="conversation"
                  onClick={() => {
                    setCurrentChat(c);
                    router.push(router.pathname, {});
                  }}
                >
                  <ConversationComp conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>
          {loading ? (
            <div className="mainContainerChat">
              <LoadingComponent />
            </div>
          ) : (
            <Chat
              scrollRef={scrollRef}
              messages={messages}
              setMessages={setMessages}
              actualUser={user}
              currentChat={currentChat}
              socket={socket}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagesPage;
