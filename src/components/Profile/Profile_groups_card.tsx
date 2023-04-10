import { Avatar, Button, Card} from 'antd';
import React, { useState } from 'react';

interface PropsGroupsCard{
    name: string;
    logo: string;
    top: 440;
    left: string;
}

const Profilegroupscard = (props: PropsGroupsCard) => {
    const { name, logo } = props;


    return(
        <Card className='grupos-a-cargo' style={{ top: props.top, left: props.left}}>
        <div className="relleno-grupos"  ></div>
        <div style={{ width: "67%" }} ></div>
        <Avatar className='icono-grupos-a-cargo' src={props.logo}></Avatar>  
        <p className="grupo-a-cargo-text">{name}</p>
        <Button className="boton-link" type='link'>Editar</Button> 
      </Card>
    )
    }

export default Profilegroupscard;