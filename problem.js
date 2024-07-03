import { gameState } from './gameState.js';

function generateProblem(difficulty) {
    let problem, answer;

    switch (difficulty) {
        case 1:
            [problem, answer] = generateAdditionProblem();
            break;
        case 2:
            [problem, answer] = generateSubtractionProblem();
            break;
        case 3:
            [problem, answer] = generateNegativeNumberProblem();
            break;
        case 4:
            [problem, answer] = generateMultiplicationProblem();
            break;
        case 5:
            [problem, answer] = generateDivisionProblem();
            break;
        case 6:
            [problem, answer] = generateModuloProblem();
            break;
        case 7:
            [problem, answer] = generateAbsoluteValueProblem();
            break;
        case 8:
        default:
            [problem, answer] = generateOrderOfOperationsProblem();
            break;
    }

    return { problem, answer };
}

function generateAdditionProblem() {
    const a = Math.floor(Math.random() * gameState.valueRange);
    const b = Math.floor(Math.random() * gameState.valueRange);
    return [`${a} + ${b}`, a + b];
}

function generateSubtractionProblem() {
    const a = Math.floor(Math.random() * gameState.valueRange);
    const b = Math.floor(Math.random() * gameState.valueRange);
    return [`${a} - ${b}`, a - b];
}

function generateNegativeNumberProblem() {
    const a = Math.floor(Math.random() * gameState.valueRange * 2) - gameState.valueRange;
    const b = Math.floor(Math.random() * gameState.valueRange * 2) - gameState.valueRange;
    const operation = Math.random() < 0.5 ? '+' : '-';
    return [`${a} ${operation} ${b}`, operation === '+' ? a + b : a - b];
}

function generateMultiplicationProblem() {
    const a = Math.floor(Math.random() * Math.sqrt(gameState.valueRange));
    const b = Math.floor(Math.random() * Math.sqrt(gameState.valueRange));
    return [`${a} * ${b}`, a * b];
}

function generateDivisionProblem() {
    const b = Math.floor(Math.random() * Math.sqrt(gameState.valueRange)) + 1;
    const a = b * Math.floor(Math.random() * Math.sqrt(gameState.valueRange));
    return [`${a} / ${b}`, a / b];
}

function generateModuloProblem() {
    const a = Math.floor(Math.random() * gameState.valueRange);
    const b = Math.floor(Math.random() * (Math.sqrt(gameState.valueRange))) + 1;
    return [`${a} mod ${b}`, a % b];
}

function generateAbsoluteValueProblem() {
    const a = Math.floor(Math.random() * gameState.valueRange * 2) - gameState.valueRange;
    return [`|${a}|`, Math.abs(a)];
}

function generateOrderOfOperationsProblem() {
    const a = Math.floor(Math.random() * gameState.valueRange);
    const b = Math.floor(Math.random() * gameState.valueRange);
    const c = Math.floor(Math.random() * gameState.valueRange);
    const operation = Math.random() < 0.5 ? '*' : '**';
    return [`${a} ${operation} ${b} + ${c}`, operation === '*' ? a * b + c : Math.pow(a, b) + c];
}

export { generateProblem };
