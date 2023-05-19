import { columnsUsers } from "@/components/Columns/ColumnUsers";
import { columnsEvents } from "@/components/Columns/ColumnsEvents";
import { columnsGroups } from "@/components/Columns/ColumnsGroups";
import { columnsReports } from "@/components/Columns/ColumnsReports";
import MainLayout from "@/components/Layout/Layout";
import GenericTable from "@/components/Table/GenericTable";
import { IGroup } from "@/interfaces/groups";
import { IReportsGrouped } from "@/interfaces/reports";
import { IUser } from "@/interfaces/user";
import { listAllEventsFn } from "@/services/events.service";
import { listAllGroupsFn } from "@/services/groups.service";
import { listAllReportsFn } from "@/services/reports.service";
import { listAllUsersFn } from "@/services/user.service";
import { getAllStaticsFn } from "@/services/statistics.service";
import { Card, Statistic, Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<any>({
    totalEvents: 0,
    totalGroups: 0,
    totalUsers: 0,
  });
  const [users, setUsers] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [reports, setReports] = useState<IReportsGrouped[]>([]);

  const getData = async () => {
    setLoading(true);
    const getStatistics = await getAllStaticsFn();
    if (getStatistics) {
      setStatistics(getStatistics);
    }

    // get reports
    const allReports = await listAllReportsFn();
    if (allReports) {
      setReports(allReports);
    }

    // get users
    const allUsers = await listAllUsersFn();
    setUsers(allUsers);
    if (allUsers) {
      setUsers(allUsers);
    }

    // get groups
    const allGroups = await listAllGroupsFn();
    if (allGroups) {
      setGroups(allGroups);
    }

    // get events
    const allEvents = await listAllEventsFn();
    if (allEvents) {
      setEvents(allEvents);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout notShowHeader title="Admin">
      <>
        <Card bordered={false} className="statisticsContainer">
          <div className="statisticsContainer__header">
            <h2>Administración UnParche</h2>
            <Tooltip title="Actualizar datos" placement="right">
              <Button
                type="primary"
                shape="round"
                onClick={getData}
                icon={<ReloadOutlined />}
              />
            </Tooltip>
          </div>
          <div className="statisticsContainer__values">
            <Statistic
              valueStyle={{ textAlign: "center" }}
              title="Usuarios creados"
              value={statistics.totalUsers}
            />
            <Statistic
              valueStyle={{ textAlign: "center" }}
              title="Grupos creados"
              value={statistics.totalGroups}
            />
            <Statistic
              valueStyle={{ textAlign: "center" }}
              title="Eventos creados"
              value={statistics.totalEvents}
            />
          </div>
        </Card>

        <div className="p-1 animate__animated animate__fadeIn">
          <h2>Reportes</h2>
          <GenericTable
            loading={loading}
            dataSource={reports}
            columns={columnsReports(getData)}
          />

          <h2>Administración de usuarios</h2>
          <GenericTable
            loading={loading}
            dataSource={users}
            columns={columnsUsers(getData)}
          />

          <h2>Administración de grupos</h2>
          <GenericTable
            loading={loading}
            dataSource={groups}
            columns={columnsGroups(getData)}
          />

          <h2>Administración de eventos</h2>
          <GenericTable
            loading={loading}
            dataSource={events}
            columns={columnsEvents(getData)}
          />
        </div>
      </>
    </MainLayout>
  );
};

export default AdminPage;
