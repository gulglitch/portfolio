import { useState, useEffect } from 'react';
import { Scene } from './components/Scene';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { AuroraPlayground } from './components/AuroraPlayground';
import { useMousePosition } from './hooks/useMousePosition';
import './styles/globals.css';

function App() {
  const mousePosition = useMousePosition();
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Simulate loading time for 3D model
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Track scroll position - calculate avatar position transition
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress for the Hero section only (0 to 1)
      // Hero section is 100vh, so we transition during the first viewport height
      const heroScrollProgress = Math.min(scrollY / windowHeight, 1);
      
      setScrollProgress(heroScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial scroll to 0
    setScrollProgress(0);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p style={{ color: '#a0a0a0', fontFamily: 'Space Grotesk' }}>
          Loading your experience...
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Aurora Playground - Desktop only */}
      {!isMobile && <AuroraPlayground />}

      {/* Navigation Bar */}
      <Navigation isMobile={isMobile} />
      
      {/* Desktop Only: Fixed 3D Scene Background */}
      {!isMobile && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100vh', 
          zIndex: 1,
          transform: `translateX(${-30 * scrollProgress}%)`,
          transition: 'transform 0.1s ease-out'
        }}>
          <div className="stars-background" />
          <Scene mousePosition={mousePosition} scrollProgress={scrollProgress} />
          {/* Glow effect */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(219, 39, 119, 0.4) 30%, rgba(99, 226, 214, 0.45) 60%, rgba(94, 234, 212, 0.3) 80%, transparent 100%)',
            filter: 'blur(100px)',
            borderRadius: '50%',
            opacity: 1,
            transition: 'opacity 0.3s ease-out',
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            animation: 'pulse 4s ease-in-out infinite',
            zIndex: 1
          }} />
        </div>
      )}
      
      {/* Scrollable Content */}
      <div style={{ position: 'relative', zIndex: 100 }}>
        {/* Hero Section */}
        <div id="hero" style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
        </div>
        
        {/* About Section */}
        <About />

        {/* Projects Section */}
        <Projects />

        {/* Skills Section */}
        <Skills />

        {/* Contact Section */}
        <Contact />
      </div>
    </div>
  );
}

export default App;
