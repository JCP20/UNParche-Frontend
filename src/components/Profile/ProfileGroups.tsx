import { Avatar, Button, Card} from 'antd';
import React, { useState } from 'react';

interface PropsGroups{
    name: string;
    logo: string;
    top: number;
    left: string;
}

const Profilegroups = (props: PropsGroups) => {
    const { name, logo } = props;
    return(
        <Card className='grupos'style={{top:props.top, left: props.left} }>
        <Avatar className='icono-grupos' src={props.logo}> </Avatar>
        <p className='grupos-text'>{name}</p>
        <Button className='boton-grupos' type='default'>
        </Button>
        </Card>
    )
    }

export default Profilegroups;