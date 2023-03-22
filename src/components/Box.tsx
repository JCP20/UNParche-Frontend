
import React from 'react';
import Image from 'next/image';


const VerificationPage: React.FC = () => {
  return (
    <div className="containerveri">
        
            

      <div className="verification-window">
        

          <h1 className="textveri">Su correo ha sido verificado correctamente</h1>
        
        <div className='imgCont'>
        <Image
            className='logo'
            src="/hola.png"
            alt=""
            width={80}
            height={90}
            
        
          />
          </div>

          <button type="submit" className="buttonver">
            Continuar
          </button>


      </div>
      <style jsx>{`

      `}</style>
    </div>
  );
};

export default VerificationPage;