import { AuthContext } from "@/context/auth/AuthContext";
import { IUser } from "@/interfaces/user";
import { verifyEmailFn } from "@/services/auth.service";
import { getUserById } from "@/services/user.service";
import { message } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Image from "next/image";
import { Button } from "antd";

const verificarUsuario = ({ isVerified }: { isVerified: boolean | null }) => {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const { id } = router.query;

  const verifyUser = async () => {
    try {
      const resp = await verifyEmailFn(
        id as string,
        { verified: true } as IUser
      );

      if (resp?.status === 200) {
        setTimeout(() => {
          login(resp.data.token, resp.data.id, resp.data.username);
        }, 5000);
      }
    } catch (error) {
      message.error("Error al verificar usuario");
    }
  };

  useEffect(() => {
    if (!isVerified) {
      verifyUser();
    }
  }, []);

  return (
    <div className="containerveri">
      <Image
        className="onda"
        width={1480}
        height={300}
        src="/imagenes/wavesbl2.png"
        alt=""
      />
      <div className="verification-window">
        <h1 className="textveri">Su correo ha sido verificado correctamente</h1>
        <div className="imgCont">
          <Image
            className="logo"
            src="/imagenes/escudo-unscreen.gif"
            alt=""
            width={80}
            height={90}
          />
        </div>
        <Button
          type="primary"
          className="buttonver"
          onClick={() => router.replace("/")}
        >
          Continuar
        </Button>
        <p className="verification-redirect_text">
          Serás redirigido en 5 segundos...
        </p>
      </div>
      <div className="circlesContainer">
        <div className="background-circle circle-1"></div>
        <div className="background-circle circle-2"></div>
        <div className="background-circle circle-3"></div>
        <div className="background-circle circle-4"></div>
        <div className="background-circle circle-5"></div>
        <div className="background-circle circle-6"></div>
      </div>
    </div>
  );
};

export default verificarUsuario;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const resp = await getUserById(id);

  if (resp) {
    if (resp.verified) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: { isVerified: resp.verified },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
