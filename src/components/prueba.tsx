import { useState, useEffect, ChangeEvent } from "react";
import { Input, Space, Button, Select } from "antd";
import { getEventsUserFn } from "@/services/events.service";
import { SendOutlined } from "@ant-design/icons";

const { Search } = Input;

const SearchBar = () => {
  const [data, setData] = useState<[string]>([""]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  const getData = async () => {
    //const data = await getEventsUserFn("6451b2e42106d973347a5fc8");
    const data = ["Pepito", "andres", "pablo", "camilo", "felipe", "paula", "pepe"];
    //console.log(data);
    //const fecha = dayjs(data[0].date, ("DD/MM/YY"));
    setData(data);
  };

  useEffect(() => {
    getData(); //obtener información
  }, [])


  /*
    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e);
      const searchInput = e.target.value;
      setInput(searchInput);
      console.log(data);
      const newFilter = data.filter((value: string) => {
        return value.toLowerCase().includes(searchInput.toLowerCase());
      });
      if (searchInput === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };*/
  return (
    <div className="search">
      <Space.Compact block>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={(data || []).map((d: any) => ({
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