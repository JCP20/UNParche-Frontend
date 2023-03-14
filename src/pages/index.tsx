import LoginForm from "@/components/LoginForm";
import { createUser } from "@/services/auth";

export default function Home() {
  // const [data, setData] = useState([{ name: "prueba", url: "hola" }]);
  // const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      // const resp = await fetch(
      //   "https://pokeapi.co/api/v2/ability/?limit=20&offset=2"
      // );
      // const pokeData = await resp.json();
      // setData(pokeData.results);
      const resp = await createUser({
        name: "sergio",
        email: "sergio@unal.edu.co",
        password: "123",
        username: "123",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return <LoginForm />;
}
