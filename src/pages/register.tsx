import CarouselCustom from "@/components/CarouselCustom";
import { createUser } from "@/services/auth";
import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const layout = {
  labelCol: { span: 50 },
  wrapperCol: { span: 50 },
};

const imagesRegistro = [
  "/imagenes/Imagen5.png",
  "/imagenes/Imagen6.png",
  "/imagenes/Imagen7.png",
];

//Aplicación de registro
const Registro = () => {
  const [form] = Form.useForm();

  //Mensaje de exito
  const onFinish = async (values: any) => {
    try {
      message.loading({
        content: "Espera un momento porfavor...",
        key: "creating",
        duration: 0,
      });
      const resp = await createUser(values);
      if (resp.status === 201) {
        message.success({
          content: "Verifica tu cuenta usando tu correo electrónico",
          key: "creating",
          duration: 10,
        });
      }
    } catch (error: any) {
      message.error({ content: error.response.data.msg, key: "creating" });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="containerLogin">
      <Head>
        <title>Registro</title>
      </Head>

      <>
        <div className="mainContainer">
          <div className="card">
            <Form
              className="form"
              id="formRegister" //Detalles del Formulario
              form={form}
              layout="vertical"
              onFinish={onFinish}
              name="wrap"
              labelAlign="left"
              onFinishFailed={onFinishFailed}
              //style={{ maxWidth: 600 }}
              {...layout}
              scrollToFirstError
            >
              <h1>Gusto en conocerte!</h1>
              <Form.Item
                name="username" //Label usuario
                label="Usuario"
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingrese su usuario",
                  },
                ]}
              >
                <Input placeholder="Escribe tu nombre de usuario" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Correo"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su correo",
                    //pattern: new RegExp(*dominio$),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue("email").includes("@unal.edu.co")) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("El correo debe pertenece a @unal.edu.co")
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input placeholder="Escribe tu correo" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingrese su contraseña",
                  },
                ]}
              >
                <Input.Password placeholder="Escribe tu contraseña" />
              </Form.Item>
              <Form.Item
                name="password_confirmation"
                label="Confirmar Contraseña"
                dependencies={["contraseña"]}
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingrese nuevamente su contraseña",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Las contraseñas no coinciden!")
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Confirma tu contraseña tu contraseña" />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Registrarme
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4 }}>
                ¿Ya tienes una cuenta? <a href="/login"> Ingresa</a>
              </Form.Item>
            </Form>
            <div className="carrouselContainer">
              <CarouselCustom images={imagesRegistro} />
            </div>
          </div>
        </div>
        <div className="diamondsContainer">
          <div className="diamond diamond_1 alpha-9" />
          <div className="diamond diamond_2 alpha-9" />
          <div className="diamond diamond_3 alpha-7" />
          <div className="diamond diamond_4 alpha-5" />
        </div>
      </>
    </div>
  );
};

export default Registro;
