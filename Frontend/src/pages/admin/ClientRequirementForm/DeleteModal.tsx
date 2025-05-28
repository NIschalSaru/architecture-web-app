import React, { useState } from "react";
import { Modal, Button } from "antd";
import LoadingSpinner from "../../../components/client/LoadingSpinner";

interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  recordName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onCancel, onConfirm, recordName }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Modal
      title="Delete Client Form"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>,
        <Button className="delete-btn" key="submit" type="primary" danger onClick={handleConfirm} disabled={loading}>
          Delete
        </Button>,
      ]}
      className="testimonial-modal"
      destroyOnClose
    >
      <p>Are you sure you want to delete the client form for "<strong>{recordName}</strong>"?</p>
    </Modal>
  );
};

export default DeleteModal;