import { gameState, initializeGameState } from './gameState.js';
import { updateDisplay, displayUpgrades, displayDiscoveries, displayVictoryStats } from './ui.js';
import { playSound } from './sound.js';
import { startHarvestMode } from './harvestMode.js';

function initGame() {
    initializeGameState();
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    playSound('backgroundMusic', true);
    startRound();
}

function startRound() {
    gameState.currentMode = 'harvest';
    gameState.timer = 60;
    gameState.round++;
    document.getElementById('harvest-mode').classList.remove('hidden');
    document.getElementById('research-mode').classList.add('hidden');
    document.getElementById('victory-mode').classList.add('hidden');
    document.getElementById('menu-mode').classList.add('hidden');
    startHarvestMode();
    updateDisplay();

    const timerInterval = setInterval(() => {
        gameState.timer--;
        if (gameState.discoveries.modulo > 0) {
            gameState.research += gameState.discoveries.modulo;
        }
        if (gameState.discoveries.sieveOfEratosthenes > 0 && gameState.timer % 10 === 0) {
            gameState.primes += gameState.discoveries.sieveOfEratosthenes;
        }
        updateDisplay();
        if (gameState.timer <= 0) {
            clearInterval(timerInterval);
            endRound();
        }
    }, 1000);
}

function endRound() {
    gameState.currentMode = 'research';
    document.getElementById('harvest-mode').classList.add('hidden');
    document.getElementById('research-mode').classList.remove('hidden');
    
    // Apply Compound Interest
    const interestRate = gameState.discoveries.compoundInterest * 0.01;
    const interestGain = Math.ceil(gameState.research * interestRate);
    gameState.research += interestGain;
    
    // Process Long Term Studies
    for (let i = gameState.longTermStudies.length - 1; i >= 0; i--) {
        gameState.longTermStudies[i].roundsLeft--;
        if (gameState.longTermStudies[i].roundsLeft === 0) {
            gameState.research += 1000;
            gameState.longTermStudies.splice(i, 1);
        }
    }
    
    displayUpgrades();
    displayDiscoveries();
    updateDisplay();
}

function checkVictory() {
    if (gameState.completedBranches >= 3 && gameState.primes >= 100) {
        gameState.currentMode = 'victory';
        document.getElementById('harvest-mode').classList.add('hidden');
        document.getElementById('research-mode').classList.add('hidden');
        document.getElementById('victory-mode').classList.remove('hidden');
        displayVictoryStats();
    }
}

export { initGame, startRound, endRound, checkVictory };
