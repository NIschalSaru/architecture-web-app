import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Building, Globe } from 'lucide-react';

interface WhyChooseUsProps {
  className?: string;
}

const WhyUs: React.FC<WhyChooseUsProps> = ({ className }) => {
  const expertiseAreas = [
    {
      icon: <Palette size={56} strokeWidth={1.5} />,
      title: 'Expertise That Delivers Excellence',
      description: "Our multidisciplinary team includes seasoned architects, interior designers, and engineers with years of practical experience in Nepal’s construction landscape. From concept to completion, we provide end-to-end services that ensure quality, consistency, and efficiency throughout every phase. Our proven track record of successful residential, commercial, institutional, and hospitality projects—both locally and internationally—speaks to the trust we've built with our clients.",
      // details: [
      //   'Integrated design approach',
        // 'Contextual architectural solutions',
        // 'Unique spatial storytelling'
      // ]
    },
    {
      icon: <Building size={56} strokeWidth={1.5} />,
      title: 'Client-Focused, Innovative, and Transparent',
      description: 'We place your vision at the core of our work. By actively listening and understanding your needs, we create customized solutions that blend creativity, functionality, and value. Our commitment to sustainability and modern aesthetics results in designs that are not only visually stunning but also environmentally responsible. We maintain full transparency with honest pricing, clear communication, and regular updates, ensuring a smooth and professional experience from start to finish.',
      // details: [
      //   'Advanced computational design',
        // 'Green building certifications',
        // 'Energy-efficient solutions'
      // ]
    },
    {
      icon: <Globe size={56} strokeWidth={1.5} />,
      title: 'Smart, Reliable, and Nationwide Services',
      description: 'With service coverage across Nepal, we are equipped to handle projects anywhere in the country. Our skilled site engineers and coordinators provide continuous on-site supervision and technical support to maintain quality and control. For our international clients, we offer online consultations and real-time construction monitoring via CCTV and digital reports. Our proprietary mobile and web apps keep clients connected—allowing instant access to designs, updates, and progress reports in a fully digital and systematic way.',
      // details: [
      //   'International design portfolio',
        // 'Contextual architectural research',
        // 'Adaptive design strategies'
      // ]
    }
  ];

  return (
    <section className={`architectural-expertise ${className}`}>
      <div className="architectural-expertise__container">
        <motion.h2 
          className="architectural-expertise__title"
          initial={{ opacity: 0, translateY: 50 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6 }}
        >
          WHY CHOOSE US ?
        </motion.h2>
        
        <div className="architectural-expertise__grid">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              className="expertise-card"
              initial={{ opacity: 0, translateY: 50 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2 
              }}
            >
              <div className="expertise-card__icon">
                {area.icon}
              </div>
              <h3 className="expertise-card__title">{area.title}</h3>
              <p className="expertise-card__description">{area.description}</p>
              {/* <ul className="expertise-card__details">
                {area.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;






// import React, { useEffect, useRef } from 'react';
// // import './styles/_whyUs.scss';

// interface FeatureProps {
//   icon: string;
//   title: string;
//   description: string;
//   stats: { value: string; label: string };
// }

// const WhyUs: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.2,
//       rootMargin: '50px'
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('animate');
//         }
//       });
//     }, observerOptions);

//     const elements = document.querySelectorAll('.feature-card');
//     elements.forEach(el => observer.observe(el));

//     return () => observer.disconnect();
//   }, []);

//   const features: FeatureProps[] = [
//     {
//       icon: `
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="feature-icon">
//           <path d="M2 22L12 2L22 22H2Z" />
//         </svg>
//       `,
//       title: "Design Excellence",
//       description: "Our portfolio showcases award-winning designs that seamlessly blend innovation with functionality. We create spaces that inspire, utilizing advanced 3D modeling and sustainable practices to bring your vision to life.",
//       stats: {
//         value: "150+",
//         label: "Award-Winning Projects"
//       }
//     },
//     {
//       icon: `
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="feature-icon">
//           <circle cx="12" cy="12" r="10" />
//           <path d="M12 2V12L17 17" />
//         </svg>
//       `,
//       title: "Timeless Experience",
//       description: "With three decades of architectural expertise, we've mastered the art of creating enduring designs. Our team of RIBA-certified architects brings unparalleled knowledge to every project, from concept to completion.",
//       stats: {
//         value: "30+",
//         label: "Years of Excellence"
//       }
//     },
//     {
//       icon: `
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="feature-icon">
//           <path d="M12 2L2 7L12 12L22 7L12 2Z" />
//           <path d="M2 17L12 22L22 17" />
//           <path d="M2 12L12 17L22 12" />
//         </svg>
//       `,
//       title: "Sustainable Innovation",
//       description: "We're pioneers in sustainable architecture, integrating cutting-edge eco-friendly solutions with stunning design. Our projects achieve LEED certification while pushing the boundaries of architectural innovation.",
//       stats: {
//         value: "85%",
//         label: "Energy Efficient Designs"
//       }
//     }
//   ];

//   return (
//     <section className="why-us-section" ref={sectionRef}>
//       <div className="why-us-container">
//         <div className="section-header">
//           <span className="overline">Why Choose Us</span>
//           <h2>Crafting Architectural Excellence</h2>
//           <p className="subtitle">Where vision meets precision in every design</p>
//         </div>
        
//         <div className="features-grid">
//           {features.map((feature, index) => (
//             <div key={index} className="feature-card">
//               <div className="feature-content">
//                 <div className="icon-container" 
//                      dangerouslySetInnerHTML={{ __html: feature.icon }} />
//                 <h3>{feature.title}</h3>
//                 <p>{feature.description}</p>
//                 {/* <div className="stats">
//                   <span className="stat-value">{feature.stats.value}</span>
//                   <span className="stat-label">{feature.stats.label}</span>
//                 </div> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyUs;