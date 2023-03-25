import {Form,Button,Input, Col, Checkbox,ConfigProvider,Row} from 'antd';
import Head from "next/head";
const login = () => {

    return (
        
        <div className='mainContainer'>
          <Head>
            <title>Inicio de Sesion</title>
          </Head>
        <div className='card' id='cardLogin'>
        <Form className='form' id='formLogin'
              layout='vertical' >
        <h1 style={{color:'#2B3467'}}>Bienvenido de nuevo </h1>
            <Form.Item name="correo" label="Correo"  rules={[{ required: true, message: 'Porfavor ingrese su correo' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="contraseña" label="Contraseña" rules={[{ required: true, message: 'Porfavor ingrese su contraseña' }]}>
            <Input.Password/>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" >
            <Checkbox> Recuerdame</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 20 }}>
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
