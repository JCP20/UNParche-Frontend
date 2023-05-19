import React, { useState, useEffect } from "react";
import { tabItems } from "@/components/Feed/TabFeedItems";
import MainLayout from "@/components/Layout/Layout";
import { Tabs } from "antd";
import LoadingComponent from "@/components/LoadingComponent";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const getData = () => {
    setLoading(true);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout title="Inicio">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="mainContainerIndex animate__animated animate__fadeIn">
          <Tabs defaultActiveKey="1" centered items={tabItems()} />
        </div>
      )}
    </MainLayout>
  );
}
