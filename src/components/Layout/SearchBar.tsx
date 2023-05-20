import { Input } from "antd";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  className?: string;
};

const SearchBar: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const onSearch = (value: any) => {
    router.replace({
      pathname: "/search",
      query: { ...router.query, text: value },
    });
  };

  return (
    <Input.Search
      placeholder="Busca en UnParche"
      // onChange={onChange}
      onSearch={onSearch}
      enterButton
      className={className}
    />
  );
};

export default SearchBar;
