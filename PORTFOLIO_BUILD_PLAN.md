# 🚀 3D Portfolio Build Plan - 1 Day Challenge

## 📋 Project Overview
Replicate MoncyDev's 3D Portfolio with a custom hijabi girl avatar.

**Reference:** https://github.com/MoncyDev/Portfolio-Website  
**Tech Stack:** React + TypeScript + Three.js + GSAP + React Three Fiber

---

## ⏱️ Timeline Breakdown (8-10 hours)

### Phase 1: Setup & Structure (1 hour)
- [x] Initialize Vite + React + TypeScript project
- [ ] Install dependencies
- [ ] Set up folder structure
- [ ] Add GLB model to project

### Phase 2: 3D Avatar Integration (2 hours)
- [ ] Create 3D scene with React Three Fiber
- [ ] Import and display GLB avatar
- [ ] Add lighting and camera setup
- [ ] Implement avatar animations
- [ ] Add mouse tracking interaction

### Phase 3: GSAP Animations (2 hours)
- [ ] Install GSAP
- [ ] Create scroll-triggered animations
- [ ] Add page transitions
- [ ] Implement smooth scrolling
- [ ] Add text reveal animations

### Phase 4: Sections & Content (2-3 hours)
- [ ] Hero section with 3D avatar
- [ ] About section
- [ ] Projects/Portfolio section
- [ ] Skills section
- [ ] Contact section

### Phase 5: Styling & Polish (1-2 hours)
- [ ] Custom fonts
- [ ] Color scheme
- [ ] Responsive design
- [ ] Performance optimization

---

## 📦 Dependencies to Install

```bash
# Core 3D dependencies
npm install three @react-three/fiber @react-three/drei

# GSAP Animation
npm install gsap

# Additional utilities
npm install @react-three/postprocessing
npm install leva # For dev controls (optional)

# Icons & Fonts (optional)
npm install lucide-react
```

---

## 📁 Folder Structure

```
portfolio-3d/
├── public/
│   └── models/
│       └── hijabi-avatar.glb        # Your 3D avatar
├── src/
│   ├── components/
│   │   ├── Avatar.tsx               # 3D Avatar component
│   │   ├── Scene.tsx                # Three.js scene setup
│   │   ├── Hero.tsx                 # Hero section
│   │   ├── About.tsx                # About section
│   │   ├── Projects.tsx             # Projects showcase
│   │   ├── Skills.tsx               # Skills section
│   │   └── Contact.tsx              # Contact form
│   ├── animations/
│   │   ├── gsapAnimations.ts        # GSAP scroll animations
│   │   └── avatarAnimations.ts      # Avatar-specific animations
│   ├── hooks/
│   │   ├── useMousePosition.ts      # Track mouse for avatar
│   │   └── useScrollPosition.ts     # Scroll tracking
│   ├── styles/
│   │   ├── globals.css              # Global styles
│   │   └── animations.css           # CSS animations
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
└── vite.config.ts
```

---

## 🎨 Key Features to Replicate

### 1. 3D Avatar System
```typescript
Features:
- ✅ GLB model loading with React Three Fiber
- ✅ Smooth idle animations
- ✅ Mouse tracking (avatar follows cursor)
- ✅ Proper lighting (ambient + spot + point lights)
- ✅ Camera positioning and controls
- ✅ Performance optimization (shadows, LOD)
```

### 2. GSAP Scroll Animations
```typescript
Animations to implement:
- ✅ Fade-in on scroll
- ✅ Slide-in from sides
- ✅ Text reveal with split text
- ✅ Parallax effects
- ✅ Pin sections during scroll
- ✅ Smooth page transitions
```

### 3. Typography & Fonts
```css
Fonts to use (similar to reference):
- Heading: "Orbitron" or "Space Grotesk" (futuristic)
- Body: "Inter" or "Poppins" (modern, clean)
- Accent: "JetBrains Mono" (for code/technical text)

Import from Google Fonts:
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

### 4. Color Scheme
```css
:root {
  /* Dark theme (primary) */
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  
  /* Accent colors */
  --accent-primary: #00ff88;   /* Neon green */
  --accent-secondary: #0088ff; /* Electric blue */
  --accent-gradient: linear-gradient(135deg, #00ff88, #0088ff);
  
  /* 3D Scene */
  --scene-bg: #050505;
}
```

### 5. Sections Layout

#### A. Hero Section
```
- Full viewport height
- 3D avatar on left/center
- Animated text on right
- Scroll indicator at bottom
- Particle background (optional)
```

#### B. About Section
```
- Split layout (text + image/avatar)
- Fade-in animation on scroll
- Highlighted text with gradient
```

#### C. Projects Section
```
- Grid layout (2-3 columns)
- Hover effects on cards
- 3D tilt effect on hover
- Project thumbnails with overlay
```

#### D. Skills Section
```
- Icon grid or animated bars
- Stagger animation on reveal
- Skill categories grouping
```

#### E. Contact Section
```
- Simple form or social links
- Animated input fields
- 3D floating elements (optional)
```

---

## 🎬 Animation Implementation Details

### GSAP ScrollTrigger Setup
```typescript
// src/animations/gsapAnimations.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Fade in sections
  gsap.utils.toArray('.fade-in').forEach((element: any) => {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        scrub: true,
      }
    });
  });

  // Text reveal
  gsap.utils.toArray('.reveal-text').forEach((element: any) => {
    gsap.from(element, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
      }
    });
  });
};
```

### Avatar Mouse Tracking
```typescript
// src/hooks/useMousePosition.ts
import { useEffect, useState } from 'react';

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return position;
};
```

---

## 🎯 3D Avatar Implementation

### Basic Avatar Component
```typescript
// src/components/Avatar.tsx
import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '../hooks/useMousePosition';

