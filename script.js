const gameState = {
    primes: 0,
    research: 0,
    discoveries: {
        coreProperties: 0,
        orderOfOperations: 0,
        factoring: 0,
        modulo: 0,
        sieveOfEratosthenes: 0,
        absoluteValues: 0,
        compoundInterest: 0
    },
    longTermStudies: [],
    currentMode: 'harvest',
    timer: 60,
    problemType: 'addition',
    round: 0,
    totalProblems: 0,
    correctProblems: 0,
    soundEnabled: true,
    valueRange: 20
};

const discoveryCosts = {
    coreProperties: [200, 600, 1800],
    orderOfOperations: [50, 250, 1250],
    factoring: [50, 250, 1250],
    modulo: [200, 600, 1800],
    sieveOfEratosthenes: [50, 250, 1250],
    absoluteValues: [500],
    compoundInterest: [50, 250, 1250]
};

const discoveryNames = {
    coreProperties: 'Core Properties',
    orderOfOperations: 'Order of Operations',
    factoring: 'Factoring',
    modulo: 'Modulo',
    sieveOfEratosthenes: 'Eratosthenes Sieve',
    absoluteValues: 'Absolute Values',
    compoundInterest: 'Compound Interest'
};

const discoveryEffects = {
    coreProperties: 'Gain 3 additional research per correct answer',
    orderOfOperations: 'Double research gain and introduce complex problems',
    factoring: '50% chance to gain an extra prime',
    modulo: 'Gain research every second and boost Shard Prime',
    sieveOfEratosthenes: 'Automatically harvest primes periodically',
    absoluteValues: 'Harvest primes based on absolute value of answers',
    compoundInterest: '+1% bonus to total Research at the end of each round'
};

function updateDisplay() {
    document.getElementById('timer').textContent = `Time: ${gameState.timer}s`;
    document.getElementById('primes').textContent = `Primes: ${gameState.primes}`;
    document.getElementById('research').textContent = `Research: ${gameState.research}`;
    document.getElementById('round-info').textContent = `Round ${gameState.round}`;
}

function generateProblem() {
    const a = Math.floor(Math.random() * (2 * gameState.valueRange + 1)) - gameState.valueRange;
    const b = Math.floor(Math.random() * (2 * gameState.valueRange + 1)) - gameState.valueRange;
    let problem, answer;
    
    if (Math.random() < 0.5) {
        problem = `${a} + ${b}`;
        answer = a + b;
    } else {
        problem = `${a} - ${b}`;
        answer = a - b;
    }

    if (gameState.discoveries.orderOfOperations > 0 && Math.random() < 0.1 * gameState.discoveries.orderOfOperations) {
        const c = Math.floor(Math.random() * (2 * gameState.valueRange + 1)) - gameState.valueRange;
        problem = `${a} * ${b} + ${c}`;
        answer = a * b + c;
    }

    document.getElementById('problem').textContent = problem;
    
    const answers = [answer];
    while (answers.length < 4) {
        let wrongAnswer = answer + Math.floor(Math.random() * gameState.valueRange) - Math.floor(gameState.valueRange / 2);
        if (wrongAnswer !== answer && !answers.includes(wrongAnswer)) {
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
        button.onclick = () => checkAnswer(ans, answer);
        answersDiv.appendChild(button);
    });

    gameState.totalProblems++;
}

