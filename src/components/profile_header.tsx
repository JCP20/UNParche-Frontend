import { UserOutlined, PictureOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card} from 'antd';
import React, { useState } from 'react';

interface propsProfile {
  name: string;
  email: string;
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
          <Avatar className="icon_perfil" size={100} icon={<UserOutlined />} style={{zIndex: "2" , top: "150px", left: "115px"}} />
          <div>
            <Avatar className="icon_pais" shape="square"  size={200} icon={<PictureOutlined />} style={{ top: "70px", left: "100px", zIndex: "1" , width:"530px", height:"150px"}} />
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
      <Card className='grupos-a-cargo' style={{ top: 440, left: "100px"}}>
        <div className="relleno-grupos" ></div>
        <div style={{ width: "67%" }}></div>
        <Avatar className="icono-grupos-a-cargo" size={64} icon={<UserOutlined />} />
        <p className="grupo-a-cargo-text">Grupo 1</p>
        <Button className="boton-link" type='link'>Editar</Button> 
      </Card>
      <Card className='grupos-a-cargo' style={{ top: 440, left: "130px"}}>
        <div className="relleno-grupos" >
        </div>
        <Avatar className="icono-grupos-a-cargo" size={64} icon={<UserOutlined />} />
        <p className="grupo-a-cargo-text">Grupo 2</p>
        <Button className="boton-link" type='link'>Editar</Button> 
      </Card>
      <Button className='crear-grupo' type='link'>Crear nuevo grupo</Button>
      <Button className='boton-continuar' type="default">
      <img src= '/icons8-flecha-derecha-larga-64.png' width={40} alt="Mi icono" />
      </Button>
      <div className='line'></div>
      <p className='grupos-2-text'>Grupos a los que pertenezco</p>
      <Card className='grupos'style={{top:150}}>
        <Avatar className='icono-grupos' size={48} icon={<UserOutlined/>}/>
        <p className='grupos-text'>Grupo 1</p>
        <Button className='boton-grupos' type='default'>
        </Button>
      </Card>
      <Card className='grupos'style={{top:280}}>
        <Avatar className='icono-grupos' size={48} icon={<UserOutlined/>}/>
        <p className='grupos-text'>Grupo 2</p>
        <Button className='boton-grupos' type='default'>
        </Button>
      </Card>
      <Card className='grupos'style={{top:410}}>
        <Avatar className='icono-grupos' size={48} icon={<UserOutlined/>}/>
        <p className='grupos-text'>Grupo 3</p>
        <Button className='boton-grupos' type='default'>
        </Button>
      </Card>
      <Card className='grupos'style={{top:540}}>
        <Avatar className='icono-grupos' size={48} icon={<UserOutlined/>}/>
        <p className='grupos-text'>Grupo 4</p>
        <Button className='boton-grupos' type='default'>
        </Button>
      </Card>
    </div>
    

  );
};
  
export default Profileheader;

