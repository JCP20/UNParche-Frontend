import { IEvent } from "@/interfaces/events";
import React from "react";
import { Badge, Popover, Typography, Button } from "antd";
import dayjs from "dayjs";

const CalendarCellItem = ({
  eventData,
  goToEvent,
}: {
  eventData: IEvent;
  goToEvent: () => void;
}) => {
  return (
    <Popover
      trigger={"click"}
      content={
        <div className="eventPopover">
          <h2 className="eventTitle">{eventData.title}</h2>
          <span className="eventDate">
            {dayjs(eventData.date as string).format("dddd, hh:mm a")}
          </span>
          <Typography.Paragraph className="eventDescription">
            {eventData.description}
          </Typography.Paragraph>
          <Button type="link" onClick={goToEvent}>
            Ver evento
          </Button>
        </div>
      }
    >
      <li key={eventData._id} className="eventCell--item">
        <Badge
          color={"#eb455f"}
          text={eventData.title}
          className="eventCell--badge"
        />
      </li>
    </Popover>
  );
};

export default CalendarCellItem;
