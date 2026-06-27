import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Hero() {
  const introRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (introRef.current && nameRef.current && infoRef.current) {
      // Cool staggered entrance animation
      const tl = gsap.timeline({ delay: 0.2 });
      
      // Animate "Hello! I'm" with slide in from left
      tl.fromTo(introRef.current, 
        { opacity: 0, x: -100, scale: 0.8 },
        { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          duration: 1.2, 
          ease: 'power3.out' 
        }
      )
      // Animate name with bounce effect
      .fromTo(nameRef.current,
        { opacity: 0, y: 50, scale: 0.5 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)' 
        },
        '-=0.6'
      )
      // Animate title from right with rotation
      .fromTo(infoRef.current,
        { opacity: 0, x: 100, rotationY: 90 },
        { 
          opacity: 1, 
          x: 0,
          rotationY: 0,
          duration: 1.2, 
          ease: 'power3.out' 
        },
        '-=0.7'
      );

      // Add continuous floating animation to name
      gsap.to(nameRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Pulse animation for the hello text
      gsap.to(introRef.current, {
        scale: 1.02,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Animate stars
    if (starsRef.current) {
      gsap.to(starsRef.current, {
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);

  return (
    <section className="hero-section" id="hero">
      {/* Sparkly Stars Background - Local to Hero */}
      <div ref={starsRef} className="hero-stars-bg" />
      
      <div className="hero-container">
        {/* Left Side - Intro */}
        <div className="hero-intro" ref={introRef}>
          <h2>Hello! I'm</h2>
          <h1 ref={nameRef}>
            GUL-E-ZARA
          </h1>
        </div>

        {/* Right Side - Title */}
        <div className="hero-info" ref={infoRef}>
          <h2 className="hero-info-title">FULL-STACK DEVELOPER</h2>
          <h3 className="hero-info-subtitle">AI/ML ENTHUSIAST</h3>
        </div>
      </div>
    </section>
  );
}
