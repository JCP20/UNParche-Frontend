import React, { useState, useEffect } from "react";
import { tabItems } from "@/components/Feed/TabFeedItems";
import MainLayout from "@/components/Layout/Layout";
import { Tabs } from "antd";
import { IEvent } from "@/interfaces/events";
import { getFYPEvents, getGroupEvents } from "@/services/feed.service";
import { IGroup } from "@/interfaces/groups";
import { getFYPData } from "@/services/search.service";
import { useRouter } from "next/router";

export default function Home() {
  // const [loading, setLoading] = useState(true);
  const [hasMoreGroups, setHasMoreGroups] = useState(true);
  const [myGroupsEvents, setMyGroupsEvents] = useState<IEvent[]>([]);
  const [pageGroups, setPageGroups] = useState(1);

  const [hasMoreFyp, setHasMoreFyp] = useState(true);
  const [myRecommendedData, setMyRecommendedData] = useState<any[]>([]);
  const [pageFyp, setPageFyp] = useState(1);

  const router = useRouter();

  const getDataFyp = async () => {
    const myRecommendedEvents = await getFYPData(pageFyp, 3);

    console.log(myRecommendedEvents);

    if (myRecommendedEvents.length === 0) {
      setHasMoreFyp(false);
    }

    setMyRecommendedData((prev) => [...prev, ...myRecommendedEvents]);
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

  const hanldeRedirectToGroup = (id: string) => {
    router.push(`/groupPage/${id}`);
  };

  return (
    <MainLayout title="Inicio">
      <div className="p-1 mainContainerIndex animate__animated animate__fadeIn animate__faster">
        <Tabs
          defaultActiveKey="1"
          centered
          type="card"
          items={tabItems(
            myRecommendedData,
            loadMoreFyp,
            hasMoreFyp,
            myGroupsEvents,
            loadMoreGroups,
            hasMoreGroups,
            hanldeRedirectToGroup
          )}
        />
      </div>
    </MainLayout>
  );
}
