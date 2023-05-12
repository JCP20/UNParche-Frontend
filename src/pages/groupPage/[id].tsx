import { TabItemsGroup } from "@/components/Group/TabsItems";
import { AuthContext } from "@/context/auth/AuthContext";
import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";
import { createEventFn, getEventsByGroupFn } from "@/services/events.service";
import { getGroupById, getGroupsByUserFn } from "@/services/groups.service";
import { UserOutlined } from "@ant-design/icons";
import { Button, Image, Tabs, Tag } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import MainLayout from "../../components/Layout/Layout";
import { IEvent } from "@/interfaces/events";

const Grupo = () => {
  const [group, setGroup] = useState<IGroup>({} as IGroup);
  const [events, setEvents] = useState<IEvent[]>([]); // TODO: Change to IEvent[
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const getData = async () => {
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
  };

  useEffect(() => {
    getData();
  }, [router.query.id]);

  // console.log(events);

  return (
    <MainLayout>
      <div className="mainContainerGroupsPage">
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

            <p className="group__info__details__description">
              {group?.description}
            </p>
            <div>
              <Tag icon={<UserOutlined />} color="blue">
                {group?.members?.length + group?.administrators?.length === 1
                  ? "1 Miembro"
                  : group?.members?.length +
                    group?.administrators?.length +
                    " Miembros"}
              </Tag>
              <Tag color="blue">{group?.category}</Tag>
            </div>
            {isAdmin ? (
              <>
                <Button className="group__info__details__btn" type="primary">
                  Editar información
                </Button>
                <Button className="group__info__details__btn" danger>
                  Borrar grupo
                </Button>
              </>
            ) : (
              <Button className="group__info__details__btn" type="primary">
                Unirme
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
            })}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Grupo;
