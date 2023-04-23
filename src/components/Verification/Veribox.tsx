import {  Button} from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const VeriBox =() => { 
    const router = useRouter()

    return (
        <div className="containerveri">      
        <Image className='onda' width={1480}height={300} src="/wavesbl2.png" alt=""/>
        <div className="verification-window">
            <h1 className="textveri">Su correo ha sido verificado correctamente</h1>
          <div className='imgCont'>
          <Image
              className='logo'
              src="/escudo-unscreen.gif"
              alt=""
              width={80}
              height={90}
            />
            </div>
            <Button type='primary' className="buttonver" onClick={() => router.replace("/")}>
              Continuar
            </Button>
        </div>
        <style jsx>{`
        `}</style>
        </div>
    );
    };

export default VeriBox;