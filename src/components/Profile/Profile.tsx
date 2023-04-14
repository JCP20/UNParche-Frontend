import { UserOutlined, PictureOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card} from 'antd';
import React, { useState } from 'react';
import Profilegroupscard from "./Profile_groups_card"
import Profilegroups from './Profile_groups';

interface propsProfile {
  name: string;
  email: string;
  photo: string;
  secondary_photo: string;
}

const Profileheader = (props: propsProfile) => {
  const { name, email } = props;
  const [newName, setNewName] = useState(props.name);
  const [editingName, setEditingName] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  }

  const handleNameClick = () => {
    setEditingName(true);
  }
  const handleNameBlur = () => {
    setEditingName(false);
  }
  return (
    <div style={{display: "flex"}}>
      <div className="sidebar"></div>
      <div style={{paddingLeft: "20px"}}>
        <div style={{ position: "relative" }}>
          <Avatar className="icon_perfil" size={100} icon={<UserOutlined />} src={props.photo} style={{zIndex: "2" , top: "150px", left: "115px"}} />
          <div>
            <Avatar className="icon_pais" shape="square" src={props.secondary_photo} size={200} icon={<PictureOutlined />} style={{ top: "70px", left: "100px", zIndex: "1" , width:"530px", height:"150px"}} />
          </div>
        </div>
        <h2 className='name' onClick={handleNameClick} onBlur={handleNameBlur}>
          Nombre :&nbsp;&nbsp;
          {editingName ?
            <input className="name-input" type="text" value={newName} onChange={handleNameChange} autoFocus />
            :
            <span>{newName}</span>
          }
        </h2>
        <p className="email">Correo : &nbsp;&nbsp; {email} </p>
        <p className='grupos-a-cargo-title'>Grupos a cargo</p>
      </div>
      <Profilegroupscard name={'UQBAR'} logo={"/foto_perfil.jpg"} top={440} left={"100px"}></Profilegroupscard>
      <Profilegroupscard name={'Salsunal'} logo={"/foto_perfil.jpg"} top={440} left={"130px"}></Profilegroupscard>
      <Button className='crear-grupo' type='link'>Crear nuevo grupo</Button>
      <Button className='boton-continuar' type="default">
      <img src= '/icons8-flecha-derecha-larga-64.png' width={40} alt="Mi icono" />
      </Button>
      <div className='line'></div>
      <p className='grupos-2-text'>Grupos a los que pertenezco</p>
      <Profilegroups name={'UQBAR'} logo={"/foto_perfil.jpg"} top={150} left={"750px"} />
      <Profilegroups name={'UQBAR2'} logo={"/foto_perfil.jpg"} top={280} left={"750px"} />
      <Profilegroups name={'UQBAR3'} logo={"/foto_perfil.jpg"} top={410} left={"750px"} />
      <Profilegroups name={'UQBAR4'} logo={"/foto_perfil.jpg"} top={540} left={"750px"} />
    </div>
    

  );
};
  
export default Profileheader;

