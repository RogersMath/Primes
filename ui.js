import { gameState, discoveryNames, discoveryEffects, discoveryCosts } from './gameState.js';
import { checkAnswer } from './harvestMode.js';
import { upgradeDiscovery, startLongTermStudy, shardPrime } from './researchMode.js';
import { startRound } from './main.js';

function updateDisplay() {
    document.getElementById('timer').textContent = `Time: ${gameState.timer}s`;
    document.getElementById('primes').textContent = `Primes: ${gameState.primes}`;
    document.getElementById('research').textContent = `Research: ${gameState.research}`;
    document.getElementById('round-info').textContent = `Round ${gameState.round}`;
}

function displayAnswers(correctAnswer) {
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
        button.className = 'bg-zinc-500 text-white p-2 rounded w-full';
        button.onclick = () => checkAnswer(ans, correctAnswer);
        answersDiv.appendChild(button);
    });
}

function displayUpgrades() {
    const upgradesDiv = document.getElementById('current-upgrades');
    upgradesDiv.innerHTML = '<h2 class="text-xl font-bold mb-2">Current Upgrades:</h2>';
    for (const [discovery, level] of Object.entries(gameState.discoveries)) {
        if (level > 0) {
            upgradesDiv.innerHTML += `<p>${discoveryNames[discovery]} (Level ${level}): ${Array.isArray(discoveryEffects[discovery]) ? discoveryEffects[discovery][level - 1] : discoveryEffects[discovery]}</p>`;
        }
    }
    upgradesDiv.innerHTML += `<p>Long Term Studies in progress: ${gameState.longTermStudies.length}</p>`;
}

function displayDiscoveries() {
    const discoveriesDiv = document.getElementById('discoveries');
    discoveriesDiv.innerHTML = '';

    // Shard Prime button
    const shardPrimeDiv = document.createElement('div');
    shardPrimeDiv.className = 'mb-2';
    const shardPrimeButton = document.createElement('button');
    shardPrimeButton.textContent = 'Shard Prime';
    shardPrimeButton.className = 'bg-purple-500 text-white p-2 rounded w-full';
    shardPrimeButton.onclick = shardPrime;
    const shardPrimeInfo = createInfoButton('Converts a Prime into Research. Boosted by Modulo discovery.');
    shardPrimeDiv.appendChild(shardPrimeButton);
    shardPrimeDiv.appendChild(shardPrimeInfo);
    discoveriesDiv.appendChild(shardPrimeDiv);

    for (const [discovery, level] of Object.entries(gameState.discoveries)) {
        if (level < discoveryCosts[discovery].length) {
            const upgradeDiv = document.createElement('div');
            upgradeDiv.className = 'mb-2';
            
            const button = document.createElement('button');
            button.textContent = `Upgrade ${discoveryNames[discovery]} (Level ${level + 1}): ${discoveryCosts[discovery][level]} research`;
            button.className = 'bg-yellow-500 text-white p-2 rounded w-full';
            button.onclick = () => upgradeDiscovery(discovery);
            
            const infoButton = createInfoButton(Array.isArray(discoveryEffects[discovery]) ? discoveryEffects[discovery][level] : discoveryEffects[discovery]);
            
            upgradeDiv.appendChild(button);
            upgradeDiv.appendChild(infoButton);
            discoveriesDiv.appendChild(upgradeDiv);
        }
    }

    // Long Term Study button
    const longTermStudyDiv = document.createElement('div');
    longTermStudyDiv.className = 'mb-2';
    const longTermStudyButton = document.createElement('button');
    longTermStudyButton.textContent = 'Long Term Study: 200 research';
    longTermStudyButton.className = 'bg-green-500 text-white p-2 rounded w-full';
    longTermStudyButton.onclick = startLongTermStudy;
    const longTermStudyInfo = createInfoButton('Invest in a study that will yield 1000 Research after 5 rounds.');
    longTermStudyDiv.appendChild(longTermStudyButton);
    longTermStudyDiv.appendChild(longTermStudyInfo);
    discoveriesDiv.appendChild(longTermStudyDiv);

    // Start Next Round button
    const startRoundButton = document.createElement('button');
    startRoundButton.textContent = 'Start Next Round';
    startRoundButton.className = 'bg-blue-500 text-white p-2 rounded w-full mt-4';
    startRoundButton.onclick = startRound;
    discoveriesDiv.appendChild(startRoundButton);
}

function createInfoButton(infoText) {
    const infoButton = document.createElement('button');
    infoButton.innerHTML = '<i class="fas fa-info-circle"></i>';
    infoButton.className = 'ml-2 text-blue-500';
    infoButton.onclick = () => alert(infoText);
    return infoButton;
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
    `;
}

function showMenu() {
    document.getElementById('harvest-mode').classList.add('hidden');
    document.getElementById('research-mode').classList.add('hidden');
    document.getElementById('victory-mode').classList.add('hidden');
    document.getElementById('menu-mode').classList.remove('hidden');
    displayMenuStats();
}

function hideMenu() {
    document.getElementById('menu-mode').classList.add('hidden');
    if (gameState.currentMode === 'harvest') {
        document.getElementById('harvest-mode').classList.remove('hidden');
    } else if (gameState.currentMode === 'research') {
        document.getElementById('research-mode').classList.remove('hidden');
    }
}

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
