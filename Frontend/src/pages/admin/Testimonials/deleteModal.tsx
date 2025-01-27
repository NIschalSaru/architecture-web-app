import React from "react";
import { Modal, Button } from "antd";

interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  recordName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  recordName,
}) => {
  return (
    <Modal
      title="Confirm Deletion"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          No
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Yes
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to delete <strong>{recordName}</strong>?
      </p>
    </Modal>
  );
};

export default DeleteModal;
