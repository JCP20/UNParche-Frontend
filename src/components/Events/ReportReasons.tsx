import { IReports } from "@/interfaces/reports";
import { IUser } from "@/interfaces/user";
import { List, Typography } from "antd";
import Link from "next/link";
import React from "react";

const ReportReasons = ({ reports }: { reports: IReports[] }) => {
  return (
    <>
      <h2>Razones:</h2>
      <div style={{ maxHeight: "70vh", padding: "2rem", overflowY: "auto" }}>
        <List
          dataSource={reports}
          renderItem={(item: IReports) => (
            <List.Item>
              <Typography.Paragraph
                ellipsis={{ rows: 2, expandable: true, symbol: "Ver más..." }}
                style={{ width: "65%" }}
              >
                {item.reason}
              </Typography.Paragraph>
              <Typography.Text>
                <Link href={`/profile/${(item.user as any).id}`}>
                  @{(item.user as IUser).username}
                </Link>
              </Typography.Text>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default ReportReasons;
