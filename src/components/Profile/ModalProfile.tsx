import { Form, Input, Modal, Radio, Select, Upload } from "antd";
import React from "react";
import { availableCategories } from "../Categories";
import UploadPhoto from "../UploadPhoto";

interface Values {
  preferredCategories: string[];
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  defaultValues?: Values;
}

const ModalProfile: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  defaultValues,
}) => {
  const [form] = Form.useForm();

  console.log(defaultValues);
  return (
    <Modal
      open={open}
      title="Editar perfil"
      okText="Aceptar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
            // form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ ...defaultValues }}
      >
        {/* <Form.Item name="actualPassword" label="Contraseña actual">
          <Input.Password />
        </Form.Item>
        <Form.Item name="newPassword" label="Nueva contraseña">
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label="Confirma nueva contraseña"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Por favor confirma tu nueva contraseña!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item> */}

        <Form.Item name="preferredCategories" label="Intereses">
          <Select mode="multiple" allowClear>
            {availableCategories.map((category) => (
              <Select.Option value={category}>{category}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <UploadPhoto name="photo" label="Imagen de perfil" />
      </Form>
    </Modal>
  );
};

export default ModalProfile;
