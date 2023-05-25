import MainLayout from "@/components/Layout/Layout";
import LoadingComponent from "@/components/LoadingComponent";
import ModalProfile from "@/components/Profile/ModalProfile";
import { AuthContext } from "@/context/auth/AuthContext";
import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";
import { getGroupsByUserFn } from "@/services/groups.service";
import { newConversationFn } from "@/services/conversation.service";
import { getUserById, updateUserFn } from "@/services/user.service";
import { getBase64 } from "@/utils/images";
import { MessageOutlined } from "@ant-design/icons";

import {
  Button,
  Image,
  List,
  Modal,
  message,
  Typography,
  Spin,
  Tag,
} from "antd";
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

  const handleOnUpdate = async (values: any) => {
    if (typeof values.photo !== "string") {
      const base64Photo = await getBase64(
        values.photo.file.originFileObj as RcFile
      );
      values.photo = base64Photo;
    }
    message.loading({
      content: "Actualizando perfil...",
      key: "updateProfile",
      duration: 0,
    });
    const resp = await updateUserFn(user.id, { ...values });
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
          router.push({
            pathname: "/messages",
            query: { current_conversation: resp.data._id },
          });
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
          <div className="profileInfo__container animate__animated animate__fadeIn animate__faster">
            <ModalProfile
              open={open}
              onUpdate={handleOnUpdate}
              after={getData}
              onCancel={() => setOpen(false)}
              defaultValues={userData}
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
                        onClick={() => router.push(`/groupPage/${group?._id}`)}
                        key={group?._id}
                        className="shadow profileInfo__details__groups__listContainer__item"
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
