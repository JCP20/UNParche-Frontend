import React, { useContext, useEffect, useState } from "react";
import { Input, AutoComplete, Modal } from "antd";
import { listUsersForSearchFn } from "@/services/user.service";
import { newConversationFn } from "@/services/conversation.service";
import { NextRouter } from "next/router";

interface User {
  _id: string;
  username: string;
}

const UserSearchBar = ({
  router,
  actualUser,
  shareText,
}: {
  router: NextRouter;
  actualUser: any;
  shareText?: string;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [options, setOptions] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (value: string) => {
    setSearchText(value);

    if (value.length > 0) {
      setLoading(true);

      try {
        const resp = await listUsersForSearchFn(value);

        if (resp?.ok) {
          setOptions(resp?.data);
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.error("Error searching users:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setOptions([]);
    }
  };

  const handleSelect = (value: string) => {
    const selected = options.find((user) => user._id === value);
    setSearchText(selected?.username || "");
    setOptions([]);
    handleNewConversation(value);
  };

  const handleNewConversation = async (receiverId: string) => {
    Modal.confirm({
      title: "Iniciar conversación",
      content: "¿Estás seguro que quieres iniciar una conversación?",
      okText: "Iniciar",
      cancelText: "Cancelar",
      onOk: async () => {
        const resp: any = await newConversationFn({
          receiverId,
          senderId: actualUser.id,
        });
        if (resp?.ok) {
          Modal.destroyAll();

          let query: { shareText?: string; current_conversation?: string } = {};

          if (shareText) {
            query.shareText = shareText;
          }

          query.current_conversation = resp?.data?._id;

          router.push({
            pathname: "/messages",
            query,
          });
        }
      },
    });
  };

  return (
    <div className="searchMessages">
      <AutoComplete
        options={options?.map((user) => ({
          value: user._id,
          label: user.username,
        }))}
        onSelect={handleSelect}
        onSearch={handleSearch}
        value={searchText}
        style={{ width: "100%" }}
      >
        <Input.Search
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar usuarios"
          enterButton
          loading={loading}
        />
      </AutoComplete>
    </div>
  );
};

export default UserSearchBar;
