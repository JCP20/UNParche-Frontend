import CalendarCellItem from "@/components/Calendar/CalendarCellItem";
import MainLayout from "@/components/Layout/Layout";
import LoadingComponent from "@/components/LoadingComponent";
import { AuthContext } from "@/context/auth/AuthContext";
import { IEvent } from "@/interfaces/events";
import { getEventsUserFn } from "@/services/events.service";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { useRouter } from "next/router";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import React, { useContext, useEffect, useState } from "react";

dayjs.locale("es-mx");

const CalendarPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [calendarEvents, setCalendarEvents] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getData = async () => {
    setLoading(true);
    const resp = await getEventsUserFn(user.id);

    if (resp?.ok) {
      setCalendarEvents(resp.data);
    }
    setLoading(false);
  };

  const handleGoToEvent = (id: string) => {
    router.push(`/event/${id}`);
  };

  useEffect(() => {
    getData(); //obtener información
  }, []);

  const dateCellRender = (current: Dayjs) => {
    const listData = calendarEvents.filter(
      (item: any) =>
        dayjs(item.date).format("YYYY-MM-DD") === current.format("YYYY-MM-DD")
    );

    return (
      <ul className="eventCellContainer">
        {listData.map((item: IEvent) => (
          <CalendarCellItem
            eventData={item}
            goToEvent={() => handleGoToEvent(item._id)}
          />
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <MainLayout title="Calendario" notShowHeader>
      <>
        {loading ? (
          <LoadingComponent />
        ) : (
          <div
            className="p-1 animate__animated animate__fadeIn"
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <h2>Calendario</h2>

            <Calendar cellRender={cellRender} />
          </div>
        )}
      </>
    </MainLayout>
  );
};

export default CalendarPage;
