import { IUser } from "@/interfaces/user";
import { getUserById } from "@/services/user.service";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, List } from "antd";
import React, { useEffect, useState } from "react";

const ConversationComp = ({
  conversation,
  currentUser,
}: {
  conversation: any;
  currentUser: { id: string; username: string };
}) => {
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    const friend = conversation.members.find(
      (m: any) => m._id !== currentUser.id
    );
    setUser(friend);
  };

  useEffect(() => {
    getUser();
  }, [currentUser, conversation]);

  return (
    <>
      <Avatar className="conversation__image" src={user?.photo} />
      <span className="conversation__name">@{user?.username}</span>
    </>
  );
};

export default ConversationComp;
