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
  initialValues?: any
  service: (value: any)=> void
}


const CrearGrupoApp: React.FC<NewFormProps> = (props:NewFormProps) => {
  const {service} = props;
  const {initialValues} = props;
  const {nombreBotton} = initialValues;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
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
    await service(value) ;
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
      <Modal title="Creación de Grupo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="mainContainer">
          <div className="card" id="cardCrearGrupo">
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
              <Form.Item label="Descripción">
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
                    {fileList.length < 5 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </Form.Item>       
              <Form.Item name="botonCrearGrupo">
            <Button block type="primary" htmlType="submit">
              Crear Grupo
            </Button>
          </Form.Item>       
            </Form>
          </div>
        </div>
        
      </Modal>
    </>
  );
};

export default CrearGrupoApp;