import FormEvento from "@/components/FormEvent";
import FormGrupo from "@/components/CreateGroup";
import { createEventFn } from "@/services/events";
import { createGroupFn, updateGroupFn } from "@/services/groups";
import React from "react";

const crearGrupo = () => {
  return (
    <div>
      <FormGrupo service={createGroupFn} initialValues={"Crear Grupo"} />
      <FormGrupo service={updateGroupFn} initialValues={"Editar Grupo"} />
      <FormEvento service={createEventFn} initialValues={"Crear Grupo"} />
    </div>
  );
};

export default crearGrupo;
