import React, { useState } from 'react';
import { UserOutlined, CheckCircleTwoTone, InfoCircleTwoTone, MoreOutlined } from '@ant-design/icons';
import { Card, Modal, Input, Space, Avatar  } from 'antd';

const { Meta } = Card;
const { TextArea } = Input;
const defaultSrc ="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
var toneColor = '#fddde6';
//"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"



const NotiCardApp: React.FC = () => {
    
    return (
        <><Card title=  {<InfoCircleTwoTone />}//{"Notificación"}
            hoverable            
            extra={<a href="#">nombreRemitente .    
            <Avatar shape="circle" icon={<UserOutlined />} size='large' />
            </a>}
            style={{ width: 400}}            
            actions={[
                <CheckCircleTwoTone 
                twoToneColor="#eb2f96"/>,
                <MoreOutlined  key="report"/>,
            ]}
        >
          <Meta description={"@Pepito te invita este evento link"}
            />  
        </Card><>
                
            </></>
    );
};

export default NotiCardApp;