import { Modal } from "antd";

interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  recordName: string;
}

const DeleteModal = ({
  visible,
  onCancel,
  onConfirm,
  recordName,
}: DeleteModalProps) => {
  return (
    <Modal
      title="Delete Project Category"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{ className: "delete-btn" }}
      cancelButtonProps={{ className: "cancel-btn" }}
      className="testimonial-modal delete-modal"
    >
      <p>Are you sure you want to delete the category "{recordName}"?</p>
    </Modal>
  );
};

export default DeleteModal;