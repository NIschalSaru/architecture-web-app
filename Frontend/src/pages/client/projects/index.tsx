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
      "https://cdna.artstation.com/p/assets/images/images/036/508/324/large/asim-salman-zicatela-8.jpg?1617858511",
  },
  {
    key: "commercialProjects",
    title: "Commercial Projects",
    image:
      "https://cdna.artstation.com/p/assets/images/images/042/667/458/large/mipe-group-exterior-03.jpg?1635150466",
  },
  {
    key: "restaurantCafeProjects",
    title: "Restaurant & Cafe Projects",
    image:
      "https://cdna.artstation.com/p/assets/images/images/015/811/820/large/fotoref-com-photo-packs-artstation-image-2bc212b3-3908-11e7-a07c-0242ac120003-5c5f4c4082176.jpg?1549749352",
  },
  {
    key: "hotelResortProjects",
    title: "Hotel & Resort Projects",
    image:
      "https://cdnb.artstation.com/p/assets/images/images/083/879/253/large/yavi-yener-44-modern-tiny-house-02.jpg?1736998332",
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
      "https://cdnb.artstation.com/p/assets/images/images/047/048/647/smaller_square/yantram-architectural-design-studio-3d-exterior-modeling-of-small-house-with-garden-by-architectural-design-studio.jpg?1646647795",
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
