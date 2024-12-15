import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Quote } from 'lucide-react';
import avatar from "../assets/images/avatar.jpeg";
import { Typography } from 'antd';

const TestimonialSlider: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ram Sharma",
      location: "Kathmandu, Nepal",
      content: "The service exceeded my expectations. Their attention to detail and commitment to customer satisfaction is truly remarkable.",
      avatar: avatar,
      rating: 5
    },
    {
      id: 2,
      name: "Shyam Poudel",
      location: "Pokhara, Nepal",
      content: "Incredible experience from start to finish. The team's expertise and dedication made a complex project seem effortless.",
      avatar: avatar,
      rating: 4
    },
    {
      id: 3,
      name: "Hari Bahadur",
      location: "Lalitpur, Nepal",
      content: "A game-changing service that transformed our business approach. Their strategic insights and professional execution have been invaluable.",
      avatar: avatar,
      rating: 5
    },
    {
      id: 4,
      name: "Mina Maya",
      location: "Lalitpur, Nepal",
      content: "A game-changing service that transformed our business approach. Their strategic insights and professional execution have been invaluable.",
      avatar: avatar,
      rating: 4
    },
    // Add more testimonials as needed
  ];

  // Function to render star rating
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>★</span>)}
        {halfStar === 1 && <span>½</span>}
        {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`}>☆</span>)}
      </>
    );
  };

  return (
    <div className="testimonial-section">
      
      <div className="testimonial-container">
        <div className="testimonial-header">
        <Typography.Title level={2} className="testimonial-title">
         <span className="red-text">Testimonials</span>
       </Typography.Title>
       <Typography.Title level={3} className="testimonial-subtitle">
         Our Clients & Professional's Reviews
       </Typography.Title>
        </div>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            // When window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            // When window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // When window width is >= 640px
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-card">
                <Quote className="testimonial-quote-icon" size={48} />
                
                <div className="testimonial-content">
                  <div className="testimonial-avatar">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                    />
                  </div>
                  
                  <div className="testimonial-details">
                    <div className="testimonial-rating">
                      {renderStarRating(testimonial.rating)}
                    </div>
                    
                    <p className="testimonial-text">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="testimonial-author">
                      <h4>{testimonial.name}</h4>
                      <p className="testimonial-location">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSlider;


















// import { useState } from 'react';
// import { Typography } from 'antd';
// import avatar from "../assets/images/avatar.jpeg"

// const TestimonialSlider = () => {
//   const [activeSlide, setActiveSlide] = useState(0);

//   const testimonials = [
//     {
//       id: 1,
//       name: "Ram dai",
//       location: "Kathmandu, Nepal",
//       content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//       image: {avatar}
//     },
//     {
//       id: 2,
//       name: "Shyam Dai",
//       location: "Kathmandu, Nepal",
//       content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//       image: {avatar}
//     },
//     {
//       id: 3,
//       name: "Hari Dai",
//       location: "Kathmandu, Nepal",
//       content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//       image: {avatar}
//     }
//   ];

//   const handleDotClick = (index: number) => {
//     setActiveSlide(index);
//   };

//   return (
//     <div className="testimonial-section">
//       <Typography.Title level={2} className="testimonial-title">
//         <span className="red-text">Testimonials</span>
//       </Typography.Title>
//       <Typography.Title level={3} className="testimonial-subtitle">
//         Our Clients & Professional's Reviews
//       </Typography.Title>

//       <div className="testimonials-container">
//         <div className="testimonials-wrapper" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
//           {testimonials.map((testimonial) => (
//             <div key={testimonial.id} className="testimonial-card">
//               <div className="testimonial-quote">"</div>
//               <div className="testimonial-content">
//                 <div className="testimonial-image">
//                   <img src={avatar} alt={testimonial.name} />
//                 </div>
//                 <div className="rating">
//                   {"★".repeat(5)}
//                 </div>
//                 <p className="testimonial-text">{testimonial.content}</p>
//                 <div className="testimonial-author">
//                   <h4>{testimonial.name}</h4>
//                   <p className="location">{testimonial.location}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <div className="testimonial-dots">
//           {testimonials.map((_, index) => (
//             <button
//               key={index}
//               className={`dot ${index === activeSlide ? 'active' : ''}`}
//               onClick={() => handleDotClick(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialSlider;