import CarouselCustom from "@/components/CarouselCustom";
import { availableCategories } from "@/components/Categories";
import UploadPhoto from "@/components/UploadPhoto";
import { createUser } from "@/services/auth.service";
import { getBase64 } from "@/utils/images";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { RcFile } from "antd/es/upload";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

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
        content: "Espera un momento por favor...",
        key: "creating",
        duration: 0,
      });

      const { photo } = values;

      const base64Photo = await getBase64(photo.file.originFileObj as RcFile);
      values.photo = base64Photo;

      const resp = await createUser(values);
      if (resp.status === 201) {
        message.destroy("creating");
        Modal.confirm({
          title: "Registro exitoso!",
          content: "Verifica tu correo para continuar",
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
    <>
      <Head>
        <title>Registro</title>
      </Head>
      <div className="containerRegister">
        <Image fill src="/imagenes/wavesbl2.png" alt="" />
        <div className="mainContainerRegister">
          <div className="card shadow">
            <div className="card-body">
              <h2>Gusto en conocerte!</h2>
              <Form
                className="formRegister"
                //Detalles del Formulario
                form={form}
                layout="vertical"
                onFinish={onFinish}
                name="wrap"
                labelAlign="left"
                onFinishFailed={onFinishFailed}
                //style={{ maxWidth: 600 }}
                scrollToFirstError
              >
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
                      type: "email",
                      message: "El correo no es valido",
                    },
                    {
                      required: true,
                      message: "Por favor ingrese su correo",
                      //pattern: new RegExp(*dominio$),
                    },
                    // ({ getFieldValue }) => ({
                    //   validator(_, value) {
                    //     if (getFieldValue("email").includes("@unal.edu.co")) {
                    //       return Promise.resolve();
                    //     }
                    //     return Promise.reject(
                    //       new Error("El correo debe pertenece a @unal.edu.co")
                    //     );
                    //   },
                    // }),
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
                      message: "Por favor ingrese su contraseña",
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
                <UploadPhoto isRequired name="photo" label="Foto de perfil" />
                <Form.Item
                  name="preferredCategories"
                  label="Intereses"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese algún interés",
                    },
                  ]}
                >
                  <Select placeholder="¿Qué te interesa?">
                    {availableCategories.map((category) => (
                      <Select.Option key={category} value={category}>
                        {category}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    Registrarme
                  </Button>
                </Form.Item>
                <Form.Item>
                  ¿Ya tienes una cuenta?
                  <Link href="/login" className="url">
                    Ingresa
                  </Link>
                </Form.Item>
              </Form>
            </div>
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
      </div>
    </>
  );
};

export default Registro;
