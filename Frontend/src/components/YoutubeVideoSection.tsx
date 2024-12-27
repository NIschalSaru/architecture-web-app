import React, { useCallback, useState } from "react";
import { Row, Col, Button } from "antd";
import { Building2, Trophy, Award } from "lucide-react";
import { motion } from "framer-motion";
import thumnbnail from "../assets/images/Img1.jpg";
import bgImg from "../assets/images/Outlined3.png";
import yt from "../assets/images/youtube.png";

const YouTubeVideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoId = "KYu3Xtjd7J4";

  const handleMouseMove = useCallback(
    (e: { currentTarget: any; clientX: number; clientY: number }) => {
      const container = e.currentTarget;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      setMousePosition({ x, y });
    },
    []
  );

  const statsData = [
    {
      icon: Building2,
      number: 7,
      title: "Years",
      description: "We have been working in the industry since 2011.",
    },
    {
      icon: Trophy,
      number: 54,
      title: "Projects",
      description: "To this day, we have designed 54 residential projects.",
    },
    {
      icon: Award,
      number: 11,
      title: "Awards",
      description: "Spectrum has been awarded for creativity many times.",
    },
  ];

  return (
    <section className="youtube-section" onMouseMove={handleMouseMove}>
      <div className="youtube-section__container">
        <Row gutter={[50, 50]} justify="space-between">
          <Col md={14} lg={12}>
            <motion.h3
              className="youtube-section__title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              AWARD-WINNING
              <br />
              ARCHITECTURE COMPANY
            </motion.h3>

            <motion.h6
              className="youtube-section__subtitle"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              WE DELIVER THE BEST SOLUTIONS
            </motion.h6>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="youtube-section__video">
                {!isPlaying ? (
                  <>
                    <img
                      src={thumnbnail}
                      alt="Nepal Designers and Developers"
                      className="youtube-section__video-thumbnail"
                    />
                    <div
                      className="youtube-section__play-button"
                      onClick={() => setIsPlaying(true)}
                    >
                      <img src={yt} alt="Play Video" />
                    </div>
                  </>
                ) : (
                  <div className="youtube-section__video-container">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </Col>

          <Col md={8} lg={6}>
            <div className="youtube-section__stats">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  className="youtube-section__stat-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="youtube-section__stat-icon">
                    <stat.icon />
                  </div>
                  <div className="youtube-section__stat-content">
                    <div className="youtube-section__stat-header">
                      <span className="youtube-section__stat-number">
                        {stat.number}
                      </span>
                      <span className="youtube-section__stat-title">
                        {stat.title}
                      </span>
                    </div>
                    <p className="youtube-section__stat-description">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button
                  type="primary"
                  className="youtube-section__contact-button"
                >
                  <a href="#home-contact" target="_self">
                    Contact Us
                  </a>
                </Button>
              </motion.div>
            </div>
          </Col>
        </Row>
      </div>

      <div
        className="youtube-section__background"
        style={{
          transform: `translate(-50%, -50%) 
                     translate(${mousePosition.x * 30}px, ${
            mousePosition.y * 30
          }px)`,
        }}
      >
        <img
          src={bgImg}
          alt="Background decoration"
          style={{
            transform: `scale(1.1) 
                       translate(${mousePosition.x * -20}px, ${
              mousePosition.y * -20
            }px)`,
          }}
        />
      </div>
    </section>
  );
};

export default YouTubeVideoSection;
