import React, { useCallback, useState } from "react";
import { Row, Col, Button, Modal } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import "../assets/scss/components/_youtubeVideoSection.scss";
import thumnbnail from "../assets/images/Img1.jpg";
import backgroundImg from "../assets/images/Outlined1.jpg";

interface CounterItemProps {
  number: number;
  title: string;
  text: string;
  delay?: number;
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoId,
}) => (
  <Modal
    open={isOpen}
    onCancel={onClose}
    footer={null}
    width="90%"
    centered
    className="youtube-section__video-modal"
    destroyOnClose
  >
    <div className="youtube-section__video-container">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </Modal>
);

const CounterItem: React.FC<CounterItemProps> = ({
  number,
  title,
  text,
  delay = 0,
}) => {
  return (
    <motion.div
      className="youtube-section__counter"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="youtube-section__counter-number">{number}</div>
      <h6 className="youtube-section__counter-title">{title}</h6>
      <div className="youtube-section__counter-text">{text}</div>
    </motion.div>
  );
};

const YouTubeVideoSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoId = "KYu3Xtjd7J4";

  // Handle mouse movement
  const handleMouseMove = useCallback(
    (e: { currentTarget: any; clientX: number; clientY: number }) => {
      const container = e.currentTarget;
      const { left, top, width, height } = container.getBoundingClientRect();

      // Calculate mouse position relative to container center
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      setMousePosition({ x, y });
    },
    []
  );
  const counterData = [
    {
      number: 7,
      title: "Years",
      text: "We have been working in the industry since 2011.",
    },
    {
      number: 54,
      title: "Projects",
      text: "To this day, we have designed 54 residential projects.",
    },
    {
      number: 11,
      title: "Awards",
      text: "Spectrum has been awarded for creativity many times.",
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
              <div
                className="youtube-section__video"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <img
                  // src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  src={thumnbnail}
                  alt="Nepal Desingers and Developers"
                  className="youtube-section__video-thumbnail"
                />
                <div className="youtube-section__play-button">
                  <PlayCircleOutlined />
                </div>
              </div>
            </motion.div>
          </Col>

          <Col md={8} lg={6}>
            <div style={{ marginTop: 70 }}>
              {counterData.map((item, index) => (
                <CounterItem
                  key={index}
                  number={item.number}
                  title={item.title}
                  text={item.text}
                  delay={index * 0.1}
                />
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
                  Contact Us
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
          src={backgroundImg}
          alt="Background decoration"
          style={{
            transform: `scale(1.1) 
                       translate(${mousePosition.x * -20}px, ${
              mousePosition.y * -20
            }px)`,
          }}
        />
      </div>
      {/* <motion.div
        className="youtube-section__background"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <img
          // src="/api/placeholder/853/574"
          src={backgroundImg}
          alt="Background decoration"
        />
      </motion.div> */}

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId={videoId}
      />
    </section>
  );
};

export default YouTubeVideoSection;
