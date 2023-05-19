import { Table, Input, Button, Space } from "antd";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

interface ColumnType {
  title: string;
  dataIndex: string;
  search?: boolean;
}

interface Props {
  dataSource: any[];
  columns: ColumnType[];
  loading: boolean;
}

const GenericTable: React.FC<Props> = ({ dataSource, columns, loading }) => {
  const [searchText, setSearchText] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

  const getColumnSearchProps: any = (dataIndex: string, title: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reiniciar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: string, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => setSearchColumn(dataIndex), 100);
      }
    },
    render: (text: string) =>
      searchColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys: any[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const columnsGeneric = columns.map((column) => {
    let actualColumn: ColumnType = {
      ...column,
    };

    if (column.search) {
      actualColumn = {
        ...actualColumn,
        ...getColumnSearchProps(column.dataIndex, column.title),
      };
    }

    return actualColumn;
  });

  return (
    <Table
      style={{ marginBottom: "1rem" }}
      loading={loading}
      dataSource={dataSource}
      columns={columnsGeneric}
    />
  );
};

export default GenericTable;
