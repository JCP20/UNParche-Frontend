import MainLayout from "@/components/Layout/Layout";
import { Image } from "antd";
import HeaderApp from "@/components/Layout/Header";


const mockData = [
  {
    groupName: "Grupo 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    id: "1",
    photo: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    groupName: "Grupo 2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    id: "2",
    photo: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    groupName: "Grupo 3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    id: "3",
    photo: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    groupName: "Grupo 4",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    id: "4",
    photo: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    groupName: "Grupo 5",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    id: "5",
    photo: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
];

export default function Home() {
  return (
    <><HeaderApp /><MainLayout>


      <>
        <div className="feedElementsContainer">
          {mockData.map((group) => (
            <div className="feedElement" key={group.id}>
              <div className="feedText">
                <h3 className="feedText-title">{group.groupName}</h3>
                <p className="feedText-description">{group.description}</p>
                <a className="feedText-more">Ver más...</a>
              </div>
              <div className="feedImage">
                <Image src={group.photo} alt="prueba" />
              </div>
            </div>
          ))}
        </div>
      </>
    </MainLayout></>
  );
}
