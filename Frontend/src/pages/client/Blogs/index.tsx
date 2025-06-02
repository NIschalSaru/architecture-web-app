import { useEffect } from "react";
import { Col, Row,Typography, Card } from "antd";
import useGetAPI from "../../../hooks/useGetAPI";
import ScrollToTop from "../../../components/client/ScrollToTop";
import LoadingSpinner from "../../../components/client/LoadingSpinner";
import PlaceholderImage from "../../../assets/images/pdf-1.png"; // Placeholder image for PDFs
import { apiUrl } from "../../../utils/index";


const { Title } = Typography;

interface BlogData {
  id: number;
  title: string;
  filename: string;
  filepath: string;
  feature: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

const BlogsPage = () => {
  const { loading, error, data } = useGetAPI<BlogData[]>(
    "architecture-web-app/by-laws",
    true,
    true
  );

  useEffect(() => {
    if (error) {
      console.error("Error fetching blogs:", error);
    }
  }, [error]);

  return (
    <>
      <div className="inner-header">
        <div className="header-content">
          <h1 className="page-title">BLOGS</h1>
          <div className="breadcrumb">
            <a href="/">HOME</a>
            <span className="separator">/</span>
            <span className="current">BLOGS</span>
          </div>
        </div>
      </div>

      <section className="blogs-section">
        <div className="container">
          <div className="section-title-wrapper">
             <Title level={1} className="section-title">
              OUR BLOGS
            </Title>
            <div className="title-decorator"></div>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Row gutter={[24, 24]}>
              {data && data.length > 0 ? (
                data.map((blog) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={blog.id}>
                    <a
                      href={`${apiUrl}/architecture-web-app${blog.filepath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-link"
                    >
                      <Card
                        hoverable
                        className="blog-card"
                        cover={
                          <img
                            alt={blog.title}
                            src={PlaceholderImage}
                            className="blog-image"
                          />
                        }
                      >
                        <Card.Meta
                          title={blog.title}
                          description={`Published: ${new Date(
                            blog.createdAt
                          ).toLocaleDateString()}`}
                        />
                      </Card>
                    </a>
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <p className="no-blogs">No blogs available at the moment.</p>
                </Col>
              )}
            </Row>
          )}
        </div>
      </section>

      <ScrollToTop />
    </>
  );
};

export default BlogsPage;