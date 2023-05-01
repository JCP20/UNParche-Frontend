import FormEvento from "@/components/FormEvent";
import FormGrupo from "@/components/CreateGroup";
import { createEventFn } from "@/services/events";
import { createGroupFn, updateGroupFn } from "@/services/groups";
import React from "react";
import EventCardApp from "@/components/EventsCard";
import CellApp from "@/components/modalCalendar";
import HeaderApp from "@/components/Layout/Header";
import NotiCardApp from "@/components/NotificationCard";
import SelectApp from "@/components/SelecCategory";



const crearGrupo = () => {
  return (
    <div>
      <HeaderApp/>      
      <FormGrupo service={createGroupFn} initialValues={"Crear Grupo"} />
      <FormGrupo service={updateGroupFn} initialValues={"Editar Grupo"} />
      <FormEvento service={createEventFn} initialValues={"Crear Grupo"} />      
      <CellApp/>
      <NotiCardApp/>
      <SelectApp/>


    </div>
  );
};

export default crearGrupo;
