import MainLayout from "@/components/Layout/Layout";
import LoadingComponent from "@/components/LoadingComponent";
import ModalProfile from "@/components/Profile/ModalProfile";
import { AuthContext } from "@/context/auth/AuthContext";
import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";
import { getGroupsByUserFn } from "@/services/groups.service";
import { newConversationFn } from "@/services/messages.service";
import { getUserById, updateUserFn } from "@/services/user.service";
import { getBase64 } from "@/utils/images";
import { MessageOutlined, LoadingOutlined } from "@ant-design/icons";

import { Button, Image, List, Modal, message, Typography, Spin } from "antd";
import { RcFile } from "antd/es/upload";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({} as IUser);
  const [userGroups, setUserGroups] = useState([] as IGroup[]);

  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleOnCreate = async (values: any) => {
    setLoading(true);
    const { photo } = values;
    const base64Photo = await getBase64(photo.file.originFileObj as RcFile);
    message.loading({
      content: "Actualizando perfil...",
      key: "updateProfile",
    });
    const resp = await updateUserFn(user.id, { ...values, photo: base64Photo });
    if (resp?.data.ok) {
      message.success({ content: "Perfil actualizado", key: "updateProfile" });
      getData();
    } else {
      message.error({
        content: "Error al actualizar el perfil",
        key: "updateProfile",
      });
    }
    setOpen(false);
    setLoading(false);
  };

  const handleSendMessage = async () => {
    Modal.confirm({
      title: "¿Estás seguro de iniciar una conversación?",
      content: `Se iniciará una conversación con @${userData.username}`,
      okText: "Enviar",
      cancelText: "Cancelar",
      onOk: async () => {
        const resp = await newConversationFn({
          receiverId: router.query.id as string,
          senderId: user.id,
        });
        if (resp?.ok) {
          router.push("/messages");
        } else {
          message.error("Error al iniciar la conversación");
        }
      },
    });
  };

  const getData = async () => {
    setLoading(true);
    const res = await getUserById(router.query.id as string);

    const userGroups = await getGroupsByUserFn(router.query.id as string);

    if (userGroups?.ok) {
      setUserGroups(userGroups.data);
    }

    if (res) {
      setUserData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout title="Perfil">
      <>
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="profileInfo__container animate__animated animate__fadeIn">
            <ModalProfile
              open={open}
              onCreate={handleOnCreate}
              after={getData}
              onCancel={() => setOpen(false)}
              defaultValues={{
                preferredCategories: userData.preferredCategories,
              }}
            />
            <div className="profileInfo__avatar shadow">
              <div className="profileInfo__avatar__image">
                <Image alt="profile" src={userData?.photo} />
              </div>

              <div className="profileInfo__avatar__user">
                <h2>@{userData?.username}</h2>
                <p>{userData?.email}</p>
                {user?.id === router.query.id ? (
                  <Button onClick={() => setOpen(true)}>Editar perfil</Button>
                ) : (
                  <Button
                    onClick={handleSendMessage}
                    icon={<MessageOutlined />}
                  >
                    Enviar un mensaje
                  </Button>
                )}
              </div>
            </div>

            <div className="profileInfo__details">
              <div className="profileInfo__details__interests shadow">
                <h2>Interés en</h2>
                <div className="profileInfo__details__interests--scroll">
                  <List
                    style={{ width: "100%" }}
                    dataSource={userData?.preferredCategories}
                    renderItem={(item, index) => (
                      <List.Item key={index}>
                        <p>{item}</p>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
              <div className="profileInfo__details__groups">
                <h2>Mis grupos</h2>
                {userGroups?.length === 0 ? (
                  <>Aún no hay grupos</>
                ) : (
                  <div className="profileInfo__details__groups__listContainer">
                    {(userGroups as IGroup[])?.map((group) => (
                      <div
                        key={group?._id}
                        className="profileInfo__details__groups__listContainer__item"
                      >
                        <h3>{group?.name}</h3>
                        <img
                          className="profileInfo__details__groups__listContainer__item__image"
                          src={group?.photo}
                        />
                        <Typography.Paragraph ellipsis={{ rows: 3 }}>
                          {group?.description}
                        </Typography.Paragraph>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </MainLayout>
  );
};

export default Profile;

export async function getServerSideProps(context: any) {
  const res = await getUserById(context.params.id);
  if (!res) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {},
    };
  }
}
