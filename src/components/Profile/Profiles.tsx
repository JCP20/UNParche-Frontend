import Profileheaderr from "./Profile_header";
import CardProfile from "./Card_profile";
import React, { useState } from 'react';
import { Radio, Select, Space } from 'antd';
import Profilegroups from "./Profile_groups";
import Profilegroupscard from "./Profile_groups_card";

const Profileheader2 = () => {
  const [vista, setVista] = useState('1');
  const handleChange = (e) => {
    setVista(e.target.value);
  };

  const datosFalsos = [{name: "Juliana Cardozo",email:"jucardozo@unal.edu.co", photo: "/foto_perfil.jpg", secondary_photo: "/foto_fondo.jpg"}]

  const gruposfalsos1=[{name:"Uqbar",logo:"/foto_fondo.jpg", top:160,left:"52rem",id:"2"},{name:"Uqbarsito",logo:"/foto_fondo.png", top:280,left:"52rem",id:"3"}]
  const gruposfalsos2=[{name:"Unparche",logo:"/foto_perfil.jpg", top:160,left:"52rem",id:"2"},{name:"Uqbarsito",logo:"/foto_fondo.png", top:280,left:"52rem",id:"3"}]
  return (
    <div className="wrapper2">
      <div className="one">
        {datosFalsos.map(e => <Profileheaderr name={e.name} email={e.email} photo={e.photo} secondary_photo={e.secondary_photo}/>)}
        <CardProfile />
      </div>

      <div className="two">      
        <Radio.Group className="selector-groups" onChange={handleChange} value={vista}>
          <Radio.Button className="groups-boton-1" value="1">Grupos que administro</Radio.Button>
          <Radio.Button className="groups-boton-1" value="2">Grupos a los que pertenezco</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        
        {vista === '1' && gruposfalsos1.map(e => <Profilegroups  name={e.name} logo={e.logo} top={e.top} left={e.left}/>)}
        {vista === '2' && gruposfalsos2.map(e => <Profilegroups  name={e.name} logo={e.logo} top={e.top} left={e.left}/>)}
      </div>
    </div>
  );
}

export default Profileheader2;
