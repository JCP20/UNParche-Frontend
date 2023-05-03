import FormGrupo from "@/components/CreateGroup";
import React from "react";
import { createEventFn } from "@/services/events.service";
import { createGroupFn, updateGroupFn } from "@/services/groups.service";
import CellApp from "@/components/modalCalendar";
import NotiCardApp from "@/components/NotificationCard";
import FormEvent from "@/components/FormEvent";

const crearGrupo = () => {
  return (
    <div>
      <FormGrupo service={createGroupFn} initialValues={"Crear Grupo"} />
      <FormGrupo service={updateGroupFn} initialValues={"Editar Grupo"} />
      <FormEvent service={createEventFn} initialValues={"Crear Evento"} />
      <CellApp />
      <NotiCardApp />
    </div>
  );
};

export default crearGrupo;
