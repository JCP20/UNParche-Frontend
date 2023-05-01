import FormGrupo from "@/components/CreateGroup";
import FormEvento from "@/components/FormEvent";

import HeaderApp from "@/components/Layout/Header";
import NotiCardApp from "@/components/NotificationCard";
import CellApp from "@/components/modalCalendar";
import { createEventFn } from "@/services/events.service";
import { createGroupFn, updateGroupFn } from "@/services/groups.service";

const crearGrupo = () => {
  return (
    <div>
      <HeaderApp />
      <FormGrupo service={createGroupFn} initialValues={"Crear Grupo"} />
      <FormGrupo service={updateGroupFn} initialValues={"Editar Grupo"} />
      <FormEvento service={createEventFn} initialValues={"Crear Grupo"} />
      <CellApp />
      <NotiCardApp />
    </div>
  );
};

export default crearGrupo;
