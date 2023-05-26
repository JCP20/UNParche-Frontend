import { getBase64 } from "@/utils/images";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Upload } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import React, { useState } from "react";
import EventCard from "./EventsCard";
import { IGroup } from "@/interfaces/groups";
import dayjs from "dayjs";
import UploadPhoto from "../UploadPhoto";

const { TextArea } = Input;

interface NewFormProps {
  actualGroup: IGroup;
  initialValues?: any;
  style?: React.CSSProperties;
  service: (value: any) => void;
  after: () => void;
  buttonText: string;
  isEditing?: boolean;
}

const FormEvent: React.FC<NewFormProps> = (props: NewFormProps) => {
  const {
    service,
    style,
    actualGroup,
    after,
    isEditing,
    buttonText,
    initialValues,
  } = props;

  const [formData, setFormData] = useState(initialValues ?? {});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = form.getFieldsValue();

    if (isEditing) {
      values._id = initialValues._id;
    }

    if (typeof values.photo !== "string") {
      const { photo } = values;
      const base64Photo = await getBase64(photo.file.originFileObj as RcFile);
      values.photo = base64Photo;
    }

    values.group = actualGroup._id;

    values.date = dayjs(values.date).toISOString();

    const resp = await service(values);
    console.log(resp);
    await after();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnFieldsChange = (_: any, allValues: any) => {
    setFormData(allValues);
  };

  return (
    <>
      <Button  type="primary" onClick={showModal}>
        {buttonText}
      </Button>

      <Modal
        width={800}
        centered
        destroyOnClose
        title={buttonText}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={buttonText}
      >
        <div className="containerFormEvent">
          <div className="card">
            <h3>Información</h3>
            <Form
              preserve={false}
              form={form}
              layout="vertical"
              name="wrap"
              labelAlign="left"
              onValuesChange={handleOnFieldsChange}
              initialValues={initialValues ?? {}}
              scrollToFirstError
            >
              <Form.Item
                name="title"
                label="Nombre del Evento"
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingrese el nombre del evento",
                  },
                ]}
              >
                <Input placeholder="Escribe el nombre de tu evento" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Descripción"
                rules={[{ required: true, message: "Descripción requerida" }]}
              >
                <TextArea />
              </Form.Item>

              <UploadPhoto
                isRequired
                name="photo"
                label="Imagen del evento"
                initialPhotoUrl={initialValues?.photo}
              />

              <Form.Item
                name="date"
                label="Fecha del Evento"
                rules={[{ required: true, message: "Fecha requerida" }]}
              >
                <DatePicker showTime format="DD/MM/YYYY, hh:mm a" />
              </Form.Item>
            </Form>
          </div>

          <div className="card">
            <h3>Vista previa</h3>
            <EventCard noShowActions eventData={{ ...formData }} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormEvent;
