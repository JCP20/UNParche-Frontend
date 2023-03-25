import {Form,Button,Input, Checkbox, Modal, message} from 'antd';
import Head from "next/head";
import { useRouter } from "next/router";
import { loginUser } from "@/services/auth";
const login = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      await loginUser(values);
      message.success('Login exitoso!');
      router.push("/");
    } catch (error: any) {
      Modal.error({content:error.response.data.msg});
    }
  };
  const onFinishFailed = () => {
    Modal.error({title: 'Inicio de sesion fallido',
      content:'Respira profundamente e intentalo de nuevo'});
  };
    return (
        
        <div className='mainContainer'>
          <Head>
            <title>Inicio de Sesion</title>
          </Head>
        <div className='card' id='cardLogin'>
        <Form className='form' id='formLogin'
              layout='vertical'
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}>
        <h1>Bienvenido de nuevo </h1>
            <Form.Item name="email" label="Correo"  rules={[{ required: true, message: 'Porfavor ingrese su correo' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Porfavor ingrese su contraseña' }]}>
            <Input.Password/>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" >
            <Checkbox> Recuerdame</Checkbox>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit" block>
              Ingresar
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            ¿No tienes cuenta? <a href="/registro"> Registrate</a>
          </Form.Item>
        </Form>
        <div className="gallery">
          <div className="pic" id="picLogin" />
        </div>
      </div>
    </div>
  );
};

export default login;
