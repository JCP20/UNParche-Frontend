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
      backgroundRepeat: 'no-repeat'
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
              maxWidth: '400px', 
              marginTop: '50px',
              borderRadius: '5px'
            }} />
          </div>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            height: '335px',
            border: '2px solid #F5EEE8',
            borderRadius: '5px',
            margin: '0 0 0 0',
            }}>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: '0px  50px'
            }}>
              <Link href="/register">
                <Button type="primary" style={{ marginBottom: '80px' }}>Registrarse</Button>
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
        <footer>
          <h1>falta footer y centrar el div:S</h1>
        </footer>
      </div>

  );
};

export default LandingPage;