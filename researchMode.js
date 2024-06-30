import { gameState, discoveryCosts, discoveryNames, discoveryEffects } from './gameState.js';
import { updateDisplay, displayUpgrades, displayDiscoveries } from './ui.js';
import { playSound } from './sound.js';
import { checkVictory } from './main.js';

function upgradeDiscovery(discovery) {
    const cost = discoveryCosts[discovery][gameState.discoveries[discovery]];
    if (gameState.research >= cost) {
        gameState.research -= cost;
        gameState.discoveries[discovery]++;
        if (discovery === 'increasedComplexity') {
            gameState.valueRange += 5;
        }
        if (gameState.discoveries[discovery] === discoveryCosts[discovery].length) {
            gameState.completedBranches++;
        }
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

export { upgradeDiscovery, startLongTermStudy, shardPrime };
