import React from "react";
import img from "../../assets/images/banner.jpg";

const Projects = () => {
  return (
    <>
      <div className="inner-header">
        <div className="header-content">
          <h1 className="page-title">PROJECTS</h1>
          <div className="breadcrumb">
            <a href="/">HOME</a>
            <span className="separator">/</span>
            <span className="current">PROJECTS</span>
          </div>
        </div>
      </div>
      <section className="project-area section-gap-top" id="project">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center">
                <h4>Recent Work</h4>
                <h2>View Our Project</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="filters mb-5">
                <ul>
                  <li className="active" data-filter=".all">
                    All
                  </li>
                  <li data-filter=".popular">Popular</li>
                  <li data-filter=".latest">Latest</li>
                  <li data-filter=".following">Following</li>
                  <li data-filter=".upcoming">Upcoming</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="filters-content">
            <div className="row grid">
              <div
                className="col-lg-4 col-md-6 grid-item all following"
                data-wow-delay="0s"
              >
                <div className="single-project">
                  <div className="relative">
                    <div className="thumb">
                      <img
                        className="image img-fluid"
                        src={img}
                        alt="Project Image"
                      />
                    </div>
                    <div className="middle">
                      <h4>Dell Villa, New York</h4>
                      <div className="cat">Architecture, Modern Design</div>
                    </div>
                    <a className="overlay" href="#"></a>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 grid-item col-md-6 all upcoming latest">
                <div className="single-project">
                  <div className="relative">
                    <div className="thumb">
                      <img
                        className="image img-fluid"
                        src={img}
                        alt="Project Image"
                      />
                    </div>
                    <div className="middle">
                      <h4>Eedn Park, Singapore</h4>
                      <div className="cat">Architecture, Modern Design</div>
                    </div>
                    <a className="overlay" href="#"></a>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 grid-item col-md-6 all popular">
                <div className="single-project">
                  <div className="relative">
                    <div className="thumb">
                      <img
                        className="image img-fluid"
                        src={img}
                        alt="Project Image"
                      />
                    </div>
                    <div className="middle">
                      <h4>Sky Build, Paris</h4>
                      <div className="cat">Architecture, Modern Design</div>
                    </div>
                    <a className="overlay" href="#"></a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 grid-item col-md-6 all latest following">
                <div className="single-project">
                  <div className="relative">
                    <div className="thumb">
                      <img
                        className="image img-fluid"
                        src={img}
                        alt="Project Image"
                      />
                    </div>
                    <div className="middle">
                      <h4>Dell Villa, New York</h4>
                      <div className="cat">Architecture, Modern Design</div>
                    </div>
                    <a className="overlay" href="#"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
