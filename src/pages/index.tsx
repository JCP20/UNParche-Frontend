import EventCard from "@/components/Events/EventsCard";
import { tabItems } from "@/components/Feed/TabFeedItems";
import MainLayout from "@/components/Layout/Layout";
import { Tabs } from "antd";

export default function Home() {
  return (
    <MainLayout>
      <div className="mainContainerIndex">
        <Tabs defaultActiveKey="1" centered items={tabItems()} />
      </div>
    </MainLayout>
  );
}
