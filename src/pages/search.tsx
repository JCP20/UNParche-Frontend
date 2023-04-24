import SideMenu from "@/components/Layout/Layout";
import { Button, Form, Select } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SearchGroupsCard from "@/components/search/SearchGroupsCard";

const groups = [
  { id: "1", name: "Grupo 1", description: "Hola mundo", foto: "imgen.png" },
  { id: "2", name: "Grupo 2", description: "Hola mundo", foto: "imgen.png" },
  { id: "3", name: "Grupo 3", description: "Hola mundo", foto: "imgen.png" },
  { id: "4", name: "Grupo 4", description: "Hola mundo", foto: "imgen.png" },
];
const datosFalsos2 = [{name: "UQBAR", logo: "/foto_perfil.jpg",description:"Es un grupo de seguridad informática de la Universidad Nacional, desarrollado por y para estudaintes. Líderes en innovación y gerencia de proyectos", members: 32, textmembers:"miembros activos"}, 
,{name: "SalsUnal", logo: "/foto_fondo.jpg",description:"Grupo de salsa caleña y cubana de la Universidad Nacional de Colombia, sesiones presenciales, múltiples campeones", members: 32, textmembers:"miembros activos"}
,{name: "Salsynal", logo: "/foto_fondo.jpg",description:"Grupo de salsa caleña y cubana de la Universidad Nacional de Colombia, sesiones presenciales, múltiples campeones", members: 32, textmembers:"miembros activos"},
,{name: "SalsUnal", logo: "/foto_fondo.jpg",description:"Grupo de salsa caleña y cubana de la Universidad Nacional de Colombia, sesiones presenciales, múltiples campeones", members: 32, textmembers:"miembros activos"}
,{name: "SalsUnal", logo: "/foto_fondo.jpg",description:"Grupo de salsa caleña y cubana de la Universidad Nacional de Colombia, sesiones presenciales, múltiples campeones", members: 32, textmembers:"miembros activos"}
]

const exampleCategories = [{ label: "Hola", value: "hola" }];

const Search = () => {
  const router = useRouter();

  useEffect(() => {
    // Pediríamos información al back para mostrar grupos según el nombre

    console.log("Me ejecuté!");
  }, []);

  const onFinish = (values: any) => {
    // llama al back para realizar la busqueda según los filtros

    console.log(values);
  };

  return (
    <SideMenu notShowSearch>
      <>
        <div className="filters">
          <Form onFinish={onFinish}>
            <Form.Item name="category">
              <Select mode="multiple" options={exampleCategories} />
            </Form.Item>
            <Form.Item name="category">
              <Select mode="multiple" options={exampleCategories} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Buscar
              </Button>
            </Form.Item>
          </Form>
        </div>
        <p style={{fontSize:20}}> Busquedas recientes</p>
        <div><SearchGroupsCard name="Uqbar"logo="/imagenes/foto_fondo.jpg"description="Grupo estudantil de seguridad informática Unal"members={34}textmembers="miembros activos"></SearchGroupsCard></div>
        <p>{router.query.q}</p>
        {groups.map((group) => (
          <div key={group.id}></div>
        ))}
      </>
    </SideMenu>
  );
};

export default Search;
