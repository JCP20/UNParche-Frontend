import FormGroup from "@/components/Group/FromGroup";
import { TabItemsGroup } from "@/components/Group/TabsItems";
import LoadingComponent from "@/components/LoadingComponent";
import { AuthContext } from "@/context/auth/AuthContext";
import { IEvent } from "@/interfaces/events";
import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";
import { createEventFn, getEventsByGroupFn } from "@/services/events.service";
import {
  deleteGroupFn,
  enrollUserToGroupFn,
  getGroupById,
  removeUserFromGroupFn,
  updateGroupFn,
} from "@/services/groups.service";
import { UserOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Tabs, Tag, Typography, Space, Card, Badge } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import MainLayout from "../../components/Layout/Layout";

const Grupo = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [group, setGroup] = useState<IGroup>({} as IGroup);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const getData = async () => {
    setLoading(true);
    const resp = await getGroupById(router.query.id as string);

    if (resp.ok) {
      const events = await getEventsByGroupFn(resp.data._id);
      setEvents(events);

      setGroup(resp.data);
      setIsAdmin(
        resp?.data?.administrators?.some(
          (admin: IUser) => admin._id === user?.id
        )
      );
    } else {
      // redirect to 404
      router.replace("/404");
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [router.query.id]);

  const handleJoinGroup = () => {
    // TODO: Add user to group
    Modal.confirm({
      content: "¿Estás seguro que quieres unirte a este grupo?",
      okText: "Unirme",
      cancelText: "Cancelar",
      onOk: async () => {
        const resp: any = await enrollUserToGroupFn(user.id, group._id);
        if (resp?.data?.ok) {
          await getData();
        }
      },
    });
  };

  const handleLeaveGroup = () => {
    Modal.confirm({
      content: "¿Estás seguro que quieres salir de este grupo?",
      okText: "Salir",
      cancelText: "Cancelar",
      onOk: async () => {
        const resp: any = await removeUserFromGroupFn(user.id, group._id);
        if (resp?.data?.ok) {
          await getData();
        }
      },
    });
  };

  const isMember = useMemo(
    () =>
      (group?.members as string[])?.some(
        (member: string) => member === user?.id
      ),
    [group]
  );

  const handleDeleteGroup = async () => {
    Modal.confirm({
      title: "Borrar grupo",
      content: "¿Estás seguro que quieres borrar este grupo?",
      okText: "Borrar",
      cancelText: "Cancelar",
      onOk: async () => {
        const resp: any = await deleteGroupFn(group._id);
        if (resp?.data?.ok) {
          router.replace("/");
        }
      },
    });
  };

  const tabItemsGroup = useMemo(() => {
    return TabItemsGroup({
      user,
      createEventService: createEventFn,
      events: events,
      group: group,
      isAdmin,
      after: getData,
    });
  }, [events, group, isAdmin, user]);

  console.log(events);

  return (
    <MainLayout title={group?.name}>
      <>
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            <FormGroup
              initialValues={group}
              isEditing
              after={getData}
              service={updateGroupFn}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            <div className="mainContainerGroupsPage animate__animated animate__fadeIn animate__faster">
              <div className="group__info shadow">
              
                <div className="group__info__imageContainer">                  
                  <Image
                    className="group__info__imageContainer__image"
                    src={group?.photo}
                    alt="Imagen del grupo"
                  />                  
                </div>
                <Badge.Ribbon text={group?.category} color="#2b3467">
                <Card >
                <div className="group__info__details">
                  <h2 className="group__info__details__title">{group?.name}</h2>
                    <Typography.Paragraph
                      ellipsis={{
                        rows: 3,
                        expandable: true,
                        symbol: "Leer más",
                      }}
                    >
                      {group?.description}
                    </Typography.Paragraph>
                  <div className="group__info__details__tags">
                    <Tag icon={<UserOutlined />} color="blue">
                      {group?.members?.length +
                        group?.administrators?.length ===
                      1
                        ? "1 Interesado"
                        : group?.members?.length +
                          group?.administrators?.length +
                          " Interesados"}
                    </Tag>
                  </div>
                  {isAdmin ? (
                    <Space>
                      <Button
                        type="primary"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Editar información
                      </Button>
                      <Button
                        onClick={handleDeleteGroup}
                        danger
                      >
                        Borrar grupo
                      </Button>
                    </Space>
                  ) : (
                    // check if user is member
                    <Button
                      className="group__info__details__btn"
                      type="primary"
                      onClick={isMember ? handleLeaveGroup : handleJoinGroup}
                    >
                      {isMember ? "Salir" : "Unirme"}
                    </Button>
                  )}
                </div>
                </Card>
                </Badge.Ribbon>
              </div>
              
              <div className="group__feed">
                <Tabs type="card" items={tabItemsGroup} />
              </div>
            </div>
          </>
        )}
      </>
    </MainLayout>
  );
};

export default Grupo;
