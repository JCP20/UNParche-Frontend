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
    const friendId = conversation.members.find(
      (m: any) => m !== currentUser.id
    );

    const user = await getUserById(friendId);
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, [currentUser, conversation]);

  return (
    <>
      <Avatar className="conversation__image" icon={<UserOutlined />} />
      <span className="conversation__name">@{user?.username}</span>
    </>
  );
};

export default ConversationComp;
