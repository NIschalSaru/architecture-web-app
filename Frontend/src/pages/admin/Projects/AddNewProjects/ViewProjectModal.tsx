import { Modal, Typography, Image } from "antd"; //, Form, Input
import { DataType, ProjectType } from "./types";

interface ViewProjectModalProps {
  visible: boolean;
  onCancel: () => void;
  record: DataType | null;
  projectTypes: ProjectType[];
}

const ViewProjectModal = ({
  visible,
  onCancel,
  record,
  projectTypes,
}: ViewProjectModalProps) => {
  const getProjectTypeName = (projectTypeId: number) => {
    const projectType = projectTypes.find(type => type.id === projectTypeId);
    return projectType ? projectType.title : 'Unknown';
  };

  return (
    <Modal
      title="Project Details"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={900}
      className="testimonial-modal"
    >
      {record && (
        <div style={{ padding: "15px" }}>
          <div style={{ marginBottom: "15px" }}>
            <Typography.Title level={3}>{record.name}</Typography.Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <Typography.Text strong>Project Type:</Typography.Text>
                <Typography.Paragraph>{getProjectTypeName(record.project_type_id)}</Typography.Paragraph>
              </div>
              <div>
                <Typography.Text strong>Location:</Typography.Text>
                <Typography.Paragraph>{record.location}</Typography.Paragraph>
              </div>
              <div>
                <Typography.Text strong>Site Area:</Typography.Text>
                <Typography.Paragraph>{record.site_area}</Typography.Paragraph>
              </div>
              <div>
                <Typography.Text strong>Status:</Typography.Text>
                <Typography.Paragraph>
                  <span>
                    {record.status ? "Active" : "Inactive"}
                  </span>
                </Typography.Paragraph>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Typography.Title level={5}>Client Information</Typography.Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <Typography.Text strong>Name:</Typography.Text>
                <Typography.Paragraph>
                  {record.client.fullName}
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Text strong>Email:</Typography.Text>
                <Typography.Paragraph>
                  {record.client.email}
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Text strong>Mobile:</Typography.Text>
                <Typography.Paragraph>
                  {record.client.mobile}
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Text strong>Address:</Typography.Text>
                <Typography.Paragraph>
                  {record.client.address}
                </Typography.Paragraph>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
          <Typography.Title level={5}>Description</Typography.Title>
          <Typography.Paragraph>{record.description}</Typography.Paragraph>
            {/* <Form 
              layout="vertical" 
              className="compact-form"
              initialValues={{ description: record.description }}
            >
              <Form.Item
                name="description"              >
                <Input.TextArea 
                  disabled
                  rows={5}

                />
              </Form.Item>
            </Form> */}
            
          </div>

          <div>
            <Typography.Title level={5}>Project Images</Typography.Title>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {record.media.map((media: any) => (
                <Image
                  key={media.id}
                  src={media.fileurl}
                  alt={media.image_type}
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewProjectModal;

// import { Modal, Typography, Image } from "antd";
// import { DataType } from "./types";

// interface ViewProjectModalProps {
//   visible: boolean;
//   onCancel: () => void;
//   record: DataType | null;
// }

// const ViewProjectModal = ({ visible, onCancel, record }: ViewProjectModalProps) => {
//   return (
//     <Modal
//       title="Project Details"
//       open={visible}
//       onCancel={onCancel}
//       footer={null}
//       width={800}
//       className="testimonial-modal"
//     >
//       {record && (
//         <div style={{ padding: "15px" }}>
//           <div style={{ marginBottom: "15px" }}>
//             <Typography.Title level={3}>{record.name}</Typography.Title>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
//               <div>
//                 <Typography.Text strong>Location:</Typography.Text>
//                 <Typography.Paragraph>{record.location}</Typography.Paragraph>
//               </div>
//               <div>
//                 <Typography.Text strong>Site Area:</Typography.Text>
//                 <Typography.Paragraph>{record.site_area}</Typography.Paragraph>
//               </div>
//             </div>
//           </div>

//           <div style={{ marginBottom: "20px" }}>
//             <Typography.Title level={5}>Client Information</Typography.Title>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
//               <div>
//                 <Typography.Text strong>Name:</Typography.Text>
//                 <Typography.Paragraph>{record.client.fullName}</Typography.Paragraph>
//               </div>
//               <div>
//                 <Typography.Text strong>Email:</Typography.Text>
//                 <Typography.Paragraph>{record.client.email}</Typography.Paragraph>
//               </div>
//               <div>
//                 <Typography.Text strong>Mobile:</Typography.Text>
//                 <Typography.Paragraph>{record.client.mobile}</Typography.Paragraph>
//               </div>
//               <div>
//                 <Typography.Text strong>Address:</Typography.Text>
//                 <Typography.Paragraph>{record.client.address}</Typography.Paragraph>
//               </div>
//             </div>
//           </div>

//           <div style={{ marginBottom: "20px" }}>
//             <Typography.Title level={5}>Description</Typography.Title>
//             <Typography.Paragraph>{record.description}</Typography.Paragraph>
//           </div>

//           <div>
//             <Typography.Title level={5}>Project Images</Typography.Title>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//               {record.media.map((media:any) => (
//                 <Image
//                   key={media.id}
//                   src={media.fileurl}
//                   alt={media.image_type}
//                   width={200}
//                   height={200}
//                   style={{ objectFit: "cover" }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default ViewProjectModal;
