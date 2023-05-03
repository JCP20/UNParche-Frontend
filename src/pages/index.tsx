import MainLayout from "@/components/Layout/Layout";
import { Space} from "antd";
import HeaderApp from "@/components/Layout/Header";
import EventCardApp from "@/components/EventsCard";


export default function Home() {
  return (
    <MainLayout>
      <div style={{padding:'24px', textAlign: 'center'}}>
       <Space direction="vertical">
        <EventCardApp></EventCardApp>
        <EventCardApp></EventCardApp>
        <EventCardApp></EventCardApp>
        <EventCardApp></EventCardApp>
        </Space>
      </div>
    </MainLayout>
  );
}
