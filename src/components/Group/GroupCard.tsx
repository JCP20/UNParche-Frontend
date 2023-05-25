import { IGroup } from "@/interfaces/groups";
import { Card, Image, Typography, Tag } from "antd";
import React from "react";

const GroupCard = ({
  groupData,
  redirectToGroup,
}: {
  groupData: IGroup;
  redirectToGroup: (id: string) => void;
}) => {
  const amountOfMembers =
    groupData?.members?.length + groupData?.administrators?.length;

  return (
    <Card
      title="Te podría interesar..."
      cover={
        <Image
          style={{ maxHeight: 200, objectFit: "cover" }}
          src={groupData?.photo}
          fallback="/escudoUnal.png"
        />
      }
      className="group__card shadow animate__animated animate__fadeIn"
      extra={
        <a onClick={() => redirectToGroup(groupData?._id)}>Conocer grupo</a>
      }
    >
      <Card.Meta
        title={groupData?.name}
        description={
          <>
            <Typography.Paragraph
              ellipsis={{
                rows: 3,
                expandable: true,
                symbol: "Ver más...",
              }}
            >
              {groupData?.description}
            </Typography.Paragraph>
            <Tag color="#e87587">
              {amountOfMembers > 1
                ? `${amountOfMembers} miembros`
                : `${amountOfMembers} miembro`}
            </Tag>
          </>
        }
        avatar={<Tag color="blue">{groupData?.category}</Tag>}
      />
    </Card>
  );
};

export default GroupCard;
