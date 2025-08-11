# Byte Brawl: Code vs Cure 🦠⚔️🛡️

A modern, enhanced digital gladiator arena where viruses battle antivirus software in a cyberpunk-themed programming challenge game.

## ✨ Features

### 🎨 Modern UI/UX Design
- **Sleek Cyberpunk Aesthetic**: Dark theme with neon cyan accents and glassmorphism effects
- **Responsive Layout**: Works seamlessly across desktop, tablet, and mobile devices
- **Smooth Animations**: CSS3 animations, transitions, and micro-interactions
- **Professional Components**: Custom-styled buttons, modals, forms, and navigation

### 🎮 Game Features
- **Character Selection**: Choose from 8 unique digital warriors (4 viruses, 4 antivirus)
- **Battle Arena**: Real-time combat with canvas-based graphics
- **Multiple Game Modes**: Battle, Sandbox, Infection Rush, Debug Dojo
- **HUD System**: Real-time player stats, integrity bars, and battle timer
- **Control System**: Customizable keyboard controls for both factions

### 🎵 Audio & Effects
- **Background Music**: Immersive cyberpunk soundtrack
- **Sound Effects**: UI interactions, battle sounds, and ambient effects
- **Visual Effects**: Particle systems, neon lines, and circuit grid animations
- **Loading Animations**: Smooth boot sequence and loading states

### 🛠️ Technical Features
- **Modular Architecture**: Organized component structure with separation of concerns
- **Modern JavaScript**: ES6+ features, classes, and async/await
- **CSS Custom Properties**: Dynamic theming and consistent design tokens
- **Performance Optimized**: Efficient rendering and smooth 60fps gameplay
- **Accessibility**: Keyboard navigation, screen reader support, and focus management

## 🚀 Getting Started

### Prerequisites
- Modern web browser with ES6+ support
- Local web server (for development)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/nexushub/byte-brawl.git
cd byte-brawl
```

2. Start a local web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

3. Open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
byte-brawl/
├── index.html                 # Main application entry point
├── index.js                   # Core application logic
├── styles.css                 # Main stylesheet
├── README.md                  # Project documentation
├── assets/                    # Static assets
│   ├── ui/                    # UI components and icons
│   │   └── favicon.svg        # Application favicon
│   ├── fonts/                 # Custom fonts (if any)
│   ├── effects/               # Visual effects and shaders
│   └── sound/                 # Audio files
│       ├── boot.ogg          # Boot sequence sound
│       ├── battle.ogg        # Battle music
│       └── click.ogg         # UI click sound
└── components/                # Modular components
    ├── ui/                    # UI component styles
    │   └── ui-components.css  # Modern UI components
    ├── layout/                # Layout management
    │   └── layout.css         # Responsive layout system
    └── js/                    # Component JavaScript
        ├── ui-components.js   # UI interactions
        └── layout.js          # Layout management
```

## 🎮 Game Controls

### Virus Controls (Player 1)
- **WASD**: Movement
- **SPACE**: Infect
- **SHIFT**: Corrupt
- **CTRL**: Exploit

### Antivirus Controls (Player 2)
- **Arrow Keys**: Movement
- **ENTER**: Scan
- **DELETE**: Quarantine
- **HOME**: Firewall

### Global Controls
- **ESC**: Pause/Back
- **Ctrl+R**: Restart game
- **Ctrl+M**: Toggle mute
- **Ctrl+K**: Search (future feature)
- **Ctrl+/**: Help (future feature)

## 🎨 Design System

### Color Palette
```css
--primary-cyan: #00ffe7      /* Main accent color */
--secondary-blue: #00b8ff    /* Secondary accent */
--accent-purple: #8b5cf6     /* Purple accent */
--accent-pink: #ec4899       /* Pink accent */
--background-dark: #0a0a0a   /* Dark background */
--background-darker: #050505  /* Darker background */
--text-light: #ffffff        /* Light text */
--text-gray: #cccccc         /* Gray text */
```

### Typography
- **Primary**: Orbitron (futuristic, monospace)
- **Secondary**: JetBrains Mono (code-like)
- **Fallback**: Share Tech Mono

### Spacing System
- **Small**: 0.25rem (4px)
- **Medium**: 1rem (16px)
- **Large**: 2rem (32px)
- **Extra Large**: 4rem (64px)

## 🔧 Customization

### Theme Customization
The application supports dynamic theming through CSS custom properties. You can modify the color scheme by updating the `:root` variables in `styles.css`.

### Adding New Characters
To add new characters, update the character selection screen in `index.html` and add corresponding game logic in `index.js`.

### Audio Customization
Replace audio files in the `assets/sound/` directory to customize the audio experience.

## 🎯 Game Modes

### Battle Mode
- **1v1 Combat**: Virus vs Antivirus
- **Real-time Action**: Fast-paced strategic gameplay
- **Power-ups**: Collect items to gain advantages
- **Time Limit**: 5-minute battle timer

### Sandbox Mode (Coming Soon)
- **Practice Arena**: Learn controls and mechanics
- **Custom Scenarios**: Create your own battle conditions
- **AI Training**: Practice against different AI difficulties

### Infection Rush (Coming Soon)
- **Survival Mode**: Defend against waves of viruses
- **Progressive Difficulty**: Increasingly challenging waves
- **Score System**: Compete for high scores

### Debug Dojo (Coming Soon)
- **Tutorial Mode**: Step-by-step learning
- **Challenge Missions**: Complete specific objectives
- **Skill Progression**: Unlock new abilities

## 🛡️ Browser Support

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## 🚀 Performance

- **60 FPS Gameplay**: Optimized canvas rendering
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Efficient Audio**: Compressed audio formats with fallbacks
- **Responsive Design**: Optimized for all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Fonts**: Google Fonts (Orbitron, JetBrains Mono, Share Tech Mono)
- **Icons**: Custom SVG icons with cyberpunk aesthetic
- **Audio**: Custom sound design for immersive experience
- **Inspiration**: Classic arcade games and modern cyberpunk aesthetics

## 📞 Support

For support, email support@nexushub.org or create an issue in the repository.

---

**Byte Brawl: Code vs Cure** - Where digital warriors clash in the ultimate programming arena! ⚔️ 