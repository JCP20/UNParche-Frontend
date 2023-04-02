import { AuthContext } from "@/context/auth/AuthContext";
import { IUser } from "@/interfaces/user";
import { verifyEmailFn } from "@/services/auth";
import { getUserById } from "@/services/user";
import { message } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

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
    <div className="mainContainerVerification">
      <div className="cardInfo">
        <h1>Te has verificado correctamente!</h1>
        <p>Seras redirigido en 5 segundos</p>
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
