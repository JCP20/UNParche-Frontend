import CarouselCustom from "@/components/CarouselCustom";
import { availableCategories } from "@/components/Categories";
import UploadPhoto from "@/components/UploadPhoto";
import { createUser } from "@/services/auth.service";
import { getBase64 } from "@/utils/images";
import { Button, Form, Input, Modal, Select, message,Checkbox } from "antd";
import { RcFile } from "antd/es/upload";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const imagesRegistro = [
  "/imagenes/Imagen5.png",
  "/imagenes/Imagen6.png",
  "/imagenes/Imagen7.png",
];

//Aplicación de registro
const Registro = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalOpen = () => {
    setModalVisible(true);
  };
  //Mensaje de exito
  const onFinish = async (values: any) => {
    try {
      message.loading({
        content: "Espera un momento por favor...",
        key: "creating",
        duration: 0,
      });

      const { photo } = values;

      const base64Photo = await getBase64(photo.file.originFileObj as RcFile);
      values.photo = base64Photo;

      const resp = await createUser(values);
      if (resp.status === 201) {
        message.destroy("creating");
        Modal.confirm({
          title: "Registro exitoso!",
          content: "Verifica tu correo para continuar",
        });
      }
    } catch (error: any) {
      message.error({ content: error.response.data.msg, key: "creating" });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>Registro</title>
      </Head>
      <div className="containerRegister">
        <Image fill src="/imagenes/wavesbl2.png" alt="" />
        <div className="mainContainerRegister">
          <div className="card shadow">
            <div className="card-body">
              <h2>Gusto en conocerte!</h2>
              <Form
                className="formRegister"
                //Detalles del Formulario
                form={form}
                layout="vertical"
                onFinish={onFinish}
                name="wrap"
                labelAlign="left"
                onFinishFailed={onFinishFailed}
                scrollToFirstError
              >
                <Form.Item
                  name="username" //Label usuario
                  label="Usuario"
                  rules={[
                    {
                      required: true,
                      message: "Porfavor ingrese su usuario",
                    },
                  ]}
                >
                  <Input placeholder="Escribe tu nombre de usuario" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Correo"
                  rules={[
                    {
                      type: "email",
                      message: "El correo no es valido",
                    },
                    {
                      required: true,
                      message: "Por favor ingrese su correo",
                      //pattern: new RegExp(*dominio$),
                    },
                    // ({ getFieldValue }) => ({
                    //   validator(_, value) {
                    //     if (getFieldValue("email").includes("@unal.edu.co")) {
                    //       return Promise.resolve();
                    //     }
                    //     return Promise.reject(
                    //       new Error("El correo debe pertenece a @unal.edu.co")
                    //     );
                    //   },
                    // }),
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Escribe tu correo" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Contraseña"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese su contraseña",
                    },
                  ]}
                >
                  <Input.Password placeholder="Escribe tu contraseña" />
                </Form.Item>
                <Form.Item
                  name="password_confirmation"
                  label="Confirmar Contraseña"
                  dependencies={["contraseña"]}
                  rules={[
                    {
                      required: true,
                      message: "Porfavor ingrese nuevamente su contraseña",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Las contraseñas no coinciden!")
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Confirma tu contraseña tu contraseña" />
                </Form.Item>
                <UploadPhoto isRequired name="photo" label="Foto de perfil" />
                <Form.Item
                  name="preferredCategories"
                  label="Intereses"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese algún interés",
                    },
                  ]}
                >
                  <Select placeholder="¿Qué te interesa?">
                    {availableCategories.map((category) => (
                      <Select.Option key={category} value={category}>
                        {category}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item wrapperCol={{offset:1}}>
            Al registrarte aceptas nuestros  
            <Button className="botonterm" type="link" onClick={handleModalOpen}>
          &nbsp;&nbsp;&nbsp; Términos y condiciones
      </Button>
          </Form.Item>
                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    Registrarme
                  </Button>
                </Form.Item>
                <Form.Item >
                  ¿Ya tienes una cuenta?
                  <Link href="/login" className="url">
                    Ingresa
                  </Link>
                </Form.Item>


      <Modal
  open={modalVisible}
  onCancel={() => setModalVisible(false)}
  footer={null}
>
  <h2 className="termtitle">Terminos y condiciones</h2>
  <div className="Termodal">
  <p className="terminos">
    Bienvenido a UNParche, una plataforma en línea que permite a los usuarios de la Universidad Nacional de Colombia registrados crear grupos y eventos para compartir información y conectarse con otros usuarios. Antes de utilizar nuestro sitio web y servicios, te pedimos que leas atentamente los siguientes Términos y Condiciones. Al acceder y utilizar UNParche, aceptas regirte por estos términos y condiciones. Si no estás de acuerdo con alguno de ellos, te solicitamos que no utilices nuestra plataforma.
    <br /><br />
    <span className="number">1. Aceptación de los Términos y Condiciones:</span> 
    <br />
    <span className="number-ident-1">1.1</span> Al registrarte y utilizar UNParche, confirmas que has leído, entendido y aceptado estos Términos y Condiciones en su totalidad. Asimismo, declaras que tienes capacidad legal para celebrar un contrato vinculante.
    <br />
    <span className="number-ident-1">1.2</span> Estos Términos y Condiciones constituyen un acuerdo legal entre tú y UNParche con respecto al uso de nuestros servicios. Cualquier violación de estos términos puede dar lugar a la suspensión o cancelación de tu cuenta y acceso a UNParche.
    <br />
    <span className="number">2. Uso de UNParche</span> 
    <br />
    <span className="number-ident-1">2.1</span> UNParche es una plataforma en línea que permite a los usuarios registrados crear grupos con diferentes categorías e intercambiar información relacionada.
    <br />
    <span className="number-ident-1">2.2</span> Para utilizar UNParche, debes registrarte con una cuenta institucional válida proporcionada por tu institución educativa o entidad autorizada. No se permitirá el uso de cuentas personales o no autorizadas.
    <br />
    <span className="number-ident-1">2.3</span> Eres responsable de mantener la confidencialidad de tu información de inicio de sesión y de cualquier actividad que ocurra en tu cuenta. En caso de sospecha de uso no autorizado de tu cuenta, debes notificarlo de inmediato a UNParche.
    <br />
    <span className="number">3. Grupos y Eventos </span> 
    <br />
    <span className="number-ident-1">3.1</span> Los usuarios registrados en UNParche pueden crear grupos en diferentes categorías y compartir información relevante dentro de ellos.
    <br />
    <span className="number-ident-1">3.2</span> Dentro de los grupos, los usuarios pueden crear eventos relacionados con la temática del grupo. Los miembros del grupo pueden resaltar o denunciar los eventos según su contenido y cumplimiento de las políticas de UNParche.

    <br />
    <span className="number-ident-1">3.3</span> UNParche se reserva el derecho de revisar y eliminar cualquier evento que viole nuestros Términos y Condiciones o que sea considerado inapropiado o ilegal. La decisión de UNParche respecto a la eliminación de eventos es final y no está sujeta a apelación.
  <br/>
    <span className="number">4. Responsabilidad del Usuario </span> 
    <br />
    <span className="number-ident-1">4.1</span> Al utilizar UNParche, aceptas utilizar la plataforma de manera responsable y respetuosa. No debes:
    <br />
    <span className="number-ident-2">a.</span> Proporcionar información falsa o engañosa.
    <br/>
    <span className="number-ident-2">  b.</span> Publicar contenido ilegal, difamatorio, obsceno, ofensivo o que viole los derechos de terceros.
    <br/>
    <span className="number-ident-2">c.</span> Realizar actividades que interfieran con el funcionamiento adecuado de UNParche.
    <br/>
    <span className="number-ident-2">d.</span> Utilizar UNParche para fines comerciales o promocionales sin autorización previa.
    <br />
    <span className="number-ident-1">4.2</span>   Eres responsable de cualquier contenido que publiques en UNParche y aceptas indemnizar y eximir de responsabilidad a UNParche y sus afiliados por cualquier reclamo o daño que surja del contenido que publiques
    <br/>
    <span className="number">5. Privacidad y Protección de Datos </span> 
    <br />
    <span className="number-ident-1">5.1</span> UNParche se compromete a proteger tu privacidad y tratar tus datos personales de acuerdo con nuestra Política de Privacidad. Al utilizar UNParche, aceptas el uso de tus datos personales de acuerdo con esta política.
    <br />
    <span className="number-ident-1">5.2</span> UNParche puede recopilar y utilizar información no personal sobre el uso de la plataforma con fines estadísticos y de mejora de nuestros servicios
    <br/>
    <span className="number">6. Modificaciones de los Términos y Condiciones </span> 
    <br />
    <span className="number-ident-1">6.1</span> UNParche se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Se te notificará cualquier cambio mediante la publicación de los términos actualizados en nuestro sitio web.
    <br />
    <span className="number-ident-1">6.2</span> El uso continuado de UNParche después de la modificación de los Términos y Condiciones constituye tu aceptación de los términos actualizados.
    <br/>
    <span className="number">7. Terminación </span> 
    <br />
    <span className="number-ident-1">7.1</span> Tanto tú como UNParche tienen el derecho de rescindir este acuerdo en cualquier momento y por cualquier motivo.
    <br />
    <span className="number-ident-1">7.2</span> En caso de terminación, tus derechos de uso de UNParche se extinguirán inmediatamente y debes cesar cualquier uso de la plataforma.
    <br/>
    <span className="number">8. Ley Aplicable y Jurisdicción</span> 
    <br />
    <span className="number-ident-1">8.1</span> Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del país o jurisdicción donde está registrada UNParche.
    <br />
    <span className="number-ident-1">8.2</span> Cualquier disputa o reclamación relacionada con estos Términos y Condiciones estará sujeta a la jurisdicción exclusiva de los tribunales competentes de esa jurisdicción.

    <br />
    <br />
    ¡Gracias por utilizar UNParche! Esperamos que disfrutes de nuestra plataforma y encuentres experiencias enriquecedoras en nuestros grupos y eventos.
 
  
  </p>
</div>
</Modal>
              </Form>
            </div>
            <div className="carrouselContainer">
              <CarouselCustom images={imagesRegistro} />
            </div>
          </div>
        </div>
        <div className="diamondsContainer">
          <div className="diamond diamond_1 alpha-9" />
          <div className="diamond diamond_2 alpha-9" />
          <div className="diamond diamond_3 alpha-7" />
          <div className="diamond diamond_4 alpha-5" />
        </div>
      </div>
    </>
  );
};

export default Registro;
