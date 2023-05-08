import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundImage: 'url(/fondoLandingPage.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      marginTop: 'auto'

    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center'
        }}>
          <div>
            <img src="/logoLargeWhite.png" alt="Logo" style={{ 
              width: '100%', 
              height: 'auto', 
              maxWidth: '350px', 
              marginTop: '90px',
              borderRadius: '5px'
            }} />
          </div>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            height: '339px',
            border: '2px solid #F5EEE8',
            marginTop: '90px',
            borderRadius: '5px',
            }}>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              padding: '0px  90px'
            }}>
              <Link href="/register">
                <Button type="primary" style={{ marginBottom: '80px', boxShadow: "0px 0px 0px" }}>Registrarse</Button>
              </Link>
              <Link href="/login">
  
                <Button style={{ 
                  backgroundColor: 'rgb(44, 53, 102)', 
                  border: '1px solid rgb(44, 53, 102)', 
                  color: '#F5EEE8',
                  width: '100%',
                }}>
                  Iniciar Sesión
                </Button>
              </Link>
              </div>
            </div>
          </div>
        </div>
        <footer style={{ 
          backgroundColor: 'rgb(34, 45, 89)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column', 
          position: "relative", 
          marginTop: 'auto', 
          bottom: 0,
          left: 0,
          right: 0, 
}}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img src="/escudoUnal.png" alt="Escudo UNAL" style={{ height: '50px', }} />
  </div>
  <div style={{ color: "#F5EEE8", marginTop: '10px', fontSize: ' 16px' }}>nuestros nombres y q tales</div>
</footer>
      </div>

  );
};

export default LandingPage;