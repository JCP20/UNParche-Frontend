import React from 'react';
import { Button, Layout, Space, Card, Carousel } from 'antd';
import Link from 'next/link';
import EventCardApp from '@/components/EventsCard';
import Share from '@/components/Share';


const { Header, Footer, Sider, Content } = Layout;
//<img src="/estadiounal.png" />
const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


const LandingPage: React.FC = () => (

    <Layout>

        <Content className="principal" >
            <Space.Compact className="segundo" block>
                <img className="logoPrincipal" src="/logoLargeWhite.png" alt="Logo" />
                <div className="cuarto">
                    <div className="botones">
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
            </Space.Compact>

        </Content>
        <Content className='segundaParte'>
        <div className='tittlefont'>Encuentra eventos de tú interés</div>
            <Carousel className='segundaParte' autoplay>
                
                <div className='carrouselItem'>
                    <img src='/evento1.PNG' />
                </div>
                <div className='carrouselItem'>
                    <img src='/charla.PNG' />
                </div>
                <div className='carrouselItem'>
                    <img src='/epoesia.PNG' />
                </div>
            </Carousel>


        </Content>
        <Footer className='footer' >
            <Space style={{ top: 0, zIndex: 1, width: '100%' }}>
                <div className='footerImage' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img className="escudo" src="/escudoUnal.png" alt="Escudo UNAL" />
                </div>
                <img className='logoFooter' src="/logoLarge.png" alt="Logo" />
                <div className="correos">
                    <h1>Nuestro equipo</h1>
                    <p className='parrafo'>
                        jyarac@unal.edu.co <br />
                        jveloza@unal.edu.co <br />
                        jcardozop@unal.edu.co <br />
                        lcastiblancos@unal.edu.co <br />
                        gotalorag@unal.edu.co <br />
                        lguacaneme@unal.edu.co <br />
                    </p>
                </div>
                <div className="correos">
                    <Share description={''} />
                </div>
            </Space>
        </Footer>
    </Layout >


);

export default LandingPage;