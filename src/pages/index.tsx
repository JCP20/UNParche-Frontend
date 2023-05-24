import MainLayout from "@/components/Layout/Layout";
import { Space } from "antd";
import { Image, Layout } from "antd";
import HeaderApp from "@/components/Layout/Header";
import EventCardApp from "@/components/EventsCard";


export default function Home() {
  return (
    <Layout
    ><HeaderApp />
      <MainLayout>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <Space direction="vertical">
            <EventCardApp idEvento={"6451c2ade9e4ec1d67d7e78e"}></EventCardApp>
            <EventCardApp idEvento={"6451c2bae9e4ec1d67d7e790"}></EventCardApp>
            <EventCardApp idEvento={"6451c392b5e6ccc6fbdd5997"}></EventCardApp>
            <EventCardApp idEvento={"6451c470b5e6ccc6fbdd599b"}></EventCardApp>
          </Space>
        </div>
      </MainLayout>
    </Layout>
  );
}
