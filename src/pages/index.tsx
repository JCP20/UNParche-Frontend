import EventCard from "@/components/EventsCard";
import MainLayout from "@/components/Layout/Layout";
import { Tabs } from "antd";

const tabItems = [
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

export default function Home() {
  return (
    <MainLayout>
      <div className="mainContainerIndex">
        <Tabs defaultActiveKey="1" centered items={tabItems} />
      </div>
    </MainLayout>
  );
}
