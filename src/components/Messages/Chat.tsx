import React, { useEffect, useState } from "react";
import MessageElement from "./MessageElement";
import { Button, Input, Result, Space, message as mssgAntd } from "antd";
import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import { getMessagesFn, sendMessageFn } from "@/services/messages.service";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es-mx";
import { IUser } from "@/interfaces/user";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);
dayjs.locale("es-mx");

interface ChatProps {
  scrollRef: React.MutableRefObject<any>;
  actualUser: {
    id: string;
    username: string;
  };
  currentChat: {
    _id: string;
    members: IUser[];
  };
  messages: any;
  setMessages: React.Dispatch<React.SetStateAction<any>>;
  socket: React.MutableRefObject<any>;
}

const Chat = ({
  scrollRef,
  actualUser,
  currentChat,
  socket,
  messages,
  setMessages,
}: ChatProps) => {
  // const [messages, setMessages] = useState<any>([]);
  const router = useRouter();
  const [mssg, setMssg] = useState<string>("");

  const sendMessage = async () => {
    if (!mssg || !mssg.trim()) {
      mssgAntd.error("No puedes enviar un mensaje vacío");
      setMssg("");
      return;
    }

    const message = {
      sender: actualUser.id,
      text: mssg,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member: IUser) => member._id !== actualUser.id
    );

    socket.current.emit("sendMessage", {
      senderId: actualUser.id,
      receiverId: receiverId?._id,
      text: mssg,
    });

    try {
      const res = await sendMessageFn(message);
      setMessages([...messages, res.data]);
      setMssg("");
    } catch (err) {
      console.log("err");
    }
  };

  const handleSendMessage = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    await sendMessage();
  };

  const getActualMessages = async () => {
    if (!currentChat) return;
    const resp = await getMessagesFn(currentChat?._id);
    setMessages(resp?.data);
  };

  useEffect(() => {
    getActualMessages();
  }, [currentChat]);

  useEffect(() => {
    if (router.query.shareText) {
      setMssg(("¡Mira este evento! " + router.query.shareText) as string);
    }
  }, [router.query]);

  return (
    <div className="mainContainerChat animate__animated animate__fadeIn">
      {currentChat ? (
        <>
          <div className="chatContainer__conversation">
            {messages?.map((m: any) => (
              <MessageElement
                key={m?._id}
                message={{
                  sender: m?.sender,
                  text: m?.text,
                  createdAt: dayjs(m?.createdAt).fromNow(),
                }}
                sentByMe={m?.sender === actualUser.id}
              />
            ))}
            <div ref={scrollRef} />
          </div>
          <Space.Compact style={{ width: "100%", marginTop: "1rem" }}>
            <Input
              onChange={(e) => setMssg(e.target.value)}
              value={mssg}
              onPressEnter={handleSendMessage}
              placeholder="Nuevo mensaje"
              className="chatContainer__input"
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={sendMessage}
            />
          </Space.Compact>
        </>
      ) : (
        <div className="mainContainerChat__noConversation">
          <Result
            icon={<SmileOutlined />}
            title="Selecciona una conversación para empezar a chatear"
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
