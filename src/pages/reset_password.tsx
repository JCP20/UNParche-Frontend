import React from "react";
import { Form, Input, Button } from "antd";

const Reset_password = () => {
  return (
    <div className="resetPassContainer">
      <Form>
        <h2 className="resetPass__title">Restablecer contraseña</h2>
        <span className="resetPass__label">Nueva contraseña</span>
        <Form.Item
          //   label="Nueva contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu contraseña",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Nueva contraseña" />
        </Form.Item>

        <span className="resetPass__label">Confirmar contraseña</span>
        <Form.Item
          //   label="Confirmar contraseña"
          name="confirm_password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Por favor confirma tu contraseña",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirmar contraseña" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cambiar contraseña
          </Button>
        </Form.Item>
        <p className="resetPass__credits">UnParche</p>
      </Form>
    </div>
  );
};

export default Reset_password;
