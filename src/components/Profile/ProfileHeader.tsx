import { UserOutlined, PictureOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button} from 'antd';
import React, { useEffect, useState } from 'react';


interface propsProfile {
  name: string;
  email: string;
  photo: string;
  secondary_photo: string;
}



const ProfileHeader = (props: propsProfile) => {
  const { name, email } = props;
  const [newName, setNewName] = useState(props.name);
  const [editingName, setEditingName] = useState(false);
  const [data, setData] = useState([])

  // const getData = async () => {
  //   // .... pide info al back
  //   const resp = 
  //   setData(resp)
  // }

  // const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewName(event.target.value);
  // }

  // const handleNameClick = () => {
  //   setEditingName(true);
  // }
  // const handleNameBlur = () => {
  //   setEditingName(false);
  // }

  // useEffect(() => {

  // }, [])
  return (

        <div >
          <Avatar className="icon_perfil" size={100} icon={<UserOutlined />} src={props.photo} style={{zIndex: "2" }} />
            <Avatar className="icon_pais" shape="square" src={props.secondary_photo} size={200} icon={<PictureOutlined />} style={{ top: "3rem", left: "15rem", zIndex: "1" , width:"33rem", height:"9.5rem"}} />

        <p className='namepr' >
          Nombre :&nbsp;&nbsp;
          {editingName ?
            <input className="name-input" type="text" value={newName} autoFocus />
            :
            <span>{newName}</span>
          }
        </p>
        <p className="email">Correo : &nbsp;&nbsp; {email}<br>
        </br><br></br>
        Mas acciones:
        </p>
        <div className='line'></div>
      </div>
      

    );
  };
    
  export default ProfileHeader;