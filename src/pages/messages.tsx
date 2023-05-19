//@ts-nocheck

import { useContext, useEffect, useRef, useState } from "react";

import MainLayout from "@/components/Layout/Layout";
import Chat from "@/components/Messages/Chat";
import ConversationComp from "@/components/Messages/ConversationComp";
import { AuthContext } from "@/context/auth/AuthContext";
import { getConversationsFn } from "@/services/messages.service";
import { io } from "socket.io-client";

interface IConversation {
  members: any[];
}

const MessagesPage = () => {
  const socket = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  const { user } = useContext(AuthContext);

  const [conversations, setConversations] = useState<IConversation[]>(
    null as any
  );
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [arrivalMessage, setArrivalMessage] = useState<any>();

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
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
  }, [user]);

  const getData = async () => {
    const conversations = await getConversationsFn(user.id);
    setConversations(conversations?.data);
  };

  useEffect(() => {
    getData();
  }, [user.id]);

  // use scroll ref to scroll to the last message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <MainLayout title="Mensajes">
      <div className="p-1">
        <div className="messagesContainer shadow">
          <div className="messages__chats">
            <div className="messages__header">
              <h2>Chats</h2>
            </div>

            <div className="messages__conversations">
              {conversations?.map((c) => (
                <div
                  className="conversation"
                  onClick={() => {
                    setCurrentChat(c);
                  }}
                >
                  <ConversationComp conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>
          <Chat
            scrollRef={scrollRef}
            messages={messages}
            setMessages={setMessages}
            actualUser={user}
            currentChat={currentChat}
            socket={socket}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagesPage;
