import { useEffect, useRef } from 'react';
import '../styles/cursor.css';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorGlow = cursorGlowRef.current;
    if (!cursor || !cursorGlow) return;

    // Track mouse position directly - no clamping
    const handleMouseMove = (e: MouseEvent) => {
      // Use raw clientX/Y without any restrictions
      const x = e.clientX;
      const y = e.clientY;

      // Immediately update cursor position
      if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      }
      
      if (cursorGlow) {
        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle hover states on interactive elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('nav-links') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        cursor.classList.add('pointer');
        cursorGlow.classList.add('pointer');
      }
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('pointer');
      cursorGlow.classList.remove('pointer');
    };

    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef} />
      <div className="custom-cursor-glow" ref={cursorGlowRef} />
    </>
  );
}
