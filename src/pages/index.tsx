import LoginForm from "@/components/LoginForm";

export default function Home() {
  const handleFinish = (values: any) => {
    console.log(values);
  };
  
  return (
    <LoginForm />
  );
}
