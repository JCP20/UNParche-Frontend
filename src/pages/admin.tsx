import { columnsEvents } from "@/components/Event/ColumnsEvents";
import { columnsGroups } from "@/components/Group/ColumnsGroups";
import MainLayout from "@/components/Layout/Layout";
import GenericTable from "@/components/Table/GenericTable";
import { columnsUsers } from "@/components/Users/ColumnUsers";
import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";
import { listAllEventsFn } from "@/services/events.service";
import { listAllGroupsFn } from "@/services/groups.service";
import { listAllUsersFn } from "@/services/user.service";
import { Card, Statistic, Table } from "antd";
import { useState, useEffect } from "react";

const AdminPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const getData = async () => {
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
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout notShowHeader>
      <>
        <Card bordered={false} className="statisticsContainer">
          <h2>Administración UnParche</h2>
          <div className="statisticsContainer__values">
            <Statistic title="Usuarios activos" value={112893} />
            <Statistic title="Grupos activos" value={112893} />
            <Statistic title="Eventos activos" value={112893} />
          </div>
        </Card>

        <h2>Eventos reportados</h2>
        <GenericTable dataSource={users} columns={columnsUsers} />

        <h2>Administración de usuarios</h2>
        <GenericTable dataSource={users} columns={columnsUsers} />

        <h2>Administración de grupos</h2>
        <GenericTable dataSource={groups} columns={columnsGroups} />

        <h2>Administración de eventos</h2>
        <GenericTable dataSource={events} columns={columnsEvents} />
      </>
    </MainLayout>
  );
};

export default AdminPage;
