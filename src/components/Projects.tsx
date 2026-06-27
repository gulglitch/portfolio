import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "MediQueue",
    subtitle: "Healthcare Queue Management System",
    description: "Full-stack healthcare platform with role-based access control for patients, doctors, and administrators. Features real-time queue management with automated appointment scheduling.",
    tech: ["React", "Node.js", "Express", "SQL Server", "JWT"],
    github: "https://github.com/gulglitch/MediQueue",
    year: "2025"
  },
  {
    title: "Smart Solver AI",
    subtitle: "AI-Powered Problem Solver",
    description: "Intelligent problem-solving application leveraging machine learning algorithms to provide automated solutions across various domains with natural language processing.",
    tech: ["Python", "Machine Learning", "NLP", "Flask"],
    github: "https://github.com/gulglitch/smart-solver-ai",
    year: "2025"
  },
  {
    title: "Evidentia",
    subtitle: "Digital Forensics Evidence Timeline",
    description: "Desktop application for digital forensics investigations with automated metadata extraction and interactive timeline visualization for chronological evidence analysis.",
    tech: ["Python", "PySide6", "SQLite"],
    github: "https://github.com/gulglitch/Evidentia",
    year: "2025"
  },
  {
    title: "Diabetes Risk Prediction",
    subtitle: "Machine Learning Health Assessment",
    description: "Predictive model using machine learning algorithms to assess diabetes risk based on health metrics. Features data preprocessing, feature engineering, and model evaluation.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/gulglitch/diabetes-risk-prediction",
    year: "2024"
  },
  {
    title: "Email Spam Classification",
    subtitle: "NLP-Based Spam Filter",
    description: "Machine learning classifier for email spam detection using natural language processing techniques. Implements multiple algorithms for comparison and optimization.",
    tech: ["Python", "Scikit-learn", "NLP", "Jupyter"],
    github: "https://github.com/gulglitch/email-spam-classification",
    year: "2024"
  },
  {
    title: "Neural Network Visualizer",
    subtitle: "Interactive Deep Learning Tool",
    description: "Interactive visualization tool for understanding neural network architectures and training processes. Features real-time weight updates and layer-by-layer analysis.",
    tech: ["Python", "TensorFlow", "Matplotlib", "NumPy"],
    github: "https://github.com/gulglitch/neural-network-visualizer",
    year: "2024"
  },
  {
    title: "Snake Venture",
    subtitle: "Modern Take on Classic Game",
    description: "Enhanced snake game with modern graphics, power-ups, and progressive difficulty levels. Built with smooth animations and responsive controls.",
    tech: ["Python", "Pygame", "OOP"],
    github: "https://github.com/gulglitch/snake-venture",
    year: "2024"
  },
  {
    title: "Bubble Shooter",
    subtitle: "x86 Assembly Arcade Game",
    description: "Retro arcade game engineered in x86 Assembly with cooperative multitasking, LFSR-based random number generation, and optimized rendering through direct video memory manipulation.",
    tech: ["x86 Assembly", "NASM", "DOS"],
    github: "https://github.com/gulglitch/bubble-shooter",
    year: "2025"
  },
  {
    title: "NoteDown",
    subtitle: "Cross-Platform Mobile App",
    description: "Mobile application with complete CRUD functionality, real-time data synchronization via Supabase, and scalable file-based navigation across iOS and Android.",
    tech: ["React Native", "TypeScript", "Supabase", "Expo Router"],
    github: "https://github.com/gulglitch/react-native-task-manager",
    year: "2024"
  }
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
      if (card) {
        // Set initial state to visible
        gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.1,
            ease: 'power3.out',
          }
        );
      }
    });
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="project-card-enhanced"
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <div className="project-header">
                <div className="project-year">{project.year}</div>
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
              </div>

              <div className="project-body">
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-footer">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View on GitHub
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
