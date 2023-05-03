import { getGroupByNameFn } from "@/services/groups.service";
import { Button, Modal, Cascader, Form, Input, Radio, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState } from "react";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 50 },
  wrapperCol: { span: 50 },
};
interface NewFormProps {
  initialValues?: any;
  service: (value: any) => void;
}

const FormGroupApp: React.FC<NewFormProps> = (props: NewFormProps) => {
  const { service } = props;
  const { initialValues } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = async () => {    
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = form.getFieldsValue();
    values.category = values.category[0];
    values.administrators = ["644409d6659d4bfcb4ccbc01"];
    console.log(values);
    const resp = await service(values);
    console.log(resp);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  //Declaración de constandes

  const [form] = Form.useForm();

  //Mensaje de exito
  const onFinish = async (value: any) => {
    await service(value);
    message.success("Registro exitoso!");
  };

  //Mensaje de error
  const onFinishFailed = () => {
    message.error("Registro fallido!");
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {initialValues}
      </Button>
      <Modal
        title={initialValues}
        open={isModalOpen}
        onOk={handleOk}
        okText={initialValues}
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                    message: "Porfavor ingrese el nombre del grupo",
                  },
                ]}
              >
                <Input placeholder="Escribe el nombre de tu grupo" />
              </Form.Item>
              <Form.Item label="Privacidad">
                <Radio.Group>
                  <Radio value="Publico"> Público </Radio>
                  <Radio value="Privado"> Privado </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name='category' label="Categoría">
                <Cascader
                  options={[
                    {
                      value: "Arte",
                      label: "Arte",
                    },
                    {
                      value: "Deporte",
                      label: "Deporte",
                    },
                    {
                      value: "Religión",
                      label: "Religión",
                    },
                    {
                      value: "Investigación",
                      label: "Investigación",
                    },
                    {
                      value: "Semillero",
                      label: "Semillero",
                    },
                    {
                      value: "Videojuegos",
                      label: "Videojuegos",
                    },
                    {
                      value: "Otro",
                      label: "Otro",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name='description' label="Descripción">
                <TextArea rows={2} />
              </Form.Item>
              <Form.Item label="Upload" valuePropName="fileList">
                <ImgCrop rotationSlider>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormGroupApp;
