import { gameState } from './gameState.js';
import { generateProblem } from './problem.js';
import { isPrime } from './utils.js';
import { updateDisplay, displayAnswers } from './ui.js';
import { playSound } from './sound.js';
import { checkVictory } from './main.js';

function startHarvestMode() {
    const { problem, answer } = generateProblem(gameState.difficultyCounter);
    document.getElementById('problem').textContent = problem;
    displayAnswers(answer);
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
        
        if (isPrime(Math.abs(correctAnswer))) {
            let primeGain = 1 + gameState.discoveries.increasedComplexity * 2;
            gameState.primes += primeGain;
            playSound('primeHarvestSound');
            if (gameState.discoveries.factoring > 0 && Math.random() < 0.5) {
                gameState.primes += primeGain;
            }
        }
    } else {
        playSound('incorrectSound');
        if (gameState.research > 0) {
            gameState.research -= 1;
        }
        if (gameState.primes > 0) {
            gameState.primes -= 1;
        }
    }
    gameState.totalProblems++;
    updateDisplay();
    startHarvestMode();
    checkVictory();
}

export { startHarvestMode, checkAnswer };
