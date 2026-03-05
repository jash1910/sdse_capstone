import { Agent } from './Agent.js';

export class AIAgent extends Agent {
    constructor(color, strategy) {
        super(color);
        this.strategy = strategy;
    }

    /**
     * Delegates the move decision to the injected strategy
     */
    async decideMove(gameState) {
        // Strategy is responsible for determining the next valid move
        // This could also involve asynchronous operations like web workers or API calls
        return await this.strategy.chooseMove(gameState);
    }
}
