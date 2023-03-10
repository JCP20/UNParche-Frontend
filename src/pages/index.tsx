


import PruebaApp2 from "@/components/Register";

import  RegisterApp from "@/components/Register";
import LoginForm from "@/components/LoginForm";
import Head from "next/head";



export default function Home() {
  const handleFinish = (values: any) => {
    console.log(values);
  };
  
  return (
    <LoginForm />
  );
}

