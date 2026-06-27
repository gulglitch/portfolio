import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "x86 Assembly"],
  frameworks: ["React Native", "React", "Node.js", "Express.js", "Expo Router", "Flask"],
  dataScience: ["NumPy", "Pandas", "Scikit-learn", "XGBoost", "SymPy"],
  databases: ["Supabase", "SQL Server", "SQLite"],
  tools: ["Git", "GitHub", "VS Code", "Postman", "Jupyter Notebook", "Ubuntu"]
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skillsRef.current) {
      const skillCategories = skillsRef.current.querySelectorAll('.skill-category');
      gsap.set(skillCategories, { opacity: 1, y: 0 });
      
      gsap.fromTo(
        skillCategories,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  return (
    <section id="skills" className="skills-section-wrapper" ref={sectionRef}>
      <div className="skills-container">
        <h2 className="skills-section-title">
          TECHNICAL <span className="gradient-text">SKILLS</span>
        </h2>
        
        <div className="skills-content" ref={skillsRef}>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Languages</h4>
              <div className="skill-tags">
                {skills.languages.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h4>Frameworks & Libraries</h4>
              <div className="skill-tags">
                {skills.frameworks.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h4>Data Science & ML</h4>
              <div className="skill-tags">
                {skills.dataScience.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h4>Databases</h4>
              <div className="skill-tags">
                {skills.databases.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h4>Developer Tools</h4>
              <div className="skill-tags">
                {skills.tools.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
