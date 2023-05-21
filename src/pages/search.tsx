import MainLayout from "@/components/Layout/Layout";
import LoadingComponent from "@/components/LoadingComponent";
import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";
import { getFilteredGroupsAndUsersFn } from "@/services/search.service";
import { Button, Checkbox, List, Typography, Result } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const plainOptions = [
  "Arte",
  "Deporte",
  "Religión",
  "Investigación",
  "Semillero",
  "Videojuegos",
  "Otro",
];

const CheckboxGroup = Checkbox.Group;

const Search = () => {
  const router = useRouter();

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pediríamos información al back para mostrar grupos según el nombre
    initialLoad();
    getData();
  }, [router.asPath]);

  const initialLoad = () => {
    const categoriesParam = router.query.categories as string;
    if (categoriesParam) {
      const decodedCategories = Buffer.from(
        categoriesParam,
        "base64"
      ).toString();
      const categories = decodedCategories.split(",");
      setCheckedList(categories);
    }
  };

  const handleFilter = (type: string) => {
    // add query params
    // if (searchGroup) {
    //   router.replace({
    //     query: { text: router.query.text, is_group: "true" },
    //   });
    // } else {
    //   setCheckedList([]);
    //   router.replace({
    //     query: { text: router.query.text, is_person: "true" },
    //   });
    // }

    switch (type) {
      case "group":
        router.replace({
          query: { text: router.query.text, is_group: "true" },
        });
        break;
      case "person":
        setCheckedList([]);
        router.replace({
          query: { text: router.query.text, is_person: "true" },
        });
        break;
      case "all":
        setCheckedList([]);
        router.replace({
          query: { text: router.query.text },
        });
    }
  };

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);

    const categories = Buffer.from(list.toString()).toString("base64");

    router.replace({
      query: { text: router.query.text, is_group: "true", categories },
    });
  };

  const getData = async () => {
    setLoading(true);
    const resp = await getFilteredGroupsAndUsersFn(router.query);
    if (resp) {
      setUsers(resp.users);
      setGroups(resp.groups);
    }
    setLoading(false);
  };

  return (
    <MainLayout title="Búsqueda">
      <div className="p-1 mainContainerSearch">
        <h2>Resultados de la búsqueda</h2>
        <div className="filters">
          <Button
            type={
              !router.query.is_person && !router.query.is_group
                ? "primary"
                : "default"
            }
            className="filters__btn"
            onClick={() => handleFilter("all")}
          >
            Todos
          </Button>
          <Button
            type={router.query.is_person ? "primary" : "default"}
            className="filters__btn"
            onClick={() => handleFilter("person")}
          >
            Personas
          </Button>
          <Button
            type={router.query.is_group ? "primary" : "default"}
            className="filters__btn"
            onClick={() => handleFilter("group")}
          >
            Grupos
          </Button>
        </div>
        {router.query.is_group && (
          <CheckboxGroup
            className="animate__animated animate__fadeIn animate__faster"
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
          />
        )}
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="resultsContainer animate__animated animate__fadeIn animate__faster">
            {groups?.length > 0 && (
              <>
                <h3>Grupos:</h3>
                <div className="listContainer shadow">
                  <List
                    dataSource={groups}
                    renderItem={(item: IGroup) => (
                      <List.Item
                        actions={[
                          <Button
                            onClick={() =>
                              router.push(`/groupPage/${item._id}`)
                            }
                          >
                            Ver grupo
                          </Button>,
                        ]}
                      >
                        <h4 style={{ width: "10%" }}>{item.name}</h4>
                        <span style={{ width: "20%" }}>{item.description}</span>
                        <span style={{ width: "10%" }}>{item.category}</span>
                        {/* <span style={{ width: "10%" }}>
                          Miembros:{" "}
                          {item.members.length + item.administrators.length}
                        </span> */}
                      </List.Item>
                    )}
                  />
                </div>
              </>
            )}
            {users?.length > 0 && (
              <>
                <h3>Usuarios:</h3>
                <div className="listContainer shadow">
                  <List
                    dataSource={users}
                    renderItem={(item: IUser) => (
                      <List.Item
                        actions={[
                          <Button
                            onClick={() => router.push(`/profile/${item._id}`)}
                          >
                            Ver perfil
                          </Button>,
                        ]}
                      >
                        <h4 style={{ width: "10%" }}>{item.username}</h4>
                        <Typography.Paragraph
                          ellipsis={{
                            rows: 2,
                            expandable: true,
                            symbol: "Ver más...",
                          }}
                        >
                          {item.email}
                        </Typography.Paragraph>
                      </List.Item>
                    )}
                  />
                </div>
              </>
            )}
            {groups?.length === 0 && users?.length === 0 && (
              <Result status="404" title="No se encontraron resultados" />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
