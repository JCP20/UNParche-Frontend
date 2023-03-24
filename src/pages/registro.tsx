import { Button, Form, Input, message } from "antd";

const layout = {
  labelCol: { span: 50 },
  wrapperCol: { span: 50 },
};

const Registro = () => {
  //Declaración de constantes
  const dominio = "@unal.edu.co";
  const [form] = Form.useForm();

  //Mensaje de exito
  const onFinish = () => {
    message.success("Registro exitoso!");
  };

  //Mensaje de error
  const onFinishFailed = () => {
    message.error("Registro fallido!");
  };

  return (
    //Contenedor principal
    <div className="mainContainer">
      <div className="cardR">
        <Form
          className="formR" //Detalles del Formulario
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          name="wrap"
          labelAlign="left"
          //style={{ maxWidth: 600 }}
          {...layout}
          scrollToFirstError
        >
          <Form.Item
            name="nombreUsuario" //Label usuario
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
            name="correo"
            label="Correo"
            rules={[
              {
                required: true,
                message: "Porfavor ingrese   su correo",
                //pattern: new RegExp(*dominio$),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("correo").includes("@unal.edu.co")) {
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
            name="contraseña"
            label="Contraseña"
            rules={[
              {
                required: true,
                pattern: new RegExp(
                  "(?=.*[!@#$%^&*/-_])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                ),
                message: "Porfavor ingrese su contraseña",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Escribe tu contraseña" />
          </Form.Item>
          <Form.Item
            name="confirmarContraseña"
            label="Confirmar Contraseña"
            dependencies={["contraseña"]}
            rules={[
              {
                required: true,
                message: "Porfavor ingrese nuevamente su contraseña",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("contraseña") === value) {
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
          <Form.Item name="botonRegistro">
            <Button block type="primary" htmlType="submit">
              Registrarme
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Registro;
