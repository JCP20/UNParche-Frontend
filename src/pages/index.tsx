import React, { useState, useEffect } from "react";
import { tabItems } from "@/components/Feed/TabFeedItems";
import MainLayout from "@/components/Layout/Layout";
import { Tabs } from "antd";
import LoadingComponent from "@/components/LoadingComponent";
import { IEvent } from "@/interfaces/events";
import { getFYPEvents, getGroupEvents } from "@/services/feed.service";

export default function Home() {
  // const [loading, setLoading] = useState(true);
  const [hasMoreGroups, setHasMoreGroups] = useState(true);
  const [myGroupsEvents, setMyGroupsEvents] = useState<IEvent[]>([]);
  const [pageGroups, setPageGroups] = useState(1);

  const [hasMoreFyp, setHasMoreFyp] = useState(true);
  const [myRecommendedEvents, setMyRecommendedEvents] = useState<IEvent[]>([]);
  const [pageFyp, setPageFyp] = useState(1);

  const getDataFyp = async () => {
    const myRecommendedEvents = await getFYPEvents(pageFyp, 2);

    if (myRecommendedEvents.length === 0) {
      setHasMoreFyp(false);
    }

    setMyRecommendedEvents((prev) => [...prev, ...myRecommendedEvents]);
  };

  useEffect(() => {
    getDataFyp();
  }, [pageFyp]);

  const loadMoreFyp = () => {
    setPageFyp(pageFyp + 1);
  };

  const getDataGroups = async () => {
    const myGroupsEvents = await getGroupEvents(pageGroups, 2);

    if (myGroupsEvents.length === 0) {
      setHasMoreGroups(false);
    }

    setMyGroupsEvents((prev) => [...prev, ...myGroupsEvents]);
  };

  useEffect(() => {
    getDataGroups();
  }, [pageGroups]);

  const loadMoreGroups = () => {
    setPageGroups(pageGroups + 1);
  };

  return (
    <MainLayout title="Inicio">
      {/* {loading ? (
        <LoadingComponent />
      ) : ( */}
      <div className="p-1 mainContainerIndex animate__animated animate__fadeIn animate__faster">
        <Tabs
          defaultActiveKey="1"
          centered
          type="card"
          items={tabItems(
            myRecommendedEvents,
            loadMoreFyp,
            hasMoreFyp,
            myGroupsEvents,
            loadMoreGroups,
            hasMoreGroups
          )}
        />
      </div>
      {/* )} */}
    </MainLayout>
  );
}
