import { Link } from "react-router-dom";
import InnerHeader from "../../../components/client/InnerHeader";

interface CategoryCard {
  key: string;
  title: string;
  image: string;
}

const categories: CategoryCard[] = [
  {
    key: "residentialProjects",
    title: "Residential Projects",
    image:
      "https://images.unsplash.com/photo-1565363887715-8884629e09ee?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "commercialProjects",
    title: "Commercial Projects",
    image:
      "https://plus.unsplash.com/premium_photo-1691030924664-94108416699e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "restaurantCafeProjects",
    title: "Restaurant & Cafe Projects",
    image:
      "https://images.unsplash.com/photo-1689079564957-83e3641c7fd8?q=80&w=1486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "hotelResortProjects",
    title: "Hotel & Resort Projects",
    image:
      "https://images.unsplash.com/photo-1559235196-38074cb7b7cb?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "entertainmentProjects",
    title: "Entertainment Projects",
    image:
      "https://cdna.artstation.com/p/assets/images/images/078/323/303/large/ben-nicholas-bennicholas-stellastar-architecture-rowhouse-05.jpg?1721788728",
  },
  {
    key: "renovationProjects",
    title: "Renovation Projects",
    image:
      "https://images.unsplash.com/photo-1718810456574-a0336bdff3f3?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "constructionProjects",
    title: "Construction Projects",
    image:
      "https://cdna.artstation.com/p/assets/images/images/021/205/002/smaller_square/yantram-architectural-design-studio-first-floor-residential-3d-floor-house-design-by-archtectural-design-studio.jpg?1570772900",
  },
];

const Projects = () => {
  return (
    <>
      <InnerHeader title="PROJECTS" currentPage="PROJECTS" />
      <section className="project-area section-gap-top" id="project">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center">
                <h2>Explore Project Categories</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {categories.map((category) => (
              <div
                className="col-lg-3 col-md-6 mb-4"
                key={category.key}
                style={{ cursor: "default" }}
              >
                <Link to={`/projects/category/${category.key}`}>
                  <div className="card category-card shadow-sm border-0 h-100">
                    <div className="card-image-wrapper">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="card-img-top"
                      />
                      <div className="card-overlay">
                        <h5 className="card-title-overlay">{category.title}</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
