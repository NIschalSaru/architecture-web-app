import { Modal, Form, Input, Select } from "antd";

interface UpdateModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpdate: (values: { title: string; status: string }) => void;
  initialValues: { category: string };
}

const UpdateModal = ({
  visible,
  onCancel,
  onUpdate,
  initialValues,
}: UpdateModalProps) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Update Project Category"
      visible={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          onUpdate(values);
          form.resetFields();
        });
      }}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      okText="Update"
      cancelText="Cancel"
      className="testimonial-modal"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title: initialValues.category, status: "1" }}
        className="compact-form"
      >
        <Form.Item
          name="title"
          label="Category Title"
          rules={[{ required: true, message: "Please enter the category title" }]}
        >
          <Input placeholder="Enter category title" className="categoryTitle" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select placeholder="Select status" className="categoryTitle">
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;