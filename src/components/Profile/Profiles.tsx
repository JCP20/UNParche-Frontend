// import React, { useState } from 'react';
// import { Radio } from 'antd';
// import ProfileHeader from "./ProfileHeader";
// import ProfileGroups from "./ProfileGroups";
// import { getUserById } from "@/services/user";
// import { ownedGroups } from '@/services/profile';
// import { myGroupsShow } from '@/services/profile';

// const Profile = () => {
//   const [vista, setVista] = useState('1');
//   const handleChange = (e) => {
//     setVista(e.target.value);
//   };

//   const datosFalsos = [{name: "Juliana Cardozo",email:"jucardozo@unal.edu.co", photo: "/imagenes/foto_perfil.jpg", secondary_photo: "/imagenes/foto_fondo.jpg"}]

//   const gruposfalsos1=[{name:"Uqbar",logo:"/imagenes/foto_fondo.jpg", top:160,left:"52rem",id:"2"},{name:"Salsunal",logo:"/imagenes/foto_fondo.jpg", top:280,left:"52rem",id:"3"},{name:"Unparche",logo:"/imagenes/foto_perfil.jpg", top:520,left:"52rem",id:"2"},{name:"Salsunal2",logo:"/imagenes/foto_fondo.jpg", top:400,left:"52rem",id:"4"}]
//   const gruposfalsos2=[{name:"Unparche",logo:"/imagenes/foto_perfil.jpg", top:160,left:"52rem",id:"2"},{name:"Midas",logo:"/imagenes/foto_fondo.jpg", top:280,left:"52rem",id:"3"},{name:"Unaltutores",logo:"/imagenes/foto_perfil.jpg", top:520,left:"52rem",id:"3"},{name:"ssgs",logo:"/imagenes/foto_fondo.jpg", top:400,left:"52rem",id:"3"}]
//   return (

//     <div className="wrapper" >
//       <div className="one" >
//         {datosFalsos.map(e => <ProfileHeader name={e.name} email={e.email} photo={e.photo} secondary_photo={e.secondary_photo}/>)}

//       </div>
//         {vista === '1' && gruposfalsos1.map(e => <ProfileGroups  name={e.name} logo={e.logo} top={e.top} left={e.left}/>)}
//         {vista === '2' && gruposfalsos2.map(e => <ProfileGroups  name={e.name} logo={e.logo} top={e.top} left={e.left}/>)}
//       <div className="two">
//       <Radio.Group className="selector-groups" onChange={handleChange} value={vista}>
//           <Radio.Button className="groups-boton-1" value="1">Grupos que administro</Radio.Button>
//           <Radio.Button className="groups-boton-2" value="2">Grupos a los que pertenezco</Radio.Button>
//         </Radio.Group>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import React, { useState, useEffect, useContext } from "react";
import { Radio } from "antd";
import ProfileHeader from ".//ProfileHeader";
import Profilegroups from "./ProfileGroups";
import { getUserById } from "@/services/user.service";
import { ownedGroups } from "@/services/profile";
import { myGroupsShow } from "@/services/profile";
import { IUser } from "@/interfaces/user";
import { IGroup } from "@/interfaces/groups";
import CrearGrupoApp from "../Group/CreateGroup";
import { AuthContext } from "@/context/auth/AuthContext";

const Profile = () => {
  const [vista, setVista] = useState("1");
  const [user2, setUser] = useState<IUser | null>(null);
  const [adminGroups, setAdminGroups] = useState<IGroup[]>([]);
  const [memberGroups, setMemberGroups] = useState<IGroup[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      const ucr = await getUserById(user?.id);
      setUser(ucr);
    } //

    async function fetchAdminGroups() {
      const groups = await ownedGroups(user?.id);
      setAdminGroups(groups || []);
    }

    async function fetchMemberGroups() {
      const groups = await myGroupsShow(user?.id);
      setMemberGroups(groups || []);
    }

    fetchUser();
    fetchAdminGroups();
    fetchMemberGroups();
  }, []);

  const handleChange = (e) => {
    setVista(e.target.value);
  };

  if (!user) {
    return "no hay usuario";
  }

  return (
    <div className="wrapper">
      <div className="one">
        <ProfileHeader
          name={"user2.username"}
          email={"user2.email"}
          photo={""}
          secondary_photo={""}
        />
      </div>
      {vista === "1" &&
        adminGroups.map((e) => (
          <Profilegroups
            name={"hola mundo"}
            logo={""}
            top={520}
            left={"52rem"}
          />
        ))}
      {vista === "2" &&
        memberGroups.map((e) => (
          <Profilegroups name={e.name} logo={""} top={280} left={"52rem"} />
        ))}
      <div className="two">
        <Radio.Group
          className="selector-groups"
          onChange={handleChange}
          value={vista}
        >
          <Radio.Button className="groups-boton-1" value="1">
            Grupos que administro
          </Radio.Button>
          <Radio.Button className="groups-boton-2" value="2">
            Grupos a los que pertenezco
          </Radio.Button>
        </Radio.Group>
      </div>
      <CrearGrupoApp top={200}></CrearGrupoApp>
    </div>
  );
};

export default Profile;
