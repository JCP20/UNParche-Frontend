import CarouselCustom from "@/components/CarouselCustom";
import { AuthContext } from "@/context/auth/AuthContext";
import { loginUser } from "@/services/auth";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import Head from "next/head";
import Image from "next/image";
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
      console.log(resp)
      message.success("Login exitoso!");
      login(resp.data.token, resp.data.id, resp.data.username);
    } catch (error: any) {
      Modal.error({ content: error.response.data.msg });
    }
  };
  const onFinishFailed = () => {
    Modal.error({
      title: "Inicio de sesion fallido",
      content: "Respira profundamente e intentalo de nuevo",
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
      <div className="mainContainer">
        <div className="card">
          <Form
            className="form"
            id="formLogin"
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
              <Checkbox> Recuerdame</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Ingresar
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              ¿No tienes cuenta? <a href="/registro"> Regístrate</a>
            </Form.Item>
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
