import { gameState } from './gameState.js';
import { generateProblem } from './problem.js';
import { isPrime } from './utils.js';
import { updateDisplay, displayAnswers } from './ui.js';
import { playSound } from './sound.js';
import { checkVictory } from './main.js';

function startHarvestMode() {
    const { problem, answer } = generateProblem(gameState.difficultyCounter);
    document.getElementById('problem').textContent = problem;
    displayAnswers(answer, gameState.settings.manualPrimeCollection);
}

function checkAnswer(userAnswer, correctAnswer, isCollectPrime) {
    const isCorrect = userAnswer === correctAnswer;
    const isPrimeNumber = isPrime(Math.abs(correctAnswer));

    if (isCorrect) {
        playSound('correctSound');
        let researchGain = 1;
        researchGain += gameState.discoveries.coreProperties * 3;
        if (gameState.discoveries.orderOfOperations > 0) {
            researchGain *= 2;
        }
        gameState.research += researchGain;
        gameState.correctProblems++;
        
        if (isPrimeNumber && !gameState.settings.manualPrimeCollection) {
            collectPrime();
        }
    } else if (isCollectPrime) {
        if (isPrimeNumber) {
            collectPrime();
        } else {
            penalizePrimeCollection();
        }
    } else {
        penalizeIncorrectAnswer();
    }

    gameState.totalProblems++;
    updateDisplay();
    startHarvestMode();
    checkVictory();
}

function collectPrime() {
    let primeGain = 1 + gameState.discoveries.increasedComplexity * 2;
    gameState.primes += primeGain;
    playSound('primeHarvestSound');
    if (gameState.discoveries.factoring > 0 && Math.random() < 0.5) {
        gameState.primes += primeGain;
    }
}

function penalizePrimeCollection() {
    playSound('incorrectSound');
    gameState.primes = Math.max(0, gameState.primes - 2);
    gameState.research = Math.max(0, gameState.research - 1);
}

function penalizeIncorrectAnswer() {
    playSound('incorrectSound');
    if (gameState.research > 0) {
        gameState.research -= 1;
    }
    if (gameState.primes > 0) {
        gameState.primes -= 1;
    }
}

export { startHarvestMode, checkAnswer };
