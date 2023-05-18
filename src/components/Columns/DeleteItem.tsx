import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import React from "react";

const DeleteItem = ({
  record,
  service,
  after,
}: {
  record: any;
  service: (id: string) => void;
  after?: () => void;
}) => {
  const handleOnConfirm = async () => {
    Modal.confirm({
      title: "¿Estás seguro de eliminar este elemento?",
      content: "Esta acción no se puede deshacer",
      okText: "Eliminar",
      cancelText: "Cancelar",
      onOk: async () => {
        await service(record._id);

        if (after) {
          await after();
        }
      },
    });
  };

  return (
    <Tooltip title="Eliminar">
      <Button
        onClick={handleOnConfirm}
        shape="circle"
        icon={<DeleteOutlined />}
      />
    </Tooltip>
  );
};

export default DeleteItem;
