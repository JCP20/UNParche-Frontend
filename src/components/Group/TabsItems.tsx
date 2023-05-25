import { Avatar, Button, Calendar, List, Skeleton, Modal, message } from "antd";
import FormEvent from "@/components/Events/FormEvent";
import EventCard from "../Events/EventsCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { IEvent } from "@/interfaces/events";
import { Dayjs } from "dayjs";
import { CalendarMode } from "antd/es/calendar/generateCalendar";
import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";
import { newConversationFn } from "@/services/conversation.service";
import { useRouter } from "next/router";
import Link from "next/link";
import { deleteEventFn } from "@/services/events.service";
import dayjs from "dayjs";

interface itemsInput {
  createEventService: (values: any) => Promise<any | null>;
  events: IEvent[];
  group: IGroup;
  isAdmin: boolean;
  after: () => void;
  user: any;
}

const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

export const TabItemsGroup = (input: itemsInput) => {
  const { createEventService, events, group, isAdmin, after, user } = input;
  const router = useRouter();

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

  const handleUpdate = () => {
    console.log("update");
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
          <div className="mainContainerIndex">
            {events.length > 0 ? (
              events.map((e) => (
                <>
                  <EventCard eventData={e} isAdmin={isAdmin} />
                  {isAdmin && (
                    <>
                      <Button danger onClick={() => handleDeleteEvent(e._id)}>
                        Eliminar
                      </Button>
                      <FormEvent
                        buttonText="Editar evento"
                        style={{ width: "60%", margin: "auto" }}
                        actualGroup={group}
                        service={handleUpdate}
                        initialValues={{ ...e, date: dayjs(e.date) }}
                        after={after}
                      />
                    </>
                  )}
                </>
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
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
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
                          <Button
                            type="primary"
                            onClick={() => handleNewConversation(item._id)}
                          >
                            Iniciar Chat
                          </Button>,
                        ]
                      : []
                  }
                >
                  <Link href={`/profile/${item?._id}`}>
                    <List.Item.Meta
                      avatar={<Avatar src={item?.photo} />}
                      title={item?.username}
                      description={item?.email}
                    />
                  </Link>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      ),
    },
  ];
};
