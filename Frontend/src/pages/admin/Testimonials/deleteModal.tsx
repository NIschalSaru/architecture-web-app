import React, { useState } from "react";
import { Modal, Button, Spin } from "antd";

interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  recordName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  recordName,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Confirm Deletion"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={loading}>
          No
        </Button>,
        <Button
          key="confirm"
          type="primary"
          danger
          onClick={handleConfirm}
          disabled={loading}
        >
          Yes
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <p>
          Are you sure you want to delete <strong>{recordName}</strong>?
        </p>
      </Spin>
    </Modal>
  );
};

export default DeleteModal;
