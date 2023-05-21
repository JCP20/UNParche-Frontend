import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { getBase64 } from "@/utils/images";

interface UploadPhotoProps {
  name: string;
  label: string;
  isRequired?: boolean;
  initialPhotoUrl?: string; // New prop for initial photo URL
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({
  name,
  label,
  isRequired,
  initialPhotoUrl,
}: UploadPhotoProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (initialPhotoUrl) {
      setFileList([
        {
          uid: "-1",
          name: "initialPhoto",
          status: "done",
          url: initialPhotoUrl,
        },
      ]);
    }
  }, [initialPhotoUrl]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Subir</div>
    </div>
  );

  const rules = isRequired
    ? [{ required: true, message: "Por favor sube una imagen" }]
    : [];

  return (
    <>
      <Form.Item name={name} label={label} rules={rules} hasFeedback>
        <Upload
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt="profile" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadPhoto;
