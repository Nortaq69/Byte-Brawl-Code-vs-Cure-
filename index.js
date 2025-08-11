// Byte Brawl: Code vs Cure - Enhanced Main Application
// A digital gladiator arena where viruses battle antivirus software

class ByteBrawlApp {
    constructor() {
        this.name = 'Byte Brawl: Code vs Cure';
        this.description = 'Digital gladiator arena where viruses battle antivirus software';
        this.category = 'Gaming & Entertainment';
        this.icon = '⚔️';
        this.version = '2.0.0';
        this.author = 'NexusHub';
        
        // Game state
        this.currentScreen = 'boot';
        this.selectedCharacter = null;
        this.gameRunning = false;
        this.audioEnabled = true;
        
        // Audio elements
        this.audioElements = {};
        
        // Initialize the application
        this.initialize();
    }

    initialize() {
        this.setupAudio();
        this.setupEventListeners();
        this.startBootSequence();
    }

    setupAudio() {
        // Initialize audio elements
        this.audioElements = {
            boot: document.getElementById('boot-sound'),
            battle: document.getElementById('battle-music'),
            click: document.getElementById('ui-click')
        };

        // Set audio properties
        Object.values(this.audioElements).forEach(audio => {
            if (audio) {
                audio.volume = 0.3;
                audio.preload = 'auto';
            }
        });
    }

