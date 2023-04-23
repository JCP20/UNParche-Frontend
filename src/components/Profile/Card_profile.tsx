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
            <Button className='button-calendar' type='primary'>
                <Avatar className='calendar-icon' src="/calendar.jpg"></Avatar> 
                <p className='textveri'>Mi Calendario</p>
            </Button>
            <Button className='button-create-groups' type='primary'>
            <Avatar className='groups-create-icon' src="/connection.png"></Avatar> 
                <p className='textveri'>Crear grupo</p>
            </Button>
            
      </div>
      

    );
  };
    
  export default CardProfile;