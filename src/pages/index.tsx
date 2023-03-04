import Pokemon from "@/components/Pokemon";
import { Button, Form, Input } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([{ name: "prueba", url: "hola" }]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const resp = await fetch(
        "https://pokeapi.co/api/v2/ability/?limit=20&offset=2"
      );
      const pokeData = await resp.json();
      setData(pokeData.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Head>
        <title>UNParche</title>
        <meta name="description" content="Página para grupos universitarios" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>Hola mundo</p>
      </main>
    </>
  );
}
