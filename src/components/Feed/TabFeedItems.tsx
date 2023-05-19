import EventCard from "../Events/EventsCard";

export const tabItems = () => {
  return [
    {
      label: "FYP",
      key: "1",
      children: (
        <>
          <EventCard eventData={{}} />
          <EventCard eventData={{}} />
          <EventCard eventData={{}} />
        </>
      ),
    },
    {
      label: "Mis grupos",
      key: "2",
      children: (
        <>
          <EventCard eventData={{}} />
          <EventCard eventData={{}} />
        </>
      ),
    },
  ];
};
