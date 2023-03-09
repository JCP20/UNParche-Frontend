import React from 'react';
import { Button, Form, Input, message, Space } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const RegistroApp: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success('Registro exitoso!');
  };

  const onFinishFailed = () => {
    message.error('Registro fallido!');
  };

  return (
    <Form
      
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}      
      name="wrap"            
      labelAlign="right"
      style={{ maxWidth: 600 }}
      {...layout}
    >
      <Form.Item 
        name='nombreCompleto' 
        label='Nombre Completo'
        rules={[{
            required: true,
            message:'Porfavor ingrese su nombre Completo'
        },
        {whitespace:true},
        {min: 3}

        ]}
        >
        <Input placeholder="Escribe tú nombre"/>
    </Form.Item>
    <Form.Item 
        name='nombreUsuario'
        label='Nombre de Usuario'
        rules={[{
            required: true,
            message:'Porfavor ingrese su usuario'            
            }]}
        >
        <Input placeholder="Escribe tu nombre de usuario"/>        
    </Form.Item>
        <Form.Item
        name='correo'
        label='Correo'
        rules={[{
            required: true,
            message:'Porfavor ingrese su correo' 

            }]}
        >
        <Input placeholder="Escribe tu correo"/>       
    </Form.Item>
    <Form.Item 
        name='contraseña' 
        label='Contraseña'
        rules={[{
            required: true,
            message:'Porfavor ingrese su contraseña'            
            }]}
        >
        <Input.Password placeholder="Escribe tu contraseña"/>
    </Form.Item>
    <Form.Item
        name='confirmarContraseña' 
        label='Confirmar Contraseña'
        rules={[{
            required: true,
            message:'Porfavor ingrese nuevamente su contraseña'            
            }]}
        >
        <Input.Password placeholder="Confirma tu contraseña tu contraseña"/>
        </Form.Item>
        <Form.Item name='botonRegistro'>
            <Button block type="primary" htmlType="submit">
            Registrarme
            </Button>
        </Form.Item>   
    </Form>
  );
};

export default RegistroApp;