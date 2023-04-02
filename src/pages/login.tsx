import { AuthContext } from "@/context/auth/AuthContext";
import { loginUser } from "@/services/auth";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import Head from "next/head";
import { useContext } from "react";

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const onFinish = async (values: any) => {
    try {
      const resp = await loginUser(values);
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
      <div className="mainContainer">
        <div className="card" id="cardLogin">
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
          <div className="gallery">
            <div className="pic" id="picLogin" />
          </div>
        </div>
      </div>
      <div className="diamondsContainer">
        <div className="diamond diamond_1" />
        <div className="diamond diamond_2" />
        <div className="diamond diamond_3" />
        <div className="diamond diamond_4" />
      </div>
    </div>
  );
};

export default LoginPage;
