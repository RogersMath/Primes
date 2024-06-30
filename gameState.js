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
    completedBranches: 0
};

const discoveryCosts = {
    increasedComplexity: [10, 50, 500],
    coreProperties: [200, 600, 1800],
    orderOfOperations: [50, 250, 1250],
    factoring: [50, 250, 1250],
    modulo: [200, 600, 1800],
    sieveOfEratosthenes: [50, 250, 1250],
    compoundInterest: [50, 250, 1250]
};

const discoveryNames = {
    increasedComplexity: 'Increased Complexity',
    coreProperties: 'Core Properties',
    orderOfOperations: 'Order of Operations',
    factoring: 'Factoring',
    modulo: 'Modulo',
    sieveOfEratosthenes: 'Eratosthenes Sieve',
    compoundInterest: 'Compound Interest'
};

const discoveryEffects = {
    increasedComplexity: [
        'Increase Prime harvest by 2, introduce subtraction and negative numbers',
        'Increase Prime harvest by 2 more, introduce multiplication and division',
        'Increase Prime harvest by 2 more, introduce absolute value problems'
    ],
    coreProperties: 'Gain 3 additional research per correct answer',
    orderOfOperations: 'Double research gain and introduce complex problems',
    factoring: '50% chance to gain an extra prime',
    modulo: 'Gain research every second and boost Shard Prime',
    sieveOfEratosthenes: 'Automatically harvest primes periodically',
    compoundInterest: '+1% bonus to total Research at the end of each round'
};

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
        completedBranches: 0
    });
}

export { gameState, discoveryCosts, discoveryNames, discoveryEffects, initializeGameState };
