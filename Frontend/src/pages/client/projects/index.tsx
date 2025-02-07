import { useState } from "react";
import InnerHeader from "../../../components/client/InnerHeader";
import { useNavigate } from "react-router-dom";
// Define the Project type
interface Project {
  title: string;
  sub_title: string;
  location: string;
  date: string;
  sqft: string;
  category: string;
  client: string;
  discription: string;
  sub_discription: string;
  categories: string;
  rating: number;
  website: string;
  images: string[]; // Update from 'image' to 'images'
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const navigate = useNavigate();
  const projects: Project[] = [
    {
      title: "Dell Villa",
      location: "New York",
      sub_title: "Modern Residential Architecture",
      date: "2024-12-15",
      sqft: "2500 sq ft",
      category: "following",
      client: "John Doe",
      sub_discription: "Blending Elegance and Functionality in Urban Living",
      discription:
        "This residence showcases a blend of classical European architecture and contemporary design elements, with intricate details that bring out the elegance of urban living. Built on 13690 sq ft of land, the structure integrates aspects of local Kathmandu architecture, creating a perfect harmony of styles.",
      categories: "Exterior",
      rating: 4.8,
      website: "https://examplesite.com/dell-villa",
      images: [
        "https://cdnb.artstation.com/p/assets/images/images/028/842/911/smaller_square/rashed-abdullah-01-guest-room-1.jpg?1595685596",
      ],
    },
    {
      title: "Eden Park",
      location: "Singapore",
      sub_title: "Urban Living Redefined",
      date: "2024-11-10",
      sub_discription: "Elevating Community Living through Contemporary Design",
      sqft: "3200 sq ft",
      discription:
        "Nestled in the heart of Singapore, this modern residence exemplifies luxurious urban architecture. Designed for functionality and style, it features open spaces and a minimalist approach, creating a sophisticated living environment.Nestled in the heart of Singapore, this modern residence exemplifies luxurious urban architecture. Designed for functionality and style, it features open spaces and a minimalist approach, creating a sophisticated living environment.Nestled in the heart of Singapore, this modern residence exemplifies luxurious urban architecture. Designed for functionality and style, it features open spaces and a minimalist approach, creating a sophisticated living environment.Nestled in the heart of Singapore, this modern residence exemplifies luxurious urban architecture. Designed for functionality and style, it features open spaces and a minimalist approach, creating a sophisticated living environment.",
      category: "design",
      client: "Emily Carter",
      categories: "Urban",
      rating: 4.5,
      website: "https://examplesite.com/eden-park",
      images: [
        "https://cdnb.artstation.com/p/assets/images/images/036/508/313/large/asim-salman-zicatela-1.jpg?1617858483",
        "https://cdnb.artstation.com/p/assets/images/images/036/508/315/large/asim-salman-zicatela-4.jpg?1617858489",
        "https://cdnb.artstation.com/p/assets/images/images/036/508/319/large/asim-salman-zicatela-5.jpg?1617858494",
        "https://cdna.artstation.com/p/assets/images/images/036/508/324/large/asim-salman-zicatela-8.jpg?1617858511",
        "https://cdnb.artstation.com/p/assets/images/images/036/508/327/large/asim-salman-zicatela-9.jpg?1617858516",
      ],
    },
    {
      title: "Sky Build",
      location: "Paris",
      date: "2024-10-05",
      sub_title: "Elevated Modernism",
      sub_discription: "Redefining Skylines with Iconic Structures",
      sqft: "4000 sq ft",
      discription:
        "A stunning display of contemporary architecture, this building offers a seamless blend of form and function. Designed with cutting-edge materials, it caters to luxury and efficiency, overlooking the heart of Paris. A stunning display of contemporary architecture, this building offers a seamless blend of form and function. Designed with cutting-edge materials, it caters to luxury and efficiency, overlooking the heart of Paris.A stunning display of contemporary architecture, this building offers a seamless blend of form and function. Designed with cutting-edge materials, it caters to luxury and efficiency, overlooking the heart of Paris.A stunning display of contemporary architecture, this building offers a seamless blend of form and function. Designed with cutting-edge materials, it caters to luxury and efficiency, overlooking the heart of Paris.A stunning display of contemporary architecture, this building offers a seamless blend of form and function. Designed with cutting-edge materials, it caters to luxury and efficiency, overlooking the heart of Paris. A stunning display of contemporary architecture, this building offers a seamless blend of form and function. Designed with cutting-edge materials, it caters to luxury and efficiency, overlooking the heart of Paris.A stunning display of contemporary architecture, this building offers a seamless blend of form and function. Designed with cutting-edge materials, it caters to luxury and efficiency, overlooking the heart of Paris.",
      category: "construction",
      client: "Michael Bennett",
      categories: "Modern",
      rating: 5,
      website: "https://examplesite.com/sky-build",
      images: [
        "https://cdna.artstation.com/p/assets/images/images/078/323/294/large/ben-nicholas-bennicholas-stellastar-architecture-rowhouse-01.jpg?1721788671",
        "https://cdnb.artstation.com/p/assets/images/images/078/323/295/large/ben-nicholas-bennicholas-stellastar-architecture-rowhouse-02.jpg?1721788679",
        "https://cdnb.artstation.com/p/assets/images/images/078/323/301/large/ben-nicholas-bennicholas-stellastar-architecture-rowhouse-03.jpg?1721788714",
        "https://cdnb.artstation.com/p/assets/images/images/078/323/303/large/ben-nicholas-bennicholas-stellastar-architecture-rowhouse-05.jpg?1721788728",
      ],
    },
    {
      title: "Green View",
      location: "London",
      date: "2024-09-20",
      sub_title: "Sustainable Architectural Marvel",
      sub_discription: "Integrating Green Technologies for a Brighter Future",
      sqft: "2900 sq ft",
      discription:
        "An eco-friendly masterpiece, this residence integrates green technologies with modern architecture. Located amidst lush surroundings, it provides a serene and sustainable living space.",
      category: "design",
      client: "Sophia Taylor",
      categories: "Eco-friendly",
      rating: 4.6,
      website: "https://examplesite.com/green-view",
      images: [
        "https://cdnb.artstation.com/p/assets/images/images/047/048/647/smaller_square/yantram-architectural-design-studio-3d-exterior-modeling-of-small-house-with-garden-by-architectural-design-studio.jpg?1646647795",
      ],
    },
    {
      title: "Sunshine Tower",
      location: "Tokyo",
      date: "2024-08-12",
      sub_title: "Urban High-Rise Excellence",
      sub_discription: "Elevating High-Rise Living with Energy Efficiency",
      sqft: "3600 sq ft",
      discription:
        "A beacon of modern high-rise design, this skyscraper offers panoramic views and state-of-the-art amenities. Built with precision, it stands tall as a landmark in Tokyo's skyline.",
      category: "construction",
      client: "David Johnson",
      categories: "High-rise",
      rating: 4.9,
      website: "https://examplesite.com/sunshine-tower",
      images: [
        "https://cdnb.artstation.com/p/assets/covers/images/053/806/567/smaller_square/andi-inzinger-andi-inzinger-sakura-exterior-preview.jpg?1663079291",
      ],
    },
    {
      title: "Ocean Heights",
      location: "Dubai",
      date: "2024-07-25",
      sub_title: "Luxury Meets Architecture",
      sub_discription: "Inspiring Coastal Designs with Modern Elegance",
      sqft: "4200 sq ft",
      discription:
        "A luxurious waterfront property, Ocean Heights redefines architectural excellence with its sleek design and breathtaking views. The property is a perfect blend of elegance and modernity.",
      category: "design",
      client: "Olivia White",
      categories: "Luxury",
      rating: 5,
      website: "https://examplesite.com/ocean-heights",
      images: [
        "https://cdna.artstation.com/p/assets/images/images/021/205/002/smaller_square/yantram-architectural-design-studio-first-floor-residential-3d-floor-house-design-by-archtectural-design-studio.jpg?1570772900",
      ],
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const openProjectPage = (project: Project) => {
    navigate(`/project/${encodeURIComponent(project.title)}`, {
      state: project,
    });
  };
  return (
    <>
      <InnerHeader title="PROJECTS" currentPage="PROJECTS" />
      <section className="project-area section-gap-top" id="project">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center">
                <h2>View Our Projects</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="filters mb-4">
                <ul>
                  {["all", "design", "construction"].map((category) => (
                    <li
                      key={category}
                      className={activeCategory === category ? "active" : ""}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="grid">
            {filteredProjects.map((project, index) => (
              <div
                className="single-project"
                key={index}
                onClick={() => openProjectPage(project)}
              >
                <div className="thumb">
                  {/* Display only the first image */}
                  <img
                    className="image img-fluid"
                    src={project.images[0]} // Display the first image
                    alt={`${project.title}`}
                  />
                </div>
                <div className="middle">
                  <h4>{project.title}</h4>
                  <div className="cat">{project.location}</div>
                  <p className="details">Date: {project.date}</p>
                  <p className="details">Size: {project.sqft}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
