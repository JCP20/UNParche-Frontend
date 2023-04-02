import React from 'react';
import { Button, Form, Input, message, Space } from 'antd';


const layout = {
  labelCol: { span: 50 },
  wrapperCol: { span: 50 },
};

//Aplicación de registro
const Registro= () => {
  //Declaración de constandes
  const dominio = "@unal.edu.co";
  const [form] = Form.useForm();
  
  //Mensaje de exito
  const onFinish = () => {
    message.success('Registro exitoso!');
  };
  
  //Mensaje de error
  const onFinishFailed = () => {
    message.error('Registro fallido!');
  };
  
  return (
    //Contenedor principal
    <div className='mainContainer'>         
      <title>Registro</title> 
    <div className='card'id='cardRegister'>     
    <Form className='form' id='formRegister'      //Detalles del Formulario
              
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}      
      name="wrap"      
      labelAlign="left"
      //style={{ maxWidth: 600 }}
      {...layout}
      scrollToFirstError
    ><h1 style={{color:'#2B3467'}}>Gusto en conocerte! </h1>
      <Form.Item     
        name='nombreUsuario'  //Label usuario
        label='Usuario'
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
            message:'Porfavor ingrese   su correo',
            pattern: new RegExp("[a-z]+(@unal.edu.co)$"),
            },
          ]}
          hasFeedback
        >
        <Input placeholder="Escribe tu correo"/>       
    </Form.Item>
    <Form.Item 
        name='contraseña' 
        label='Contraseña'
        rules={[{
            required: true,
        pattern: new RegExp("(?=.*[!@#$%^&*/-_])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$"),
            message:'Porfavor ingrese su contraseña'           

            }]}
        hasFeedback
        >
        <Input.Password placeholder="Escribe tu contraseña"/>
    </Form.Item>
    <Form.Item
        name='confirmarContraseña' 
        label='Confirmar Contraseña'
        dependencies={['contraseña']}
        rules={[{
            required: true,
            message:'Porfavor ingrese nuevamente su contraseña'                        
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('contraseña') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Las contraseñas no coinciden!'));
              },
            }),

          ]}
        hasFeedback
        >
        <Input.Password placeholder="Confirma tu contraseña tu contraseña"/>
        </Form.Item>
        <Form.Item name='botonRegistro'>
            <Button block type="primary" htmlType="submit">
            Registrarme
            </Button>
        </Form.Item> 
        <Form.Item  wrapperCol={{ offset: 2}}>
             ¿Ya tienes una cuenta? <a href=""> Ingresa</a>
        </Form.Item>  
    </Form>
    <div className='gallery'>
    <div className='pic' id='picRegistro'/>
    </div>
    </div>
    </div>
  );
};

export default Registro;