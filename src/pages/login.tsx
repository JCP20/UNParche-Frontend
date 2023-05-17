import CarouselCustom from "@/components/CarouselCustom";
import { AuthContext } from "@/context/auth/AuthContext";
import { loginUser } from "@/services/auth.service";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const imagesLogin = [
  "/imagenes/Imagen1.png",
  "/imagenes/Imagen2.png",
  "/imagenes/Imagen3.png",
  "/imagenes/Imagen4.png",
];

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const onFinish = async (values: any) => {
    try {
      const resp = await loginUser(values);
      if (resp.status === 200) {
        message.success("Login exitoso!");
        login(resp.data.token, {
          id: resp.data.id,
          username: resp.data.username,
          role: resp.data.role,
        });
      } else {
        message.error("Login fallido");
      }
    } catch (error: any) {
      Modal.error({ content: error.response.data.msg });
    }
  };
  const onFinishFailed = () => {
    Modal.error({
      title: "Inicio de sesión fallido",
      content: "Respira profundamente e inténtalo de nuevo",
      cancelButtonProps: { style: { display: "none" } },
    });
  };
  return (
    <div className="containerLogin">
      <Head>
        <title>Inicio de Sesión</title>
      </Head>
      <Image fill src="/imagenes/wavesbl2.png" alt="" />
      <div className="diamondsContainer">
        <div className="diamond diamond_1 alpha-9" />
        <div className="diamond diamond_2 alpha-9" />
        <div className="diamond diamond_3 alpha-7" />
        <div className="diamond diamond_4 alpha-5" />
      </div>
      <div className="mainContainerLogin">
        <div className="card shadow">
          <Form
            className="formLogin"
            layout="vertical"
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <h1>Bienvenido de nuevo </h1>
            <Form.Item
              name="email"
              label="Correo"
              rules={[
                { required: true, message: "Porfavor ingrese su correo" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Contraseña"
              rules={[
                { required: true, message: "Porfavor ingrese su contraseña" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Recuerdame</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Iniciar sesión
              </Button>
            </Form.Item>
            <div className="createAccountInfo">
              <p>¿No tienes cuenta?</p>
              <Link href="/register" className="url">
                Regístrate
              </Link>
            </div>
          </Form>
          <div className="carrouselContainer">
            <CarouselCustom images={imagesLogin} />
          </div>
          {/* <div className="gallery">
            <div className="pic" id="picLogin" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
