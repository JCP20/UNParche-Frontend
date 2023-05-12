import { Avatar, Button, Calendar, List, Skeleton, TabsProps } from "antd";
import FormEvent from "@/components/FormEvent";
import EventCardApp from "../EventsCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { IEvent } from "@/interfaces/events";
import { Dayjs } from "dayjs";
import { CalendarMode } from "antd/es/calendar/generateCalendar";
import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";

interface itemsInput {
  createEventService: (values: any) => Promise<any | null>;
  events: IEvent[];
  group: IGroup;
  isAdmin: boolean;
}

const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

export const TabItemsGroup = (input: itemsInput) => {
  const { createEventService, events, group, isAdmin } = input;

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
          }}
        >
          {isAdmin && (
            <FormEvent
              style={{ width: "50%", margin: "1rem auto" }}
              actualGroup={group}
              service={createEventService}
              initialValues={"Crear Evento"}
            />
          )}

          <List
            itemLayout="vertical"
            dataSource={events}
            renderItem={(item, index) => {
              console.log(item);
              return (
                <List.Item key={index}>
                  <EventCardApp eventData={item} />
                </List.Item>
              );
            }}
          />
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
                  actions={[<Button type="primary">Iniciar Chat</Button>]}
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
