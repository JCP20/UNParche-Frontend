import EventCard from "../Events/EventsCard";

export const tabItems = () => {
  console.log("aqui");
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
