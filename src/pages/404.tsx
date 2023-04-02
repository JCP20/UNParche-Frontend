import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Custom404 = () => {
  const router = useRouter();

  return (
    <div className="mainContainer404">
      <h1>Oops... página no encontrada</h1>
      <p className="text404">404</p>
      <p>
        Lo sentimos mucho, pero la página que solicitaste no se encuentra
        disponible
      </p>
      <Link href={"#"} className="linkReturn" onClick={() => router.back()}>
        Para regresar haz click aquí
      </Link>
    </div>
  );
};

export default Custom404;
