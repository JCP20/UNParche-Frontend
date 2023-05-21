import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const LoadingComponent = () => {
  return (
    <div className="loadingContainer animate__animated animate__fadeOut animate__faster">
      <Spin indicator={<LoadingOutlined spin style={{ fontSize: 120 }} />} />
      <p>Cargando...</p>
    </div>
  );
};

export default LoadingComponent;
