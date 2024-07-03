const gameState = {
    primes: 0,
    research: 0,
    discoveries: {
        increasedComplexity: 0,
        coreProperties: 0,
        orderOfOperations: 0,
        factoring: 0,
        modulo: 0,
        sieveOfEratosthenes: 0,
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
    valueRange: 10,
    completedBranches: 0,
    difficultyCounter: 1
};

// Rest of the file remains the same...

function initializeGameState() {
    Object.assign(gameState, {
        primes: 0,
        research: 0,
        discoveries: {
            increasedComplexity: 0,
            coreProperties: 0,
            orderOfOperations: 0,
            factoring: 0,
            modulo: 0,
            sieveOfEratosthenes: 0,
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
        valueRange: 10,
        completedBranches: 0,
        difficultyCounter: 1
    });
}

export { gameState, discoveryCosts, discoveryNames, discoveryEffects, initializeGameState };
