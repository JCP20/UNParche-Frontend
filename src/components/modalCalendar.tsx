import React, { useState } from "react";
import { Button, Modal } from "antd";
import EventCard from "./EventsCard";

const CellApp: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Eventos del Usuario"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <EventCard />
        <EventCard />
        <EventCard />
      </Modal>
    </>
  );
};

export default CellApp;
