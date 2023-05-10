import EventCardApp from "@/components/EventsCard";
import MainLayout from "@/components/Layout/Layout";
import { Tabs } from "antd";

const tabItems = [
  {
    label: "FYP",
    key: "1",
    children: (
      <>
        <EventCardApp />
        <EventCardApp />
        <EventCardApp />
      </>
    ),
  },
  {
    label: "Mis grupos",
    key: "2",
    children: (
      <>
        <EventCardApp />
        <EventCardApp />
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
