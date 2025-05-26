import { useState } from "react";
import { Link } from "react-router-dom";
import InnerHeader from "../../../components/client/InnerHeader";
interface CategoryCard {
  key: string;
  title: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  images: string[];
  location: string;
  description: string;
  sqft: string;
  sub_title: string;
}

const categories: CategoryCard[] = [
  { key: "residentialProjects", title: "Residential Projects" },
  { key: "commercialProjects", title: "Commercial Projects" },
  { key: "restaurantCafeProjects", title: "Restaurant & Cafe Projects" },
  { key: "hotelResortProjects", title: "Hotel & Resort Projects" },
  { key: "entertainmentProjects", title: "Entertainment Projects" },
  { key: "renovationProjects", title: "Renovation Projects" },
  { key: "constructionProjects", title: "Construction Projects" },
];

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Villa",
    category: "residentialProjects",
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/072/153/691/large/alexander-p3-1-day-release-compressed.jpg?1706724514",
      "https://cdnb.artstation.com/p/assets/images/images/072/155/099/large/alexander-p3-2-compressed.jpg?1706726560",
      "https://cdna.artstation.com/p/assets/images/images/072/393/068/large/alexander-p3-1-night-relese-lightdeem.jpg?1707256329",
      "https://cdna.artstation.com/p/assets/images/images/072/155/276/large/alexander-p3-3-release-compressed.jpg?1706726859",
    ],
    location: "Kathmandu",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tincidunt nisi. Praesent blandit sapien vitae velit suscipit, ac eleifend sem porta. In ac arcu nec nisl gravida finibus. Maecenas gravida, leo at sollicitudin bibendum, magna augue porta purus, nec mattis ligula ligula in velit. Pellentesque vitae tortor varius, tincidunt orci a, pharetra tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi tempor rutrum turpis, a dapibus augue cursus sed. Vestibulum ut sapien risus. Sed ullamcorper nec sapien id elementum. Cras id tortor blandit, lobortis odio ac, malesuada quam. Suspendisse scelerisque orci eget ante dignissim, vitae finibus metus lacinia. Proin eget tellus non nunc suscipit efficitur. Aenean eget congue magna. Pellentesque tristique eros sit amet sapien finibus, a pretium nulla tincidunt. Aliquam eu enim nec ante bibendum pharetra. Vivamus sagittis nisl non diam dignissim, ut bibendum eros volutpat. Mauris vel dignissim sem. Donec id diam vitae diam blandit facilisis. Integer eget dignissim tellus. Etiam ut velit lacinia, tincidunt ipsum sed, finibus ex. Nulla facilisi. Quisque venenatis fermentum risus, non bibendum elit sodales id. Suspendisse eu pulvinar sem. Vivamus dignissim libero nec laoreet tristique. Fusce accumsan ligula at justo ornare, nec dignissim justo tincidunt. Etiam sit amet justo at leo dignissim feugiat. Nam eu tincidunt augue. Aliquam erat volutpat. Nulla facilisi. Donec venenatis libero in mauris dapibus, sed sodales ipsum malesuada. Vivamus porttitor augue sit amet nulla tincidunt, sit amet porttitor ex congue. Pellentesque feugiat, sem at suscipit feugiat, sapien nulla scelerisque lacus, nec pretium justo diam sed neque.",
    sqft: "3500 sqft",
    sub_title: "Elegant Residential Villa",
  },
  {
    id: 5,
    title: "Office Tower",
    category: "residentialProjects",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/042/667/458/large/mipe-group-exterior-03.jpg?1635150466",
    ],
    location: "Lalitpur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tincidunt nisi. Praesent blandit sapien vitae velit suscipit, ac eleifend sem porta. In ac arcu nec nisl gravida finibus. Maecenas gravida, leo at sollicitudin bibendum, magna augue porta purus, nec mattis ligula ligula in velit. Pellentesque vitae tortor varius, tincidunt orci a, pharetra tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi tempor rutrum turpis, a dapibus augue cursus sed. Vestibulum ut sapien risus. Sed ullamcorper nec sapien id elementum. Cras id tortor blandit, lobortis odio ac, malesuada quam.",
    sqft: "12000 sqft",
    sub_title: "Corporate Headquarters",
  },
  {
    id: 2,
    title: "Office Tower",
    category: "commercialProjects",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/042/667/458/large/mipe-group-exterior-03.jpg?1635150466",
    ],
    location: "Lalitpur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tincidunt nisi. Praesent blandit sapien vitae velit suscipit, ac eleifend sem porta. In ac arcu nec nisl gravida finibus. Maecenas gravida, leo at sollicitudin bibendum, magna augue porta purus, nec mattis ligula ligula in velit. Pellentesque vitae tortor varius, tincidunt orci a, pharetra tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi tempor rutrum turpis, a dapibus augue cursus sed. Vestibulum ut sapien risus. Sed ullamcorper nec sapien id elementum. Cras id tortor blandit, lobortis odio ac, malesuada quam.",
    sqft: "12000 sqft",
    sub_title: "Corporate Headquarters",
  },
  {
    id: 3,
    title: "Cafe Design",
    category: "restaurantCafeProjects",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/015/811/820/large/fotoref-com-photo-packs-artstation-image-2bc212b3-3908-11e7-a07c-0242ac120003-5c5f4c4082176.jpg?1549749352",
    ],
    location: "Pokhara",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tincidunt nisi. Praesent blandit sapien vitae velit suscipit, ac eleifend sem porta. In ac arcu nec nisl gravida finibus. Maecenas gravida, leo at sollicitudin bibendum, magna augue porta purus, nec mattis ligula ligula in velit. Pellentesque vitae tortor varius, tincidunt orci a, pharetra tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi tempor rutrum turpis, a dapibus augue cursus sed. Vestibulum ut sapien risus. Sed ullamcorper nec sapien id elementum. Cras id tortor blandit, lobortis odio ac, malesuada quam.",
    sqft: "1800 sqft",
    sub_title: "Warm and Inviting Ambiance",
  },
  {
    id: 6,
    title: "Cafe Design",
    category: "residentialProjects",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/015/811/820/large/fotoref-com-photo-packs-artstation-image-2bc212b3-3908-11e7-a07c-0242ac120003-5c5f4c4082176.jpg?1549749352",
    ],
    location: "Pokhara",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tincidunt nisi. Praesent blandit sapien vitae velit suscipit, ac eleifend sem porta. In ac arcu nec nisl gravida finibus. Maecenas gravida, leo at sollicitudin bibendum, magna augue porta purus, nec mattis ligula ligula in velit. Pellentesque vitae tortor varius, tincidunt orci a, pharetra tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi tempor rutrum turpis, a dapibus augue cursus sed. Vestibulum ut sapien risus. Sed ullamcorper nec sapien id elementum. Cras id tortor blandit, lobortis odio ac, malesuada quam.",
    sqft: "1800 sqft",
    sub_title: "Warm and Inviting Ambiance",
  },
  {
    id: 4,
    title: "Indonesia Club",
    category: "residentialProjects",
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/017/736/039/large/widhi-muttaqien-wika-tamansaripuribali-tipe42.jpg?1557159305",
      "https://cdnb.artstation.com/p/assets/images/images/017/736/037/large/widhi-muttaqien-wika-tamansaripuribali-tipe30.jpg?1557159235",
      "https://cdna.artstation.com/p/assets/images/images/017/736/040/large/widhi-muttaqien-wika-tamansaripuribali-tipe65.jpg?1557159239",
    ],
    location: "Indonesia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tincidunt nisi. Praesent blandit sapien vitae velit suscipit, ac eleifend sem porta. In ac arcu nec nisl gravida finibus. Maecenas gravida, leo at sollicitudin bibendum, magna augue porta purus, nec mattis ligula ligula in velit. Pellentesque vitae tortor varius, tincidunt orci a, pharetra tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi tempor rutrum turpis, a dapibus augue cursus sed. Vestibulum ut sapien risus. Sed ullamcorper nec sapien id elementum. Cras id tortor blandit, lobortis odio ac, malesuada quam. Suspendisse scelerisque orci eget ante dignissim, vitae finibus metus lacinia. Proin eget tellus non nunc suscipit efficitur. Aenean eget congue magna. Pellentesque tristique eros sit amet sapien finibus, a pretium nulla tincidunt. Aliquam eu enim nec ante bibendum pharetra. Vivamus sagittis nisl non diam dignissim, ut bibendum eros volutpat. Mauris vel dignissim sem. Donec id diam vitae diam blandit facilisis. Integer eget dignissim tellus. Etiam ut velit lacinia, tincidunt ipsum sed, finibus ex. Nulla facilisi. Quisque venenatis fermentum risus, non bibendum elit sodales id. Suspendisse eu pulvinar sem. Vivamus dignissim libero nec laoreet tristique. Fusce accumsan ligula at justo ornare, nec dignissim justo tincidunt. Etiam sit amet justo at leo dignissim feugiat. Nam eu tincidunt augue. Aliquam erat volutpat. Nulla facilisi. Donec venenatis libero in mauris dapibus, sed sodales ipsum malesuada. Vivamus porttitor augue sit amet nulla tincidunt, sit amet porttitor ex congue. Pellentesque feugiat, sem at suscipit feugiat, sapien nulla scelerisque lacus, nec pretium justo diam sed neque.",
    sqft: "3500 sqft",
    sub_title: "Elegant Residential Villa",
  },
  // ... more projects
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

  const handleCategoryClick = (key: string) => {
    setSelectedCategory(key);
  };

  const filteredProjects = projects.filter(
    (project) => project.category === selectedCategory
  );

  return (
    <>
      <InnerHeader title="PROJECTS" currentPage="PROJECTS" />
      <section className="project-area section-gap-top" id="project">
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2>Explore Project Categories</h2>
          </div>

          <div className="project-layout d-flex gap-4">
            {/* === Sidebar === */}
            <div className="sidebar">
              {categories.map((category) => (
                <button
                  key={category.key}
                  className={selectedCategory === category.key ? "active" : ""}
                  onClick={() => handleCategoryClick(category.key)}
                >
                  {category.title}
                </button>
              ))}
            </div>
            {/* === Project Content Area === */}

            <div className="project-content flex-fill">
              <div className="row">
                {filteredProjects.length === 0 ? (
                  <div className="col-12">
                    <p>No projects found in this category.</p>
                  </div>
                ) : (
                  filteredProjects.map((project) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={project.id}>
                      <Link
                        to={`/projects/${project.id}`}
                        state={project}
                        className="text-decoration-none text-dark"
                      >
                        <div className="card category-card shadow-sm border-0 h-100">
                          <div className="card-image-wrapper position-relative">
                            <img
                              src={project.images[0]}
                              alt={project.title}
                              className="img-fluid w-100"
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-overlay p-2 position-absolute bottom-0 w-100 bg-dark bg-opacity-50">
                              <h5 className="card-title-overlay text-white mb-1">
                                {project.title}
                              </h5>
                              <small className="text-white">
                                {project.location}
                              </small>
                            </div>
                          </div>
                          <div className="card-body">
                            <h6 className="card-subtitle text-muted">
                              {project.sub_title}
                            </h6>
                            <p className="card-text">{project.sqft}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
