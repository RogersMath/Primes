import { gameState, discoveryNames, discoveryEffects, discoveryCosts } from './gameState.js';
import { checkAnswer } from './harvestMode.js';
import { upgradeDiscovery, startLongTermStudy } from './researchMode.js';

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
    for (const [discovery, level] of Object.entries(gameState.discoveries)) {
        if (level < discoveryCosts[discovery].length) {
            const upgradeDiv = document.createElement('div');
            upgradeDiv.className = 'mb-2';
            
            const button = document.createElement('button');
            button.textContent = `Upgrade ${discoveryNames[discovery]} (Level ${level + 1}): ${discoveryCosts[discovery][level]} research`;
            button.className = 'bg-yellow-500 text-white p-2 rounded w-full';
            button.onclick = () => upgradeDiscovery(discovery);
            
            const infoButton = document.createElement('button');
            infoButton.innerHTML = '<i class="fas fa-info-circle"></i>';
            infoButton.className = 'ml-2 text-blue-500';
            infoButton.onclick = () => toggleInfo(discovery);
            
            const infoDiv = document.createElement('div');
            infoDiv.id = `info-${discovery}`;
            infoDiv.className = 'hidden mt-2 text-sm';
            infoDiv.textContent = Array.isArray(discoveryEffects[discovery]) ? discoveryEffects[discovery][level] : discoveryEffects[discovery];
            
            upgradeDiv.appendChild(button);
            upgradeDiv.appendChild(infoButton);
            upgradeDiv.appendChild(infoDiv);
            discoveriesDiv.appendChild(upgradeDiv);
        }
    }
    const longTermStudyButton = document.createElement('button');
    longTermStudyButton.textContent = 'Long Term Study: 200 research';
    longTermStudyButton.className = 'bg-green-500 text-white p-2 rounded w-full';
    longTermStudyButton.onclick = () => startLongTermStudy();
    discoveriesDiv.appendChild(longTermStudyButton);
}

function toggleInfo(discovery) {
    const infoDiv = document.getElementById(`info-${discovery}`);
    infoDiv.classList.toggle('hidden');
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

export { updateDisplay, displayAnswers, displayUpgrades, displayDiscoveries, displayVictoryStats };
