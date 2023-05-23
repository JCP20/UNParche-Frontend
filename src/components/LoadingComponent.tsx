import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const LoadingComponent = () => {
  return (
    <div className="loadingContainer">
      <Spin indicator={<LoadingOutlined spin style={{ fontSize: 120 }} />} />
      <p>Cargando...</p>
    </div>
  );
};

export default LoadingComponent;
