
import {Form,Button,Input, Col, Checkbox,ConfigProvider,Row} from 'antd';

const LoginForm = () => {

    return (

        <div className='mainContainer'>
          <title>Incio de Sesion</title>
        <div className='blob-ctr'>
        </div>
        <div className='card'>
        <Form className='form'  >
        <h1 style={{color:'#2B3467'}}>Bienvenido de nuevo </h1>
            <Form.Item name="correo" label="Correo" wrapperCol={{ span: 16}} rules={[{ required: true, message: 'Porfavor ingrese su correo' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="contraseña" label="Contraseña"  wrapperCol={{span: 12}}rules={[{ required: true, message: 'Porfavor ingrese su contraseña' }]}>
            <Input.Password/>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 16 }}>
            <Checkbox> Recuerdame</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 20}} >
            <Button type="primary" htmlType="submit" block>Ingresar</Button>
            </Form.Item>
        </Form>
        </div>
        <div className="shape-blob"></div>
        <div className="shape-blob one"></div>
        <div className="shape-blob two"></div>
        </div>

    );

  };
  
  export default LoginForm;
  