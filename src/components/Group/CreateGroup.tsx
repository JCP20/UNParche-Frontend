import { Form, Input, Modal, Select, message } from "antd";

import { getBase64 } from "@/utils/images";
import type { RcFile } from "antd/es/upload/interface";
import React from "react";
import { availableCategories } from "../Categories";
import UploadPhoto from "../UploadPhoto";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 50 },
  wrapperCol: { span: 50 },
};
interface NewFormProps {
  initialValues?: any;
  user: string;
  service: (value: any) => any;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  after: () => void;
}

const CrearGrupo: React.FC<NewFormProps> = (props: NewFormProps) => {
  const { service, isModalOpen, setIsModalOpen, user, after } = props;

  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();

    const { photo } = values;
    const base64Photo = await getBase64(photo.file.originFileObj as RcFile);

    values.photo = base64Photo;
    values.administrators = [user];

    const resp = await service(values);
    await after();

    if (resp.ok) {
      message.success("Grupo creado exitosamente");
      form.resetFields();
    } else {
      message.error(resp.data.msg);
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        {initialValues}
      </Button> */}
      <Modal
        destroyOnClose
        title="Creación de Grupo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <div className="mainContainer">
          <div className="card">
            <Form
              className="form"
              id="formCrearGrupo" //Detalles del Formulario
              form={form}
              layout="vertical"
              name="wrap"
              labelAlign="left"
              style={{ maxWidth: 600 }}
              {...layout}
              scrollToFirstError
            >
              <Form.Item
                name="name"
                label="Nombre del Grupo"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el nombre del grupo",
                  },
                ]}
              >
                <Input placeholder="Escribe el nombre de tu grupo" />
              </Form.Item>

              <Form.Item
                name="category"
                label="Categoría"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona la categoría del grupo",
                  },
                ]}
              >
                <Select>
                  {availableCategories.map((category) => (
                    <Select.Option key={category} value={category}>
                      {category}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="description"
                label="Descripción"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa la descripción del grupo",
                  },
                ]}
              >
                <TextArea rows={2} placeholder="Descripción del grupo..." />
              </Form.Item>
              <UploadPhoto name="photo" label="Foto" isRequired />
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CrearGrupo;
