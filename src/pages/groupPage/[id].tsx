import EventCardApp from "@/components/EventsCard";
import FormEvento from "@/components/FormEvent";
import { createEventFn } from "@/services/events.service";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Calendar,
  Card,
  Image,
  List,
  Skeleton,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MainLayout from "../../components/Layout/Layout";
import { getGroupById } from "@/services/groups.service";
import { IGroup } from "@/interfaces/groups";
import { useRouter } from "next/router";

dayjs.locale("es-mx");
const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const data = [
  {
    src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
    name: "Pepito Perez",
    email: "pepitoperez@unal.edu.co",
  },
];

const pdata = [
  {
    title: "Pepito",
  },
  {
    title: "Ana Maria",
  },
  {
    title: "Juan",
  },
  {
    title: "Jose",
  },
];

const Grupo = () => {
  const [group, setGroup] = useState<IGroup>({} as IGroup);
  const router = useRouter();

  const getData = async () => {
    const resp = await getGroupById(router.query.id as string);
    if (resp.ok) {
      setGroup(resp.data);
    } else {
      // redirect to 404
      router.replace("/404");
    }
  };

  useEffect(() => {
    getData();
  }, [router.query.id]);

  const items: TabsProps["items"] = [
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
          <FormEvento
            style={{ width: "50%", margin: "1rem auto" }}
            service={createEventFn}
            initialValues={"Crear Evento"}
          />
          <List
            itemLayout="vertical"
            dataSource={pdata}
            renderItem={(item, index) => (
              <List.Item>
                <EventCardApp />
              </List.Item>
            )}
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
            dataLength={data.length}
            next={() => console.log("next")}
            hasMore={false}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            scrollableTarget="scrollableDiv"
          >
            <List
              bordered
              className="list__admin"
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.email}
                  actions={[<Button type="primary">Iniciar Chat</Button>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.src} />}
                    title={item.name}
                    description={item.email}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      ),
    },
  ];

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
            <Button className="group__info__details__btn" type="primary">
              Unirme
            </Button>
            <Button className="group__info__details__btn" danger>
              Borrar grupo
            </Button>
          </div>
        </div>

        <div className="group__feed">
          <Tabs type="card" items={items} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Grupo;
