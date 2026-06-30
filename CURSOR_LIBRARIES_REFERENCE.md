# Cursor Effect Libraries - Reference Guide

Based on your mention of Magic UI and FireCursor effects, here are the main libraries you might be using:

---

## 1. **Magic UI** (magicui.design)
**Main Site:** https://magicui.design/docs

### Key Components:
- **Smooth Cursor**: Physics-based smooth cursor animation
- **Pointer**: Custom animated pointer component
- Free & Open Source
- Built with Tailwind CSS and Framer Motion
- Components you can copy/paste

### Installation:
```bash
npm install magicui
```

### Usage Example:
```tsx
import { SmoothCursor } from 'magicui/components/smooth-cursor'

function App() {
  return <SmoothCursor />
}
```

---

## 2. **react-cursor-rainbow-lines** (Rainbow Trail Effect)
**NPM:** https://www.npmjs.com/package/react-cursor-rainbow-lines  
**GitHub:** https://github.com/gokhangunduz/react-cursor-rainbow-lines

### Description:
- Creates colorful rainbow lines that follow cursor movement
- Very simple integration
- Lightweight package
- **This might be what you're thinking of for colored cursor trails!**

### Installation:
```bash
npm install react-cursor-rainbow-lines
```

### Usage:
```tsx
import ReactCursorRainbowLines from "react-cursor-rainbow-lines";

ReactDOM.render(
  <React.StrictMode>
    <ReactCursorRainbowLines />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

---

## 3. **black-cursor-flame** (Fire/Flame Cursor Effect)
**NPM:** https://www.npmjs.com/package/black-cursor-flame

### Description:
- **This is likely the "FireCursor" you mentioned!**
- Creates flame effect that follows cursor
- Black/dark flame aesthetic
- React component

### Installation:
```bash
npm install black-cursor-flame
```

---

## 4. **react-creative-cursor** 
**NPM:** https://www.npmjs.com/package/react-creative-cursor  
**GitHub:** https://github.com/ehsan-shv/react-creative-cursor

### Description:
- Inspired by Cuberto.com and 14islands.com
- Highly customizable cursor follower
- Multiple preset effects
- Professional quality

### Installation:
```bash
npm install react-creative-cursor
```

### Usage:
```tsx
import { CreativeCursor } from 'react-creative-cursor';

function App() {
  return (
    <>
      <CreativeCursor />
      <YourApp />
    </>
  );
}
```

---

## 5. **Cursify** (Modern Cursor Library)
**Website:** https://cursify.vercel.app/  
**GitHub:** https://github.com/ui-layouts/cursify

### Features:
- Multiple cursor effects (Blob, Splash, etc.)
- Built for React & Next.js
- Modern component library
- Well-documented

### Available Effects:
- Blob Cursor
- Splash Cursor
- Rainbow Cursor
- Fire Cursor
- And more...

---

## 6. **cursor-effects** (Old-school Effects)
**GitHub:** https://github.com/tholman/cursor-effects

### Description:
- Classic cursor effects (fairy dust, bubbles, etc.)
- Pure JavaScript (can be used in React)
- No dependencies
- Nostalgic effects

---

## My Recommendations Based on Your Use Case:

### For Rainbow/Colorful Cursor Trail:
**→ `react-cursor-rainbow-lines`**
```bash
npm install react-cursor-rainbow-lines
```
Simple, lightweight, creates colorful trailing lines

### For Fire/Flame Effect:
**→ `black-cursor-flame`**
```bash
npm install black-cursor-flame
```
This is likely the "FireCursor" you mentioned

### For Professional/Customizable:
**→ Magic UI or react-creative-cursor**
```bash
npm install magicui
# or
npm install react-creative-cursor
```

---

## Quick Comparison:

| Library | Effect Type | Complexity | Best For |
|---------|-------------|------------|----------|
| Magic UI | Smooth, Physics-based | Medium | Professional sites |
| react-cursor-rainbow-lines | Rainbow lines | Low | Colorful trails |
| black-cursor-flame | Fire/Flame | Low | Dramatic effect |
| react-creative-cursor | Multiple effects | Medium | Agency sites |
| Cursify | Modern effects | Medium | React/Next apps |

---

## Integration in Your Portfolio:

To replace the current SmokeCursor with any of these:

### Option 1: Rainbow Lines
```tsx
// App.tsx
import ReactCursorRainbowLines from "react-cursor-rainbow-lines";

function App() {
  return (
    <div className="App">
      {!isMobile && <ReactCursorRainbowLines />}
      {/* rest of app */}
    </div>
  );
}
```

### Option 2: Black Cursor Flame
```tsx
// App.tsx
import BlackCursorFlame from "black-cursor-flame";

function App() {
  return (
    <div className="App">
      {!isMobile && <BlackCursorFlame />}
      {/* rest of app */}
    </div>
  );
}
```

### Option 3: Magic UI Smooth Cursor
```tsx
// App.tsx
import { SmoothCursor } from "magicui";

function App() {
  return (
    <div className="App">
      {!isMobile && <SmoothCursor />}
      {/* rest of app */}
    </div>
  );
}
```

---

## Which One Would You Like to Use?

Based on your description of "colors while moving cursor", I think you're looking for either:

1. **react-cursor-rainbow-lines** - Rainbow colored lines
2. **black-cursor-flame** - Fire effect (if you want dramatic flame trails)

Let me know which one you'd like to implement, and I'll integrate it into your portfolio!
