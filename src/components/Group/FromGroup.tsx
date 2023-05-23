import { Form, Input, Modal, Select, message } from "antd";

import { getBase64 } from "@/utils/images";
import type { RcFile } from "antd/es/upload/interface";
import React from "react";
import { availableCategories } from "../Categories";
import UploadPhoto from "../UploadPhoto";
import { useRouter } from "next/router";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 50 },
  wrapperCol: { span: 50 },
};
interface NewFormProps {
  initialValues?: any;
  user?: string;
  service: (value: any) => any;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  after?: () => void;
  isEditing?: boolean;
}

const FormGroup: React.FC<NewFormProps> = (props: NewFormProps) => {
  const {
    service,
    isEditing,
    isModalOpen,
    setIsModalOpen,
    user,
    after,
    initialValues,
  } = props;

  const [form] = Form.useForm();
  const router = useRouter();

  const handleOk = async () => {
    const values = await form.validateFields();

    message.loading({
      content: "Cargando...",
      key: "loading",
      duration: 0,
    });

    if (typeof values.photo !== "string") {
      values.photo = await getBase64(values.photo.file.originFileObj as RcFile);
    }

    if (!isEditing) {
      values.administrators = [user];
    } else {
      values.groupId = initialValues._id;
    }

    const resp = await service(values);
    after && (await after());

    if (resp?.ok && !isEditing) {
      router.push(`/groupPage/${resp.data._id}`);
    }

    if (resp?.ok) {
      message.success({ content: "Grupo creado exitosamente", key: "loading" });
      form.resetFields();
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
        title={isEditing ? "Editar Grupo" : "Crear Grupo"}
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
              initialValues={initialValues}
              scrollToFirstError
            >
              <Form.Item
                name="name"
                label="Nombre del Grupo"
                rules={
                  !isEditing
                    ? [
                        {
                          required: true,
                          message: "Por favor ingresa el nombre del grupo",
                        },
                      ]
                    : []
                }
              >
                <Input placeholder="Escribe el nombre de tu grupo" />
              </Form.Item>

              <Form.Item
                name="category"
                label="Categoría"
                rules={
                  !isEditing
                    ? [
                        {
                          required: true,
                          message:
                            "Por favor selecciona la categoría del grupo",
                        },
                      ]
                    : []
                }
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
                rules={
                  !isEditing
                    ? [
                        {
                          required: true,
                          message: "Por favor ingresa la descripción del grupo",
                        },
                      ]
                    : []
                }
              >
                <TextArea rows={2} placeholder="Descripción del grupo..." />
              </Form.Item>
              <UploadPhoto
                name="photo"
                label="Foto"
                isRequired={!isEditing}
                initialPhotoUrl={isEditing && initialValues?.photo}
              />
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormGroup;