function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        playSound('correctSound');
        let researchGain = 1;
        researchGain += gameState.discoveries.coreProperties * 3;
        if (gameState.discoveries.orderOfOperations > 0) {
            researchGain *= 2;
        }
        gameState.research += researchGain;
        gameState.correctProblems++;
        
        if (isPrime(Math.abs(correctAnswer)) && (gameState.discoveries.absoluteValues > 0 || correctAnswer > 0)) {
            gameState.primes += 1;
            playSound('primeHarvestSound');
            if (gameState.discoveries.factoring > 0 && Math.random() < 0.5) {
                gameState.primes += 1;
            }
        }
    } else {
        playSound('incorrectSound');
        if (gameState.research > 0) {
            gameState.research -= 1;
        }
    }
    updateDisplay();
    generateProblem();
    checkVictory();
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function startRound() {
    gameState.currentMode = 'harvest';
    gameState.timer = 60;
    gameState.round++;
    document.getElementById('harvest-mode').classList.remove('hidden');
    document.getElementById('research-mode').classList.add('hidden');
    document.getElementById('victory-mode').classList.add('hidden');
    document.getElementById('menu-mode').classList.add('hidden');
    generateProblem();
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

function displayUpgrades() {
    const upgradesDiv = document.getElementById('current-upgrades');
    upgradesDiv.innerHTML = '<h2 class="text-xl font-bold mb-2">Current Upgrades:</h2>';
    for (const [discovery, level] of Object.entries(gameState.discoveries)) {
        if (level > 0) {
            upgradesDiv.innerHTML += `<p>${discoveryNames[discovery]} (Level ${level}): ${discoveryEffects[discovery]}</p>`;
        }
    }
    upgradesDiv.innerHTML += `<p>Long Term Studies in progress: ${gameState.longTermStudies.length}</p>`;
}

function displayDiscoveries() {
    const discoveriesDiv = document.getElementById('discoveries');
    discoveriesDiv.innerHTML = '';
    for (const [discovery, level] of Object.entries(gameState.discoveries)) {
        if (level < discoveryCosts[discovery].length) {
            const button = document.createElement('button');
            button.textContent = `Upgrade ${discoveryNames[discovery]} (Level ${level + 1}): ${discoveryCosts[discovery][level]} research`;
            button.className = 'bg-yellow-500 text-white p-2 rounded w-full mb-2';
            button.onclick = () => upgradeDiscovery(discovery);
            discoveriesDiv.appendChild(button);
        }
    }
    const longTermStudyButton = document.createElement('button');
    longTermStudyButton.textContent = 'Long Term Study: 200 research';
    longTermStudyButton.className = 'bg-green-500 text-white p-2 rounded w-full';
    longTermStudyButton.onclick = () => startLongTermStudy();
    discoveriesDiv.appendChild(longTermStudyButton);
}

function upgradeDiscovery(discovery) {
    const cost = discoveryCosts[discovery][gameState.discoveries[discovery]];
    if (gameState.research >= cost) {
        gameState.research -= cost;
        gameState.discoveries[discovery]++;
        gameState.valueRange += 5;
        playSound('discoverySound');
        updateDisplay();
        displayUpgrades();
        displayDiscoveries();
        checkVictory();
    }
}

function startLongTermStudy() {
    if (gameState.research >= 200) {
        gameState.research -= 200;
        gameState.longTermStudies.push({roundsLeft: 5});
        playSound('discoverySound');
        updateDisplay();
        displayUpgrades();
    }
}

function shardPrime() {
    if (gameState.primes > 0) {
        playSound('shardSound');
        gameState.primes--;
        let researchGain = 10;
        researchGain += gameState.discoveries.modulo * 5;
        gameState.research += researchGain;
        updateDisplay();
    }
}

function initGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    playSound('backgroundMusic', true);
    startRound();
}

function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    const icon = document.querySelector('#sound-toggle i');
    icon.className = gameState.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    document.querySelectorAll('audio').forEach(audio => {
        audio.muted = !gameState.soundEnabled;
    });
}

function playSound(id, loop = false) {
    if (gameState.soundEnabled) {
        const audio = document.getElementById(id);
        audio.loop = loop;
        audio.play().catch(error => console.log("Audio play failed:", error));
    }
}

function checkVictory() {
    const allDiscoveriesMaxed = Object.entries(gameState.discoveries).every(([discovery, level]) => 
        level === discoveryCosts[discovery].length
    );
    if (allDiscoveriesMaxed && gameState.primes >= 100) {
        gameState.currentMode = 'victory';
        document.getElementById('harvest-mode').classList.add('hidden');
        document.getElementById('research-mode').classList.add('hidden');
        document.getElementById('victory-mode').classList.remove('hidden');
        displayVictoryStats();
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
    `;
}

function showMenu() {
    document.getElementById('harvest-mode').classList.add('hidden');
    document.getElementById('research-mode').classList.add('hidden');
    document.getElementById('menu-mode').classList.remove('hidden');
    displayMenuStats();
}

function closeMenu() {
    document.getElementById('menu-mode').classList.add('hidden');
    if (gameState.currentMode === 'harvest') {
        document.getElementById('harvest-mode').classList.remove('hidden');
    } else if (gameState.currentMode === 'research') {
        document.getElementById('research-mode').classList.remove('hidden');
    }
}

function displayMenuStats() {
    const menuStatsDiv = document.getElementById('menu-stats');
    const percentCorrect = (gameState.correctProblems / gameState.totalProblems * 100).toFixed(2);
    menuStatsDiv.innerHTML = `
        <p>Rounds Played: ${gameState.round}</p>
        <p>Total Problems: ${gameState.totalProblems}</p>
        <p>Correct Answers: ${gameState.correctProblems}</p>
        <p>Accuracy: ${percentCorrect}%</p>
    `;
}

document.getElementById('start-game').onclick = initGame;
document.getElementById('start-round').onclick = startRound;
document.getElementById('shard-prime').onclick = shardPrime;
document.getElementById('sound-toggle').onclick = toggleSound;
document.getElementById('menu-button').onclick = showMenu;
document.getElementById('close-menu').onclick = closeMenu;
