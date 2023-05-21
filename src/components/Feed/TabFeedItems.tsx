import InfiniteScroll from "react-infinite-scroll-component";
import EventCard from "../Events/EventsCard";
import { Divider, Skeleton } from "antd";

export const tabItems = (
  myRecommendedEvents: any[],
  loadMoreFyp: () => void,
  hasMoreFyp: boolean,
  myGroupsEvents: any[],
  loadMoreGroups: () => void,
  hasMoreGroups: boolean
) => {
  return [
    {
      label: "FYP",
      key: "1",
      children: (
        <div
          id="scrollableDivFyp"
          style={{
            height: 550,
            overflowY: "auto",
          }}
        >
          <InfiniteScroll
            dataLength={myRecommendedEvents.length}
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
                ¡Es todo por ahora! Busca más tarde para encontrar más eventos
                😅
              </Divider>
            }
          >
            {myRecommendedEvents.map((event: any) => (
              <EventCard eventData={event} key={event.id} />
            ))}
          </InfiniteScroll>
        </div>
      ),
    },
    {
      label: "Mis grupos",
      key: "2",
      children: (
        <div
          id="scrollableDivGroups"
          style={{
            height: 550,
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
                ¡Es todo por ahora! Busca más tarde para encontrar más eventos
                😅
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
