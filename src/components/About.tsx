import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay content animation so avatar moves into position first
    if (contentRef.current) {
      // Start invisible
      gsap.set(contentRef.current, { opacity: 0, y: 80 });
      
      // Animate in after a delay to let avatar settle
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0 },
        {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5, // Wait for avatar to move into position
        }
      );
    }
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-layout">
        {/* Left Side - Avatar space (empty, avatar is fixed in background) */}
        <div className="about-avatar-space"></div>

        {/* Right Side - Content */}
        <div className="about-right-content">
          <h2 className="about-title">
            ABOUT <span className="gradient-text">ME</span>
          </h2>

          <div className="about-content" ref={contentRef}>
            <div className="about-text">
              <p className="about-intro">
                Hi! I'm <span className="highlight">Gul-e-Zara</span>, a Data Science student at the National University of Computer and Emerging Sciences (FAST-NUCES) with a passion for building innovative solutions.
              </p>
              
              <p className="about-description">
                I specialize in <span className="highlight">full-stack development</span> and <span className="highlight">mobile applications</span>, with hands-on experience building production-ready platforms. Currently working as a React Native Developer at Hive of Solutions, I've contributed to gamified financial literacy platforms reaching thousands of users.
              </p>

              <p className="about-description">
                From healthcare queue management systems to digital forensics tools, I enjoy tackling complex challenges across diverse domains. Whether it's optimizing database queries, implementing real-time features, or even coding retro games in Assembly, I'm always eager to learn and build something impactful.
              </p>

              <div className="about-stats">
                <div className="stat">
                  <h3>1+</h3>
                  <p>Year Experience</p>
                </div>
                <div className="stat">
                  <h3>10+</h3>
                  <p>Projects Built</p>
                </div>
                <div className="stat">
                  <h3>15+</h3>
                  <p>Technologies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
