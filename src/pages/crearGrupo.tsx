import FormGrupo from "@/components/FormGroup";
import FormEvento from "@/components/FormEvent";

import HeaderApp from "@/components/Layout/Header";
import NotiCardApp from "@/components/NotificationCard";
import SelectApp from "@/components/SelecCategory";
import CellApp from "@/components/modalCalendar";
import { createEventFn, updateEventFn } from "@/services/events.service";
import { createGroupFn, updateGroupFn } from "@/services/groups.service";
import Share from "@/components/Share";
import dayjs from "dayjs";

let propsG = {
  tittle: "Editar Grupo",
  category: ["Arte"],
  name: "pinPon",
  description: "Blablla bla",
  idGrupo: "6451b709de14fbcd063fb109",
}
let propsG1 = {
  tittle: "Crear Grupo"
}
let propsE ={
  formType: "Editar Evento",
  group: "",
  title: "Pinpon",
  date: dayjs(),
  schedule: dayjs("12:00 a", "h:mm a"),
  description: "Evento editado SIUU ",
  idEvent: "6451c2ade9e4ec1d67d7e78e"
}
let propsE1 ={
  formType: "Crear Evento",  
}
const crearGrupo = () => {
  return (
    <div>
      <HeaderApp />
      <FormGrupo service={createGroupFn} initialValues={propsG1} />
      <FormGrupo service={updateGroupFn} initialValues={propsG} />
      <FormEvento service={createEventFn} initialValues={propsE1} />
      <FormEvento service={updateEventFn} initialValues={propsE} />
      <CellApp />
      <NotiCardApp />
      <SelectApp />
      <Share description="AAAAA" />
    </div>
  );
};

export default crearGrupo;
