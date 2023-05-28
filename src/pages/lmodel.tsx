import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className= "principal">
      <div className='segundo'>
        <div className="tercero">
          <div>
            <img className="logoPrincipal" src="/logoLargeWhite.png" alt="Logo" />
          </div>
          <div className= "cuarto">
            <div className = "botones">
              <Link href="/register">
                <Button type="primary" className='botonRegistrarse'>Registrarse</Button>
              </Link>
              <Link href="/login">
                <Button className='botonIniciarSesion'>
                  Iniciar Sesión
                </Button>
              </Link>
              </div>
            </div>
          </div>
        </div>

      <div className = "segundaParte">

        <div className='segundo'>
              <div className='tercero'>
            <div className='tarjetaCentral'>
              <h1>tarjeta1</h1>
              <h1>tarjeta1</h1>
              <h1>tarjeta1</h1>
            </div>
            <div className='tarjetaCentral'>
              <h1>tarjeta2</h1>
              <h1>tarjeta2</h1>
              <h1>tarjeta2</h1>
            </div>
              </div>
            </div>
          </div>


      <footer className = "footer">
            <div>
      <div className='segundo'>
          <div className='tercero'>
          <div className='footerImage' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img className= "escudo"src="/escudoUnal.png" alt="Escudo UNAL" />
            </div>
            <img  className= 'logoFooter' src="/logoLarge.png" alt="Logo" />
            <div className = "correos">
            <h1>Nuestro equipo</h1>
            <p className='parrafo'>
        jyarac@unal.edu.co <br/>
        jveloza@unal.edu.co <br />
        jcardozop@unal.edu.co <br />
        lcastiblancos@unal.edu.co <br />
        gotalorag@unal.edu.co <br />
        lguacaneme@unal.edu.co <br />
             </p>
            </div>
            <div className = "correos">
                <h1>Compartir</h1>
                <p>Iconos</p>
              </div>
        </div>
        </div>
        </div>


       </footer>	
      </div>

  );
};

export default LandingPage;