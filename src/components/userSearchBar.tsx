import { useState, useEffect, ChangeEvent } from "react";
import { Input, Space, Button, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { getUByParamFn } from "@/services/user.service";

const SearchBar = () => {
  const [data, setData] = useState<any>([]);
  const getData = async (cadena: any) => {    
    const Body = {username: cadena};
    const usuarios = await getUByParamFn(Body);
    let lista = [];

    for (var i = 0; i < 10; i++) {
      if (usuarios?.data.users[i] != undefined) {
        lista.push(usuarios?.data.users[i].username);
        lista.push(usuarios?.data.users[i].email);
      }
    }    
    setData(lista);
    console.log(data);
  };

  useEffect(() => {
    getData(""); //obtener información
  }, [])
  return (
    <div className="search">
      <Space.Compact block>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"          
          onSearch={e => getData(e)}
          options={(data).map((d: any) => ({
            value: d,
            label: d,
          }))}
        />
        <Button>
          <SendOutlined />
        </Button>
      </Space.Compact>
    </div>
  )
}
export default SearchBar