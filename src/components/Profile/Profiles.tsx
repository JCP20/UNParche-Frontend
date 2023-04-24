import Profileheaderr from "./Profile_header";
import CardProfile from "./Card_profile";
import React, { useState } from 'react';
import { Radio, Select, Space } from 'antd';
import Profilegroups from "./Profile_groups";

const Profileheader2 = () => {
  const [vista, setVista] = useState('1');
  const handleChange = (e) => {
    setVista(e.target.value);
  };

  const datosFalsos = [{name: "Juliana Cardozo",email:"jucardozo@unal.edu.co", photo: "/imagenes/foto_perfil.jpg", secondary_photo: "/imagenes/foto_fondo.jpg"}]

  const gruposfalsos1=[{name:"Uqbar",logo:"/imagenes/foto_fondo.jpg", top:160,left:"52rem",id:"2"},{name:"Salsunal",logo:"/imagenes/foto_fondo.jpg", top:280,left:"52rem",id:"3"},{name:"Unparche",logo:"/imagenes/foto_perfil.jpg", top:520,left:"52rem",id:"2"},{name:"Salsunal2",logo:"/imagenes/foto_fondo.jpg", top:400,left:"52rem",id:"4"}]
  const gruposfalsos2=[{name:"Unparche",logo:"/imagenes/foto_perfil.jpg", top:160,left:"52rem",id:"2"},{name:"Midas",logo:"/imagenes/foto_fondo.jpg", top:280,left:"52rem",id:"3"},{name:"Unaltutores",logo:"/imagenes/foto_perfil.jpg", top:520,left:"52rem",id:"3"},{name:"ssgs",logo:"/imagenes/foto_fondo.jpg", top:400,left:"52rem",id:"3"}]
  return (
    <div className="wrapper">
      <div className="one">
        {datosFalsos.map(e => <Profileheaderr name={e.name} email={e.email} photo={e.photo} secondary_photo={e.secondary_photo}/>)}
        
      </div>
    
        {vista === '1' && gruposfalsos1.map(e => <Profilegroups  name={e.name} logo={e.logo} top={e.top} left={e.left}/>)}
        {vista === '2' && gruposfalsos2.map(e => <Profilegroups  name={e.name} logo={e.logo} top={e.top} left={e.left}/>)}
      <div className="two">  
      <Radio.Group className="selector-groups" onChange={handleChange} value={vista}>
          <Radio.Button className="groups-boton-1" value="1">Grupos que administro</Radio.Button>
          <Radio.Button className="groups-boton-2" value="2">Grupos a los que pertenezco</Radio.Button>
        </Radio.Group>    
      

        <br />
        <br />
        
        
      </div>
    </div>
  );
}

export default Profileheader2;
