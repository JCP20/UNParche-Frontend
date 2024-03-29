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
  const [previewImage, setPreviewImage] = useState(initialValues?.photo ?? "");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

    await service(values);

    form.resetFields();
    await after();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleOnFieldsChange = async (_: any, allValues: any) => {
    setFormData(allValues);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
  };

  const handleChange = async (value: any) => {
    setFileList(value.fileList);

    if (!value.file.url && !value.file.preview) {
      value.file.preview = await getBase64(value.file.originFileObj as RcFile);
    }

    setPreviewImage(value.file.url || (value.file.preview as string));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Subir</div>
    </div>
  );

  return (
    <>
      <Button style={style ?? {}} type="primary" onClick={showModal}>
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
            <EventCard
              noShowActions
              eventData={{ ...formData, photo: previewImage }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormEvent;
