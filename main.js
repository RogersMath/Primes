import { gameState, initializeGameState } from './gameState.js';
import { updateDisplay, displayUpgrades, displayDiscoveries, displayVictoryStats, showMenu, hideMenu } from './ui.js';
import { playSound } from './sound.js';
import { startHarvestMode } from './harvestMode.js';

let timerInterval;

function initGame() {
    // Get settings from the start menu
    gameState.settings.variableDifficulty = document.getElementById('variable-difficulty').checked;
    gameState.settings.manualPrimeCollection = document.getElementById('manual-prime-collection').checked;
    gameState.settings.startingDifficulty = parseInt(document.getElementById('starting-difficulty').value);
    gameState.settings.longTermResearchAvailable = document.getElementById('long-term-research').checked;

    initializeGameState();
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    playSound('backgroundMusic', true);
    document.getElementById('menu-button').addEventListener('click', toggleMenu);
    document.getElementById('close-menu').addEventListener('click', toggleMenu);
    startRound();
}

function startRound() {
    gameState.currentMode = 'harvest';
    gameState.timer = 60;
    gameState.round++;
    if (gameState.settings.variableDifficulty) {
        gameState.difficultyCounter = Math.min(8, gameState.round);
    }
    document.getElementById('harvest-mode').classList.remove('hidden');
    document.getElementById('research-mode').classList.add('hidden');
    document.getElementById('victory-mode').classList.add('hidden');
    document.getElementById('menu-mode').classList.add('hidden');
    startHarvestMode();
    updateDisplay();
    startTimer();
}

// ... (rest of the file remains the same)

export { initGame, startRound, endRound, checkVictory, toggleMenu };