    setupEventListeners() {
        // Boot screen events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.currentScreen === 'boot') {
                this.completeBootSequence();
            }
        });

        // Main menu events
        document.getElementById('start-battle')?.addEventListener('click', () => {
            this.playSound('click');
            this.showCharacterSelect();
        });

        document.getElementById('character-select')?.addEventListener('click', () => {
            this.playSound('click');
            this.showCharacterSelect();
        });

        document.getElementById('sandbox-mode')?.addEventListener('click', () => {
            this.playSound('click');
            this.startSandboxMode();
        });

        document.getElementById('infection-rush')?.addEventListener('click', () => {
            this.playSound('click');
            this.startInfectionRush();
        });

        document.getElementById('debug-dojo')?.addEventListener('click', () => {
            this.playSound('click');
            this.startDebugDojo();
        });

        document.getElementById('file-import')?.addEventListener('click', () => {
            this.playSound('click');
            this.showFileImport();
        });

        // Character select events
        document.querySelectorAll('.character-card-modern').forEach(card => {
            card.addEventListener('click', () => {
                this.playSound('click');
                this.selectCharacter(card.dataset.character);
            });
        });

        document.getElementById('back-to-menu')?.addEventListener('click', () => {
            this.playSound('click');
            this.showMainMenu();
        });

        document.getElementById('start-with-selection')?.addEventListener('click', () => {
            this.playSound('click');
            this.startBattle();
        });

        // Tool header events
        document.getElementById('launchTool')?.addEventListener('click', () => {
            this.playSound('click');
            this.launchTool();
        });

        document.getElementById('settingsBtn')?.addEventListener('click', () => {
            this.playSound('click');
            this.showSettings();
        });

        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.playSound('click');
            if (window.ModernUI) {
                window.ModernUI.toggleTheme();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    startBootSequence() {
        this.currentScreen = 'boot';
        this.showScreen('boot-screen');
        
        // Animate boot text
        const bootLines = document.querySelectorAll('.boot-line');
        bootLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, (index + 1) * 500);
        });

        // Play boot sound
        this.playSound('boot');
    }

    completeBootSequence() {
        this.hideScreen('boot-screen');
        this.showMainMenu();
    }

    showMainMenu() {
        this.currentScreen = 'menu';
        this.showScreen('main-menu');
        this.hideScreen('character-select-screen');
        this.hideScreen('game-container');
    }

    showCharacterSelect() {
        this.currentScreen = 'character-select';
        this.showScreen('character-select-screen');
        this.hideScreen('main-menu');
    }

    selectCharacter(characterId) {
        // Remove previous selection
        document.querySelectorAll('.character-card-modern').forEach(card => {
            card.classList.remove('selected');
        });

        // Select new character
        const selectedCard = document.querySelector(`[data-character="${characterId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.selectedCharacter = characterId;
        }
    }

    startBattle() {
        if (!this.selectedCharacter) {
            this.showToast('Please select a character first!', 'warning');
            return;
        }

        this.currentScreen = 'game';
        this.showScreen('game-container');
        this.hideScreen('character-select-screen');
        
        this.initializeGame();
    }

    initializeGame() {
        this.gameRunning = true;
        
        // Initialize game canvas
        const canvas = document.getElementById('game-canvas');
        if (canvas) {
            this.setupGameCanvas(canvas);
        }

        // Start battle music
        this.playSound('battle');

        // Initialize HUD
        this.initializeHUD();

        // Start game loop
        this.gameLoop();
    }

    setupGameCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 1200;
        canvas.height = 600;

        // Clear canvas
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid background
        this.drawGrid(ctx);

        // Draw initial game state
        this.drawGameState(ctx);
    }

    drawGrid(ctx) {
        ctx.strokeStyle = 'rgba(0, 255, 231, 0.1)';
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= 1200; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 600);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= 600; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(1200, y);
            ctx.stroke();
        }
    }

    drawGameState(ctx) {
        // Draw player 1 (virus)
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(100, 300, 40, 40);

        // Draw player 2 (antivirus)
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(1060, 300, 40, 40);

        // Draw battle arena elements
        this.drawArenaElements(ctx);
    }

    drawArenaElements(ctx) {
        // Draw power-ups
        ctx.fillStyle = '#10b981';
        ctx.fillRect(600, 100, 20, 20);
        ctx.fillRect(600, 500, 20, 20);

        // Draw obstacles
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(400, 200, 100, 20);
        ctx.fillRect(700, 400, 100, 20);
    }

    initializeHUD() {
        // Set initial player stats
        this.updatePlayerStats('player1', {
            integrity: 100,
            cpu: 89,
            ram: 156,
            corruption: 0
        });

        this.updatePlayerStats('player2', {
            integrity: 100,
            cpu: 45,
            ram: 89,
            firewalls: 3
        });

        // Start battle timer
        this.startBattleTimer();
    }

    updatePlayerStats(player, stats) {
        Object.entries(stats).forEach(([stat, value]) => {
            const element = document.getElementById(`${player}-${stat}`);
            if (element) {
                if (stat === 'integrity') {
                    element.style.width = `${value}%`;
                } else {
                    element.textContent = typeof value === 'number' ? value : value;
                }
            }
        });
    }

    startBattleTimer() {
        let timeLeft = 300; // 5 minutes
        
        const timerElement = document.getElementById('battle-timer');
        const updateTimer = () => {
            if (!this.gameRunning) return;
            
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            if (timerElement) {
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            
            if (timeLeft <= 0) {
                this.endBattle('timeout');
                return;
            }
            
            timeLeft--;
            setTimeout(updateTimer, 1000);
        };
        
        updateTimer();
    }

    gameLoop() {
        if (!this.gameRunning) return;

        const canvas = document.getElementById('game-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            
            // Clear canvas
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw game state
            this.drawGrid(ctx);
            this.drawGameState(ctx);
            
            // Update game logic
            this.updateGameLogic();
        }

        // Continue game loop
        requestAnimationFrame(() => this.gameLoop());
    }

    updateGameLogic() {
        // Update player positions based on input
        this.handlePlayerInput();
        
        // Update AI behavior
        this.updateAI();
        
        // Check for collisions
        this.checkCollisions();
        
        // Update effects
        this.updateEffects();
    }

    handlePlayerInput() {
        // Handle keyboard input for player movement
        // This would be implemented based on the selected character and controls
    }

    updateAI() {
        // Update AI behavior for the opponent
        // This would implement different AI strategies based on the character
    }

    checkCollisions() {
        // Check for collisions between players, power-ups, and obstacles
        // This would handle game mechanics and scoring
    }

    updateEffects() {
        // Update visual effects, particles, and animations
        // This would handle the visual polish of the game
    }

    endBattle(result) {
        this.gameRunning = false;
        
        // Stop battle music
        this.stopSound('battle');
        
        // Show battle result
        this.showBattleResult(result);
    }

    showBattleResult(result) {
        // Create result modal
        const modal = this.createModal('Battle Result', this.getBattleResultMessage(result));
        document.body.appendChild(modal);
    }

    getBattleResultMessage(result) {
        switch (result) {
            case 'timeout':
                return 'Battle ended due to time limit!';
            case 'player1_win':
                return 'Virus wins! System corrupted.';
            case 'player2_win':
                return 'Antivirus wins! System protected.';
            default:
                return 'Battle ended.';
        }
    }

    startSandboxMode() {
        this.showToast('Sandbox mode coming soon!', 'info');
    }

    startInfectionRush() {
        this.showToast('Infection Rush mode coming soon!', 'info');
    }

    startDebugDojo() {
        this.showToast('Debug Dojo mode coming soon!', 'info');
    }

    showFileImport() {
        this.showToast('File import feature coming soon!', 'info');
    }

    launchTool() {
        this.showToast('Tool launched successfully!', 'success');
    }

    showSettings() {
        const settingsContent = `
            <div class="settings-section">
                <h3>Audio Settings</h3>
                <div class="setting-item">
                    <label>Master Volume</label>
                    <input type="range" min="0" max="100" value="30" class="slider-modern">
                </div>
                <div class="setting-item">
                    <label>Music Volume</label>
                    <input type="range" min="0" max="100" value="50" class="slider-modern">
                </div>
                <div class="setting-item">
                    <label>Sound Effects</label>
                    <input type="range" min="0" max="100" value="70" class="slider-modern">
                </div>
            </div>
            <div class="settings-section">
                <h3>Game Settings</h3>
                <div class="setting-item">
                    <label>Graphics Quality</label>
                    <select class="form-select-modern">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Enable Particles</label>
                    <div class="toggle-switch-modern">
                        <input type="checkbox" checked>
                        <span class="toggle-slider-modern"></span>
                    </div>
                </div>
            </div>
        `;

        const modal = this.createModal('Settings', settingsContent);
        document.body.appendChild(modal);
    }

    createModal(title, content) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay-modern';
        
        const modal = document.createElement('div');
        modal.className = 'modal-container-modern';
        modal.innerHTML = `
            <div class="modal-header-modern">
                <h2 class="modal-title-modern">${title}</h2>
                <button class="modal-close-modern">&times;</button>
            </div>
            <div class="modal-content-modern">
                ${content}
            </div>
        `;
        
        overlay.appendChild(modal);
        
        // Add close functionality
        const closeBtn = modal.querySelector('.modal-close-modern');
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        });
        
        // Show modal
        setTimeout(() => overlay.classList.add('show'), 10);
        
        return overlay;
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + M to toggle mute
        if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
            e.preventDefault();
            this.toggleMute();
        }
        
        // Ctrl/Cmd + R to restart game
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            if (this.gameRunning) {
                this.restartGame();
            }
        }
        
        // Escape to go back
        if (e.key === 'Escape') {
            if (this.currentScreen === 'character-select') {
                this.showMainMenu();
            } else if (this.currentScreen === 'game') {
                this.pauseGame();
            }
        }
    }

    toggleMute() {
        this.audioEnabled = !this.audioEnabled;
        
        Object.values(this.audioElements).forEach(audio => {
            if (audio) {
                audio.muted = !this.audioEnabled;
            }
        });
        
        this.showToast(
            this.audioEnabled ? 'Audio enabled' : 'Audio disabled',
            'info'
        );
    }

    restartGame() {
        if (this.gameRunning) {
            this.endBattle('restart');
            setTimeout(() => {
                this.startBattle();
            }, 1000);
        }
    }

    pauseGame() {
        if (this.gameRunning) {
            this.gameRunning = false;
            this.showToast('Game paused. Press Ctrl+R to resume.', 'info');
        }
    }

    // Screen Management
    showScreen(screenId) {
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.remove('hidden');
            screen.classList.add('animate-fade-in-up');
        }
    }

    hideScreen(screenId) {
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('hidden');
            screen.classList.remove('animate-fade-in-up');
        }
    }

    // Audio Management
    playSound(soundName) {
        if (!this.audioEnabled) return;
        
        const audio = this.audioElements[soundName];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }

    stopSound(soundName) {
        const audio = this.audioElements[soundName];
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }

    // Toast Notifications
    showToast(message, type = 'info') {
        if (window.ModernUI) {
            window.ModernUI.showToast(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    // Utility Methods
    getInfo() {
        return {
            name: this.name,
            description: this.description,
            category: this.category,
            icon: this.icon,
            version: this.version,
            author: this.author,
            isRunning: this.gameRunning,
            currentScreen: this.currentScreen,
            selectedCharacter: this.selectedCharacter
        };
    }

    getStatus() {
        return {
            isRunning: this.gameRunning,
            currentScreen: this.currentScreen,
            selectedCharacter: this.selectedCharacter,
            audioEnabled: this.audioEnabled,
            breakpoint: window.LayoutManager?.getBreakpointInfo()?.current || 'unknown'
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.byteBrawlApp = new ByteBrawlApp();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ByteBrawlApp;
} 