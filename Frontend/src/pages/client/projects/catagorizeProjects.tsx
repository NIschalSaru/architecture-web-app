import { useParams, useNavigate } from "react-router-dom";
import InnerHeader from "../../../components/client/InnerHeader";
import "../../../assets/scss/pages/_categoryProducts.scss";

const CategorizeProjects = () => {
  const { categoryKey } = useParams<{ categoryKey: string }>();
  const navigate = useNavigate();

  // Sample projects list (should ideally come from props or a shared file)
  const projects = [
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
    // ... Add more projects as needed
  ];

  const filteredProjects = projects.filter(
    (project) => project.category === categoryKey
  );

  const handleProjectClick = (project: any) => {
    navigate(`/projects/details/${encodeURIComponent(project.title)}`, {
      state: project,
    });
  };

  return (
    <>
      <InnerHeader title={`Category: ${categoryKey}`} currentPage="PROJECTS" />
      <div className="category-projects">
        <div className="container my-5">
          {filteredProjects.length === 0 ? (
            <p>No projects found for this category.</p>
          ) : (
            <div className="row">
              {filteredProjects.map((project) => (
                <div
                  className="col-md-4 mb-4"
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card h-100 shadow-sm">
                    <img
                      src={project.images[0]}
                      className="card-img-top"
                      alt={project.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{project.title}</h5>
                      <p>{project.sub_title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategorizeProjects;
