import React from "react";
import {
  Cascader,
  Form,
  Input,
  message,
  Radio,
  UploadFile,
  UploadProps,
  Upload,
  Button,
} from "antd";
import AntdImgCrop from "antd-img-crop";
import { RcFile } from "antd/es/upload";
import { useState } from "react";

const layout = {
  labelCol: { span: 50 },
  wrapperCol: { span: 50 },
};

const crearGrupo = () => {
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
  const onFinish = () => {
    message.success("Registro exitoso!");
  };

  //Mensaje de error
  const onFinishFailed = () => {
    message.error("Registro fallido!");
  };

  return (
    <div className="mainContainer">
      <div className="">
        <Form
          className="" //Detalles del Formulario
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
            name="nombreGrupo" //Label usuario
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
          <Form.Item label="Categoría">
            <Cascader
              options={[
                {
                  value: "Arte",
                  label: "Arte",
                  children: [
                    {
                      value: "Pintura",
                      label: "Pintura",
                    },
                    {
                      value: "Escultura",
                      label: "Escultura",
                    },
                  ],
                },
                {
                  value: "Deporte",
                  label: "Deporte",
                  children: [
                    {
                      value: "Futbol",
                      label: "Futbol",
                    },
                    {
                      value: "Voleibol",
                      label: "Voleibol",
                    },
                    {
                      value: "Basketbol",
                      label: "Basketbol",
                    },
                  ],
                },
                {
                  value: "Otro",
                  label: "Otro",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Descripción">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item label="Upload" valuePropName="fileList">
            <AntdImgCrop rotationSlider>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </AntdImgCrop>
          </Form.Item>

          <Form.Item name="botonCrearGrupo">
            <Button block type="primary" htmlType="submit">
              Crear Grupo
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default crearGrupo;
