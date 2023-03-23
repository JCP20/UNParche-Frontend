import LoginForm from "@/components/LoginForm";
import { createUser } from "@/services/auth";

export default function Home() {

  const getData = async () => {
    try {
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

  return (
    <>
      <LoginForm />
    </>
  );
}