export function Avatar() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/hijabi-avatar.glb');
  const { actions } = useAnimations(animations, group);
  const mousePosition = useMousePosition();

  // Play idle animation
  useEffect(() => {
    if (actions && actions['Idle']) {
      actions['Idle'].play();
    }
  }, [actions]);

  // Follow mouse
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mousePosition.x * 0.3,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mousePosition.y * 0.1,
        0.05
      );
    }
  });

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={2} 
        position={[0, -1, 0]} 
      />
    </group>
  );
}
```

### Scene Setup
```typescript
// src/components/Scene.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Avatar } from './Avatar';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ height: '100vh' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Avatar */}
      <Avatar />
      
      {/* Environment & Shadows */}
      <Environment preset="city" />
      <ContactShadows 
        position={[0, -1, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2} 
      />
      
      {/* Controls (optional - remove for production) */}
      <OrbitControls 
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
```

---

## 🎨 Font Implementation

### Add to index.html
```html
<head>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
```

### CSS Setup
```css
/* src/styles/globals.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #0a0a0a;
  color: #ffffff;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #00ff88;
  border-radius: 4px;
}
```

---

## 🚀 Performance Optimization

### 1. GLB Model Optimization
```
- Keep file size under 5MB
- Use compressed textures
- Optimize polygon count (< 50k triangons)
- Use Draco compression
```

### 2. Code Splitting
```typescript
// Lazy load heavy components
const Scene = lazy(() => import('./components/Scene'));
```

### 3. Three.js Optimization
```typescript
- Use <Suspense> for loading
- Implement LOD (Level of Detail)
- Dispose of geometries/materials properly
- Use InstancedMesh for repeated objects
```

---

## 📝 Content Checklist

### Hero Section
- [ ] Main headline (your name/title)
- [ ] Subtitle/tagline
- [ ] CTA buttons (Contact, Projects, etc.)
- [ ] Social media links

### About Section
- [ ] Short bio (2-3 paragraphs)
- [ ] Profile image or additional avatar
- [ ] Key highlights/achievements
- [ ] Download resume button

### Projects Section
- [ ] 3-6 portfolio projects
- [ ] Project thumbnails/images
- [ ] Tech stack used
- [ ] Live demo + GitHub links

### Skills Section
- [ ] Technical skills list
- [ ] Tools & frameworks
- [ ] Skill level indicators

### Contact Section
- [ ] Email address
- [ ] Contact form (optional)
- [ ] Social media links
- [ ] Location (optional)

---

## 🐛 Common Issues & Solutions

### Issue 1: GLB Model Not Loading
```
Solution:
- Ensure file is in public/models/
- Check file path is correct
- Verify GLB file is not corrupted
- Use useGLTF.preload() for faster loading
```

### Issue 2: GSAP Animations Not Triggering
```
Solution:
- Register ScrollTrigger plugin
- Check trigger element exists
- Verify start/end positions
- Use markers: true for debugging
```

### Issue 3: Performance Issues
```
Solution:
- Reduce shadow quality
- Lower texture resolution
- Use fewer lights
- Implement frustum culling
- Add loading screen
```

### Issue 4: Avatar Not Following Mouse
```
Solution:
- Verify mouse position hook is working
- Check lerp values (should be 0.01-0.1)
- Ensure group ref is attached correctly
```

---

## 🎯 Priority Features (MVP)

### Must Have (Core)
1. ✅ 3D avatar displayed properly
2. ✅ Basic navigation/sections
3. ✅ Responsive design
4. ✅ Hero + About + Projects sections
5. ✅ Smooth scrolling

### Should Have (Enhanced)
6. ⭐ GSAP scroll animations
7. ⭐ Mouse tracking avatar
8. ⭐ Custom fonts & styling
9. ⭐ Project cards with hover effects

### Nice to Have (Polish)
10. 💎 Loading screen
11. 💎 Page transitions
12. 💎 Particle effects
13. 💎 Sound effects (optional)
14. 💎 Theme switcher

---

## 📚 Resources & References

### Documentation
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Three.js Manual](https://threejs.org/manual/)

### Similar Portfolios
- [MoncyDev Portfolio](https://www.moncy.dev/)
- [Bruno Simon](https://bruno-simon.com/)
- [Wawa Sensei Portfolio](https://wawasensei.dev/)

### Assets
- [Google Fonts](https://fonts.google.com/)
- [Mixamo](https://www.mixamo.com/) - Animations
- [Poly Haven](https://polyhaven.com/) - HDRIs for environment

---

## ✅ Final Checklist Before Deploy

- [ ] Test on mobile devices
- [ ] Check loading performance
- [ ] Verify all links work
- [ ] Test form submissions
- [ ] Run Lighthouse audit
- [ ] Optimize images/assets
- [ ] Add meta tags for SEO
- [ ] Test cross-browser compatibility
- [ ] Add favicon
- [ ] Deploy to Vercel/Netlify

---

## 🚀 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel (recommended)
npm install -g vercel
vercel

# Or deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🎉 You Got This!

Follow this plan step by step, and you'll have an amazing 3D portfolio in 1 day!

**Remember:**
- Start with the basics (get the avatar showing first)
- Add animations incrementally
- Test frequently
- Don't aim for perfection on day 1
- You can always iterate later!

Good luck! 🚀✨
