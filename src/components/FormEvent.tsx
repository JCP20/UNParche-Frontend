import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  message,
  Upload,
  DatePicker,
} from "antd";
import { TimePicker, Typography } from "antd";
import dayjs from "dayjs";
import EventCardApp from "./EventsCard";

const { TextArea } = Input;
const { Title } = Typography;
const defaultSrc = "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"

const layout = {
  labelCol: { span: 50 },
  wrapperCol: { span: 50 },
};

interface NewFormProps {
  initialValues?: any;
  service: (value: any, id?: string) => void;
}
//******************************************************************** */
const FormEvent: React.FC<NewFormProps> = (props: NewFormProps) => {
  const { service } = props;
  const { initialValues } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formType } = initialValues;
  const { groupName } = initialValues;
  const { title } = initialValues;
  const { date } = initialValues;
  const { schedule } = initialValues;
  const { description } = initialValues;
  const { idEvent } = initialValues;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (formType == "Crear Evento") {
      const values = form.getFieldsValue();
      values.id_group = "6451b709de14fbcd063fb109"
      values.date = values.datef.format("DD/MM/YY")
      values.schedule = values.schedule.format("h:mm a")
      setIsModalOpen(false);
      const resp = await service(values);
      message.success("Envento creado exitosamente!");
    } else {
      const values = form.getFieldsValue();
      values.id_group = "6451b709de14fbcd063fb109"
      values.date = values.datef.format("DD/MM/YY")
      values.schedule = values.schedule.format("h:mm a")
      setIsModalOpen(false);
      console.log(idEvent);
      const resp = await service({ values, idEvent });
      console.log(resp);
      message.success("Envento editado exitosamente!");
    }


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
  const nameValue = Form.useWatch("title", form);
  const desValue = Form.useWatch("description", form);

  var fechaValue = Form.useWatch("datef", form);

  var horaValue = Form.useWatch("schedule", form);
  if (horaValue == undefined) {
    horaValue = dayjs("12:00 a", "h:mm a");
  }
  if (fechaValue == undefined) {
    fechaValue = dayjs();
  }

  //Mensaje de exito
  const onFinish = () => {    
    message.success("Envento creado exitosamente!");
  };

  //Mensaje de error
  const onFinishFailed = () => {
    message.error("Creación de evento fallida!");
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {formType}
      </Button>

      <Modal
        width={800}
        centered
        title={formType}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={formType}
      >
        <div className="containerFormEvent">
          <div className="card">
            <h3>Información</h3>
            <Form
              className="form"
              id="formCrearGrupo" //Detalles del Formulario
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              name="wrap"
              labelAlign="left"
              {...layout}
              scrollToFirstError
            >
              <Form.Item
                name="title" //Label usuario
                initialValue={title}
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
              <Form.Item name="description" label="Descripción" initialValue={description}>
                <TextArea rows={2} />
              </Form.Item>
              <Form.Item label="Imagen del evento" valuePropName="fileList">
                <ImgCrop rotationSlider>
                  <Upload
                    name="foto"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={(file) => {
                      console.log("aaa");
                      return true;
                    }}
                  >
                    {fileList.length < 1 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item name="datef" label="Fecha del Evento" initialValue={date}>
                <DatePicker format={"DD/MM/YY"} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="schedule" label="Hora del Evento" initialValue={schedule}>
                <TimePicker
                  use12Hours
                  style={{ width: "100%" }}
                  format="h:mm a"
                  defaultValue={dayjs("12:00 a", "h:mm a")}
                />
              </Form.Item>
            </Form>
          </div>

          <div className="card">
            <h3>Vista previa</h3>
            <EventCardApp
              nombreEvento={nameValue}
              descripcionEvento={desValue}

              imagenSrc={defaultSrc} //fileList[0].url}
              fechaEvento={fechaValue.format("DD/MM/YY")}
              horaEvento={horaValue.format("h:mm a")} idEvento={""} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormEvent;
