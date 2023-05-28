import React from 'react';
import { Button, Layout, Space, Card, Carousel } from 'antd';
import Link from 'next/link';
import Share from '@/components/Share';


const { Header, Footer, Sider, Content } = Layout;
//<img src="/estadiounal.png" />


const LandingPage: React.FC = () => (

    <Layout className='todo'>
        <Content className="principal1" >
            <Space.Compact className="primero" block>
                <img className="logoPrincipal1" src="/largeLanding.png" alt="Logo" />
                <div className="cuarto1">
                    <div className="botones1">
                        <Link href="/register">
                            <Button type="primary" className='botonRegistrarse1'>Registrarse</Button>
                        </Link>
                        <Link href="/login">
                            <Button className='botonIniciarSesion1'>
                                Iniciar Sesión
                            </Button>
                        </Link>
                    </div>
                </div>
            </Space.Compact>
        </Content>
        <Content className='segundaParte1'>
            <div className='tittlefont1'>Crea tú perfil</div>
            <div className='perfilItem'>
                <img className='perfil' src='/Perfil.PNG' />
            </div>
        </Content>
        <Content className='segundo1'>
            <div className='tittlefont1'>Encuentra eventos de tú interés</div>
            <Carousel autoplay>
                <div className='carrouselItem1'>
                    <img className="evento1" src='/evento1.PNG' />
                </div>
                <div className='carrouselItem1'>
                    <img className="evento1" src='/charla.PNG' />
                </div>
                <div className='carrouselItem1'>
                    <img className="evento1" src='/epoesia.PNG' />
                </div>
            </Carousel>
        </Content>
        <Content className='segundo1'>
            <div className='tittlefont1'>Compartelos con tús amigos</div>
            <div className='perfilItem'>
                <img className="compartir" src='/prooff.png' />
            </div>
        </Content>
        <Content className='tercero1'>
            <div className='tittlefont2'>Y se parte de UNParche</div>
            <p className='parrafo1'>
            <br />Uno de los patrimonios más grandes de la Universidad Nacional de Colombia es la gran y variada oferta <br />
                de  actividades  extracurriculares  sucediendo, dentro de la U ,en cada instante. Sin embargo, no existía <br />
                un medio que permitiera conectar de manera unificada y eficiente a estos eventos con sus posibles <br />
                asistentes. Frente a esta problemática les presentamos UNParche.

            </p>
        </Content>

        <Footer className='footer1' >
            <Space style={{ top: 0, zIndex: 1, width: '100%' }}>
                <div className='footerImage1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img className="escudo1" src="/escudoUnal.png" alt="Escudo UNAL" />
                </div>
                <img className='logoFooter1' src="/logoLarge.png" alt="Logo" />
                <div className="correos1">
                    <h1>Nuestro equipo</h1>
                    <p className='parrafo1'>
                        jyarac@unal.edu.co <br />
                        jveloza@unal.edu.co <br />
                        jcardozop@unal.edu.co <br />
                        lcastiblancos@unal.edu.co <br />
                        gotalorag@unal.edu.co <br />
                        lguacaneme@unal.edu.co <br />
                    </p>
                </div>
                <div className="correos1">
                    <Share description={''} />
                </div>
            </Space>
        </Footer>
    </Layout >


);

export default LandingPage;