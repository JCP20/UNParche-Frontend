import { TabItemsGroup } from "@/components/Group/TabsItems";
import { AuthContext } from "@/context/auth/AuthContext";
import { IEvent } from "@/interfaces/events";
import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";
import { createEventFn, getEventsByGroupFn } from "@/services/events.service";
import {
  enrollUserToGroupFn,
  getGroupById,
  removeUserFromGroupFn,
} from "@/services/groups.service";
import { UserOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Tabs, Tag, Typography } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState, useMemo } from "react";
import MainLayout from "../../components/Layout/Layout";
import LoadingComponent from "@/components/LoadingComponent";

const Grupo = () => {
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<IGroup>({} as IGroup);
  const [events, setEvents] = useState<IEvent[]>([]); // TODO: Change to IEvent[
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
        resp.data.administrators?.some((admin: IUser) => admin._id === user?.id)
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
          updateGroupsData();
          // router.reload();
        }
      },
    });
  };

  const handleLeaveGroup = () => {
    // TODO: Remove user from group
    Modal.confirm({
      content: "¿Estás seguro que quieres salir de este grupo?",
      okText: "Salir",
      cancelText: "Cancelar",
      onOk: async () => {
        const resp: any = await removeUserFromGroupFn(user.id, group._id);
        if (resp?.data?.ok) {
          await getData();
          updateGroupsData();
          // router.reload();
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

  const updateGroupsData = () => {};

  return (
    <MainLayout title={group?.name} updateGroupsData={updateGroupsData}>
      <>
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="mainContainerGroupsPage animate__animated animate__fadeIn">
            <div className="group__info shadow">
              <div className="group__info__imageContainer">
                <Image
                  className="group__info__imageContainer__image"
                  src={group?.photo}
                  alt="Imagen del grupo"
                />
              </div>
              <div className="group__info__details">
                <h2 className="group__info__details__title">{group?.name}</h2>

                <div className="group__info__details__description">
                  <Typography.Paragraph
                    ellipsis={{ rows: 3, expandable: true, symbol: "Leer más" }}
                  >
                    {group?.description}
                  </Typography.Paragraph>
                </div>

                <div className="group__info__details__tags">
                  <Tag icon={<UserOutlined />} color="blue">
                    {group?.members?.length + group?.administrators?.length ===
                    1
                      ? "1 Miembro"
                      : group?.members?.length +
                        group?.administrators?.length +
                        " Miembros"}
                  </Tag>
                  <Tag color="blue">{group?.category}</Tag>
                </div>
                {isAdmin ? (
                  <>
                    <Button
                      className="group__info__details__btn"
                      type="primary"
                    >
                      Editar información
                    </Button>
                    <Button className="group__info__details__btn" danger>
                      Borrar grupo
                    </Button>
                  </>
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
            </div>

            <div className="group__feed">
              <Tabs
                type="card"
                items={TabItemsGroup({
                  createEventService: createEventFn,
                  events: events,
                  group: group,
                  isAdmin,
                  after: getData,
                })}
              />
            </div>
          </div>
        )}
      </>
    </MainLayout>
  );
};

export default Grupo;
