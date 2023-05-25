import InfiniteScroll from "react-infinite-scroll-component";
import EventCard from "../Events/EventsCard";
import { Divider, Skeleton } from "antd";
import GroupCard from "../Group/GroupCard";
import { NextRouter } from "next/router";

export const tabItems = (
  myRecommendedData: any[],
  loadMoreFyp: () => void,
  hasMoreFyp: boolean,
  myGroupsEvents: any[],
  loadMoreGroups: () => void,
  hasMoreGroups: boolean,
  redirectToGroup: (id: string) => void
) => {
  return [
    {
      label: "FYP",
      key: "1",
      children: (
        <div
          id="scrollableDivFyp"
          style={{
            height: 570,
            overflowY: "auto",
          }}
        >
          <InfiniteScroll
            dataLength={myRecommendedData.length}
            next={loadMoreFyp}
            hasMore={hasMoreFyp}
            scrollableTarget="scrollableDivFyp"
            loader={
              <div className="scrollItems">
                <Skeleton.Image active />

                <br />
                <Skeleton
                  paragraph={{
                    rows: 4,
                  }}
                  active
                />
              </div>
            }
            endMessage={
              <Divider>
                ¡Es todo por ahora! Busca más tarde para encontrar más
                recomendaciones 😅
              </Divider>
            }
          >
            {myRecommendedData.map((item: any) => {
              if (item.type === "event") {
                return <EventCard eventData={item.data} key={item.data._id} />;
              } else {
                return (
                  <GroupCard
                    redirectToGroup={redirectToGroup}
                    groupData={item.data}
                    key={item.data._id}
                  />
                );
              }
            })}
          </InfiniteScroll>
        </div>
      ),
    },
    {
      label: "Mis eventos",
      key: "2",
      children: (
        <div
          id="scrollableDivGroups"
          style={{
            height: 570,
            overflowY: "auto",
          }}
        >
          <InfiniteScroll
            dataLength={myGroupsEvents.length}
            next={loadMoreGroups}
            hasMore={hasMoreGroups}
            scrollableTarget="scrollableDivGroups"
            loader={
              <div className="scrollItems">
                <Skeleton.Image active />

                <br />
                <Skeleton
                  paragraph={{
                    rows: 4,
                  }}
                  active
                />
              </div>
            }
            endMessage={
              <Divider>
                ¡Vaya... tus grupos no tienen eventos! Busca más tarde para
                encontrar si hay novedades 🤔
              </Divider>
            }
          >
            {myGroupsEvents.map((event: any) => (
              <EventCard eventData={event} key={event.id} />
            ))}
          </InfiniteScroll>
        </div>
      ),
    },
  ];
};
