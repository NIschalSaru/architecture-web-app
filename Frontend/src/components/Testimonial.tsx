import { useState } from 'react';
import { Typography } from 'antd';
import avatar from "../assets/images/avatar.jpeg"

const TestimonialSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ram dai",
      location: "Kathmandu, Nepal",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: {avatar}
    },
    {
      id: 2,
      name: "Shyam Dai",
      location: "Kathmandu, Nepal",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: {avatar}
    },
    {
      id: 3,
      name: "Hari Dai",
      location: "Kathmandu, Nepal",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: {avatar}
    }
  ];

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="testimonial-section">
      <Typography.Title level={2} className="testimonial-title">
        <span className="red-text">Testimonials</span>
      </Typography.Title>
      <Typography.Title level={3} className="testimonial-subtitle">
        Our Clients & Professional's Reviews
      </Typography.Title>

      <div className="testimonials-container">
        <div className="testimonials-wrapper" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <div className="testimonial-content">
                <div className="testimonial-image">
                  <img src={avatar} alt={testimonial.name} />
                </div>
                <div className="rating">
                  {"★".repeat(5)}
                </div>
                <p className="testimonial-text">{testimonial.content}</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p className="location">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;