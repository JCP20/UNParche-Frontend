import EventCard from "@/components/Events/EventsCard";
import MainLayout from "@/components/Layout/Layout";
import LoadingComponent from "@/components/LoadingComponent";
import { getEventFn } from "@/services/events.service";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const EventPage = () => {
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const getData = async () => {
    setLoading(true);
    const resp = await getEventFn(router.query.id as string);
    if (resp.ok) {
      setEventData(resp.data);
    } else {
      router.replace("/404");
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [router.query.id]);

  return (
    <MainLayout title="Evento">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="p-1 mainContainerIndex animate__animated animate__fadeIn animate__faster">
          <EventCard eventData={eventData} />
        </div>
      )}
    </MainLayout>
  );
};

export default EventPage;
