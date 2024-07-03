import { gameState, discoveryNames, discoveryEffects, discoveryCosts } from './gameState.js';
import { checkAnswer } from './harvestMode.js';
import { upgradeDiscovery, startLongTermStudy, shardPrime } from './researchMode.js';
import { startRound } from './main.js';

// ... (existing functions remain the same)

function displayAnswers(correctAnswer, manualPrimeCollection) {
    const answers = [correctAnswer];
    while (answers.length < 4) {
        let wrongAnswer = correctAnswer + Math.floor(Math.random() * gameState.valueRange) - Math.floor(gameState.valueRange / 2);
        if (wrongAnswer !== correctAnswer && !answers.includes(wrongAnswer)) {
            answers.push(wrongAnswer);
        }
    }
    answers.sort(() => Math.random() - 0.5);

    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    answers.forEach(ans => {
        const button = document.createElement('button');
        button.textContent = ans;
        button.className = 'bg-zinc-500 text-white p-2 rounded w-full mb-2';
        button.onclick = () => checkAnswer(ans, correctAnswer, false);
        answersDiv.appendChild(button);
    });

    if (manualPrimeCollection) {
        const collectPrimeButton = document.createElement('button');
        collectPrimeButton.textContent = 'Collect Prime';
        collectPrimeButton.className = 'bg-yellow-500 text-white p-2 rounded w-full';
        collectPrimeButton.onclick = () => checkAnswer(null, correctAnswer, true);
        answersDiv.appendChild(collectPrimeButton);
    }
}

function displayVictoryStats() {
    const victoryStatsDiv = document.getElementById('victory-stats');
    const percentCorrect = (gameState.correctProblems / gameState.totalProblems * 100).toFixed(2);
    victoryStatsDiv.innerHTML = `
        <p>Rounds Played: ${gameState.round}</p>
        <p>Total Problems: ${gameState.totalProblems}</p>
        <p>Correct Answers: ${gameState.correctProblems}</p>
        <p>Accuracy: ${percentCorrect}%</p>
        <p>Completed Branches: ${gameState.completedBranches}</p>
        <h3 class="text-xl font-bold mt-4">Game Settings:</h3>
        <p>Variable Difficulty: ${gameState.settings.variableDifficulty ? 'On' : 'Off'}</p>
        <p>Manual Prime Collection: ${gameState.settings.manualPrimeCollection ? 'On' : 'Off'}</p>
        <p>Starting Difficulty: ${gameState.settings.startingDifficulty}</p>
        <p>Long Term Research: ${gameState.settings.longTermResearchAvailable ? 'Available' : 'Not Available'}</p>
    `;
}

function displayMenuStats() {
    const menuStatsDiv = document.getElementById('menu-stats');
    const percentCorrect = (gameState.correctProblems / gameState.totalProblems * 100).toFixed(2) || 0;
    menuStatsDiv.innerHTML = `
        <p>Rounds Played: ${gameState.round}</p>
        <p>Total Problems: ${gameState.totalProblems}</p>
        <p>Correct Answers: ${gameState.correctProblems}</p>
        <p>Accuracy: ${percentCorrect}%</p>
        <p>Completed Branches: ${gameState.completedBranches}</p>
        <h3 class="text-xl font-bold mt-4">Game Settings:</h3>
        <p>Variable Difficulty: ${gameState.settings.variableDifficulty ? 'On' : 'Off'}</p>
        <p>Manual Prime Collection: ${gameState.settings.manualPrimeCollection ? 'On' : 'Off'}</p>
        <p>Starting Difficulty: ${gameState.settings.startingDifficulty}</p>
        <p>Long Term Research: ${gameState.settings.longTermResearchAvailable ? 'Available' : 'Not Available'}</p>
    `;
}

// ... (rest of the file remains the same)

export { 
    updateDisplay, 
    displayAnswers, 
    displayUpgrades, 
    displayDiscoveries, 
    displayVictoryStats, 
    displayMenuStats,
    showMenu,
    hideMenu
};
