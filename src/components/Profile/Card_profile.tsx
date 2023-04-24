import { UserOutlined, PictureOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button} from 'antd';
import React from 'react';


interface propsCardProfile {
  section: string;
  logo: string;
}


const CardProfile = () => {
  return (

        <div>

            <Button className='button-create-groups' type='primary'>
            <Avatar className='groups-create-icon' src="/imagenes/foto_perfil.jpg"></Avatar> 
                <p className='textveri'>Crear grupo</p>
            </Button>
            
      </div>
      

    );
  };
    
  export default CardProfile;