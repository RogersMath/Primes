import { gameState } from './gameState.js';
import { getRandomInt } from './utils.js';

function generateProblem() {
    let a, b, problem, answer;
    const complexityLevel = gameState.discoveries.increasedComplexity;

    if (complexityLevel === 0) {
        a = getRandomInt(1, gameState.valueRange);
        b = getRandomInt(1, gameState.valueRange);
        problem = `${a} + ${b}`;
        answer = a + b;
    } else if (complexityLevel === 1) {
        a = getRandomInt(-gameState.valueRange, gameState.valueRange);
        b = getRandomInt(-gameState.valueRange, gameState.valueRange);
        const operation = Math.random() < 0.5 ? '+' : '-';
        problem = `${a} ${operation} ${b}`;
        answer = operation === '+' ? a + b : a - b;
    } else {
        a = getRandomInt(-gameState.valueRange, gameState.valueRange);
        b = getRandomInt(-gameState.valueRange, gameState.valueRange);
        const operations = ['+', '-', '*', '/'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        if (operation === '/') {
            // Ensure division results in an integer
            b = b === 0 ? 1 : b;  // Avoid division by zero
            a = a * b;
        }

        problem = `${a} ${operation} ${b}`;
        switch (operation) {
            case '+': answer = a + b; break;
            case '-': answer = a - b; break;
            case '*': answer = a * b; break;
            case '/': answer = a / b; break;
        }

        if (complexityLevel === 3 && answer < 0) {
            problem = `|${problem}|`;
            answer = Math.abs(answer);
        }
    }

    gameState.totalProblems++;
    return { problem, answer };
}

export { generateProblem };
