import { useEffect, useRef } from 'react';

interface Blob {
  x: number;                 //horizontal position 
  y: number;                 //vertical position 
  vx: number;                //velocity in x direction 
  vy: number;                //velocity in y direction
  size: number;              //radius of the blob in pixels 
  life: number;              //current age
  maxLife: number;           //maximum lifespan before it disappears 
  hue: number;               //color on the rainbow wheel 
}

export function AuroraPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, prevX: window.innerWidth / 2, prevY: window.innerHeight / 2 });
  const blobsRef = useRef<Blob[]>([]);
  const animationFrameId = useRef<number | undefined>(undefined);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Calculate velocity (direction and speed)
      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Only spawn blobs when cursor is moving
      if (speed > 2) {
        const now = Date.now();
        
        // Spawn blobs at regular intervals when moving
        if (now - lastSpawnTime.current > 50) { // Every 50ms
          lastSpawnTime.current = now;

          // Spawn multiple blobs with different colors
          const numBlobs = Math.min(Math.floor(speed / 10) + 1, 3);
          
          for (let i = 0; i < numBlobs; i++) {
            blobsRef.current.push({
              x: mouseRef.current.x + (Math.random() - 0.5) * 30,
              y: mouseRef.current.y + (Math.random() - 0.5) * 30,
              vx: dx * 0.3 + (Math.random() - 0.5) * 2, // Move in cursor direction
              vy: dy * 0.3 + (Math.random() - 0.5) * 2,
              size: 150 + Math.random() * 100,
              life: 0,
              maxLife: 80 + Math.random() * 40, // 80-120 frames
              hue: Math.random() * 360 // Random rainbow color
            });
          }

          // Limit total blobs for performance
          if (blobsRef.current.length > 30) {
            blobsRef.current = blobsRef.current.slice(-30);
          }
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear with dark background (fully opaque when no blobs)
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'; // Slight trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw blobs
      blobsRef.current = blobsRef.current.filter(blob => {
        blob.x += blob.vx;
        blob.y += blob.vy;
        blob.life++;

        // Slow down over time (friction)
        blob.vx *= 0.98;
        blob.vy *= 0.98;

        const lifeRatio = 1 - blob.life / blob.maxLife;
        
        if (lifeRatio <= 0) return false;

        // Create radial gradient for blob
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.size * lifeRatio
        );

        // Colorful gradient based on blob's hue
        gradient.addColorStop(0, `hsla(${blob.hue}, 80%, 70%, ${lifeRatio * 0.4})`);
        gradient.addColorStop(0.5, `hsla(${blob.hue + 30}, 80%, 65%, ${lifeRatio * 0.25})`);
        gradient.addColorStop(1, `hsla(${blob.hue + 60}, 80%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.size * lifeRatio, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Draw cursor spotlight (only when moving)
      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      if (speed > 1) {
        const cursorGradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          300
        );

        // Rainbow spotlight at cursor
        const hue = (Date.now() * 0.05) % 360;
        const intensity = Math.min(speed / 20, 1); // Brighter when moving faster
        cursorGradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${intensity * 0.3})`);
        cursorGradient.addColorStop(0.5, `hsla(${hue + 60}, 100%, 65%, ${intensity * 0.15})`);
        cursorGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = cursorGradient;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 300, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
        mixBlendMode: 'screen',
        filter: 'blur(40px) saturate(140%)',
        opacity: 0.95
      }}
    />
  );
}
