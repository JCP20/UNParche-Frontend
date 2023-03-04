import React from "react";
import { Card } from "antd";

interface propsPokemon {
  name: string;
  url: string;
  loading: boolean;
}

const Pokemon = (props: propsPokemon) => {
  const { name, url, loading } = props;

  return (
    <Card style={{ width: 300 }} hoverable loading={loading}>
      <p>{name}</p>
      <p>{url}</p>
    </Card>
  );
};

export default Pokemon;
