import SideMenu from "@/components/Layout/Layout";
import { Button, Form, Select } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const groups = [
  { id: "1", name: "Grupo 1", description: "Hola mundo", foto: "imgen.png" },
  { id: "2", name: "Grupo 2", description: "Hola mundo", foto: "imgen.png" },
  { id: "3", name: "Grupo 3", description: "Hola mundo", foto: "imgen.png" },
  { id: "4", name: "Grupo 4", description: "Hola mundo", foto: "imgen.png" },
];

const exampleCategories = [
  { label: "Deportes", value: "deportes" },
  { label: "Música", value: "musica" },
  { label: "Cine", value: "cine" },
  { label: "Literatura", value: "literatura" },
];

const Search = () => {
  useEffect(() => {
    // Pediríamos información al back para mostrar grupos según el nombre

    console.log("Me ejecuté!");
  }, []);

  const onFinish = (values: any) => {
    // llama al back para realizar la busqueda según los filtros

    console.log(values);
  };

  return (
    <SideMenu notShowHeader >
      <>
        <h2>Resultados de la búsqueda</h2>
        <div className="filters">
          <Form onFinish={onFinish}>
            <h3>Categorías:</h3>
            <Form.Item name="category">
              <Select mode="multiple" options={exampleCategories} allowClear />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Buscar
              </Button>
            </Form.Item>
          </Form>
        </div>

        {groups.map((group) => (
          <div key={group.id}></div>
        ))}
      </>
    </SideMenu>
  );
};

export default Search;
