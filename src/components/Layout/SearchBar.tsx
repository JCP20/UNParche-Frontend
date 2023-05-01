import { Input } from "antd";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  className?: string;
};

const SearchBar: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const onSearch = (value: any) => {
    // redirección a pagina de busqueda avanzada
    console.log(value);
    router.push(`/search?q=${value}`);
  };

  const onChange = (data: any) => {
    // busqueda según el valor actual del input
    console.log(data.target.value);
  };

  return (
    <Input.Search
      placeholder="Busca en UnParche"
      onChange={onChange}
      onSearch={onSearch}
      enterButton
      className={className}
    />
  );
};

export default SearchBar;
