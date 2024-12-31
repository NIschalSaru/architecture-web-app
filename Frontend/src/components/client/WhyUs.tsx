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
      title: 'Visionary Design Philosophy',
      description: 'We transcend traditional architectural boundaries, crafting spaces that are not just structures, but narratives of innovation, cultural context, and human experience.',
      // details: [
      //   'Integrated design approach',
        // 'Contextual architectural solutions',
        // 'Unique spatial storytelling'
      // ]
    },
    {
      icon: <Building size={56} strokeWidth={1.5} />,
      title: 'Precision Engineering & Sustainability',
      description: 'Combining cutting-edge technological precision with sustainable design principles, we create environmentally responsible architectures that harmonize with their surroundings.',
      // details: [
      //   'Advanced computational design',
        // 'Green building certifications',
        // 'Energy-efficient solutions'
      // ]
    },
    {
      icon: <Globe size={56} strokeWidth={1.5} />,
      title: 'Global Perspective, Local Sensitivity',
      description: 'Our global design expertise is balanced with a deep understanding of local architectural traditions, cultural nuances, and site-specific environmental considerations.',
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