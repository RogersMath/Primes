import { gameState } from './gameState.js';

function playSound(id, loop = false) {
    if (gameState.soundEnabled) {
        const audio = document.getElementById(id);
        audio.loop = loop;
        audio.play().catch(error => console.log("Audio play failed:", error));
    }
}

function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    const icon = document.querySelector('#sound-toggle i');
    icon.className = gameState.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    document.querySelectorAll('audio').forEach(audio => {
        audio.muted = !gameState.soundEnabled;
    });
}

export { playSound, toggleSound };
