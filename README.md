# Portfolio

A modern, interactive portfolio website built with React, TypeScript, and Three.js featuring 3D animations and aurora effects.

## Features

- **3D Avatar** - Interactive Three.js scene with animated hijabi avatar
- **Aurora Playground** - Dynamic rainbow aurora background effects
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Mobile-optimized layout with touch interactions
- **Custom Cursor** - Rainbow trail cursor effect
- **Dark Theme** - Modern dark mode interface

## Tech Stack

- React 18
- TypeScript
- Vite
- Three.js / React Three Fiber
- Framer Motion
- TailwindCSS

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx           # Landing section with avatar
│   ├── About.tsx          # About section
│   ├── Projects.tsx       # Projects showcase
│   ├── Skills.tsx         # Skills display
│   ├── Contact.tsx        # Contact form
│   ├── Scene.tsx          # Three.js 3D scene
│   ├── Avatar.tsx         # 3D avatar component
│   ├── AuroraPlayground.tsx # Aurora effects
│   └── Navigation.tsx     # Main navigation
├── hooks/
│   └── useMousePosition.ts # Mouse tracking hook
└── styles/
    ├── globals.css        # Global styles
    └── cursor.css         # Custom cursor styles
```

## Development

Built with Vite for fast HMR and optimized builds. Uses React Three Fiber for 3D rendering and Framer Motion for smooth animations.

## License

MIT
