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
<<<<<<< HEAD
      placeholder="Busca en UnParche"
=======
      width={100}
      placeholder="Buscar"
>>>>>>> a7f1c651d3eb3a74ff3f37a37905406d68219722
      onChange={onChange}
      onSearch={onSearch}
      enterButton
      className={className}
    />
  );
};

export default SearchBar;
