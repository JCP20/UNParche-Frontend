import { Avatar, Button, Calendar, List, Skeleton, Modal } from "antd";
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
        if (resp.status === 200) {
          router.push({
            pathname: "/messages",
            query: { current_conversation: resp.data.data._id },
          });
        }
      },
    });
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
              style={{ width: "60%", margin: "auto" }}
              actualGroup={group}
              service={createEventService}
              // initialValues={"Crear Evento"}
              after={after}
            />
          )}
          <div className="mainContainerIndex">
            {events.map((e) => (
              <EventCard eventData={e} />
            ))}
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
