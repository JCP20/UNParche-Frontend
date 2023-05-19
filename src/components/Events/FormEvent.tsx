import { getBase64 } from "@/utils/images";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Upload } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import React, { useState } from "react";
import EventCard from "./EventsCard";
import { IGroup } from "@/interfaces/groups";
import dayjs from "dayjs";

const { TextArea } = Input;

interface NewFormProps {
  actualGroup: IGroup;
  initialValues?: any;
  style?: React.CSSProperties;
  service: (value: any) => void;
  after: () => void;
}

const FormEvent: React.FC<NewFormProps> = (props: NewFormProps) => {
  const { service, style, initialValues, actualGroup, after } = props;
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = form.getFieldsValue();

    if (values.photo) {
      const { photo } = values;
      const base64Photo = await getBase64(photo.file.originFileObj as RcFile);
      values.photo = base64Photo;
    }

    values.group = actualGroup._id;

    values.date = dayjs(values.date).toISOString();

    const resp = await service(values);
    await after();
    setIsModalOpen(false);
  };

  const handleChange = async (value: any) => {
    setFileList(value.fileList);

    if (!value.file.url && !value.file.preview) {
      value.file.preview = await getBase64(value.file.originFileObj as RcFile);
    }

    setPreviewImage(value.file.url || (value.file.preview as string));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Subir</div>
    </div>
  );

  const handleOnFieldsChange = (_: any, allValues: any) => {
    setFormData(allValues);
  };

  console.log(style ?? {});

  return (
    <>
      <Button style={style ?? {}} type="primary" onClick={showModal}>
        Nuevo Evento
      </Button>

      <Modal
        width={800}
        centered
        destroyOnClose
        title="Creación de Evento"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Crear"
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

              <Form.Item
                label="Imagen del evento"
                name="photo"
                rules={[{ required: true, message: "Imagen requerida" }]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  onPreview={handlePreview}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
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
            <EventCard eventData={{ ...formData, photo: previewImage }} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormEvent;
