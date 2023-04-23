import { Avatar, Button, Card} from 'antd';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { UserOutlined } from '@ant-design/icons';

interface SearchPropsGroups{
    name: string;
    logo: string;
    description: string;
    members:number ;
    textmembers: string;
}

const SearchGroupsCard = (props: SearchPropsGroups) => {
    const { name, logo, description,members,textmembers} = props;
      return (
        <div style={{ marginBottom: '1rem'}}>
        <Card className='searchgroups'>
        <Avatar className='icono-search-grupos' src={props.logo} icon={<UserOutlined/>}> </Avatar>
        <div className='round-square'>
        <p className='groups-name'>{name}</p>
        <p className='members'> ● {members }</p> 
        <p className='textmembers'> {textmembers} </p>
        <p className='description'>{description}</p>
        <Button className='search-groups-button' type='default'>Ir</Button>
        </div>
        </Card>
        </div>
      );
    };
    
    
    export default SearchGroupsCard;