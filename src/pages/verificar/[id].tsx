import { getUserById } from "@/services/user";
import { message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const verificarUsuario = ({ isVerified }: { isVerified: boolean | null }) => {
  //#region hooks
  const router = useRouter();
  //#endregion hooks

  const { id } = router.query;

  const verifyUser = async () => {
    try {
      // ...
      // Logica para verificar usuario (Actualizar el verified a true)
      /// ...
    } catch (error) {
      // Manejo de errores
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
        <h1>Verificar usuario</h1>
        {/* <CheckCircleOutlined /> */}
        <p>Id: {id}</p>
        <p>Verificado: {isVerified ? "Si" : "No"}</p>
      </div>
    </div>
  );
};

export default verificarUsuario;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const resp = await getUserById(id);
  if (resp) {
    return {
      props: { isVerified: resp.verified },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
