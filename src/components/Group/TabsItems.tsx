import {
  Avatar,
  Button,
  Calendar,
  List,
  Skeleton,
  Badge,
  Modal,
  message,
} from "antd";
import FormEvent from "@/components/Events/FormEvent";
import EventCard from "../Events/EventsCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { IEvent } from "@/interfaces/events";
import { Dayjs } from "dayjs";
import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";
import { newConversationFn } from "@/services/conversation.service";
import { useRouter } from "next/router";
import Link from "next/link";
import { deleteEventFn, updateEventFn } from "@/services/events.service";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { UserOutlined, MessageOutlined } from "@ant-design/icons";

interface itemsInput {
  createEventService: (values: any) => Promise<any | null>;
  events: IEvent[];
  group: IGroup;
  isAdmin: boolean;
  after: () => void;
  user: any;
}

export const TabItemsGroup = (input: itemsInput) => {
  const { createEventService, events, group, isAdmin, after, user } = input;
  const router = useRouter();

  const handleGoToProfile = (id: string) => {
    router.push(`/profile/${id}`);
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
          senderId: user.id,
        });
        if (resp?.ok) {
          router.push({
            pathname: "/messages",
            query: { current_conversation: resp?.data?._id },
          });
        }
      },
    });
  };

  const deleteEvent = async (id: string) => {
    try {
      message.loading({
        content: "Eliminando evento",
        key: "loading",
        duration: 0,
      });
      const data = await deleteEventFn(id);
      if (data?.ok) {
        message.success({
          content: "Evento eliminado",
          key: "loading",
        });
      }
      await after();
    } catch (error) {
      message.error({
        content: "Error al eliminar evento",
        key: "loading",
      });
    }
  };

  const handleDeleteEvent = (id: string) => {
    Modal.confirm({
      title: "Eliminar evento",
      content: "¿Estás seguro que quieres eliminar este evento?",
      okText: "Eliminar",
      cancelText: "Cancelar",
      onOk: async () => {
        await deleteEvent(id);
      },
    });
  };

  const handleUpdate = async (input: { _id: string }) => {
    console.log(input);
    const resp = await updateEventFn(input, input._id);
    console.log(resp);
  };

  const dateCellRender = (current: Dayjs) => {
    const listData = events.filter(
      (item: any) =>
        dayjs(item.date).format("YYYY-MM-DD") === current.format("YYYY-MM-DD")
    );

    return (
      <ul className="eventCellContainer">
        {listData.map((item: IEvent) => (
          <Badge key={item._id} color="#eb455f" />
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return [
    {
      key: "1",
      label: `Eventos`,
      children: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {isAdmin && (
            <FormEvent
              buttonText="Nuevo evento"
              style={{ width: "60%", margin: "auto" }}
              actualGroup={group}
              service={createEventService}
              after={after}
            />
          )}
          <div className="mainContainerCard">
            {events.length > 0 ? (
              events.map((e) => (
                <div className="card__tab">
                  <EventCard eventData={e} isAdmin={isAdmin} />
                  {isAdmin && (
                    <div className="card__tab__btns">
                      <Button
                        style={{ margin: "0.5rem auto", width: "100%" }}
                        danger
                        onClick={() => handleDeleteEvent(e._id)}
                      >
                        Eliminar
                      </Button>
                      <FormEvent
                        isEditing
                        buttonText="Editar evento"
                        style={{ margin: "0 auto", width: "100%" }}
                        actualGroup={group}
                        service={handleUpdate}
                        initialValues={{ ...e, date: dayjs(e.date) }}
                        after={after}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="noEvents">
                Aún no hay eventos! 😞 Revisa más tarde
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: `Calendario`,
      children: (
        <div>
          <Calendar cellRender={cellRender} fullscreen={false} />
        </div>
      ),
    },
    {
      key: "3",
      label: `Admin`,
      children: (
        <div id="scrollableDiv">
          <InfiniteScroll
            dataLength={group?.administrators?.length}
            next={() => console.log("next")}
            hasMore={false}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            scrollableTarget="scrollableDiv"
          >
            <List
              bordered
              className="list__admin"
              dataSource={group?.administrators as IUser[]}
              renderItem={(item) => (
                <List.Item
                  key={item?.email}
                  actions={
                    item._id !== user.id
                      ? [
                          <Link href={`/profile/${item?._id}`}>
                            <Button shape="circle" icon={<UserOutlined />} />
                          </Link>,
                          <Button
                            shape="circle"
                            icon={
                              <MessageOutlined
                                onClick={() => handleNewConversation(item._id)}
                              />
                            }
                          />,
                        ]
                      : [
                          <Button
                            shape="circle"
                            icon={<UserOutlined />}
                            onClick={() => handleGoToProfile(item._id)}
                          />,
                        ]
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item?.photo} />}
                    title={item?.username}
                    description={item?.email}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      ),
    },
  ];
};
